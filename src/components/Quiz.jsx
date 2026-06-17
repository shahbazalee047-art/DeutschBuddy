import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Quiz({ content, onComplete }) {
  const [cur, setCur] = useState(0); const [sel, setSel] = useState(null); const [show, setShow] = useState(false); const [score, setScore] = useState(0);
  const qs = content.questions || [];
  if (qs.length === 0) return <Empty onComplete={onComplete} />;
  const q = qs[cur]; const isLast = cur === qs.length - 1;
  function pick(i) { if (show) return; setSel(i); setShow(true); if (i === q.correct) setScore(p => p + 1); setTimeout(() => { if (isLast) onComplete(); else { setCur(p => p + 1); setSel(null); setShow(false); } }, 1200); }
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-slate-200 text-lg">❓ Quiz</h3><span className="text-sm font-bold text-lime-400">{score}/{qs.length}</span></div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-5"><div className="h-full bg-gradient-to-r from-lime-400 to-lime-300 rounded-full transition-all duration-300 shadow-lg shadow-lime-400/20" style={{ width: `${((cur + 1) / qs.length) * 100}%` }} /></div>
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-5"><p className="text-base font-medium text-slate-200 flex-1">{q.question}</p><SpeakerButton text={q.question.replace(/['"]/g, '')} size="sm" /></div>
        <div className="space-y-2.5">
          {q.options.map((opt, i) => { let s = 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'; if (show) { if (i === q.correct) s = 'bg-lime-400/10 border-lime-400/30'; else if (i === sel) s = 'bg-red-500/10 border-red-500/30'; else s = 'bg-slate-900/50 border-slate-700/50 opacity-40'; } else if (i === sel) s = 'bg-slate-700 border-slate-600'; return (
            <button key={i} onClick={() => pick(i)} disabled={show} className={`w-full text-left p-3.5 rounded-xl border transition-all ${s}`}>
              <div className="flex items-center gap-3"><span className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">{String.fromCharCode(65 + i)}</span><span className="text-sm text-slate-300">{opt}</span>{show && i === q.correct && <span className="ml-auto">✅</span>}{show && i === sel && i !== q.correct && <span className="ml-auto">❌</span>}</div>
            </button>
          );})}
        </div>
      </div>
      {show && <div className={`text-center p-3 rounded-xl text-sm font-medium ${sel === q.correct ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>{sel === q.correct ? 'Richtig! 🎉' : 'Fast richtig!'}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>; }
