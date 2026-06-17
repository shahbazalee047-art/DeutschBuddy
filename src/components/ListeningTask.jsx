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
      {clip.title && <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,204,0,0.1)', border: '1px solid rgba(255,204,0,0.2)' }}><div className="flex items-center gap-3"><SpeakerButton text={clip.title} size="lg" /><div><p className="text-sm font-semibold text-slate-200">{clip.title}</p><p className="text-xs text-slate-400">{clip.source}</p></div></div>{clip.text && <p className="text-xs text-slate-400 mt-2 italic">{clip.text}</p>}</div>}
      <div className="space-y-3">{qs.map((q, i) => (<div key={i} className="bg-slate-800 border border-slate-700/50 rounded-2xl p-4"><p className="text-sm font-medium text-slate-200 mb-3"><span className="font-bold mr-1" style={{ color: '#FFCC00' }}>{i + 1}.</span>{q.question}</p><div className="space-y-2">{q.options.map((o, j) => { let s = 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'; if (sub) { if (j === q.correct) s = 'border-[#FFCC00]/30'; else if (ans[i] === j) s = 'bg-red-500/10 border-red-500/30'; else s = 'bg-slate-900/50 border-slate-700/50 opacity-40'; } else if (ans[i] === j) s = 'bg-slate-700 border-slate-600'; return (<button key={j} onClick={() => !sub && setAns(p => ({ ...p, [i]: j }))} disabled={sub} className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${s}`}><span className="font-medium text-slate-400">{String.fromCharCode(65 + j)}.</span> <span className="text-slate-300">{o}</span></button>); })}</div></div>))}</div>
      <div className="mt-4 text-center">{!sub ? <button onClick={() => setSub(true)} disabled={Object.keys(ans).length < qs.length} className="px-5 py-2.5 text-black rounded-xl text-sm font-semibold hover:scale-[1.02] transition disabled:opacity-40" style={{ background: '#FFCC00' }}>Check Answers</button> : <div className="slide-up"><p className="text-sm font-semibold text-slate-300 mb-2">Score: {score()}/{qs.length}</p><button onClick={onComplete} className="px-5 py-2.5 text-black rounded-xl text-sm font-semibold hover:scale-[1.02] transition" style={{ background: '#FFCC00' }}>Continue</button></div>}</div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-black rounded-xl text-sm font-semibold transition" style={{ background: '#FFCC00' }}>Mark Complete</button></div>; }
