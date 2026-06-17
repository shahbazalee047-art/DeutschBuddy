import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Quiz({ content, onComplete }) {
  const [cur, setCur] = useState(0); const [sel, setSel] = useState(null); const [show, setShow] = useState(false); const [score, setScore] = useState(0);
  const qs = content.questions || [];
  if (!qs.length) return <Empty onComplete={onComplete} />;
  const q = qs[cur]; const isLast = cur === qs.length - 1;
  function pick(i) { if (show) return; setSel(i); setShow(true); if (i === q.correct) setScore(p => p + 1); setTimeout(() => { if (isLast) onComplete(); else { setCur(p => p + 1); setSel(null); setShow(false); } }, 1200); }
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-zinc-100 text-lg">❓ Quiz</h3><span className="text-sm font-bold text-lime-400">{score}/{qs.length}</span></div>
      <div className="progress-bar mb-5"><div className="progress-bar-fill" style={{ width: `${((cur + 1) / qs.length) * 100}%` }} /></div>
      <div className="glass-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-5"><p className="text-[16px] font-medium text-zinc-200 flex-1">{q.question}</p><SpeakerButton text={q.question.replace(/['"]/g, '')} size="sm" /></div>
        <div className="space-y-3">
          {q.options.map((opt, i) => { let s = 'bg-zinc-800 border-zinc-700 hover:border-lime-500/30'; if (show) { if (i === q.correct) s = 'bg-green-500/10 border-success text-green-400'; else if (i === sel) s = 'bg-error/10 border-error text-error'; else s = 'bg-zinc-800/50 border-zinc-700 opacity-40'; } else if (i === sel) s = 'bg-zinc-700 border-lime-500'; return (
            <button key={i} onClick={() => pick(i)} disabled={show} className={`w-full text-left p-4 rounded-2xl border transition-all active:scale-[0.98] ${s}`}>
              <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-xl bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400">{String.fromCharCode(65 + i)}</span><span className="text-[14px] text-zinc-300 font-medium">{opt}</span>{show && i === q.correct && <span className="ml-auto text-lg">✅</span>}{show && i === sel && i !== q.correct && <span className="ml-auto text-lg">❌</span>}</div>
            </button>
          );})}
        </div>
      </div>
      {show && <div className={`text-center p-3 rounded-2xl text-sm font-semibold text-zinc-900`} style={{ background: sel === q.correct ? '#22C55E' : '#F59E0B' }}>{sel === q.correct ? 'Richtig! 🎉' : 'Fast richtig! Almost there!'}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-zinc-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
