import { useState } from 'react';
import { IconFeather, IconEdit } from './Icons';
export default function Writing({ content, onComplete }) {
  const [text, setText] = useState(''); const [done, setDone] = useState(false);
  function submit() { if (text.trim().length > 0) { setDone(true); onComplete(); } }
  return (
    <div className="fade-in reading-body">
      <h3 className="font-bold text-text-dark text-lg mb-5 flex items-center gap-2"><IconFeather className="w-5 h-5 text-gold" /> Writing Exercise</h3>
      <div className="paper-card p-5">
        <div className=" p-4 mb-4 border border-gold/20" style={{ background: 'rgba(232,163,61,0.05)' }}><p className="text-[11px] font-bold text-gold mb-1 uppercase flex items-center gap-1" style={{ letterSpacing: '0.5px' }}><IconEdit className="w-3.5 h-3.5" /> Task:</p><p className="text-[14px] text-text-body">{content.prompt}</p></div>
        {content.example && <div className="bg-bg-secondary  p-3 mb-4 border border-border"><p className="text-[10px] text-text-muted mb-1">Example:</p><p className="text-[12px] text-text-muted italic">"{content.example}"</p></div>}
        <textarea value={text} onChange={e => setText(e.target.value)} disabled={done} placeholder="Write your German text here..." rows={4} className="w-full px-4 py-3 paper-input resize-none" />
        {!done && <button onClick={submit} disabled={text.trim().length === 0} className="mt-4 btn-primary px-6 disabled:opacity-40 active:scale-95">Submit Writing</button>}
      </div>
      {done && <div className="text-center p-3  text-sm font-semibold text-text-on-dark mt-4 flex items-center justify-center gap-1.5" style={{ background: 'var(--gold)' }}><IconFeather className="w-4 h-4" /> Gut geschrieben! Keep practicing!</div>}
    </div>
  );
}
