import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';
const wins = [
  { type: 'joke', setup: 'Was sagt ein Mathebuch zum anderen?', punchline: 'Ich habe so viele Probleme.' },
  { type: 'fact', text: 'Germany has over 1,500 types of beer and 1,300 breweries!' },
  { type: 'meme', word: 'Schadenfreude', meaning: 'Joy from someone else\'s misfortune' },
];
export default function QuickWin({ onComplete }) {
  const [cur, setCur] = useState(null);
  useEffect(() => { setCur(wins[Math.floor(Math.random() * wins.length)]); }, []);
  if (!cur) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-4 slide-up">
      <div className="flex items-center gap-2 mb-3"><span className="text-lg">⚡</span><h4 className="text-sm font-bold text-slate-200">Quick Win</h4><span className="text-[10px] bg-lime-400/10 text-lime-400 border border-lime-400/20 px-2 py-0.5 rounded-full font-medium">Under 3 min</span></div>
      {cur.type === 'joke' && <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-4"><p className="text-sm font-medium text-amber-400 mb-2">{cur.setup}</p><p className="text-sm text-amber-300 font-bold">{cur.punchline}</p></div>}
      {cur.type === 'fact' && <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-xl p-4"><p className="text-sm text-cyan-300 leading-relaxed">{cur.text}</p></div>}
      {cur.type === 'meme' && <div className="bg-purple-400/10 border border-purple-400/20 rounded-xl p-4"><p className="text-lg font-bold text-purple-300">{cur.word}</p><p className="text-sm text-purple-400">{cur.meaning}</p><div className="mt-2"><SpeakerButton text={cur.word} size="sm" /></div></div>}
      <button onClick={onComplete} className="mt-3 w-full py-2 text-sm font-medium text-slate-400 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 transition">✓ Done! Finish Day</button>
    </div>
  );
}
