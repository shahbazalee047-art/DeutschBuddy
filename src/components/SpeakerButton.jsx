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

  const sizes = { sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-base', lg: 'w-12 h-12 text-lg' };

  return (
    <button onClick={handleClick}
      className={`${sizes[size]} inline-flex items-center justify-center rounded-xl transition-all duration-200 ${
        playing ? 'bg-lime-500 text-zinc-900 scale-110 shadow-md shadow-lime-500/30' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 border border-zinc-700'
      } ${className}`} title={`Pronounce "${text}"`}>
      {playing ? '🔊' : '🔈'}
    </button>
  );
}
