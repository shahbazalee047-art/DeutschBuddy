import { useSpeech } from '../hooks/useSpeech';
import { IconPlay, IconPlayFilled } from './Icons';

export default function TrackToggle({ mode, onToggle }) {
  const { isSpeaking } = useSpeech('de-DE');
  const isStandard = mode === 'standard';

  const PlayIcon = isSpeaking ? IconPlayFilled : IconPlay;

  return (
    <div className="relative flex items-center bg-forest-800 rounded-xl p-0.5 border border-border">
      <div
        className="absolute inset-y-0.5 w-1/2 rounded-[10px] transition-all duration-300 ease-out"
        style={{
          background: 'linear-gradient(135deg, #7FB069, #6BA3BE)',
          left: isStandard ? '2px' : '50%',
          right: isStandard ? '50%' : '2px',
        }}
      />
      <button
        onClick={() => onToggle && onToggle('standard')}
        disabled={!mode}
        className={`relative z-10 flex items-center justify-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-medium transition-all duration-300 ${
          isStandard ? 'text-forest-900' : 'text-cream-400 hover:text-cream-200'
        }`}
      >
        <IconPlay className="w-4 h-4" />
        Standard
      </button>
      <button
        onClick={() => onToggle && onToggle('fast')}
        disabled={!mode}
        className={`relative z-10 flex items-center justify-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-medium transition-all duration-300 ${
          !isStandard ? 'text-forest-900' : 'text-cream-400 hover:text-cream-200'
        }`}
      >
        <IconPlayFilled className="w-4 h-4" />
        Fast
      </button>
    </div>
  );
}
