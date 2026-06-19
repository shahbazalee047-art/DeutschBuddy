import { useState } from 'react';
import { IconFeather, IconEdit } from './Icons';
export default function Writing({ content, onComplete }) {
  const [text, setText] = useState(''); const [done, setDone] = useState(false);
  function submit() { if (text.trim().length > 0) { setDone(true); onComplete(); } }
  return (
    <div className="fade-in">
      <h3 className="font-bold text-cream-100 text-lg mb-5 flex items-center gap-2"><IconFeather className="w-5 h-5 text-sage-400" /> Writing Exercise</h3>
      <div className="glass-card p-5">
        <div className="rounded-2xl p-4 mb-4 border border-sage-400/20" style={{ background: 'rgba(127, 176, 105, 0.05)' }}><p className="text-[11px] font-bold text-sage-400 mb-1 uppercase flex items-center gap-1" style={{ letterSpacing: '0.5px' }}><IconEdit className="w-3.5 h-3.5" /> Task:</p><p className="text-[14px] text-cream-300">{content.prompt}</p></div>
        {content.example && <div className="bg-forest-800 rounded-xl p-3 mb-4 border border-border"><p className="text-[10px] text-cream-500 mb-1">Example:</p><p className="text-[12px] text-cream-400 italic">"{content.example}"</p></div>}
        <textarea value={text} onChange={e => setText(e.target.value)} disabled={done} placeholder="Write your German text here..." rows={4} className="w-full px-4 py-3 paper-input resize-none" />
        {!done && <button onClick={submit} disabled={text.trim().length === 0} className="mt-4 btn-primary px-6 disabled:opacity-40 active:scale-95">Submit Writing</button>}
      </div>
      {done && <div className="text-center p-3 rounded-2xl text-sm font-semibold text-forest-900 mt-4 flex items-center justify-center gap-1.5" style={{ background: 'linear-gradient(135deg, #7FB069, #D4A574)' }}><IconFeather className="w-4 h-4" /> Gut geschrieben! Keep practicing!</div>}
    </div>
  );
}
