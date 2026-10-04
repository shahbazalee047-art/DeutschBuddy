import { Buffer } from 'node:buffer';
import { UniversalEdgeTTS } from 'edge-tts-universal';
import { createClient } from '@supabase/supabase-js';

const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'X-Content-Type-Options': 'nosniff'
};

// In-memory synthesis cache: identical phrases (same voice/rate/pitch/volume)
// are synthesized once and replayed — clients already cache, this skips the
// server-side Edge TTS round trip for repeat taps within a session.
const synthCache = new Map();
const SYNTH_CACHE_MAX = 200;
const VALID_VOICES = new Set([
  'de-DE-KatjaNeural',
  'de-DE-ConradNeural',
  'en-US-AriaNeural',
  'en-US-GuyNeural',
  'en-GB-SoniaNeural',
]);
const RATE_PATTERN = /^[+-]\d{1,3}%$/;
const PITCH_PATTERN = /^[+-]\d{1,3}Hz$/;

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null)
    || req.headers['x-real-ip']
    || 'unknown';
}

async function takeRateLimit(req) {
  const ip = getClientIp(req);
  const windowStart = new Date(Date.now() - 60_000).toISOString();
  const { data: count, error } = await supabase.rpc('increment_tts_rate', {
    p_ip: ip,
    p_window_start: windowStart,
  });
  if (error || (count ?? 0) > 60) return false;
  return true;
}

function cacheKey(text, voice, rate, pitch, volume) {
  return `${voice}|${rate}|${pitch}|${volume}|${text}`;
}

export default async function handler(req, res) {
  Object.entries(DEFAULT_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!takeRateLimit(req)) {
    res.setHeader('Retry-After', '60');
    res.status(429).json({ error: 'Too many TTS requests. Please try again shortly.' });
    return;
  }

  if (Number(req.headers['content-length'] || 0) > 32_000) {
    res.status(413).json({ error: 'Request too large' });
    return;
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch {
      res.status(400).json({ error: 'Invalid JSON body' });
      return;
    }
  }

  const { text, voice = 'de-DE-KatjaNeural', rate = '+0%', pitch = '+0Hz', volume = '+0%' } = body || {};

  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'Text is required' });
    return;
  }

  if (text.length > 5000) {
    res.status(400).json({ error: 'Text too long' });
    return;
  }

  if (!VALID_VOICES.has(voice) || !RATE_PATTERN.test(rate) || !PITCH_PATTERN.test(pitch) || !RATE_PATTERN.test(volume)) {
    res.status(400).json({ error: 'Invalid voice or prosody settings' });
    return;
  }

  const normalizedText = text.trim();
  if (!normalizedText) {
    res.status(400).json({ error: 'Text is required' });
    return;
  }

  const key = cacheKey(normalizedText, voice, rate, pitch, volume);
  const cached = synthCache.get(key);
  if (cached) {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(cached);
    return;
  }

  try {
    const tts = new UniversalEdgeTTS(normalizedText, voice, { rate, pitch, volume });
    const { audio } = await tts.synthesize();
    const arrayBuffer = await audio.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (synthCache.size >= SYNTH_CACHE_MAX) {
      const oldest = synthCache.keys().next().value;
      synthCache.delete(oldest);
    }
    synthCache.set(key, buffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(buffer);
  } catch (err) {
    console.error('Edge TTS API error:', err);
    res.status(500).json({ error: 'TTS generation failed' });
  }
}
