import { useState } from 'react';
import { speakGerman } from '../utils/speech';

export default function SpeakerButton({ text, size = 'md', className = '' }) {
  const [playing, setPlaying] = useState(false);

  function handleClick(e) {
    e.stopPropagation();
    setPlaying(true);
    speakGerman(text);
    setTimeout(() => setPlaying(false), 1200);
  }

  const sizes = { sm: 'w-7 h-7 text-sm', md: 'w-9 h-9 text-base', lg: 'w-11 h-11 text-lg' };

  return (
    <button onClick={handleClick}
      className={`${sizes[size]} inline-flex items-center justify-center rounded-full transition-all duration-200 ${
        playing ? 'bg-lime-400 text-zinc-950 scale-110' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border border-zinc-700'
      } ${className}`} title={`Pronounce "${text}"`}>
      {playing ? '🔊' : '🔈'}
    </button>
  );
}
