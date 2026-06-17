import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Matching({ content, onComplete }) {
  const [sel, setSel] = useState(null); const [matched, setMatched] = useState([]); const [shuffled, setShuffled] = useState([]);
  const pairs = content.pairs || [];
  useEffect(() => { if (pairs.length) setShuffled([...pairs].sort(() => Math.random() - 0.5)); }, [pairs.length]);
  if (!pairs.length) return <Empty onComplete={onComplete} />;
  function clickDE(i) { if (!matched.includes(i)) setSel(i); }
  function clickEN(item) { if (sel === null) return; if (pairs[sel].english === item.english) { setMatched(p => [...p, sel]); setSel(null); if (matched.length + 1 === pairs.length) setTimeout(onComplete, 600); } else setSel(null); }
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-[#1A1A2E] text-lg">🔗 Matching</h3><span className="text-sm text-[#8A8A9A]">{matched.length}/{pairs.length}</span></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><h4 className="text-[11px] font-bold text-[#2D8B7A] mb-2 text-center uppercase" style={{ letterSpacing: '0.5px' }}>🇩🇪 Deutsch</h4>
          {pairs.map((p, i) => (<button key={i} onClick={() => clickDE(i)} disabled={matched.includes(i)} className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${matched.includes(i) ? 'bg-[#FFF8E1] border-[#B8860B]/20 text-[#B8860B]' : sel === i ? 'bg-[#FFF8E1] border-[#B8860B] text-[#1A1A2E]' : 'paper-card text-[#4A4A5A] hover:border-[#B8860B]/30'}`}>
            <div className="flex items-center justify-between"><span className="font-medium">{p.german}</span><div className="flex items-center gap-1">{matched.includes(i) && <span>✅</span>}<SpeakerButton text={p.german} size="sm" /></div></div></button>))}
        </div>
        <div className="space-y-2"><h4 className="text-[11px] font-bold text-[#8A8A9A] mb-2 text-center uppercase" style={{ letterSpacing: '0.5px' }}>🇬🇧 English</h4>
          {shuffled.map((p, i) => { const isMatched = matched.some(m => pairs[m].english === p.english); return (
            <button key={i} onClick={() => clickEN(p)} disabled={isMatched} className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${isMatched ? 'bg-[#FFF8E1] border-[#B8860B]/20 text-[#B8860B]' : 'paper-card text-[#4A4A5A] hover:border-[#B8860B]/30'}`}><span className="font-medium">{p.english}</span></button>
          );})}
        </div>
      </div>
      {matched.length === pairs.length && <div className="text-center mt-4 p-3 rounded-2xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }}>🎉 All matched! Ausgezeichnet!</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#8A8A9A] mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
