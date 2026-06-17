import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Vocabulary({ content, onComplete }) {
  const [studied, setStudied] = useState(new Set());
  const items = content.items || [];
  if (items.length === 0) return <Empty onComplete={onComplete} />;
  const toggle = (i) => setStudied(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const allStudied = studied.size === items.length;
  const gc = { der: { badge: 'bg-blue-400/10 text-blue-400 border border-blue-400/20', label: 'Der' }, die: { badge: 'bg-rose-400/10 text-rose-400 border border-rose-400/20', label: 'Die' }, das: { badge: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20', label: 'Das' } };
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-200 text-lg">📖 Vocabulary</h3><span className="text-sm text-slate-400">{studied.size}/{items.length}</span></div>
      <div className="space-y-2">
        {items.map((item, i) => { const g = item.gender ? gc[item.gender] : null; return (
          <button key={i} onClick={() => toggle(i)} className={`w-full text-left p-4 rounded-xl border transition-all ${studied.has(i) ? 'bg-lime-400/5 border-lime-400/20' : g ? `bg-slate-800/50 border-slate-700/50` : 'bg-slate-800 border-slate-700/50 hover:border-slate-600'}`}>
            <div className="flex items-center justify-between"><div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="font-bold text-slate-200">{item.german}</span><SpeakerButton text={item.german} size="sm" />{item.gender && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${g.badge}`}>{g.label}</span>}</div><p className="text-slate-300 text-sm mt-0.5">{item.english}</p>{item.pronunciation && <p className="text-xs text-slate-500 mt-0.5">🔊 {item.pronunciation}</p>}</div><span className="text-lg ml-2">{studied.has(i) ? '✅' : '⬜'}</span></div>
          </button>
        );})}
      </div>
      <div className="mt-5 text-center"><button onClick={onComplete} className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${allStudied ? 'bg-lime-400 text-slate-900 hover:bg-lime-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-lime-400/25' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700/50'}`}>{allStudied ? '🎉 All studied!' : `Complete (${studied.size}/${items.length})`}</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>; }
