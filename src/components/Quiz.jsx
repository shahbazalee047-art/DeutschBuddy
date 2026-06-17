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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-[#1A1A2E] text-lg">❓ Quiz</h3><span className="text-sm font-bold" style={{ color: '#B8860B' }}>{score}/{qs.length}</span></div>
      <div className="progress-bar mb-5"><div className="progress-bar-fill" style={{ width: `${((cur + 1) / qs.length) * 100}%` }} /></div>
      <div className="paper-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-5"><p className="text-[16px] font-medium text-[#1A1A2E] flex-1">{q.question}</p><SpeakerButton text={q.question.replace(/['"]/g, '')} size="sm" /></div>
        <div className="space-y-3">
          {q.options.map((opt, i) => { let s = 'bg-[#FAF6F0] border-[#E8E0D4] hover:border-[#B8860B]/30'; if (show) { if (i === q.correct) s = 'bg-green-50 border-[#4CAF50]'; else if (i === sel) s = 'bg-red-50 border-[#F44336]'; else s = 'bg-[#F5F5F5] border-[#E8E0D4] opacity-40'; } else if (i === sel) s = 'bg-[#E8E0D4] border-[#B8860B]'; return (
            <button key={i} onClick={() => pick(i)} disabled={show} className={`w-full text-left p-4 rounded-2xl border transition-all ${s}`}>
              <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-xl bg-[#F5EFE6] flex items-center justify-center text-xs font-bold text-[#8A8A9A]">{String.fromCharCode(65 + i)}</span><span className="text-[14px] text-[#4A4A5A] font-medium">{opt}</span>{show && i === q.correct && <span className="ml-auto text-lg">✅</span>}{show && i === sel && i !== q.correct && <span className="ml-auto text-lg">❌</span>}</div>
            </button>
          );})}
        </div>
      </div>
      {show && <div className={`text-center p-3 rounded-2xl text-sm font-semibold text-white`} style={{ background: sel === q.correct ? '#4CAF50' : '#FF9800' }}>{sel === q.correct ? 'Richtig! 🎉' : 'Fast richtig! Almost there!'}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#8A8A9A] mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
