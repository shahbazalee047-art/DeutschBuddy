import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function ListeningTask({ content, onComplete }) {
  const [ans, setAns] = useState({}); const [sub, setSub] = useState(false);
  const qs = content.questions || []; const clip = content.clip || {};
  if (!qs.length) return <Empty onComplete={onComplete} />;
  function score() { return qs.reduce((c, q, i) => c + (ans[i] === q.correct ? 1 : 0), 0); }
  return (
    <div className="fade-in">
      <h3 className="font-bold text-[#1A1A2E] text-lg mb-4">🎧 Listening</h3>
      {clip.title && <div className="rounded-2xl p-4 mb-4" style={{ background: '#FFF8E1', border: '1px solid #B8860B20' }}><div className="flex items-center gap-3"><SpeakerButton text={clip.title} size="lg" /><div><p className="text-sm font-semibold text-[#1A1A2E]">{clip.title}</p><p className="text-[11px] text-[#8A8A9A]">{clip.source}</p></div></div>{clip.text && <p className="text-[12px] text-[#8A8A9A] mt-2 italic">{clip.text}</p>}</div>}
      <div className="space-y-3">{qs.map((q, i) => (<div key={i} className="paper-card p-4"><p className="text-[14px] font-medium text-[#1A1A2E] mb-3"><span className="font-bold mr-1" style={{ color: '#B8860B' }}>{i + 1}.</span>{q.question}</p><div className="space-y-2">{q.options.map((o, j) => { let s = 'bg-[#FAF6F0] border-[#E8E0D4] hover:border-[#B8860B]/30'; if (sub) { if (j === q.correct) s = 'bg-green-50 border-[#4CAF50]'; else if (ans[i] === j) s = 'bg-red-50 border-[#F44336]'; else s = 'bg-[#F5F5F5] border-[#E8E0D4] opacity-40'; } else if (ans[i] === j) s = 'bg-[#E8E0D4] border-[#B8860B]'; return (<button key={j} onClick={() => !sub && setAns(p => ({ ...p, [i]: j }))} disabled={sub} className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${s}`}><span className="font-medium text-[#8A8A9A]">{String.fromCharCode(65 + j)}.</span> <span className="text-[#4A4A5A]">{o}</span></button>); })}</div></div>))}</div>
      <div className="mt-4 text-center">{!sub ? <button onClick={() => setSub(true)} disabled={Object.keys(ans).length < qs.length} className="btn-primary px-6 disabled:opacity-40">Check Answers</button> : <div className="slide-up"><p className="text-sm font-semibold text-[#4A4A5A] mb-2">Score: {score()}/{qs.length}</p><button onClick={onComplete} className="btn-primary px-6">Continue</button></div>}</div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#8A8A9A] mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
