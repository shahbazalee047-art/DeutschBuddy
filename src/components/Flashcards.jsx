import { useState, useRef } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconCards } from './Icons';
export default function Flashcards({ content, onComplete }) {
  const [idx, setIdx] = useState(0); const [flipped, setFlipped] = useState(false); const [done, setDone] = useState([]);
  // Double-tap on Next must not skip a card: lock until the flip resets.
  const advanceLockRef = useRef(false);
  const cards = content.cards || [];
  if (!cards.length) return <Empty onComplete={onComplete} />;
  const card = cards[idx]; const isLast = idx === cards.length - 1;
  function next() {
    if (advanceLockRef.current) return;
    advanceLockRef.current = true;
    setTimeout(() => { advanceLockRef.current = false; }, 350);
    setFlipped(false); if (isLast) onComplete({ score: cards.length, maxScore: cards.length }); else { setDone(p => [...p, idx]); setIdx(p => p + 1); }
  }
  return (
    <div className="fade-in reading-body">
      <div className="mb-5 flex items-center justify-between"><h3 className="flex items-center gap-2 text-lg font-bold text-text-dark"><IconCards className="h-5 w-5 text-primary" /> Flashcards</h3><span className="text-sm text-text-muted">{idx + 1}/{cards.length}</span></div>
      <div className="mb-4 flex justify-center">{cards.map((_, i) => (<div key={i} className={`mx-0.5 h-2.5 w-2.5 rounded-full transition ${i === idx ? 'bg-primary' : done.includes(i) ? 'bg-success' : 'bg-bg-secondary'}`} />))}</div>
      <div
        onClick={() => setFlipped(!flipped)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(!flipped); } }}
        role="button"
        tabIndex={0}
        aria-label={flipped ? `Flashcard back: ${card.back}. Press to flip.` : `Flashcard: ${card.front}. Press to flip.`}
        aria-pressed={flipped}
        className="relative mx-auto w-full max-w-md cursor-pointer rounded-[var(--radius-card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        style={{ perspective: '1000px' }}
      >
        <div className="w-full min-h-[240px]  transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="absolute inset-0 flex min-h-[240px] w-full flex-col items-center justify-center rounded-[var(--radius-card)] border bg-surface p-6" style={{ borderColor: 'var(--border-default)', backfaceVisibility: 'hidden', boxShadow: 'var(--db-shadow-card)' }}>
            <div className="flex items-center gap-3"><div className="text-4xl font-bold text-text-dark">{card.front}</div><SpeakerButton text={card.front} size="lg" /></div>
            <div className="mt-4 text-sm text-text-muted">Press to flip</div>
          </div>
          <div className="absolute inset-0 flex min-h-[240px] w-full flex-col items-center justify-center rounded-[var(--radius-card)] border bg-surface p-6" style={{ borderColor: 'var(--border-default)', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="mb-2 flex items-center gap-2"><div className="text-xl font-bold text-text-dark">{card.front}</div><SpeakerButton text={card.front} size="sm" /></div>
            <div className="mb-2 text-base font-medium text-primary">{card.back}</div>
            {card.example && <div className="mt-1 flex items-center gap-1 text-xs italic text-text-muted">e.g., {card.example}<SpeakerButton text={card.example} size="sm" /></div>}
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
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={() => onComplete({ score: 1, maxScore: 1 })} className="btn-primary px-6">Mark Complete</button></div>; }
