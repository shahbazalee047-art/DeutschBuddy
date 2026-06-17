import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Flashcards({ content, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState([]);
  const cards = content.cards || [];
  if (cards.length === 0) return <EmptyState onComplete={onComplete} />;
  const card = cards[idx];
  const isLast = idx === cards.length - 1;

  function handleNext() {
    setFlipped(false);
    if (isLast) onComplete();
    else { setDone(p => [...p, idx]); setIdx(p => p + 1); }
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-zinc-200 text-lg">🃏 Flashcards</h3>
        <span className="text-sm text-zinc-500">{idx + 1}/{cards.length}</span>
      </div>
      <div className="flex justify-center mb-4">
        {cards.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full mx-0.5 transition ${i === idx ? 'bg-lime-400' : done.includes(i) ? 'bg-cyan-400' : 'bg-zinc-700'}`} />
        ))}
      </div>
      <div onClick={() => setFlipped(!flipped)} className="relative w-full max-w-md mx-auto cursor-pointer" style={{ perspective: '1000px' }}>
        <div className="w-full min-h-[220px] rounded-2xl transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="absolute inset-0 w-full min-h-[220px] rounded-2xl bg-gradient-to-br from-lime-400 to-lime-500 flex flex-col items-center justify-center text-zinc-950 p-6"
            style={{ backfaceVisibility: 'hidden' }}>
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold">{card.front}</div>
              <SpeakerButton text={card.front} size="lg" className="bg-white/20 text-white hover:bg-white/30" />
            </div>
            <div className="text-sm text-lime-900/60 mt-4">Click to flip</div>
          </div>
          <div className="absolute inset-0 w-full min-h-[220px] rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xl font-bold text-zinc-200">{card.front}</div>
              <SpeakerButton text={card.front} size="sm" />
            </div>
            <div className="text-base text-cyan-400 mb-2">{card.back}</div>
            {card.example && <div className="text-xs text-zinc-500 italic mt-1 flex items-center gap-1">e.g., {card.example}<SpeakerButton text={card.example} size="sm" /></div>}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        <button onClick={() => { if (idx > 0) { setFlipped(false); setIdx(p => p - 1); } }} disabled={idx === 0}
          className="px-5 py-2 rounded-xl border border-zinc-700 text-zinc-400 hover:bg-zinc-800 disabled:opacity-40 transition text-sm">← Prev</button>
        <button onClick={handleNext} className="px-5 py-2 rounded-xl bg-lime-400 text-zinc-950 font-semibold hover:bg-lime-300 transition text-sm">
          {isLast ? '✓ Complete' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onComplete }) {
  return <div className="text-center py-12"><p className="text-zinc-500 mb-4">Content coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>;
}
