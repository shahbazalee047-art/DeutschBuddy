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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-slate-200 text-lg">🔀 Unscramble</h3><span className="text-sm font-bold text-lime-400">{score}/{words.length}</span></div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-5"><div className="h-full bg-gradient-to-r from-orange-400 to-orange-300 rounded-full transition-all duration-300" style={{ width: `${((idx + 1) / words.length) * 100}%` }} /></div>
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-6 mb-4 text-center">
        <p className="text-xs text-slate-500 mb-4">Unscramble the German word:</p>
        <div className="flex justify-center gap-1.5 mb-5">{shuffled.map((l, i) => (<span key={i} className="w-10 h-10 flex items-center justify-center bg-slate-900/50 border border-slate-700/50 rounded-lg text-lg font-bold text-slate-300">{l}</span>))}</div>
        <div className="flex items-center justify-center gap-2 mb-3"><input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !show && submit()} disabled={show} placeholder="Type the word..." className="w-56 px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-center text-base font-medium text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-400 transition" /><SpeakerButton text={w.answer} size="md" /></div>
        {!show && <button onClick={submit} className="px-5 py-2 bg-lime-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Check</button>}
      </div>
      {show && <div className={`text-center p-3 rounded-xl text-sm font-medium ${input.trim().toLowerCase() === w.answer.toLowerCase() ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>{input.trim().toLowerCase() === w.answer.toLowerCase() ? 'Richtig! 🎉' : `Answer: "${w.answer}" 💪`}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>; }
