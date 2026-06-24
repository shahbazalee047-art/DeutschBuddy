import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Flashcards({ content, onComplete }) {
  const [idx, setIdx] = useState(0); const [flipped, setFlipped] = useState(false); const [done, setDone] = useState([]);
  const cards = content.cards || [];
  if (!cards.length) return <Empty onComplete={onComplete} />;
  const card = cards[idx]; const isLast = idx === cards.length - 1;
  function next() { setFlipped(false); if (isLast) onComplete(); else { setDone(p => [...p, idx]); setIdx(p => p + 1); } }
  return (
    <div className="fade-in reading-body">
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-text-dark text-lg">🃏 Flashcards</h3><span className="text-sm text-text-muted">{idx + 1}/{cards.length}</span></div>
      <div className="flex justify-center mb-4">{cards.map((_, i) => (<div key={i} className={`w-2.5 h-2.5 rounded-full mx-0.5 transition ${i === idx ? 'bg-gold' : done.includes(i) ? 'bg-success' : 'bg-bg-secondary'}`} />))}</div>
      <div onClick={() => setFlipped(!flipped)} className="relative w-full max-w-md mx-auto cursor-pointer" style={{ perspective: '1000px' }}>
        <div className="w-full min-h-[240px]  transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="absolute inset-0 w-full min-h-[240px] rounded-[var(--radius-card)] flex flex-col items-center justify-center p-6 border" style={{ background: 'var(--bg-white)', borderColor: 'var(--border-default)', backfaceVisibility: 'hidden', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)' }}>
            <div className="flex items-center gap-3"><div className="text-4xl font-bold" style={{ color: 'var(--text-on-dark)' }}>{card.front}</div><SpeakerButton text={card.front} size="lg" className="bg-[#1C1A19]/50" style={{ color: 'var(--text-on-dark)' }} /></div>
            <div className="text-sm mt-4" style={{ color: 'var(--text-on-dark-muted)' }}>Click to flip</div>
          </div>
          <div className="absolute inset-0 w-full min-h-[240px] rounded-[var(--radius-card)] flex flex-col items-center justify-center p-6 border" style={{ background: 'var(--bg-white)', borderColor: 'var(--border-default)', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="flex items-center gap-2 mb-2"><div className="text-xl font-bold" style={{ color: 'var(--text-on-dark)' }}>{card.front}</div><SpeakerButton text={card.front} size="sm" /></div>
            <div className="text-base mb-2 font-medium text-gold">{card.back}</div>
            {card.example && <div className="text-xs italic mt-1 flex items-center gap-1" style={{ color: 'var(--text-on-dark-muted)' }}>e.g., {card.example}<SpeakerButton text={card.example} size="sm" /></div>}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        <button onClick={() => { if (idx > 0) { setFlipped(false); setIdx(p => p - 1); } }} disabled={idx === 0} className="px-6 py-2.5  border border-border text-text-muted hover:bg-bg-secondary disabled:opacity-40 transition text-sm active:scale-95"><span className="text-base font-bold text-text-body">←</span> Prev</button>
        <button onClick={next} className="btn-primary px-6 active:scale-95">{isLast ? 'Complete' : <span>Next <span className="text-base font-bold">→</span></span>}</button>
      </div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
