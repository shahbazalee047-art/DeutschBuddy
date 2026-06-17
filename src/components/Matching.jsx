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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-[#1a1a2e] text-lg">🔗 Matching</h3><span className="text-sm text-[#9ca3af]">{matched.length}/{pairs.length}</span></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2"><h4 className="text-xs font-bold mb-2 text-center uppercase tracking-wider" style={{ color: '#5B8C7A' }}>🇩🇪 Deutsch</h4>
          {pairs.map((p, i) => (<button key={i} onClick={() => clickDE(i)} disabled={matched.includes(i)} className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${matched.includes(i) ? 'border-[#8B6914]/20' : sel === i ? 'bg-[#5B8C7A]/10 border-[#5B8C7A]/30 text-[#1a1a2e]' : 'bg-white border-[#E8DFD4] text-[#4a5568] hover:border-[#d4c9b8]'}`}
            style={matched.includes(i) ? { background: 'rgba(139,105,20,0.1)' } : {}}>
            <div className="flex items-center justify-between"><span className="font-medium">{p.german}</span><div className="flex items-center gap-1">{matched.includes(i) && <span>✅</span>}<SpeakerButton text={p.german} size="sm" /></div></div></button>))}
        </div>
        <div className="space-y-2"><h4 className="text-xs font-bold mb-2 text-center uppercase tracking-wider" style={{ color: '#C4956A' }}>🇬🇧 English</h4>
          {shuffled.map((p, i) => { const isMatched = matched.some(m => pairs[m].english === p.english); return (
            <button key={i} onClick={() => clickEN(p)} disabled={isMatched} className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${isMatched ? 'border-[#8B6914]/20' : 'bg-white border-[#E8DFD4] text-[#4a5568] hover:border-[#d4c9b8]'}`}
              style={isMatched ? { background: 'rgba(139,105,20,0.1)' } : {}}><span className="font-medium">{p.english}</span></button>
          );})}
        </div>
      </div>
      {matched.length === pairs.length && <div className="text-center mt-4 p-3 rounded-xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>🎉 All matched!</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#9ca3af] mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-white rounded-xl text-sm font-semibold transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Mark Complete</button></div>; }
