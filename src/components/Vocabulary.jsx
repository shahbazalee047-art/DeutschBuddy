import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Vocabulary({ content, onComplete }) {
  const [studied, setStudied] = useState(new Set());
  const [showAll, setShowAll] = useState(true);
  const items = content.items || [];
  if (items.length === 0) return <EmptyState onComplete={onComplete} />;

  const toggleStudied = (index) => {
    setStudied(prev => { const next = new Set(prev); if (next.has(index)) next.delete(index); else next.add(index); return next; });
  };
  const allStudied = studied.size === items.length;

  const gc = {
    der: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', label: 'Der (masc.)' },
    die: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20', label: 'Die (fem.)' },
    das: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', label: 'Das (neut.)' },
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-200 text-lg">📖 Vocabulary</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{studied.size}/{items.length}</span>
          <button onClick={() => setShowAll(!showAll)} className="text-xs text-blue-400 hover:text-blue-300 font-medium">{showAll ? 'Show unmarked' : 'Show all'}</button>
        </div>
      </div>
      <div className="space-y-2">
        {(showAll ? items : items.filter((_, i) => !studied.has(i))).map((item, i) => {
          const idx = items.indexOf(item);
          const g = item.gender ? gc[item.gender] : null;
          return (
            <button key={idx} onClick={() => toggleStudied(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                studied.has(idx) ? 'bg-green-500/5 border-green-500/20' : g ? `${g.bg} ${g.border}` : 'glass-card-sm hover:border-slate-600/50'
              }`}>
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-200">{item.german}</span>
                    <SpeakerButton text={item.german} size="sm" />
                    {item.gender && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${g.badge}`}>{g.label}</span>}
                  </div>
                  <p className="text-slate-400 text-sm mt-0.5">{item.english}</p>
                  {item.note && <p className="text-xs text-slate-500 mt-0.5">{item.note}</p>}
                  {item.pronunciation && <p className="text-xs text-slate-500 mt-0.5">🔊 {item.pronunciation}</p>}
                </div>
                <span className="text-lg ml-2">{studied.has(idx) ? '✅' : '⬜'}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-5 text-center">
        <button onClick={onComplete} className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition ${allStudied ? 'bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-500/20' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-700/50'}`}>
          {allStudied ? '🎉 All studied! Complete' : `Mark as Complete (${studied.size}/${items.length})`}
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
