export const EDGE_VOICES = {
  german: 'de-DE-KatjaNeural',
  germanMale: 'de-DE-ConradNeural',
  english: 'en-US-AriaNeural',
  englishMale: 'en-US-GuyNeural',
  britishEnglish: 'en-GB-SoniaNeural'
};

const GERMAN_MARKERS = new Set([
  'ä','ö','ü','ß','der','die','das','den','dem','des','ein','eine','einen','einem','einer','eines',
  'und','ist','sind','war','waren','mit','zu','zum','zur','auf','für','von','vom','aus','bei','nach',
  'wie','was','wer','wo','wann','warum','wieso','nicht','kein','keine','keinen','auch','nur','schon','noch',
  'immer','jetzt','hier','dort','gut','sehr','bitte','danke','ich','du','er','sie','es','wir','ihr','sie',
  'mich','dich','ihn','uns','euch','mir','dir','ihm','mein','dein','sein','ihr','unser','euer',
  'haben','bin','bist','sind','kann','kannst','können','will','willst','wollen','muss','musst','müssen'
]);

const ENGLISH_MARKERS = new Set([
  'the','a','an','is','are','was','were','be','been','being','have','has','had','do','does','did',
  'will','would','could','should','may','might','can','shall','you','your','yours','i','me','my','mine',
  'he','him','his','she','her','hers','it','its','we','us','our','ours','they','them','their','theirs',
  'and','or','but','so','because','if','when','where','what','who','which','how','this','that','these','those'
]);

export function detectLanguage(text) {
  if (!text || typeof text !== 'string') return 'de-DE';
  const normalized = text.toLowerCase().replace(/[^\p{L}\p{N}']+/gu, ' ').trim();
  const tokens = normalized.split(/\s+/).filter(Boolean);

  if (tokens.length === 0) return 'de-DE';

  // German-specific characters are a strong signal.
  if (/[äöüß]/.test(text)) return 'de-DE';

  let germanScore = 0;
  let englishScore = 0;

  for (const token of tokens) {
    if (GERMAN_MARKERS.has(token)) germanScore += 1;
    if (ENGLISH_MARKERS.has(token)) englishScore += 1;
  }

  // Favour German for this app unless English is clearly dominant.
  if (englishScore > germanScore && englishScore >= 2) return 'en-US';
  return 'de-DE';
}

export function toEdgeRate(rate) {
  if (typeof rate === 'string') return rate;
  // Map numeric playback rates to Edge TTS prosody rate strings.
  if (rate <= 0.5) return '-50%';
  if (rate <= 0.6) return '-40%';
  if (rate <= 0.7) return '-30%';
  if (rate <= 0.8) return '-25%';
  if (rate <= 0.9) return '-15%';
  if (rate >= 1.5) return '+50%';
  if (rate >= 1.35) return '+35%';
  if (rate >= 1.2) return '+20%';
  if (rate >= 1.1) return '+10%';
  return '+0%';
}

const TTS_API_URL = import.meta.env?.VITE_TTS_API_URL || '/api/tts';

// Session audio cache: a phrase is synthesized once per voice/rate/pitch/volume
// and replayed instantly from memory on later taps. POST responses are not
// HTTP-cached, so without this every tap round-trips the server.
const audioCache = new Map();
const AUDIO_CACHE_MAX = 60;

// In-flight dedupe: a hover prefetch and the subsequent tap (or rapid double
// taps on the same phrase) share one network request instead of firing N.
const inFlight = new Map();

function cacheKey(text, voice, rate, pitch, volume) {
  return `${voice}|${rate}|${pitch}|${volume}|${text}`;
}

export async function speakWithEdgeTTS(text, voice, rate = '+0%', pitch = '+0Hz', volume = '+0%', signal) {
  const textToSpeak = String(text || '').trim();
  if (!textToSpeak) throw new Error('No text provided for TTS');

  const key = cacheKey(textToSpeak, voice, rate, pitch, volume);
  const cached = audioCache.get(key);
  if (cached) return cached;

  const pending = inFlight.get(key);
  if (pending) return pending;

  const promise = (async () => {
    try {
      const response = await fetch(TTS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, voice, rate, pitch, volume }),
        signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `TTS request failed (${response.status})`);
      }

      const blob = await response.blob();
      if (audioCache.size >= AUDIO_CACHE_MAX) {
        const oldest = audioCache.keys().next().value;
        audioCache.delete(oldest);
      }
      audioCache.set(key, blob);
      return blob;
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);
  return promise;
}

export function clearAudioCache() {
  audioCache.clear();
  inFlight.clear();
}

export function speakWithWebSpeech(text, language = 'de-DE', rate = 0.9, onEnd, onError) {
  if (!window.speechSynthesis) {
    const err = 'Speech synthesis not supported';
    if (onError) onError(err);
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = rate;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.toLowerCase().startsWith(language.slice(0, 2).toLowerCase()));
  if (preferred) utterance.voice = preferred;

  utterance.onend = () => { if (onEnd) onEnd(); };
  utterance.onerror = (e) => { if (onError) onError(e.error || 'Speech error'); };

  window.speechSynthesis.speak(utterance);
}

export function stopWebSpeech() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
