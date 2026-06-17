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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-[#1a1a2e] text-lg">🔀 Unscramble</h3><span className="text-sm font-bold" style={{ color: '#8B6914' }}>{score}/{words.length}</span></div>
      <div className="w-full h-2 bg-[#E8DFD4] rounded-full overflow-hidden mb-5"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${((idx + 1) / words.length) * 100}%`, background: 'linear-gradient(to right, #8B6914, #C4956A)' }} /></div>
      <div className="bg-white border border-[#E8DFD4] rounded-2xl p-6 mb-4 text-center shadow-sm">
        <p className="text-xs text-[#9ca3af] mb-4">Unscramble the German word:</p>
        <div className="flex justify-center gap-1.5 mb-5">{shuffled.map((l, i) => (<span key={i} className="w-10 h-10 flex items-center justify-center bg-[#F5EFE6] border border-[#E8DFD4] rounded-lg text-lg font-bold text-[#1a1a2e]">{l}</span>))}</div>
        <div className="flex items-center justify-center gap-2 mb-3"><input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !show && submit()} disabled={show} placeholder="Type the word..." className="w-56 px-4 py-2.5 bg-[#F5EFE6] border border-[#E8DFD4] rounded-xl text-center text-base font-medium text-[#1a1a2e] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8B6914] transition" /><SpeakerButton text={w.answer} size="md" /></div>
        {!show && <button onClick={submit} className="px-5 py-2 text-white rounded-xl text-sm font-semibold hover:scale-[1.02] transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Check</button>}
      </div>
      {show && <div className={`text-center p-3 rounded-xl text-sm font-medium text-white`} style={{ background: input.trim().toLowerCase() === w.answer.toLowerCase() ? 'linear-gradient(135deg, #8B6914, #C4956A)' : '#C4956A' }}>{input.trim().toLowerCase() === w.answer.toLowerCase() ? 'Richtig! 🎉' : `Answer: "${w.answer}" 💪`}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#9ca3af] mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-white rounded-xl text-sm font-semibold transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Mark Complete</button></div>; }
