let germanVoice = null;

function getGermanVoice() {
  if (germanVoice) return germanVoice;
  const voices = window.speechSynthesis?.getVoices() || [];
  germanVoice = voices.find(v => v.lang.startsWith('de')) || null;
  return germanVoice;
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    germanVoice = null;
    getGermanVoice();
  };
}

export function speakGerman(text, rate = 0.85) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = rate;
  utterance.pitch = 1;

  const voice = getGermanVoice();
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}
