import { useSpeech } from '../hooks/useSpeech';
import { IconPlay, IconPlayFilled } from './Icons';

export default function TrackToggle({ mode, onToggle }) {
  const { isSpeaking } = useSpeech('de-DE');
  const isStandard = mode === 'standard';

  return (
    <div className="flex items-center bg-forest-800 rounded-full p-0.5 border border-border">
      <button
        onClick={() => onToggle && onToggle('standard')}
        disabled={!mode}
        className="relative group flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
      >
        <span
          className="absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, #7FB069, #6BA3BE)',
            opacity: isStandard ? 1 : 0,
          }}
        />
        <span className="relative z-10 flex items-center gap-1.5">
          {isSpeaking ? <IconPlayFilled className="w-4 h-4" /> : <IconPlay className="w-4 h-4" />}
          <span className={isStandard ? 'text-forest-950' : 'text-cream-400 group-hover:text-cream-200'}>Standard</span>
        </span>
      </button>
      <button
        onClick={() => onToggle && onToggle('fast')}
        disabled={!mode}
        className="relative group flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
      >
        <span
          className="absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, #7FB069, #6BA3BE)',
            opacity: isStandard ? 0 : 1,
          }}
        />
        <span className="relative z-10 flex items-center gap-1.5">
          {isSpeaking ? <IconPlayFilled className="w-4 h-4" /> : <IconPlay className="w-4 h-4" />}
          <span className={!isStandard ? 'text-forest-950' : 'text-cream-400 group-hover:text-cream-200'}>Fast</span>
        </span>
      </button>
    </div>
  );
}
