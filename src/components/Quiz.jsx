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

  function handleSelect(index) {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    if (index === question.correct) setScore(prev => prev + 1);
    setTimeout(() => { if (isLast) onComplete(); else { setCurrentQ(prev => prev + 1); setSelected(null); setShowResult(false); } }, 1200);
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-200 text-lg">❓ Quiz</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{currentQ + 1}/{questions.length}</span>
          <span className="text-sm font-bold text-green-400">{score} correct</span>
        </div>
      </div>
      <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden mb-5">
        <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="glass-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-5">
          <p className="text-base font-medium text-slate-200 flex-1">{question.question}</p>
          <SpeakerButton text={question.question.replace(/['"]/g, '')} size="sm" />
        </div>
        <div className="space-y-2.5">
          {question.options.map((option, i) => {
            let style = 'bg-slate-800/30 border-slate-700/30 hover:border-slate-600/50';
            if (showResult) {
              if (i === question.correct) style = 'bg-green-500/10 border-green-500/30';
              else if (i === selected) style = 'bg-red-500/10 border-red-500/30';
              else style = 'bg-slate-800/30 border-slate-700/30 opacity-40';
            } else if (i === selected) style = 'bg-blue-500/10 border-blue-500/30';
            return (
              <button key={i} onClick={() => handleSelect(i)} disabled={showResult}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${style}`}>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-700/50 flex items-center justify-center text-xs font-bold text-slate-400">{String.fromCharCode(65 + i)}</span>
                  <span className="text-sm text-slate-300">{option}</span>
                  {showResult && i === question.correct && <span className="ml-auto">✅</span>}
                  {showResult && i === selected && i !== question.correct && <span className="ml-auto">❌</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {showResult && (
        <div className={`text-center p-3 rounded-xl text-sm font-medium ${selected === question.correct ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
          {selected === question.correct ? 'Richtig! 🎉 Sehr gut!' : 'Fast richtig! Almost there! 💪'}
        </div>
      )}
    </div>
  );
}

function EmptyState({ onComplete }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">🚧</div>
      <p className="text-slate-500 mb-4">Quiz content coming soon!</p>
      <button onClick={onComplete} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Mark as Complete</button>
    </div>
  );
}
