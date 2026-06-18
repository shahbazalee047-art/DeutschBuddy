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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-cream-100 text-lg">🃏 Flashcards</h3><span className="text-sm text-cream-400">{idx + 1}/{cards.length}</span></div>
      <div className="flex justify-center mb-4">{cards.map((_, i) => (<div key={i} className={`w-2.5 h-2.5 rounded-full mx-0.5 transition ${i === idx ? 'bg-sage-400' : done.includes(i) ? 'bg-success' : 'bg-forest-700'}`} />))}</div>
      <div onClick={() => setFlipped(!flipped)} className="relative w-full max-w-md mx-auto cursor-pointer" style={{ perspective: '1000px' }}>
        <div className="w-full min-h-[240px] rounded-3xl transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="absolute inset-0 w-full min-h-[240px] rounded-3xl flex flex-col items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #7FB069, #D4A574)', backfaceVisibility: 'hidden', boxShadow: '0 8px 32px rgba(127, 176, 105, 0.3)' }}>
            <div className="flex items-center gap-3"><div className="text-4xl font-bold text-zinc-900">{card.front}</div><SpeakerButton text={card.front} size="lg" className="bg-zinc-900/20 text-zinc-900 hover:bg-zinc-900/30" /></div>
            <div className="text-sm mt-4 text-zinc-800/60">Click to flip</div>
          </div>
          <div className="absolute inset-0 w-full min-h-[240px] rounded-3xl glass-card flex flex-col items-center justify-center p-6" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="flex items-center gap-2 mb-2"><div className="text-xl font-bold text-cream-100">{card.front}</div><SpeakerButton text={card.front} size="sm" /></div>
            <div className="text-base mb-2 font-medium text-sky-400">{card.back}</div>
            {card.example && <div className="text-xs text-cream-500 italic mt-1 flex items-center gap-1">e.g., {card.example}<SpeakerButton text={card.example} size="sm" /></div>}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        <button onClick={() => { if (idx > 0) { setFlipped(false); setIdx(p => p - 1); } }} disabled={idx === 0} className="px-6 py-2.5 rounded-xl border border-border text-cream-400 hover:bg-forest-800 disabled:opacity-40 transition text-sm active:scale-95">← Prev</button>
        <button onClick={next} className="btn-primary px-6 active:scale-95">{isLast ? '✓ Complete' : 'Next →'}</button>
      </div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-cream-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
