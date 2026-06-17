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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-zinc-100 text-lg">🔗 Matching</h3><span className="text-sm text-zinc-400">{matched.length}/{pairs.length}</span></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><h4 className="text-[11px] font-bold text-cyan-400 mb-2 text-center uppercase" style={{ letterSpacing: '0.5px' }}>🇩🇪 Deutsch</h4>
          {pairs.map((p, i) => (<button key={i} onClick={() => clickDE(i)} disabled={matched.includes(i)} className={`w-full p-3 rounded-xl border text-left text-sm transition-all active:scale-95 ${matched.includes(i) ? 'bg-lime-500/10 border-lime-500/20 text-lime-400' : sel === i ? 'bg-lime-500/10 border-lime-500 text-zinc-200' : 'glass-card text-zinc-300 hover:border-lime-500/30'}`}>
            <div className="flex items-center justify-between"><span className="font-medium">{p.german}</span><div className="flex items-center gap-1">{matched.includes(i) && <span>✅</span>}<SpeakerButton text={p.german} size="sm" /></div></div></button>))}
        </div>
        <div className="space-y-2"><h4 className="text-[11px] font-bold text-zinc-500 mb-2 text-center uppercase" style={{ letterSpacing: '0.5px' }}>🇬🇧 English</h4>
          {shuffled.map((p, i) => { const isMatched = matched.some(m => pairs[m].english === p.english); return (
            <button key={i} onClick={() => clickEN(p)} disabled={isMatched} className={`w-full p-3 rounded-xl border text-left text-sm transition-all active:scale-95 ${isMatched ? 'bg-lime-500/10 border-lime-500/20 text-lime-400' : 'glass-card text-zinc-300 hover:border-lime-500/30'}`}><span className="font-medium">{p.english}</span></button>
          );})}
        </div>
      </div>
      {matched.length === pairs.length && <div className="text-center mt-4 p-3 rounded-2xl font-bold text-sm text-zinc-900" style={{ background: 'linear-gradient(135deg, #A3E635, #06B6D4)' }}>🎉 All matched! Ausgezeichnet!</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-zinc-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
