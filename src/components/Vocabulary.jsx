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
      <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[#1a1a2e] text-lg">📖 Vocabulary</h3><span className="text-sm text-[#9ca3af]">{studied.size}/{items.length}</span></div>
      <div className="space-y-2">
        {items.map((item, i) => { const g = item.gender ? gc[item.gender] : null; return (
          <button key={i} onClick={() => toggle(i)} className={`w-full text-left p-4 rounded-xl border transition-all ${studied.has(i) ? 'border-[#8B6914]/20' : 'bg-white border-[#E8DFD4] hover:border-[#d4c9b8] hover:shadow-sm'}`}
            style={studied.has(i) ? { background: 'rgba(139,105,20,0.05)' } : {}}>
            <div className="flex items-center justify-between"><div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="font-bold text-[#1a1a2e]">{item.german}</span><SpeakerButton text={item.german} size="sm" />{item.gender && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${g.badge}`}>{g.label}</span>}</div><p className="text-[#4a5568] text-sm mt-0.5">{item.english}</p>{item.pronunciation && <p className="text-xs text-[#9ca3af] mt-0.5">🔊 {item.pronunciation}</p>}</div><span className="text-lg ml-2">{studied.has(i) ? '✅' : '⬜'}</span></div>
          </button>
        );})}
      </div>
      <div className="mt-5 text-center"><button onClick={onComplete} className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${allStudied ? 'text-white hover:scale-[1.02] hover:shadow-lg' : 'bg-[#F5EFE6] text-[#9ca3af] hover:bg-[#E8DFD4] border border-[#E8DFD4]'}`}
        style={allStudied ? { background: 'linear-gradient(135deg, #8B6914, #C4956A)', boxShadow: '0 4px 15px rgba(139,105,20,0.25)' } : {}}>{allStudied ? '🎉 All studied!' : `Complete (${studied.size}/${items.length})`}</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#9ca3af] mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-white rounded-xl text-sm font-semibold transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Mark Complete</button></div>; }
