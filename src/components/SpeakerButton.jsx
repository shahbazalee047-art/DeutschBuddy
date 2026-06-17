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
        playing ? 'bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/30' : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20'
      } ${className}`} title={`Pronounce "${text}"`}>
      {playing ? '🔊' : '🔈'}
    </button>
  );
}
