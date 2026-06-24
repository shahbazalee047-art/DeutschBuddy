import { useState, useCallback, useRef, useEffect } from 'react';

export function useSpeech(language = 'de-DE', onAudioEnd, onAudioError) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const utteranceRef = useRef(null);

  const speak = useCallback((text, rate = playbackRate) => {
    setError(null);
    if (!window.speechSynthesis) {
      setError('Speech synthesis not supported');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utteranceRef.current = utterance;

    utterance.onend = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
      if (onAudioEnd) onAudioEnd();
    };

    utterance.onerror = (e) => {
      setIsSpeaking(false);
      setError(e.error);
      utteranceRef.current = null;
      if (onAudioError) onAudioError(e.error);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [language, playbackRate, onAudioEnd, onAudioError]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    utteranceRef.current = null;
  }, []);

  const toggleRate = useCallback(() => {
    const newRate = playbackRate === 1.0 ? 0.75 : 1.0;
    setPlaybackRate(newRate);
    if (isSpeaking && utteranceRef.current) {
      const currentText = utteranceRef.current.text;
      stop();
      setTimeout(() => speak(currentText, newRate), 50);
    }
    return newRate;
  }, [playbackRate, isSpeaking, speak, stop]);

  return {
    isSpeaking,
    error,
    speak,
    stop,
    playbackRate,
    toggleRate,
    setRate: setPlaybackRate
  };
}

export function useWordSync(text, isSpeaking) {
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const words = text ? text.split(/\s+/) : [];

  useEffect(() => {
    if (!isSpeaking || words.length === 0) {
      setActiveWordIndex(-1);
      return;
    }

    const totalDuration = 2000;
    const perWordDuration = totalDuration / words.length;

    let wordIndex = 0;
    const interval = setInterval(() => {
      setActiveWordIndex(wordIndex);
      wordIndex++;
      if (wordIndex >= words.length) {
        clearInterval(interval);
        setActiveWordIndex(-1);
      }
    }, perWordDuration);

    return () => clearInterval(interval);
  }, [isSpeaking, words.length]);

  return { words, activeWordIndex };
}