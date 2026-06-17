import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function ListeningTask({ content, onComplete }) {
  const [ans, setAns] = useState({}); const [sub, setSub] = useState(false);
  const qs = content.questions || []; const clip = content.clip || {};
  if (!qs.length) return <Empty onComplete={onComplete} />;
  function score() { return qs.reduce((c, q, i) => c + (ans[i] === q.correct ? 1 : 0), 0); }
  return (
    <div className="fade-in">
      <h3 className="font-bold text-[#1a1a2e] text-lg mb-4">🎧 Listening</h3>
      {clip.title && <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(139,105,20,0.1)', border: '1px solid rgba(139,105,20,0.2)' }}><div className="flex items-center gap-3"><SpeakerButton text={clip.title} size="lg" /><div><p className="text-sm font-semibold text-[#1a1a2e]">{clip.title}</p><p className="text-xs text-[#6b7280]">{clip.source}</p></div></div>{clip.text && <p className="text-xs text-[#4a5568] mt-2 italic">{clip.text}</p>}</div>}
      <div className="space-y-3">{qs.map((q, i) => (<div key={i} className="bg-white border border-[#E8DFD4] rounded-2xl p-4 shadow-sm"><p className="text-sm font-medium text-[#1a1a2e] mb-3"><span className="font-bold mr-1" style={{ color: '#8B6914' }}>{i + 1}.</span>{q.question}</p><div className="space-y-2">{q.options.map((o, j) => { let s = 'bg-[#FAF5ED] border-[#E8DFD4] hover:border-[#d4c9b8]'; if (sub) { if (j === q.correct) s = 'border-[#8B6914]/30'; else if (ans[i] === j) s = 'bg-red-50 border-red-300'; else s = 'bg-[#FAF5ED] border-[#E8DFD4] opacity-40'; } else if (ans[i] === j) s = 'bg-[#E8DFD4] border-[#d4c9b8]'; return (<button key={j} onClick={() => !sub && setAns(p => ({ ...p, [i]: j }))} disabled={sub} className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${s}`}><span className="font-medium text-[#6b7280]">{String.fromCharCode(65 + j)}.</span> <span className="text-[#4a5568]">{o}</span></button>); })}</div></div>))}</div>
      <div className="mt-4 text-center">{!sub ? <button onClick={() => setSub(true)} disabled={Object.keys(ans).length < qs.length} className="px-5 py-2.5 text-white rounded-xl text-sm font-semibold hover:scale-[1.02] transition disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Check Answers</button> : <div className="slide-up"><p className="text-sm font-semibold text-[#4a5568] mb-2">Score: {score()}/{qs.length}</p><button onClick={onComplete} className="px-5 py-2.5 text-white rounded-xl text-sm font-semibold hover:scale-[1.02] transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Continue</button></div>}</div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#9ca3af] mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-white rounded-xl text-sm font-semibold transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Mark Complete</button></div>; }
