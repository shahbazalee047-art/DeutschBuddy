import { useState, useCallback, useRef, useEffect } from 'react';
import {
  detectLanguage,
  EDGE_VOICES,
  toEdgeRate,
  speakWithEdgeTTS,
  speakWithWebSpeech,
  stopWebSpeech
} from '../utils/edgeSpeech';

export function useSpeech(language = 'auto', onAudioEnd, onAudioError) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const audioRef = useRef(null);
  const objectUrlRef = useRef(null);
  const currentTextRef = useRef(null);
  const abortRef = useRef(null);
  // Monotonic id per speak request: stop()/a newer speak() bumps it, and stale
  // async continuations (blob arrived, fetch aborted) bail instead of playing
  // zombie audio or falling back to Web Speech after the user cancelled.
  const requestIdRef = useRef(0);

  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    requestIdRef.current += 1;
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    cleanupAudio();
    stopWebSpeech();
    setIsGenerating(false);
    setIsSpeaking(false);
  }, [cleanupAudio]);

  const speak = useCallback(async (text, rate = playbackRate) => {
    setError(null);
    if (!text) {
      setError('No text to speak');
      return;
    }

    // Stop any currently playing audio or in-flight generation before starting.
    stop();
    const requestId = requestIdRef.current;
    currentTextRef.current = text;
    setIsGenerating(true);
    setIsSpeaking(true);

    const detectedLang = language === 'auto' ? detectLanguage(text) : language;
    const isGerman = detectedLang.toLowerCase().startsWith('de');
    const voiceName = isGerman ? EDGE_VOICES.german : EDGE_VOICES.english;
    const edgeRate = toEdgeRate(rate);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const blob = await speakWithEdgeTTS(text, voiceName, edgeRate, '+0Hz', '+0%', controller.signal);
      if (requestIdRef.current !== requestId) return; // superseded or stopped
      abortRef.current = null;
      setIsGenerating(false);

      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;
      // Edge TTS audio is already rendered at the requested prosody rate;
      // play it back at normal speed to avoid double-slowing/double-speeding.
      audio.playbackRate = 1.0;

      audio.onended = () => {
        cleanupAudio();
        setIsSpeaking(false);
        if (onAudioEnd) onAudioEnd();
      };

      audio.onerror = (e) => {
        cleanupAudio();
        setIsSpeaking(false);
        const message = e?.message || 'Audio playback failed';
        setError(message);
        if (onAudioError) onAudioError(message);
      };

      await audio.play();
    } catch (err) {
      if (requestIdRef.current !== requestId) return; // cancelled — stay silent
      setIsGenerating(false);
      if (err?.name === 'AbortError') return; // fetch aborted — no fallback
      console.warn('Edge TTS failed, falling back to Web Speech:', err);
      try {
        speakWithWebSpeech(
          text,
          detectedLang,
          rate,
          () => {
            setIsSpeaking(false);
            if (onAudioEnd) onAudioEnd();
          },
          (fallbackErr) => {
            setIsSpeaking(false);
            setError(fallbackErr);
            if (onAudioError) onAudioError(fallbackErr);
          }
        );
      } catch (fallbackErr) {
        setIsSpeaking(false);
        setError(fallbackErr.message);
        if (onAudioError) onAudioError(fallbackErr.message);
      }
    }
  }, [language, playbackRate, stop, cleanupAudio, onAudioEnd, onAudioError]);

  const toggleRate = useCallback(() => {
    const newRate = playbackRate === 1.0 ? 0.75 : 1.0;
    setPlaybackRate(newRate);
    if (isSpeaking && currentTextRef.current) {
      const text = currentTextRef.current;
      stop();
      setTimeout(() => speak(text, newRate), 50);
    }
    return newRate;
  }, [playbackRate, isSpeaking, stop, speak]);

  // Clean up any pending audio or in-flight generation when the hook unmounts.
  useEffect(() => {
    return () => {
      requestIdRef.current += 1;
      if (abortRef.current) abortRef.current.abort();
      cleanupAudio();
      stopWebSpeech();
    };
  }, [cleanupAudio]);

  return {
    isSpeaking,
    isGenerating,
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
