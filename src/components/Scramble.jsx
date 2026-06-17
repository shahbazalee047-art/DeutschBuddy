import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Scramble({ content, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const words = content.words || [];
  if (words.length === 0) return <EmptyState onComplete={onComplete} />;
  const word = words[idx];
  const isLast = idx === words.length - 1;
  const shuffled = word.scrambled.split('').sort(() => Math.random() - 0.5);

  function handleSubmit() {
    const isCorrect = input.trim().toLowerCase() === word.answer.toLowerCase();
    if (isCorrect) setScore(p => p + 1);
    setShowResult(true);
    setTimeout(() => { if (isLast) onComplete(); else { setIdx(p => p + 1); setInput(''); setShowResult(false); } }, 1200);
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-zinc-200 text-lg">🔀 Unscramble</h3>
        <span className="text-sm font-bold text-lime-400">{score}/{words.length}</span>
      </div>
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-5">
        <div className="h-full bg-orange-400 rounded-full transition-all duration-300" style={{ width: `${((idx + 1) / words.length) * 100}%` }} />
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-4 text-center">
        <p className="text-xs text-zinc-500 mb-4">Unscramble the German word:</p>
        <div className="flex justify-center gap-1.5 mb-5">
          {shuffled.map((l, i) => (
            <span key={i} className="w-10 h-10 flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-lg text-lg font-bold text-zinc-300">{l}</span>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !showResult && handleSubmit()} disabled={showResult}
            placeholder="Type the word..." className="w-56 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-center text-base font-medium text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50 transition" />
          <SpeakerButton text={word.answer} size="md" />
        </div>
        {!showResult && <button onClick={handleSubmit} className="px-5 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Check</button>}
      </div>
      {showResult && (
        <div className={`text-center p-3 rounded-xl text-sm font-medium ${
          input.trim().toLowerCase() === word.answer.toLowerCase() ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
        }`}>{input.trim().toLowerCase() === word.answer.toLowerCase() ? 'Richtig! 🎉' : `Answer: "${word.answer}" 💪`}</div>
      )}
    </div>
  );
}

function EmptyState({ onComplete }) {
  return <div className="text-center py-12"><p className="text-zinc-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>;
}
