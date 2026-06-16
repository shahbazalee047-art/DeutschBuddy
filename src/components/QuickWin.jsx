import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';

const quickWins = [
  { type: 'joke', setup: 'Was sagt ein Mathebuch zum anderen?', punchline: 'Ich habe so viele Probleme.' },
  { type: 'joke', setup: 'Was ist gelb und wartet?', punchline: 'Eine Banane.' },
  { type: 'fact', text: 'The longest German word is "Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz" (63 letters!)' },
  { type: 'fact', text: 'Germany has over 1,500 types of beer and 1,300 breweries!' },
  { type: 'meme', word: 'Schadenfreude', meaning: 'Joy from someone else\'s misfortune', example: 'German has a word for everything!' },
];

export default function QuickWin({ onComplete }) {
  const [current, setCurrent] = useState(null);
  useEffect(() => { setCurrent(quickWins[Math.floor(Math.random() * quickWins.length)]); }, []);
  if (!current) return null;

  return (
    <div className="glass-card p-4 slide-up">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">⚡</span>
        <h4 className="text-sm font-bold text-slate-200">Quick Win</h4>
        <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-medium">Under 3 min</span>
      </div>
      {current.type === 'joke' && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <p className="text-sm font-medium text-amber-300 mb-2">{current.setup}</p>
          <p className="text-sm text-amber-400 font-bold">{current.punchline}</p>
        </div>
      )}
      {current.type === 'fact' && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-sm text-blue-300 leading-relaxed">{current.text}</p>
        </div>
      )}
      {current.type === 'meme' && (
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <p className="text-lg font-bold text-purple-300">{current.word}</p>
          <p className="text-sm text-purple-400">{current.meaning}</p>
          <p className="text-xs text-purple-400/60 mt-1 italic">{current.example}</p>
          <div className="mt-2"><SpeakerButton text={current.word} size="sm" /></div>
        </div>
      )}
      <button onClick={onComplete} className="mt-3 w-full py-2 text-sm font-medium text-slate-400 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-800/50 transition">✓ Done! Finish Day</button>
    </div>
  );
}
