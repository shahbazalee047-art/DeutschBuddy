import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconSparkles, IconCheck } from './Icons';
const wins = [
  { type: 'joke', setup: 'Was sagt ein Mathebuch zum anderen?', punchline: 'Ich habe so viele Probleme.' },
  { type: 'fact', text: 'The longest German word has 39 letters: Rechtsschutzversicherungsgesellschaften.' },
  { type: 'meme', word: 'Handschuh', meaning: 'Glove (literally: hand shoe)' },
];
export default function Fun({ onComplete }) {
  const [cur, setCur] = useState(null);
  useEffect(() => { setCur(wins[Math.floor(Math.random() * wins.length)]); }, []);
  if (!cur) return null;
  return (
    <div className="paper-card p-4 slide-up">
      <div className="flex items-center gap-2 mb-3"><IconSparkles className="w-5 h-5 text-gold" /><h4 className="text-sm font-bold text-text-body">Bonus Content</h4></div>
      {cur.type === 'joke' && <div className=" p-4 border border-gold/20" style={{ background: 'rgba(196,146,74,0.05)' }}><p className="text-[14px] font-medium mb-2 text-gold">{cur.setup}</p><p className="text-[14px] text-text-body font-bold">{cur.punchline}</p></div>}
      {cur.type === 'fact' && <div className=" p-4 border border-gold/20" style={{ background: 'rgba(196,146,74,0.05)' }}><p className="text-[13px] text-text-body leading-relaxed">{cur.text}</p></div>}
      {cur.type === 'meme' && <div className=" p-4 bg-bg-secondary border border-border"><p className="text-lg font-bold text-text-dark">{cur.word}</p><p className="text-[13px] text-text-muted">{cur.meaning}</p><div className="mt-2"><SpeakerButton text={cur.word} size="sm" /></div></div>}
      <button onClick={onComplete} className="mt-3 w-full py-2.5 text-[13px] font-medium text-text-muted bg-bg-secondary border border-border  hover:bg-bg-secondary transition active:scale-95 flex items-center justify-center gap-1.5"><IconCheck className="w-4 h-4" /> Done! Finish Day</button>
    </div>
  );
}
