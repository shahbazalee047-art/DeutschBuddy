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
      <div className="flex items-center gap-2 mb-3"><span className="text-lg">⚡</span><h4 className="text-sm font-bold text-cream-200">Quick Win</h4><span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-forest-900" style={{ background: 'linear-gradient(135deg, #7FB069, #D4A574)' }}>Under 3 min</span></div>
      {cur.type === 'joke' && <div className="rounded-2xl p-4 border border-sage-400/20" style={{ background: 'rgba(127, 176, 105, 0.05)' }}><p className="text-[14px] font-medium mb-2 text-sage-400">{cur.setup}</p><p className="text-[14px] text-cream-200 font-bold">{cur.punchline}</p></div>}
      {cur.type === 'fact' && <div className="rounded-2xl p-4 border border-sky-400/20" style={{ background: 'rgba(107, 163, 190, 0.05)' }}><p className="text-[13px] text-cream-300 leading-relaxed">{cur.text}</p></div>}
      {cur.type === 'meme' && <div className="rounded-2xl p-4 bg-forest-800 border border-border"><p className="text-lg font-bold text-cream-100">{cur.word}</p><p className="text-[13px] text-cream-400">{cur.meaning}</p><div className="mt-2"><SpeakerButton text={cur.word} size="sm" /></div></div>}
      <button onClick={onComplete} className="mt-3 w-full py-2.5 text-[13px] font-medium text-cream-400 bg-forest-800 border border-border rounded-xl hover:bg-forest-700 transition active:scale-95">✓ Done! Finish Day</button>
    </div>
  );
}
