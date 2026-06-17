import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';
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
    <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-4 slide-up">
      <div className="flex items-center gap-2 mb-3"><span className="text-lg">🎉</span><h4 className="text-sm font-bold text-slate-200">Bonus Content</h4></div>
      {cur.type === 'joke' && <div className="rounded-xl p-4" style={{ background: 'rgba(255,204,0,0.1)', border: '1px solid rgba(255,204,0,0.2)' }}><p className="text-sm font-medium mb-2" style={{ color: '#FFCC00' }}>{cur.setup}</p><p className="text-sm text-slate-200 font-bold">{cur.punchline}</p></div>}
      {cur.type === 'fact' && <div className="rounded-xl p-4" style={{ background: 'rgba(221,0,0,0.1)', border: '1px solid rgba(221,0,0,0.2)' }}><p className="text-sm text-slate-300 leading-relaxed">{cur.text}</p></div>}
      {cur.type === 'meme' && <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,0,0,0.2)' }}><p className="text-lg font-bold text-slate-100">{cur.word}</p><p className="text-sm text-slate-300">{cur.meaning}</p><div className="mt-2"><SpeakerButton text={cur.word} size="sm" /></div></div>}
      <button onClick={onComplete} className="mt-3 w-full py-2 text-sm font-medium text-slate-400 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 transition">✓ Done! Finish Day</button>
    </div>
  );
}
