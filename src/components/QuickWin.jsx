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
    <div className="bg-white border border-[#E8DFD4] rounded-2xl p-4 slide-up shadow-sm">
      <div className="flex items-center gap-2 mb-3"><span className="text-lg">⚡</span><h4 className="text-sm font-bold text-[#1a1a2e]">Quick Win</h4><span className="text-[10px] px-2 py-0.5 rounded-full font-medium text-white" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Under 3 min</span></div>
      {cur.type === 'joke' && <div className="rounded-xl p-4" style={{ background: 'rgba(139,105,20,0.1)', border: '1px solid rgba(139,105,20,0.2)' }}><p className="text-sm font-medium mb-2" style={{ color: '#8B6914' }}>{cur.setup}</p><p className="text-sm text-[#1a1a2e] font-bold">{cur.punchline}</p></div>}
      {cur.type === 'fact' && <div className="rounded-xl p-4" style={{ background: 'rgba(91,140,122,0.1)', border: '1px solid rgba(91,140,122,0.2)' }}><p className="text-sm text-[#4a5568] leading-relaxed">{cur.text}</p></div>}
      {cur.type === 'meme' && <div className="rounded-xl p-4 bg-[#FAF5ED] border border-[#E8DFD4]"><p className="text-lg font-bold text-[#1a1a2e]">{cur.word}</p><p className="text-sm text-[#4a5568]">{cur.meaning}</p><div className="mt-2"><SpeakerButton text={cur.word} size="sm" /></div></div>}
      <button onClick={onComplete} className="mt-3 w-full py-2 text-sm font-medium text-[#6b7280] bg-[#F5EFE6] border border-[#E8DFD4] rounded-xl hover:bg-[#E8DFD4] transition">✓ Done! Finish Day</button>
    </div>
  );
}
