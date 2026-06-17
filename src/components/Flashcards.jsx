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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-[#1A1A2E] text-lg">🃏 Flashcards</h3><span className="text-sm text-[#8A8A9A]">{idx + 1}/{cards.length}</span></div>
      <div className="flex justify-center mb-4">{cards.map((_, i) => (<div key={i} className={`w-2.5 h-2.5 rounded-full mx-0.5 transition ${i === idx ? 'bg-[#B8860B]' : done.includes(i) ? 'bg-[#4CAF50]' : 'bg-[#E8E0D4]'}`} />))}</div>
      <div onClick={() => setFlipped(!flipped)} className="relative w-full max-w-md mx-auto cursor-pointer" style={{ perspective: '1000px' }}>
        <div className="w-full min-h-[240px] rounded-3xl transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="absolute inset-0 w-full min-h-[240px] rounded-3xl flex flex-col items-center justify-center text-white p-6" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)', backfaceVisibility: 'hidden', boxShadow: '0 8px 32px rgba(184, 134, 11, 0.3)' }}>
            <div className="flex items-center gap-3"><div className="text-4xl font-bold">{card.front}</div><SpeakerButton text={card.front} size="lg" className="bg-white/20 text-white hover:bg-white/30" /></div>
            <div className="text-sm mt-4 text-white/60">Click to flip</div>
          </div>
          <div className="absolute inset-0 w-full min-h-[240px] rounded-3xl paper-card flex flex-col items-center justify-center p-6" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="flex items-center gap-2 mb-2"><div className="text-xl font-bold text-[#1A1A2E]">{card.front}</div><SpeakerButton text={card.front} size="sm" /></div>
            <div className="text-base mb-2 font-medium" style={{ color: '#2D8B7A' }}>{card.back}</div>
            {card.example && <div className="text-xs text-[#8A8A9A] italic mt-1 flex items-center gap-1">e.g., {card.example}<SpeakerButton text={card.example} size="sm" /></div>}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        <button onClick={() => { if (idx > 0) { setFlipped(false); setIdx(p => p - 1); } }} disabled={idx === 0} className="px-6 py-2.5 rounded-xl border border-[#E8E0D4] text-[#8A8A9A] hover:bg-[#F5F5F5] disabled:opacity-40 transition text-sm">← Prev</button>
        <button onClick={next} className="btn-primary px-6">{isLast ? '✓ Complete' : 'Next →'}</button>
      </div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#8A8A9A] mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
