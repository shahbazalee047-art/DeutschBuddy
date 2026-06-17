import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';

const quickWins = [
  { type: 'joke', setup: 'Was sagt ein Mathebuch zum anderen?', punchline: 'Ich habe so viele Probleme.' },
  { type: 'fact', text: 'Germany has over 1,500 types of beer and 1,300 breweries!' },
  { type: 'meme', word: 'Schadenfreude', meaning: 'Joy from someone else\'s misfortune' },
];

export default function QuickWin({ onComplete }) {
  const [current, setCurrent] = useState(null);
  useEffect(() => { setCurrent(quickWins[Math.floor(Math.random() * quickWins.length)]); }, []);
  if (!current) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 slide-up">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">⚡</span>
        <h4 className="text-sm font-bold text-zinc-200">Quick Win</h4>
        <span className="text-[10px] bg-lime-400/10 text-lime-400 border border-lime-400/20 px-2 py-0.5 rounded-full font-medium">Under 3 min</span>
      </div>
      {current.type === 'joke' && (
        <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-4">
          <p className="text-sm font-medium text-amber-400 mb-2">{current.setup}</p>
          <p className="text-sm text-amber-300 font-bold">{current.punchline}</p>
        </div>
      )}
      {current.type === 'fact' && (
        <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-xl p-4">
          <p className="text-sm text-cyan-300 leading-relaxed">{current.text}</p>
        </div>
      )}
      {current.type === 'meme' && (
        <div className="bg-purple-400/10 border border-purple-400/20 rounded-xl p-4">
          <p className="text-lg font-bold text-purple-300">{current.word}</p>
          <p className="text-sm text-purple-400">{current.meaning}</p>
          <div className="mt-2"><SpeakerButton text={current.word} size="sm" /></div>
        </div>
      )}
      <button onClick={onComplete} className="mt-3 w-full py-2 text-sm font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-xl hover:bg-zinc-700 transition">✓ Done! Finish Day</button>
    </div>
  );
}
