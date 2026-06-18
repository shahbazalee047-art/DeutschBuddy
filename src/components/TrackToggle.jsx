import { useSpeech } from '../hooks/useSpeech';
import { IconPlay, IconPlayFilled } from './Icons';

export default function TrackToggle({ mode, onToggle }) {
  const { isSpeaking } = useSpeech('de-DE');
  const isStandard = mode === 'standard';

  const PlayIcon = isSpeaking ? IconPlayFilled : IconPlay;

  return (
    <button
      onClick={onToggle}
      disabled={!mode}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${isStandard ? 'bg-sage-400 text-forest-900' : 'bg-sky-400 text-forest-900'} ${isSpeaking ? 'animate-pulse' : ''}`}
    >
      <PlayIcon className="w-5 h-5" />
      <span className="text-sm font-medium">{isStandard ? 'Standard' : 'Fast'}</span>
    </button>
  );
}