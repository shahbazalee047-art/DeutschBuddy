import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Quiz({ content, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const questions = content.questions || [];
  if (questions.length === 0) return <EmptyState onComplete={onComplete} />;
  const question = questions[currentQ];
  const isLast = currentQ === questions.length - 1;

  function handleSelect(i) {
    if (showResult) return;
    setSelected(i);
    setShowResult(true);
    if (i === question.correct) setScore(p => p + 1);
    setTimeout(() => { if (isLast) onComplete(); else { setCurrentQ(p => p + 1); setSelected(null); setShowResult(false); } }, 1200);
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-zinc-200 text-lg">❓ Quiz</h3>
        <span className="text-sm font-bold text-lime-400">{score}/{questions.length}</span>
      </div>
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-5">
        <div className="h-full bg-lime-400 rounded-full transition-all duration-300" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-5">
          <p className="text-base font-medium text-zinc-200 flex-1">{question.question}</p>
          <SpeakerButton text={question.question.replace(/['"]/g, '')} size="sm" />
        </div>
        <div className="space-y-2.5">
          {question.options.map((option, i) => {
            let style = 'bg-zinc-800 border-zinc-700 hover:border-zinc-600';
            if (showResult) {
              if (i === question.correct) style = 'bg-lime-400/10 border-lime-400/30';
              else if (i === selected) style = 'bg-red-500/10 border-red-500/30';
              else style = 'bg-zinc-800 border-zinc-700 opacity-40';
            } else if (i === selected) style = 'bg-zinc-700 border-zinc-600';
            return (
              <button key={i} onClick={() => handleSelect(i)} disabled={showResult}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${style}`}>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400">{String.fromCharCode(65 + i)}</span>
                  <span className="text-sm text-zinc-300">{option}</span>
                  {showResult && i === question.correct && <span className="ml-auto">✅</span>}
                  {showResult && i === selected && i !== question.correct && <span className="ml-auto">❌</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {showResult && (
        <div className={`text-center p-3 rounded-xl text-sm font-medium ${
          selected === question.correct ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
        }`}>{selected === question.correct ? 'Richtig! 🎉' : 'Fast richtig! Almost there!'}</div>
      )}
    </div>
  );
}

function EmptyState({ onComplete }) {
  return <div className="text-center py-12"><p className="text-zinc-500 mb-4">Quiz coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>;
}
