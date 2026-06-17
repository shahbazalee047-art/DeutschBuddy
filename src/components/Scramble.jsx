import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Scramble({ content, onComplete }) {
  const [idx, setIdx] = useState(0); const [input, setInput] = useState(''); const [show, setShow] = useState(false); const [score, setScore] = useState(0);
  const words = content.words || [];
  if (!words.length) return <Empty onComplete={onComplete} />;
  const w = words[idx]; const isLast = idx === words.length - 1; const shuffled = w.scrambled.split('').sort(() => Math.random() - 0.5);
  function submit() { const ok = input.trim().toLowerCase() === w.answer.toLowerCase(); if (ok) setScore(p => p + 1); setShow(true); setTimeout(() => { if (isLast) onComplete(); else { setIdx(p => p + 1); setInput(''); setShow(false); } }, 1200); }
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-zinc-100 text-lg">🔀 Unscramble</h3><span className="text-sm font-bold text-lime-400">{score}/{words.length}</span></div>
      <div className="progress-bar mb-5"><div className="progress-bar-fill" style={{ width: `${((idx + 1) / words.length) * 100}%` }} /></div>
      <div className="glass-card p-6 mb-4 text-center">
        <p className="text-[11px] text-zinc-500 mb-4 uppercase font-medium" style={{ letterSpacing: '0.5px' }}>Unscramble the German word:</p>
        <div className="flex justify-center gap-2 mb-5">{shuffled.map((l, i) => (<span key={i} className="w-12 h-12 flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-xl text-lg font-bold text-zinc-200">{l}</span>))}</div>
        <div className="flex items-center justify-center gap-3 mb-3"><input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !show && submit()} disabled={show} placeholder="Type the word..." className="w-56 paper-input text-center text-lg font-medium" /><SpeakerButton text={w.answer} size="md" /></div>
        {!show && <button onClick={submit} className="btn-primary px-6 active:scale-95">Check</button>}
      </div>
      {show && <div className={`text-center p-3 rounded-2xl text-sm font-semibold text-zinc-900`} style={{ background: input.trim().toLowerCase() === w.answer.toLowerCase() ? '#22C55E' : '#F59E0B' }}>{input.trim().toLowerCase() === w.answer.toLowerCase() ? 'Richtig! 🎉' : `Answer: "${w.answer}" 💪`}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-zinc-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
