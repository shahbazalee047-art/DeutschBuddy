import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Matching({ content, onComplete }) {
  const [sel, setSel] = useState(null);
  const [matched, setMatched] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [tries, setTries] = useState(0);
  const pairs = content.pairs || [];

  useEffect(() => { if (pairs.length > 0) setShuffled([...pairs].sort(() => Math.random() - 0.5)); }, [pairs.length]);
  if (pairs.length === 0) return <EmptyState onComplete={onComplete} />;

  function handleClick(i) { if (!matched.includes(i)) setSel(i); }
  function handleEnClick(item) {
    if (sel === null) return;
    setTries(p => p + 1);
    if (pairs[sel].english === item.english) { setMatched(p => [...p, sel]); setSel(null); if (matched.length + 1 === pairs.length) setTimeout(onComplete, 600); }
    else { setSel(null); }
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-zinc-200 text-lg">🔗 Matching</h3>
        <span className="text-sm text-zinc-500">{matched.length}/{pairs.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-cyan-400 mb-2 text-center uppercase tracking-wider">🇩🇪 Deutsch</h4>
          {pairs.map((p, i) => (
            <button key={i} onClick={() => handleClick(i)} disabled={matched.includes(i)}
              className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${
                matched.includes(i) ? 'bg-lime-400/10 border-lime-400/20 text-lime-400' :
                sel === i ? 'bg-cyan-400/10 border-cyan-400/30 text-zinc-200' :
                'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}>
              <div className="flex items-center justify-between">
                <span className="font-medium">{p.german}</span>
                <div className="flex items-center gap-1">
                  {matched.includes(i) && <span>✅</span>}
                  <SpeakerButton text={p.german} size="sm" />
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-purple-400 mb-2 text-center uppercase tracking-wider">🇬🇧 English</h4>
          {shuffled.map((p, i) => {
            const isMatched = matched.some(m => pairs[m].english === p.english);
            return (
              <button key={i} onClick={() => handleEnClick(p)} disabled={isMatched}
                className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${
                  isMatched ? 'bg-lime-400/10 border-lime-400/20 text-lime-400' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}>
                <span className="font-medium">{p.english}</span>
              </button>
            );
          })}
        </div>
      </div>
      {matched.length === pairs.length && (
        <div className="text-center mt-4 p-3 bg-lime-400/10 border border-lime-400/20 rounded-xl text-lime-400 font-bold text-sm">🎉 All matched! Ausgezeichnet!</div>
      )}
    </div>
  );
}

function EmptyState({ onComplete }) {
  return <div className="text-center py-12"><p className="text-zinc-500 mb-4">Matching game coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>;
}
