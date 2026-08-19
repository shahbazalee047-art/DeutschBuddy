import process from 'node:process'
import { Buffer } from 'node:buffer'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { UniversalEdgeTTS } from 'edge-tts-universal'

const VALID_TTS_VOICES = new Set([
  'de-DE-KatjaNeural',
  'de-DE-ConradNeural',
  'en-US-AriaNeural',
  'en-US-GuyNeural',
  'en-GB-SoniaNeural'
])
const TTS_RATE_PATTERN = /^[+-]\d{1,3}%$/
const TTS_PITCH_PATTERN = /^[+-]\d{1,3}Hz$/

function preconnectSupabasePlugin(env) {
  const url = env.VITE_SUPABASE_URL
  if (!url) return null
  let href
  try {
    const parsed = new URL(url)
    href = `${parsed.protocol}//${parsed.host}`
  } catch {
    return null
  }
  return {
    name: 'preconnect-supabase',
    transformIndexHtml(html) {
      return html.replace(
        '<head>',
        `<head>\n    <link rel="dns-prefetch" href="${href}">\n    <link rel="preconnect" href="${href}" crossorigin>`
      )
    }
  }
}

function securityPolicyPlugin(env) {
  const connectSources = [
    "'self'",
    'https://*.supabase.co',
    'https://pagead2.googlesyndication.com',
    'https://googleads.g.doubleclick.net',
    'https://*.googlesyndication.com'
  ]
  if (env.VITE_TTS_API_URL) {
    try {
      const ttsUrl = new URL(env.VITE_TTS_API_URL)
      connectSources.push(`${ttsUrl.protocol}//${ttsUrl.host}`)
    } catch {
      // Relative /api/tts is already covered by 'self'.
    }
  }

  const policy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    `connect-src ${connectSources.join(' ')}`,
    "img-src 'self' data: blob: https://*.googleusercontent.com https://*.googlesyndication.com https://*.doubleclick.net",
    "media-src 'self' blob:",
    'frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com',
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ')

  return {
    name: 'security-policy',
    transformIndexHtml(html) {
      return html.replace(
        /<meta http-equiv="Content-Security-Policy" content="[^"]*"\s*\/>/,
        `<meta http-equiv="Content-Security-Policy" content="${policy}" />`
      )
    }
  }
}

function ttsApiPlugin() {
  const synthCache = new Map();
  const SYNTH_CACHE_MAX = 200;
  const requestBuckets = new Map();
  const RATE_LIMIT_WINDOW_MS = 60_000;
  const RATE_LIMIT_MAX = 60;
  const cacheKey = (text, voice, rate, pitch, volume) => `${voice}|${rate}|${pitch}|${volume}|${text}`;

  function takeRateLimit(req) {
    const now = Date.now()
    const forwarded = req.headers['x-forwarded-for']
    const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '')
      || req.headers['x-real-ip']
      || req.socket?.remoteAddress
      || 'unknown'
    const bucket = requestBuckets.get(ip)
    if (!bucket || now - bucket.startedAt >= RATE_LIMIT_WINDOW_MS) {
      requestBuckets.set(ip, { startedAt: now, count: 1 })
    } else if (bucket.count >= RATE_LIMIT_MAX) {
      return false
    } else {
      bucket.count += 1
    }
    if (requestBuckets.size > 10_000) {
      for (const [key, value] of requestBuckets) {
        if (now - value.startedAt >= RATE_LIMIT_WINDOW_MS) requestBuckets.delete(key)
      }
    }
    return true
  }

  return {
    name: 'tts-api',
    configureServer(server) {
      server.middlewares.use('/api/tts', (req, res) => {
        const setCors = () => {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        }

        setCors()

        if (req.method === 'OPTIONS') {
          res.statusCode = 200
          res.end()
          return
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        if (!takeRateLimit(req)) {
          res.setHeader('Retry-After', '60')
          res.statusCode = 429
          res.end(JSON.stringify({ error: 'Too many TTS requests. Please try again shortly.' }))
          return
        }

        if (Number(req.headers['content-length'] || 0) > 32_000) {
          res.statusCode = 413
          res.end(JSON.stringify({ error: 'Request too large' }))
          return
        }

        let body = ''
        let tooLarge = false
        req.setEncoding('utf8')
        req.on('data', (chunk) => {
          if (body.length + chunk.length > 32_000) {
            tooLarge = true
            return
          }
          body += chunk
        })
        req.on('end', async () => {
          try {
            if (tooLarge) {
              res.statusCode = 413
              res.end(JSON.stringify({ error: 'Request too large' }))
              return
            }
            const {
              text,
              voice = 'de-DE-KatjaNeural',
              rate = '+0%',
              pitch = '+0Hz',
              volume = '+0%'
            } = JSON.parse(body || '{}')

            if (!text || typeof text !== 'string') {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Text is required' }))
              return
            }

            if (text.length > 5000) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Text too long' }))
              return
            }

            if (!VALID_TTS_VOICES.has(voice)
              || !TTS_RATE_PATTERN.test(rate)
              || !TTS_PITCH_PATTERN.test(pitch)
              || !TTS_RATE_PATTERN.test(volume)) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Invalid voice or prosody settings' }))
              return
            }

            const normalizedText = text.trim()
            if (!normalizedText) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Text is required' }))
              return
            }

            const key = cacheKey(normalizedText, voice, rate, pitch, volume)
            const cached = synthCache.get(key)
            if (cached) {
              res.setHeader('Content-Type', 'audio/mpeg')
              res.setHeader('Cache-Control', 'public, max-age=3600')
              res.statusCode = 200
              res.end(cached)
              return
            }

            const tts = new UniversalEdgeTTS(normalizedText, voice, { rate, pitch, volume })
            const { audio } = await tts.synthesize()
            const arrayBuffer = await audio.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            if (synthCache.size >= SYNTH_CACHE_MAX) {
              const oldest = synthCache.keys().next().value
              synthCache.delete(oldest)
            }
            synthCache.set(key, buffer)

            res.setHeader('Content-Type', 'audio/mpeg')
            res.setHeader('Cache-Control', 'public, max-age=3600')
            res.statusCode = 200
            res.end(buffer)
          } catch (err) {
            console.error('Edge TTS dev error:', err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'TTS generation failed' }))
          }
        })
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [
      react(),
      tailwindcss(),
      preconnectSupabasePlugin(env),
      securityPolicyPlugin(env),
      ttsApiPlugin(),
      process.env.ANALYZE === 'true' && visualizer({
        open: false,
        gzipSize: true,
        template: 'raw-data',
        filename: 'dist/stats.json'
      })
    ].filter(Boolean),
    build: {
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/framer-motion')) return 'framer-motion';
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router')) return 'vendor-ui';
            if (id.includes('node_modules/@supabase') || id.includes('src/lib/supabase.js')) return 'supabase';
            if (id.includes('src/data/a1SpoonfedModules.js')) return 'curriculum-a1';
            if (id.includes('src/data/a1FastTrackData.js')) return 'curriculum-a1-fast';
            if (id.includes('src/data/a2Data.js')) return 'curriculum-a2';
            return undefined;
          }
        }
      }
    }
  }
})
