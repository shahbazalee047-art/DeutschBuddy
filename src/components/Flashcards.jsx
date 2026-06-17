import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Flashcards({ content, onComplete }) {
  const [idx, setIdx] = useState(0); const [flipped, setFlipped] = useState(false); const [done, setDone] = useState([]);
  const cards = content.cards || [];
  if (!cards.length) return <Empty onComplete={onComplete} />;
  const card = cards[idx]; const isLast = idx === cards.length - 1;
  function next() { setFlipped(false); if (isLast) onComplete(); else { setDone(p => [...p, idx]); setIdx(p => p + 1); } }
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-slate-200 text-lg">🃏 Flashcards</h3><span className="text-sm text-slate-400">{idx + 1}/{cards.length}</span></div>
      <div className="flex justify-center mb-4">{cards.map((_, i) => (<div key={i} className={`w-2 h-2 rounded-full mx-0.5 transition ${i === idx ? 'bg-[#FFCC00]' : done.includes(i) ? 'bg-red-400' : 'bg-slate-700'}`} />))}</div>
      <div onClick={() => setFlipped(!flipped)} className="relative w-full max-w-md mx-auto cursor-pointer" style={{ perspective: '1000px' }}>
        <div className="w-full min-h-[220px] rounded-2xl transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="absolute inset-0 w-full min-h-[220px] rounded-2xl flex flex-col items-center justify-center text-black p-6" style={{ background: 'linear-gradient(135deg, #FFCC00, #ffe066)', backfaceVisibility: 'hidden' }}>
            <div className="flex items-center gap-3"><div className="text-4xl font-bold">{card.front}</div><SpeakerButton text={card.front} size="lg" className="bg-white/20 text-white hover:bg-white/30" /></div>
            <div className="text-sm mt-4" style={{ color: 'rgba(0,0,0,0.5)' }}>Click to flip</div>
          </div>
          <div className="absolute inset-0 w-full min-h-[220px] rounded-2xl bg-slate-800 border border-slate-700/50 flex flex-col items-center justify-center p-6" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="flex items-center gap-2 mb-2"><div className="text-xl font-bold text-slate-200">{card.front}</div><SpeakerButton text={card.front} size="sm" /></div>
            <div className="text-base mb-2" style={{ color: '#DD0000' }}>{card.back}</div>
            {card.example && <div className="text-xs text-slate-400 italic mt-1 flex items-center gap-1">e.g., {card.example}<SpeakerButton text={card.example} size="sm" /></div>}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-5"><button onClick={() => { if (idx > 0) { setFlipped(false); setIdx(p => p - 1); } }} disabled={idx === 0} className="px-5 py-2 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 transition text-sm">← Prev</button><button onClick={next} className="px-5 py-2 rounded-xl text-black font-semibold hover:scale-[1.02] transition text-sm" style={{ background: '#FFCC00' }}>{isLast ? '✓ Complete' : 'Next →'}</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-black rounded-xl text-sm font-semibold transition" style={{ background: '#FFCC00' }}>Mark Complete</button></div>; }
