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
    if (isCorrect) setScore(p => p + 1);
    setShowResult(true);
    setTimeout(() => { if (isLast) onComplete(); else { setCurrentQ(p => p + 1); setUserAnswer(''); setShowResult(false); } }, 1200);
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-zinc-200 text-lg">✏️ Fill in the Blank</h3>
        <span className="text-sm font-bold text-lime-400">{score}/{sentences.length}</span>
      </div>
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-5">
        <div className="h-full bg-lime-400 rounded-full transition-all duration-300" style={{ width: `${((currentQ + 1) / sentences.length) * 100}%` }} />
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-4 text-center">
        <p className="text-lg text-zinc-200 mb-5">
          {sentence.text.split('___').map((part, i) => (
            <span key={i}>{part}{i < sentence.text.split('___').length - 1 && (
              <span className="inline-block min-w-[100px] mx-1 border-b-2 border-lime-400/50 text-center font-bold text-lime-400">
                {showResult ? sentence.answer : '___'}
              </span>
            )}</span>
          ))}
        </p>
        <div className="flex justify-center gap-2 mb-3">
          <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !showResult && handleSubmit()} disabled={showResult}
            placeholder="Type your answer..."
            className="w-64 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-center text-base font-medium text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50 transition" />
          {!showResult && <button onClick={handleSubmit} className="px-5 py-2.5 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Check</button>}
        </div>
        <SpeakerButton text={sentence.text.replace('___', '...')} size="md" />
      </div>
      {showResult && (
        <div className={`text-center p-3 rounded-xl text-sm font-medium ${
          userAnswer.trim().toLowerCase() === sentence.answer.toLowerCase() ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
        }`}>{userAnswer.trim().toLowerCase() === sentence.answer.toLowerCase() ? 'Richtig! 🎉' : `Answer: "${sentence.answer}" 💪`}</div>
      )}
    </div>
  );
}

function EmptyState({ onComplete }) {
  return <div className="text-center py-12"><p className="text-zinc-500 mb-4">Exercise coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>;
}
