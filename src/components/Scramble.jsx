import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Scramble({ content, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const words = content.words || [];
  if (words.length === 0) return <EmptyState onComplete={onComplete} />;

  const word = words[currentIndex];
  const isLast = currentIndex === words.length - 1;
  const shuffled = word.scrambled.split('').sort(() => Math.random() - 0.5);

  function handleSubmit() {
    const isCorrect = userInput.trim().toLowerCase() === word.answer.toLowerCase();
    if (isCorrect) setScore(prev => prev + 1);
    setShowResult(true);
    setTimeout(() => { if (isLast) onComplete(); else { setCurrentIndex(prev => prev + 1); setUserInput(''); setShowResult(false); } }, 1200);
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-200 text-lg">🔀 Unscramble</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{currentIndex + 1}/{words.length}</span>
          <span className="text-sm font-bold text-green-400">{score} correct</span>
        </div>
      </div>
      <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden mb-5">
        <div className="h-full bg-orange-500 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }} />
      </div>
      <div className="glass-card p-6 mb-4 text-center">
        <p className="text-xs text-slate-500 mb-4">Unscramble the German word:</p>
        <div className="flex justify-center gap-1.5 mb-5">
          {shuffled.map((letter, i) => (
            <span key={i} className="w-10 h-10 flex items-center justify-center bg-amber-500/10 border border-amber-500/20 rounded-lg text-lg font-bold text-amber-400">{letter}</span>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !showResult && handleSubmit()} disabled={showResult}
            placeholder="Type the word..." className="w-56 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-center text-base font-medium text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition" />
          <SpeakerButton text={word.answer} size="md" />
        </div>
        {!showResult && <button onClick={handleSubmit} className="px-5 py-2 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-500 transition shadow-lg shadow-amber-500/20">Check</button>}
      </div>
      {showResult && (
        <div className={`text-center p-3 rounded-xl text-sm font-medium ${userInput.trim().toLowerCase() === word.answer.toLowerCase() ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
          {userInput.trim().toLowerCase() === word.answer.toLowerCase() ? 'Richtig! 🎉' : `Answer: "${word.answer}" 💪`}
        </div>
      )}
    </div>
  );
}

function EmptyState({ onComplete }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">🚧</div>
      <p className="text-slate-500 mb-4">Scramble game coming soon!</p>
      <button onClick={onComplete} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Mark as Complete</button>
    </div>
  );
}
