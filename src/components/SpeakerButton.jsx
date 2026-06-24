import { useSpeech } from '../hooks/useSpeech';
import { IconSpeaker, IconSpeakerX } from './Icons';

export default function SpeakerButton({
  text,
  language = 'de-DE',
  onAudioEnd,
  onAudioError,
  size = 'md',
  showRateToggle = false
}) {
  const { isSpeaking, error, speak, stop, playbackRate, toggleRate } = useSpeech(
    language,
    onAudioEnd,
    onAudioError
  );

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

  return (
    <div className="relative inline-flex">
      <button
        onClick={handleToggle}
        disabled={!text}
        title={error ? 'Speech unavailable' : isSpeaking ? 'Stop' : 'Listen'}
        aria-label={error ? 'Speech unavailable' : isSpeaking ? 'Stop speaking' : 'Listen'}
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
          isSpeaking
            ? 'bg-gold text-[var(--cta-text)] animate-pulse shadow-[0_0_12px_rgba(232,183,61,0.4)]'
            : 'bg-[rgba(245,229,201,0.10)] text-gold hover:bg-[rgba(245,229,201,0.20)]'
        }`}
      >
        <CurrentIcon className={iconSizes[size]} />
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