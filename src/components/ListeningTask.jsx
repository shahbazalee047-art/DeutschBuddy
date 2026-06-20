import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconHeadphones } from './Icons';
export default function ListeningTask({ content, onComplete }) {
  const [ans, setAns] = useState({}); const [sub, setSub] = useState(false);
  const qs = content.questions || []; const clip = content.clip || {};
  if (!qs.length) return <Empty onComplete={onComplete} />;
  function score() { return qs.reduce((c, q, i) => c + (ans[i] === q.correct ? 1 : 0), 0); }
  return (
    <div className="fade-in">
      <h3 className="font-bold text-text-dark text-lg mb-4 flex items-center gap-2"><IconHeadphones className="w-5 h-5 text-gold" /> Listening</h3>
      {clip.title && <div className=" p-4 mb-4 border border-gold/20" style={{ background: 'rgba(196,146,74,0.05)' }}><div className="flex items-center gap-3"><SpeakerButton text={clip.title} size="lg" /><div><p className="text-sm font-semibold text-text-body">{clip.title}</p><p className="text-[11px] text-text-muted">{clip.source}</p></div></div>{clip.text && <p className="text-[12px] text-text-muted mt-2 italic">{clip.text}</p>}</div>}
      <div className="space-y-3">{qs.map((q, i) => (<div key={i} className="paper-card p-4"><p className="text-[14px] font-medium text-text-body mb-3"><span className="font-bold mr-1 text-gold">{i + 1}.</span>{q.question}</p><div className="space-y-2">{q.options.map((o, j) => { let s = 'bg-bg-secondary border-border hover:border-gold/30'; if (sub) { if (j === q.correct) s = 'bg-success/10 border-success text-success'; else if (ans[i] === j) s = 'bg-error/10 border-error text-error'; else s = 'bg-bg-secondary/50 border-border opacity-40'; } else if (ans[i] === j) s = 'bg-bg-secondary border-gold'; return (<button key={j} onClick={() => !sub && setAns(p => ({ ...p, [i]: j }))} disabled={sub} className={`w-full text-left p-3  border text-sm transition-all active:scale-[0.98] ${s}`}><span className="font-medium text-text-muted">{String.fromCharCode(65 + j)}.</span> <span className="text-text-body">{o}</span></button>); })}</div></div>))}</div>
      <div className="mt-4 text-center">{!sub ? <button onClick={() => setSub(true)} disabled={Object.keys(ans).length < qs.length} className="btn-primary px-6 disabled:opacity-40 active:scale-95">Check Answers</button> : <div className="slide-up"><p className="text-sm font-semibold text-text-body mb-2">Score: {score()}/{qs.length}</p><button onClick={onComplete} className="btn-primary px-6 active:scale-95">Continue</button></div>}</div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
