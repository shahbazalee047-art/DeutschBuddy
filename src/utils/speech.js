import {
  detectLanguage,
  EDGE_VOICES,
  toEdgeRate,
  speakWithEdgeTTS,
  speakWithWebSpeech
} from './edgeSpeech';

export async function speakGerman(text, rate = 0.85) {
  if (!text) return;

  const detectedLang = detectLanguage(text);
  const isGerman = detectedLang.toLowerCase().startsWith('de');
  const voiceName = isGerman ? EDGE_VOICES.german : EDGE_VOICES.english;

  try {
    const blob = await speakWithEdgeTTS(text, voiceName, toEdgeRate(rate));
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    await audio.play();
    audio.onended = () => URL.revokeObjectURL(url);
  } catch (err) {
    console.warn('Edge TTS failed, using Web Speech fallback:', err);
    speakWithWebSpeech(text, detectedLang, rate);
  }
}
