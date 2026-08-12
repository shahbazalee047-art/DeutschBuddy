import { Buffer } from 'node:buffer';
import { UniversalEdgeTTS } from 'edge-tts-universal';

const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

// In-memory synthesis cache: identical phrases (same voice/rate/pitch/volume)
// are synthesized once and replayed — clients already cache, this skips the
// server-side Edge TTS round trip for repeat taps within a session.
const synthCache = new Map();
const SYNTH_CACHE_MAX = 200;

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

  const { text, voice = 'de-DE-KatjaNeural', rate = '+0%', pitch = '+0Hz', volume = '+0%' } = req.body || {};

  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'Text is required' });
    return;
  }

  if (text.length > 5000) {
    res.status(400).json({ error: 'Text too long' });
    return;
  }

  const key = cacheKey(text, voice, rate, pitch, volume);
  const cached = synthCache.get(key);
  if (cached) {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(cached);
    return;
  }

  try {
    const tts = new UniversalEdgeTTS(text, voice, { rate, pitch, volume });
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
    res.status(500).json({ error: 'TTS generation failed', message: err.message });
  }
}
