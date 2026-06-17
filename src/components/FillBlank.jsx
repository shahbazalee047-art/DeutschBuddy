import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function FillBlank({ content, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const sentences = content.sentences || [];
  if (sentences.length === 0) return <EmptyState onComplete={onComplete} />;

  const sentence = sentences[currentQ];
  const isLast = currentQ === sentences.length - 1;

  function handleSubmit() {
    const isCorrect = userAnswer.trim().toLowerCase() === sentence.answer.toLowerCase();
    if (isCorrect) setScore(prev => prev + 1);
    setShowResult(true);
    setTimeout(() => { if (isLast) onComplete(); else { setCurrentQ(prev => prev + 1); setUserAnswer(''); setShowResult(false); } }, 1200);
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-200 text-lg">✏️ Fill in the Blank</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{currentQ + 1}/{sentences.length}</span>
          <span className="text-sm font-bold text-green-400">{score} correct</span>
        </div>
      </div>
      <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden mb-5">
        <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${((currentQ + 1) / sentences.length) * 100}%` }} />
      </div>
      <div className="glass-card p-6 mb-4 text-center">
        <p className="text-lg text-slate-200 mb-5">
          {sentence.text.split('___').map((part, i) => (
            <span key={i}>{part}{i < sentence.text.split('___').length - 1 && (
              <span className="inline-block min-w-[100px] mx-1 border-b-2 border-blue-500/50 text-center font-bold text-blue-400">
                {showResult ? sentence.answer : '___'}
              </span>
            )}</span>
          ))}
        </p>
        <div className="flex justify-center gap-2 mb-3">
          <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !showResult && handleSubmit()} disabled={showResult}
            placeholder="Type your answer..."
            className="w-64 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-center text-base font-medium text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition" />
          {!showResult && <button onClick={handleSubmit} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Check</button>}
        </div>
        <SpeakerButton text={sentence.text.replace('___', '...')} size="md" />
      </div>
      {showResult && (
        <div className={`text-center p-3 rounded-xl text-sm font-medium ${userAnswer.trim().toLowerCase() === sentence.answer.toLowerCase() ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
          {userAnswer.trim().toLowerCase() === sentence.answer.toLowerCase() ? 'Richtig! 🎉' : `Not quite! Answer: "${sentence.answer}" 💪`}
        </div>
      )}
    </div>
  );
}

function EmptyState({ onComplete }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">🚧</div>
      <p className="text-slate-500 mb-4">Exercise coming soon!</p>
      <button onClick={onComplete} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Mark as Complete</button>
    </div>
  );
}
