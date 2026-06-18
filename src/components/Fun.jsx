import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconSparkles, IconCheck } from './Icons';
const wins = [
  { type: 'joke', setup: 'Was sagt ein Mathebuch zum anderen?', punchline: 'Ich habe so viele Probleme.' },
  { type: 'fact', text: 'The longest German word has 39 letters: Rechtsschutzversicherungsgesellschaften.' },
  { type: 'meme', word: 'Handschuh', meaning: 'Glove (literally: hand shoe)' },
];
export default function Fun({ content, onComplete }) {
  const [cur, setCur] = useState(null);
  useEffect(() => { setCur(wins[Math.floor(Math.random() * wins.length)]); }, []);
  if (!cur) return null;
  return (
    <div className="glass-card p-4 slide-up">
      <div className="flex items-center gap-2 mb-3"><IconSparkles className="w-5 h-5 text-sage-400" /><h4 className="text-sm font-bold text-cream-200">Bonus Content</h4></div>
      {cur.type === 'joke' && <div className="rounded-2xl p-4 border border-sage-400/20" style={{ background: 'rgba(127, 176, 105, 0.05)' }}><p className="text-[14px] font-medium mb-2 text-sage-400">{cur.setup}</p><p className="text-[14px] text-cream-200 font-bold">{cur.punchline}</p></div>}
      {cur.type === 'fact' && <div className="rounded-2xl p-4 border border-sky-400/20" style={{ background: 'rgba(107, 163, 190, 0.05)' }}><p className="text-[13px] text-cream-300 leading-relaxed">{cur.text}</p></div>}
      {cur.type === 'meme' && <div className="rounded-2xl p-4 bg-forest-800 border border-border"><p className="text-lg font-bold text-cream-100">{cur.word}</p><p className="text-[13px] text-cream-400">{cur.meaning}</p><div className="mt-2"><SpeakerButton text={cur.word} size="sm" /></div></div>}
      <button onClick={onComplete} className="mt-3 w-full py-2.5 text-[13px] font-medium text-cream-400 bg-forest-800 border border-border rounded-xl hover:bg-forest-700 transition active:scale-95 flex items-center justify-center gap-1.5"><IconCheck className="w-4 h-4" /> Done! Finish Day</button>
    </div>
  );
}
