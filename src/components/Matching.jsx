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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-slate-200 text-lg">🔗 Matching</h3><span className="text-sm text-slate-400">{matched.length}/{pairs.length}</span></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2"><h4 className="text-xs font-bold mb-2 text-center uppercase tracking-wider" style={{ color: '#FFCC00' }}>🇩🇪 Deutsch</h4>
          {pairs.map((p, i) => (<button key={i} onClick={() => clickDE(i)} disabled={matched.includes(i)} className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${matched.includes(i) ? 'border-[#FFCC00]/20' : sel === i ? 'bg-red-500/10 border-red-500/30 text-slate-200' : 'bg-slate-800 border-slate-700/50 text-slate-300 hover:border-slate-600'}`}
            style={matched.includes(i) ? { background: 'rgba(255,204,0,0.1)' } : {}}>
            <div className="flex items-center justify-between"><span className="font-medium">{p.german}</span><div className="flex items-center gap-1">{matched.includes(i) && <span>✅</span>}<SpeakerButton text={p.german} size="sm" /></div></div></button>))}
        </div>
        <div className="space-y-2"><h4 className="text-xs font-bold mb-2 text-center uppercase tracking-wider" style={{ color: '#DD0000' }}>🇬🇧 English</h4>
          {shuffled.map((p, i) => { const isMatched = matched.some(m => pairs[m].english === p.english); return (
            <button key={i} onClick={() => clickEN(p)} disabled={isMatched} className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${isMatched ? 'border-[#FFCC00]/20' : 'bg-slate-800 border-slate-700/50 text-slate-300 hover:border-slate-600'}`}
              style={isMatched ? { background: 'rgba(255,204,0,0.1)' } : {}}><span className="font-medium">{p.english}</span></button>
          );})}
        </div>
      </div>
      {matched.length === pairs.length && <div className="text-center mt-4 p-3 rounded-xl font-bold text-sm text-black" style={{ background: '#FFCC00' }}>🎉 All matched!</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-black rounded-xl text-sm font-semibold transition" style={{ background: '#FFCC00' }}>Mark Complete</button></div>; }
