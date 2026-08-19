import { useState } from 'react';
import { IconFeather, IconEdit } from './Icons';
export default function Writing({ content, onComplete }) {
  const [text, setText] = useState(''); const [done, setDone] = useState(false);
  function submit() { if (text.trim().length > 0) { setDone(true); onComplete({ score: 1, maxScore: 1 }); } }
  return (
    <div className="fade-in reading-body">
      <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-text-dark"><IconFeather className="h-5 w-5 text-primary" /> Writing Exercise</h3>
      <div className="paper-card p-5">
        <div className="mb-4 border border-primary/20 bg-primary-light p-4"><p className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase text-primary" style={{ letterSpacing: '0.5px' }}><IconEdit className="h-3.5 w-3.5" /> Task:</p><p className="text-[14px] text-text-body">{content.prompt}</p></div>
        {content.example && <div className="bg-bg-secondary  p-3 mb-4 border border-border"><p className="text-[10px] text-text-muted mb-1">Example:</p><p className="text-[12px] text-text-muted italic">"{content.example}"</p></div>}
        <textarea value={text} onChange={e => setText(e.target.value)} disabled={done} placeholder="Write your German text here..." rows={4} autoComplete="off" autoCorrect="off" spellCheck={false} autoCapitalize="off" className="w-full px-4 py-3 paper-input resize-none" />
        {!done && <button onClick={submit} disabled={text.trim().length === 0} className="mt-4 btn-primary px-6 disabled:opacity-40 active:scale-95">Submit Writing</button>}
      </div>
      {done && <div className="mt-4 flex items-center justify-center gap-1.5 bg-success p-3 text-center text-sm font-semibold text-white"><IconFeather className="h-4 w-4" /> Gut geschrieben! Keep practicing!</div>}
    </div>
  );
}
