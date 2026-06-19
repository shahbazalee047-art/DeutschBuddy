import { useState, useEffect, useMemo } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconLink, IconCheck, IconFlag, IconMessageCircle, IconSparkles } from './Icons';
export default function Matching({ content, onComplete }) {
  const [sel, setSel] = useState(null); const [matched, setMatched] = useState([]); const [shuffled, setShuffled] = useState([]);
  const pairs = useMemo(() => content.pairs || [], [content.pairs]);
  useEffect(() => { if (pairs.length) setShuffled([...pairs].sort(() => Math.random() - 0.5)); }, [pairs]);
  if (!pairs.length) return <Empty onComplete={onComplete} />;
  function clickDE(i) { if (!matched.includes(i)) setSel(i); }
  function clickEN(item) { if (sel === null) return; if (pairs[sel].english === item.english) { setMatched(p => [...p, sel]); setSel(null); if (matched.length + 1 === pairs.length) setTimeout(onComplete, 600); } else setSel(null); }
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-cream-100 text-lg flex items-center gap-2"><IconLink className="w-5 h-5 text-sage-400" /> Matching</h3><span className="text-sm text-cream-400">{matched.length}/{pairs.length}</span></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><h4 className="text-[11px] font-bold text-sky-400 mb-2 text-center uppercase flex items-center justify-center gap-1" style={{ letterSpacing: '0.5px' }}><IconFlag className="w-3.5 h-3.5" /> Deutsch</h4>
          {pairs.map((p, i) => (<button key={i} onClick={() => clickDE(i)} disabled={matched.includes(i)} className={`w-full p-3 rounded-xl border text-left text-sm transition-all active:scale-95 ${matched.includes(i) ? 'bg-sage-400/10 border-sage-400/20 text-sage-400' : sel === i ? 'bg-sage-400/10 border-sage-400 text-cream-200' : 'glass-card text-cream-300 hover:border-sage-400/30'}`}>
            <div className="flex items-center justify-between"><span className="font-medium">{p.german}</span><div className="flex items-center gap-1">{matched.includes(i) && <IconCheck className="w-4 h-4 text-sage-400" />}<SpeakerButton text={p.german} size="sm" /></div></div></button>))}
        </div>
        <div className="space-y-2"><h4 className="text-[11px] font-bold text-cream-500 mb-2 text-center uppercase flex items-center justify-center gap-1" style={{ letterSpacing: '0.5px' }}><IconMessageCircle className="w-3.5 h-3.5" /> English</h4>
          {shuffled.map((p, i) => { const isMatched = matched.some(m => pairs[m].english === p.english); return (
            <button key={i} onClick={() => clickEN(p)} disabled={isMatched} className={`w-full p-3 rounded-xl border text-left text-sm transition-all active:scale-95 ${isMatched ? 'bg-sage-400/10 border-sage-400/20 text-sage-400' : 'glass-card text-cream-300 hover:border-sage-400/30'}`}><span className="font-medium">{p.english}</span></button>
          );})}
        </div>
      </div>
      {matched.length === pairs.length && <div className="text-center mt-4 p-3 rounded-2xl font-bold text-sm text-forest-900 flex items-center justify-center gap-1.5" style={{ background: 'linear-gradient(135deg, #7FB069, #D4A574)' }}><IconSparkles className="w-4 h-4" /> All matched! Ausgezeichnet!</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-cream-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
