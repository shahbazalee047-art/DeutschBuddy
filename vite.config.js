import process from 'node:process'
import { Buffer } from 'node:buffer'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { UniversalEdgeTTS } from 'edge-tts-universal'

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

function ttsApiPlugin() {
  const synthCache = new Map();
  const SYNTH_CACHE_MAX = 200;
  const cacheKey = (text, voice, rate, pitch, volume) => `${voice}|${rate}|${pitch}|${volume}|${text}`;

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

        let body = ''
        req.setEncoding('utf8')
        req.on('data', (chunk) => { body += chunk })
        req.on('end', async () => {
          try {
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

            const key = cacheKey(text, voice, rate, pitch, volume)
            const cached = synthCache.get(key)
            if (cached) {
              res.setHeader('Content-Type', 'audio/mpeg')
              res.setHeader('Cache-Control', 'public, max-age=3600')
              res.statusCode = 200
              res.end(cached)
              return
            }

            const tts = new UniversalEdgeTTS(text, voice, { rate, pitch, volume })
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
            res.end(JSON.stringify({ error: 'TTS generation failed', message: err.message }))
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
