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
    <div className="glass-card p-4 slide-up">
      <div className="flex items-center gap-2 mb-3"><span className="text-lg">⚡</span><h4 className="text-sm font-bold text-zinc-200">Quick Win</h4><span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-zinc-900" style={{ background: 'linear-gradient(135deg, #A3E635, #06B6D4)' }}>Under 3 min</span></div>
      {cur.type === 'joke' && <div className="rounded-2xl p-4 border border-lime-500/20" style={{ background: 'rgba(163, 230, 53, 0.05)' }}><p className="text-[14px] font-medium mb-2 text-lime-400">{cur.setup}</p><p className="text-[14px] text-zinc-200 font-bold">{cur.punchline}</p></div>}
      {cur.type === 'fact' && <div className="rounded-2xl p-4 border border-cyan-500/20" style={{ background: 'rgba(6, 182, 212, 0.05)' }}><p className="text-[13px] text-zinc-300 leading-relaxed">{cur.text}</p></div>}
      {cur.type === 'meme' && <div className="rounded-2xl p-4 bg-zinc-800 border border-zinc-700"><p className="text-lg font-bold text-zinc-100">{cur.word}</p><p className="text-[13px] text-zinc-400">{cur.meaning}</p><div className="mt-2"><SpeakerButton text={cur.word} size="sm" /></div></div>}
      <button onClick={onComplete} className="mt-3 w-full py-2.5 text-[13px] font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-xl hover:bg-zinc-700 transition active:scale-95">✓ Done! Finish Day</button>
    </div>
  );
}
