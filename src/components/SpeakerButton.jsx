import { useState } from 'react';
import { speakGerman } from '../utils/speech';
export default function SpeakerButton({ text, size = 'md', className = '' }) {
  const [playing, setPlaying] = useState(false);
  function handleClick(e) { e.stopPropagation(); setPlaying(true); speakGerman(text); setTimeout(() => setPlaying(false), 1200); }
  const sizes = { sm: 'w-7 h-7 text-sm', md: 'w-9 h-9 text-base', lg: 'w-11 h-11 text-lg' };
  return (<button onClick={handleClick} className={`${sizes[size]} inline-flex items-center justify-center rounded-full transition-all duration-200 ${playing ? 'text-black scale-110' : 'bg-slate-700 text-slate-400 hover:bg-slate-600 border border-slate-600'} ${className}`} style={playing ? { background: '#FFCC00' } : {}} title={`Pronounce "${text}"`}>{playing ? '🔊' : '🔈'}</button>);
}
