import { useSpeech } from '../hooks/useSpeech';
import { detectLanguage, EDGE_VOICES, toEdgeRate, speakWithEdgeTTS } from '../utils/edgeSpeech';
import { IconSpeaker, IconSpeakerX } from './Icons';

export default function SpeakerButton({
  text,
  language = 'auto',
  onAudioEnd,
  onAudioError,
  size = 'md',
  showRateToggle = false
}) {
  const { isSpeaking, isGenerating, error, speak, stop, playbackRate, toggleRate } = useSpeech(
    language,
    onAudioEnd,
    onAudioError
  );

  // Warm the TTS cache on hover/focus (desktop) so a tap plays instantly
  // instead of waiting for a network synthesis round trip.
  const prefetch = () => {
    if (!text || isSpeaking || isGenerating) return;
    const detectedLang = language === 'auto' ? detectLanguage(text) : language;
    const voiceName = detectedLang.toLowerCase().startsWith('de')
      ? EDGE_VOICES.german
      : EDGE_VOICES.english;
    speakWithEdgeTTS(text, voiceName, toEdgeRate(playbackRate)).catch(() => {});
  };

  const handleToggle = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  const handleRateToggle = (e) => {
    e.stopPropagation();
    toggleRate();
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const CurrentIcon = isSpeaking ? IconSpeakerX : IconSpeaker;

  const label = error
    ? 'Speech unavailable'
    : isGenerating
      ? 'Preparing audio…'
      : isSpeaking
        ? 'Stop speaking'
        : 'Listen';

  return (
    <div className="relative inline-flex">
      <button
        onClick={handleToggle}
        onMouseEnter={prefetch}
        onFocus={prefetch}
        disabled={!text}
        title={label}
        aria-label={label}
        aria-busy={isGenerating || undefined}
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
          isSpeaking
            ? 'bg-primary text-text-on-primary animate-pulse'
            : 'bg-primary-light text-primary hover:bg-accent-light'
        }`}
      >
        {isGenerating ? (
          <span
            className={`${iconSizes[size]} border-2 border-current border-t-transparent rounded-full animate-spin`}
            aria-hidden="true"
          />
        ) : (
          <CurrentIcon className={iconSizes[size]} />
        )}
      </button>

      {showRateToggle && (
        <button
          onClick={handleRateToggle}
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-all hover:scale-110 z-10"
          style={{
            background: playbackRate === 0.75 ? 'var(--a1-blue)' : 'var(--bg-secondary)',
            color: playbackRate === 0.75 ? '#F0EAE0' : 'var(--text-muted)',
            border: '1px solid var(--border-default)'
          }}
          aria-label={playbackRate === 1.0 ? 'Switch to slow playback' : 'Switch to normal playback'}
        >
          {playbackRate === 0.75 ? '¾' : '1'}
        </button>
      )}
    </div>
  );
}
