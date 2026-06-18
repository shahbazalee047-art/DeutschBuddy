import { useState, useCallback } from 'react';

export function useSpeech(language = 'de-DE', onAudioEnd, onAudioError) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);

  const speak = useCallback((text) => {
    setError(null);
    if (!window.speechSynthesis) {
      setError('Speech synthesis not supported');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
      if (onAudioEnd) onAudioEnd();
    };

    utterance.onerror = (e) => {
      setIsSpeaking(false);
      setError(e.error);
      if (onAudioError) onAudioError(e.error);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [language, onAudioEnd, onAudioError]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { isSpeaking, error, speak, stop };
}