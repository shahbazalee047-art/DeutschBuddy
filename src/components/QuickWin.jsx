import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconBolt } from './Icons';
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
    <div className="paper-card p-4 slide-up">
      <div className="flex items-center gap-2 mb-3"><IconBolt className="w-5 h-5 text-gold" /><h4 className="text-sm font-bold text-text-body">Quick Win</h4><span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-text-on-dark" style={{ background: 'var(--gold)' }}>Under 3 min</span></div>
      {cur.type === 'joke' && <div className=" p-4 border border-gold/20" style={{ background: 'rgba(232,163,61,0.05)' }}><p className="text-[14px] font-medium mb-2 text-gold">{cur.setup}</p><p className="text-[14px] text-text-body font-bold">{cur.punchline}</p></div>}
      {cur.type === 'fact' && <div className=" p-4 border border-gold/20" style={{ background: 'rgba(232,163,61,0.05)' }}><p className="text-[13px] text-text-body leading-relaxed">{cur.text}</p></div>}
      {cur.type === 'meme' && <div className=" p-4 bg-bg-secondary border border-border"><p className="text-lg font-bold text-text-dark">{cur.word}</p><p className="text-[13px] text-text-muted">{cur.meaning}</p><div className="mt-2"><SpeakerButton text={cur.word} size="sm" /></div></div>}
      <button onClick={onComplete} className="mt-3 w-full py-2.5 text-[13px] font-medium text-text-muted bg-bg-secondary border border-border  hover:bg-bg-secondary transition active:scale-95">Done! Finish Day</button>
    </div>
  );
}
