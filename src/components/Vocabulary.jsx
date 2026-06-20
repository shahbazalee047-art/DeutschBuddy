import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconBookOpen, IconSpeaker, IconCheck, IconSquare, IconSparkles } from './Icons';
export default function Vocabulary({ content, onComplete }) {
  const [studied, setStudied] = useState(new Set());
  const items = content.items || [];
  if (items.length === 0) return <Empty onComplete={onComplete} />;
  const toggle = (i) => setStudied(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const allStudied = studied.size === items.length;
  const gc = { der: { badge: 'text-blue-400 border-blue-500/20 bg-blue-500/10', label: 'Der' }, die: { badge: 'text-rose-400 border-rose-500/20 bg-rose-500/10', label: 'Die' }, das: { badge: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10', label: 'Das' } };
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-text-dark text-lg flex items-center gap-2"><IconBookOpen className="w-5 h-5 text-gold" /> Vocabulary</h3><span className="text-sm text-text-muted">{studied.size}/{items.length}</span></div>
      <div className="space-y-2">
        {items.map((item, i) => { const g = item.gender ? gc[item.gender] : null; return (
          <button key={i} onClick={() => toggle(i)} className={`w-full text-left paper-card p-4 transition-all hover:border-gold/20 active:scale-[0.99] ${studied.has(i) ? 'border-gold/20' : ''}`}
            style={studied.has(i) ? { background: 'rgba(196,146,74,0.05)' } : {}}>
            <div className="flex items-center justify-between"><div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="font-bold text-text-dark">{item.german}</span><SpeakerButton text={item.german} size="sm" />{item.gender && <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border ${g.badge}`}>{g.label}</span>}</div><p className="text-text-muted text-[14px] mt-0.5">{item.english}</p>{item.pronunciation && <p className="text-[12px] text-text-muted mt-0.5 flex items-center gap-1"><IconSpeaker className="w-3.5 h-3.5 text-text-muted" /> {item.pronunciation}</p>}</div><span className="ml-2">{studied.has(i) ? <IconCheck className="w-5 h-5 text-success" /> : <IconSquare className="w-5 h-5 text-text-muted" />}</span></div>
          </button>
        );})}
      </div>
      <div className="mt-5 text-center"><button onClick={onComplete} className={`px-6 py-3  font-semibold text-[14px] transition-all active:scale-95 ${allStudied ? 'btn-primary' : 'btn-secondary'}`}>{allStudied ? <span className="flex items-center justify-center gap-1.5"><IconSparkles className="w-4 h-4" /> All studied!</span> : `Complete (${studied.size}/${items.length})`}</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
