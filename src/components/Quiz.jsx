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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-[#1a1a2e] text-lg">❓ Quiz</h3><span className="text-sm font-bold" style={{ color: '#8B6914' }}>{score}/{qs.length}</span></div>
      <div className="w-full h-2 bg-[#E8DFD4] rounded-full overflow-hidden mb-5"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${((cur + 1) / qs.length) * 100}%`, background: 'linear-gradient(to right, #8B6914, #C4956A)' }} /></div>
      <div className="bg-white border border-[#E8DFD4] rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-5"><p className="text-base font-medium text-[#1a1a2e] flex-1">{q.question}</p><SpeakerButton text={q.question.replace(/['"]/g, '')} size="sm" /></div>
        <div className="space-y-2.5">
          {q.options.map((opt, i) => { let s = 'bg-[#FAF5ED] border-[#E8DFD4] hover:border-[#d4c9b8]'; if (show) { if (i === q.correct) s = 'border-[#8B6914]/30'; else if (i === sel) s = 'bg-red-50 border-red-300'; else s = 'bg-[#FAF5ED] border-[#E8DFD4] opacity-40'; } else if (i === sel) s = 'bg-[#E8DFD4] border-[#d4c9b8]'; return (
            <button key={i} onClick={() => pick(i)} disabled={show} className={`w-full text-left p-3.5 rounded-xl border transition-all ${s}`}
              style={show && i === q.correct ? { background: 'rgba(139,105,20,0.1)', borderColor: 'rgba(139,105,20,0.3)' } : {}}>
              <div className="flex items-center gap-3"><span className="w-7 h-7 rounded-lg bg-[#E8DFD4] flex items-center justify-center text-xs font-bold text-[#6b7280]">{String.fromCharCode(65 + i)}</span><span className="text-sm text-[#4a5568]">{opt}</span>{show && i === q.correct && <span className="ml-auto">✅</span>}{show && i === sel && i !== q.correct && <span className="ml-auto">❌</span>}</div>
            </button>
          );})}
        </div>
      </div>
      {show && <div className={`text-center p-3 rounded-xl text-sm font-medium text-white`} style={{ background: sel === q.correct ? 'linear-gradient(135deg, #8B6914, #C4956A)' : '#C4956A' }}>{sel === q.correct ? 'Richtig! 🎉' : 'Fast richtig!'}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#9ca3af] mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-white rounded-xl text-sm font-semibold transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Mark Complete</button></div>; }
