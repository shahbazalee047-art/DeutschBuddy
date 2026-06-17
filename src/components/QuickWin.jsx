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
    <div className="paper-card p-4 slide-up">
      <div className="flex items-center gap-2 mb-3"><span className="text-lg">⚡</span><h4 className="text-sm font-bold text-[#1A1A2E]">Quick Win</h4><span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }}>Under 3 min</span></div>
      {cur.type === 'joke' && <div className="rounded-2xl p-4" style={{ background: '#FFF8E1', border: '1px solid #B8860B20' }}><p className="text-[14px] font-medium mb-2" style={{ color: '#B8860B' }}>{cur.setup}</p><p className="text-[14px] text-[#1A1A2E] font-bold">{cur.punchline}</p></div>}
      {cur.type === 'fact' && <div className="rounded-2xl p-4" style={{ background: '#E0F2F1', border: '1px solid #2D8B7A20' }}><p className="text-[13px] text-[#4A4A5A] leading-relaxed">{cur.text}</p></div>}
      {cur.type === 'meme' && <div className="rounded-2xl p-4 bg-[#FAF6F0] border border-[#E8E0D4]"><p className="text-lg font-bold text-[#1A1A2E]">{cur.word}</p><p className="text-[13px] text-[#4A4A5A]">{cur.meaning}</p><div className="mt-2"><SpeakerButton text={cur.word} size="sm" /></div></div>}
      <button onClick={onComplete} className="mt-3 w-full py-2.5 text-[13px] font-medium text-[#8A8A9A] bg-[#F5F5F5] border border-[#E8E0D4] rounded-xl hover:bg-[#E8E0D4] transition">✓ Done! Finish Day</button>
    </div>
  );
}
