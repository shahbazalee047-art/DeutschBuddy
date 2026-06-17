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
        playing ? 'bg-[#B8860B] text-white scale-110 shadow-md' : 'bg-[#F5EFE6] text-[#8A8A9A] hover:bg-[#E8E0D4] hover:text-[#4A4A5A]'
      } ${className}`} title={`Pronounce "${text}"`}>
      {playing ? '🔊' : '🔈'}
    </button>
  );
}
