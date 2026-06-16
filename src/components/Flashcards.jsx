import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Flashcards({ content, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState([]);
  const cards = content.cards || [];
  if (cards.length === 0) return <EmptyState onComplete={onComplete} />;

  const card = cards[currentIndex];
  const isLast = currentIndex === cards.length - 1;

  function handleNext() {
    setFlipped(false);
    if (isLast) onComplete();
    else { setCompletedCards(prev => [...prev, currentIndex]); setCurrentIndex(prev => prev + 1); }
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-200 text-lg">🃏 Flashcards</h3>
        <span className="text-sm text-slate-500">{currentIndex + 1}/{cards.length}</span>
      </div>
      <div className="flex justify-center mb-4">
        {cards.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full mx-0.5 transition ${i === currentIndex ? 'bg-blue-500' : completedCards.includes(i) ? 'bg-green-500' : 'bg-slate-700'}`} />
        ))}
      </div>
      <div onClick={() => setFlipped(!flipped)} className="relative w-full max-w-md mx-auto cursor-pointer" style={{ perspective: '1000px' }}>
        <div className="w-full min-h-[220px] rounded-2xl transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="absolute inset-0 w-full min-h-[220px] rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col items-center justify-center text-white p-6 border border-blue-500/30"
            style={{ backfaceVisibility: 'hidden' }}>
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold">{card.front}</div>
              <SpeakerButton text={card.front} size="lg" className="bg-white/10 text-white hover:bg-white/20" />
            </div>
            <div className="text-xs text-blue-200 mt-4">Click to flip</div>
          </div>
          <div className="absolute inset-0 w-full min-h-[220px] rounded-2xl glass-card flex flex-col items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xl font-bold text-slate-200">{card.front}</div>
              <SpeakerButton text={card.front} size="sm" />
            </div>
            <div className="text-base text-blue-400 mb-2">{card.back}</div>
            {card.example && (
              <div className="text-xs text-slate-500 italic mt-1 flex items-center gap-1">
                e.g., {card.example}
                <SpeakerButton text={card.example} size="sm" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        <button onClick={() => { if (currentIndex > 0) { setFlipped(false); setCurrentIndex(prev => prev - 1); } }}
          disabled={currentIndex === 0}
          className="px-5 py-2 rounded-xl border border-slate-700/50 text-slate-400 hover:bg-slate-800/50 disabled:opacity-40 transition text-sm">← Prev</button>
        <button onClick={handleNext} className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition text-sm shadow-lg shadow-blue-500/20">
          {isLast ? '✓ Complete' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onComplete }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">🚧</div>
      <p className="text-slate-500 mb-4">Content coming soon!</p>
      <button onClick={onComplete} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Mark as Complete</button>
    </div>
  );
}
