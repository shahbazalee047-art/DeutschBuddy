import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Vocabulary({ content, onComplete }) {
  const [studied, setStudied] = useState(new Set());
  const items = content.items || [];
  if (items.length === 0) return <Empty onComplete={onComplete} />;
  const toggle = (i) => setStudied(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const allStudied = studied.size === items.length;
  const gc = { der: { badge: 'text-blue-400 border-blue-500/20 bg-blue-500/10', label: 'Der' }, die: { badge: 'text-rose-400 border-rose-500/20 bg-rose-500/10', label: 'Die' }, das: { badge: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10', label: 'Das' } };
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-zinc-100 text-lg">📖 Vocabulary</h3><span className="text-sm text-zinc-400">{studied.size}/{items.length}</span></div>
      <div className="space-y-2">
        {items.map((item, i) => { const g = item.gender ? gc[item.gender] : null; return (
          <button key={i} onClick={() => toggle(i)} className={`w-full text-left glass-card p-4 transition-all hover:border-lime-500/20 active:scale-[0.99] ${studied.has(i) ? 'border-lime-500/20' : ''}`}
            style={studied.has(i) ? { background: 'rgba(163, 230, 53, 0.05)' } : {}}>
            <div className="flex items-center justify-between"><div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="font-bold text-zinc-100">{item.german}</span><SpeakerButton text={item.german} size="sm" />{item.gender && <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border ${g.badge}`}>{g.label}</span>}</div><p className="text-zinc-400 text-[14px] mt-0.5">{item.english}</p>{item.pronunciation && <p className="text-[12px] text-zinc-500 mt-0.5">🔊 {item.pronunciation}</p>}</div><span className="text-lg ml-2">{studied.has(i) ? '✅' : '⬜'}</span></div>
          </button>
        );})}
      </div>
      <div className="mt-5 text-center"><button onClick={onComplete} className={`px-6 py-3 rounded-2xl font-semibold text-[14px] transition-all active:scale-95 ${allStudied ? 'btn-primary' : 'btn-secondary'}`}>{allStudied ? '🎉 All studied!' : `Complete (${studied.size}/${items.length})`}</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-zinc-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
