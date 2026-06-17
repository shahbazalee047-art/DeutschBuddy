import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function ListeningTask({ content, onComplete }) {
  const [ans, setAns] = useState({}); const [sub, setSub] = useState(false);
  const qs = content.questions || []; const clip = content.clip || {};
  if (!qs.length) return <Empty onComplete={onComplete} />;
  function score() { return qs.reduce((c, q, i) => c + (ans[i] === q.correct ? 1 : 0), 0); }
  return (
    <div className="fade-in">
      <h3 className="font-bold text-zinc-100 text-lg mb-4">🎧 Listening</h3>
      {clip.title && <div className="rounded-2xl p-4 mb-4 border border-cyan-500/20" style={{ background: 'rgba(6, 182, 212, 0.05)' }}><div className="flex items-center gap-3"><SpeakerButton text={clip.title} size="lg" /><div><p className="text-sm font-semibold text-zinc-200">{clip.title}</p><p className="text-[11px] text-zinc-500">{clip.source}</p></div></div>{clip.text && <p className="text-[12px] text-zinc-400 mt-2 italic">{clip.text}</p>}</div>}
      <div className="space-y-3">{qs.map((q, i) => (<div key={i} className="glass-card p-4"><p className="text-[14px] font-medium text-zinc-200 mb-3"><span className="font-bold mr-1 text-lime-400">{i + 1}.</span>{q.question}</p><div className="space-y-2">{q.options.map((o, j) => { let s = 'bg-zinc-800 border-zinc-700 hover:border-lime-500/30'; if (sub) { if (j === q.correct) s = 'bg-green-500/10 border-success text-green-400'; else if (ans[i] === j) s = 'bg-error/10 border-error text-error'; else s = 'bg-zinc-800/50 border-zinc-700 opacity-40'; } else if (ans[i] === j) s = 'bg-zinc-700 border-lime-500'; return (<button key={j} onClick={() => !sub && setAns(p => ({ ...p, [i]: j }))} disabled={sub} className={`w-full text-left p-3 rounded-xl border text-sm transition-all active:scale-[0.98] ${s}`}><span className="font-medium text-zinc-500">{String.fromCharCode(65 + j)}.</span> <span className="text-zinc-300">{o}</span></button>); })}</div></div>))}</div>
      <div className="mt-4 text-center">{!sub ? <button onClick={() => setSub(true)} disabled={Object.keys(ans).length < qs.length} className="btn-primary px-6 disabled:opacity-40 active:scale-95">Check Answers</button> : <div className="slide-up"><p className="text-sm font-semibold text-zinc-300 mb-2">Score: {score()}/{qs.length}</p><button onClick={onComplete} className="btn-primary px-6 active:scale-95">Continue</button></div>}</div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-zinc-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
