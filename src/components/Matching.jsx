import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Matching({ content, onComplete }) {
  const [selectedGerman, setSelectedGerman] = useState(null);
  const [matched, setMatched] = useState([]);
  const [shuffledEnglish, setShuffledEnglish] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const pairs = content.pairs || [];

  useEffect(() => { if (pairs.length > 0) setShuffledEnglish([...pairs].sort(() => Math.random() - 0.5)); }, [pairs.length]);
  if (pairs.length === 0) return <EmptyState onComplete={onComplete} />;

  function handleGermanClick(i) { if (!matched.includes(i)) setSelectedGerman(i); }
  function handleEnglishClick(item) {
    if (selectedGerman === null) return;
    setAttempts(prev => prev + 1);
    if (pairs[selectedGerman].english === item.english) {
      setMatched(prev => [...prev, selectedGerman]);
      setSelectedGerman(null);
      if (matched.length + 1 === pairs.length) setTimeout(() => onComplete(), 600);
    } else { setSelectedGerman(null); }
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-200 text-lg">🔗 Matching Game</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">{matched.length}/{pairs.length}</span>
          <span className="text-sm text-slate-600">{attempts} tries</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-blue-400 mb-2 text-center uppercase tracking-wider">🇩🇪 Deutsch</h4>
          {pairs.map((pair, i) => {
            const isMatched = matched.includes(i);
            const isSelected = selectedGerman === i;
            return (
              <button key={`de-${i}`} onClick={() => handleGermanClick(i)} disabled={isMatched}
                className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${isMatched ? 'bg-green-500/10 border-green-500/20 text-green-400' : isSelected ? 'bg-blue-500/10 border-blue-500/30 text-slate-200 shadow-lg shadow-blue-500/10' : 'glass-card-sm hover:border-slate-600/50 text-slate-300'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{pair.german}</span>
                  <div className="flex items-center gap-1">
                    {isMatched && <span>✅</span>}
                    <SpeakerButton text={pair.german} size="sm" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-rose-400 mb-2 text-center uppercase tracking-wider">🇬🇧 English</h4>
          {shuffledEnglish.map((pair, i) => {
            const isMatched = matched.some(m => pairs[m].english === pair.english);
            return (
              <button key={`en-${i}`} onClick={() => handleEnglishClick(pair)} disabled={isMatched}
                className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${isMatched ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'glass-card-sm hover:border-rose-500/30 text-slate-300'}`}>
                <span className="font-medium">{pair.english}</span>
                {isMatched && <span className="ml-2">✅</span>}
              </button>
            );
          })}
        </div>
      </div>
      {matched.length === pairs.length && (
        <div className="text-center mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 font-bold text-sm">🎉 All matched! Ausgezeichnet!</div>
      )}
    </div>
  );
}

function EmptyState({ onComplete }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">🚧</div>
      <p className="text-slate-500 mb-4">Matching game coming soon!</p>
      <button onClick={onComplete} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Mark as Complete</button>
    </div>
  );
}
