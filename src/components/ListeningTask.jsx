import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function ListeningTask({ content, onComplete }) {
  const [ans, setAns] = useState({}); const [sub, setSub] = useState(false);
  const qs = content.questions || []; const clip = content.clip || {};
  if (!qs.length) return <Empty onComplete={onComplete} />;
  function score() { return qs.reduce((c, q, i) => c + (ans[i] === q.correct ? 1 : 0), 0); }
  return (
    <div className="fade-in">
      <h3 className="font-bold text-slate-200 text-lg mb-4">🎧 Listening</h3>
      {clip.title && <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-xl p-4 mb-4"><div className="flex items-center gap-3"><SpeakerButton text={clip.title} size="lg" /><div><p className="text-sm font-semibold text-cyan-300">{clip.title}</p><p className="text-xs text-cyan-400/60">{clip.source}</p></div></div>{clip.text && <p className="text-xs text-slate-400 mt-2 italic">{clip.text}</p>}</div>}
      <div className="space-y-3">{qs.map((q, i) => (<div key={i} className="bg-slate-800 border border-slate-700/50 rounded-2xl p-4"><p className="text-sm font-medium text-slate-200 mb-3"><span className="text-lime-400 font-bold mr-1">{i + 1}.</span>{q.question}</p><div className="space-y-2">{q.options.map((o, j) => { let s = 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'; if (sub) { if (j === q.correct) s = 'bg-lime-400/10 border-lime-400/30'; else if (ans[i] === j) s = 'bg-red-500/10 border-red-500/30'; else s = 'bg-slate-900/50 border-slate-700/50 opacity-40'; } else if (ans[i] === j) s = 'bg-slate-700 border-slate-600'; return (<button key={j} onClick={() => !sub && setAns(p => ({ ...p, [i]: j }))} disabled={sub} className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${s}`}><span className="font-medium text-slate-400">{String.fromCharCode(65 + j)}.</span> <span className="text-slate-300">{o}</span></button>); })}</div></div>))}</div>
      <div className="mt-4 text-center">{!sub ? <button onClick={() => setSub(true)} disabled={Object.keys(ans).length < qs.length} className="px-5 py-2.5 bg-lime-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-lime-300 transition disabled:opacity-40">Check Answers</button> : <div className="slide-up"><p className="text-sm font-semibold text-slate-300 mb-2">Score: {score()}/{qs.length}</p><button onClick={onComplete} className="px-5 py-2.5 bg-lime-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Continue</button></div>}</div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>; }
