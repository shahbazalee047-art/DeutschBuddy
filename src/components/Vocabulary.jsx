import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Vocabulary({ content, onComplete }) {
  const [studied, setStudied] = useState(new Set());
  const items = content.items || [];
  if (items.length === 0) return <Empty onComplete={onComplete} />;
  const toggle = (i) => setStudied(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const allStudied = studied.size === items.length;
  const gc = { der: { badge: 'bg-blue-50 text-blue-700 border border-blue-200', label: 'Der' }, die: { badge: 'bg-rose-50 text-rose-700 border border-rose-200', label: 'Die' }, das: { badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200', label: 'Das' } };
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[#1A1A2E] text-lg">📖 Vocabulary</h3><span className="text-sm text-[#8A8A9A]">{studied.size}/{items.length}</span></div>
      <div className="space-y-2">
        {items.map((item, i) => { const g = item.gender ? gc[item.gender] : null; return (
          <button key={i} onClick={() => toggle(i)} className={`w-full text-left paper-card p-4 transition-all hover:shadow-md ${studied.has(i) ? 'border-[#B8860B]/20' : ''}`}
            style={studied.has(i) ? { background: '#FFF8E1' } : {}}>
            <div className="flex items-center justify-between"><div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="font-bold text-[#1A1A2E]">{item.german}</span><SpeakerButton text={item.german} size="sm" />{item.gender && <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${g.badge}`}>{g.label}</span>}</div><p className="text-[#4A4A5A] text-[14px] mt-0.5">{item.english}</p>{item.pronunciation && <p className="text-[12px] text-[#8A8A9A] mt-0.5">🔊 {item.pronunciation}</p>}</div><span className="text-lg ml-2">{studied.has(i) ? '✅' : '⬜'}</span></div>
          </button>
        );})}
      </div>
      <div className="mt-5 text-center"><button onClick={onComplete} className={`px-6 py-3 rounded-2xl font-semibold text-[14px] transition-all ${allStudied ? 'btn-primary' : 'btn-secondary'}`}>{allStudied ? '🎉 All studied!' : `Complete (${studied.size}/${items.length})`}</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#8A8A9A] mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
