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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-slate-200 text-lg">❓ Quiz</h3><span className="text-sm font-bold" style={{ color: '#FFCC00' }}>{score}/{qs.length}</span></div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-5"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${((cur + 1) / qs.length) * 100}%`, background: 'linear-gradient(to right, #FFCC00, #ffe066)' }} /></div>
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-5"><p className="text-base font-medium text-slate-200 flex-1">{q.question}</p><SpeakerButton text={q.question.replace(/['"]/g, '')} size="sm" /></div>
        <div className="space-y-2.5">
          {q.options.map((opt, i) => { let s = 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'; if (show) { if (i === q.correct) s = 'border-[#FFCC00]/30'; else if (i === sel) s = 'bg-red-500/10 border-red-500/30'; else s = 'bg-slate-900/50 border-slate-700/50 opacity-40'; } else if (i === sel) s = 'bg-slate-700 border-slate-600'; return (
            <button key={i} onClick={() => pick(i)} disabled={show} className={`w-full text-left p-3.5 rounded-xl border transition-all ${s}`}
              style={show && i === q.correct ? { background: 'rgba(255,204,0,0.1)', borderColor: 'rgba(255,204,0,0.3)' } : {}}>
              <div className="flex items-center gap-3"><span className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">{String.fromCharCode(65 + i)}</span><span className="text-sm text-slate-300">{opt}</span>{show && i === q.correct && <span className="ml-auto">✅</span>}{show && i === sel && i !== q.correct && <span className="ml-auto">❌</span>}</div>
            </button>
          );})}
        </div>
      </div>
      {show && <div className={`text-center p-3 rounded-xl text-sm font-medium ${sel === q.correct ? 'text-black' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`} style={sel === q.correct ? { background: '#FFCC00' } : {}}>{sel === q.correct ? 'Richtig! 🎉' : 'Fast richtig!'}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-black rounded-xl text-sm font-semibold transition" style={{ background: '#FFCC00' }}>Mark Complete</button></div>; }
