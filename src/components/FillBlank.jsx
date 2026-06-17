import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function FillBlank({ content, onComplete }) {
  const [cur, setCur] = useState(0); const [ans, setAns] = useState(''); const [show, setShow] = useState(false); const [score, setScore] = useState(0);
  const sents = content.sentences || [];
  if (!sents.length) return <Empty onComplete={onComplete} />;
  const s = sents[cur]; const isLast = cur === sents.length - 1;
  function submit() { const ok = ans.trim().toLowerCase() === s.answer.toLowerCase(); if (ok) setScore(p => p + 1); setShow(true); setTimeout(() => { if (isLast) onComplete(); else { setCur(p => p + 1); setAns(''); setShow(false); } }, 1200); }
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-[#1a1a2e] text-lg">✏️ Fill in the Blank</h3><span className="text-sm font-bold" style={{ color: '#8B6914' }}>{score}/{sents.length}</span></div>
      <div className="w-full h-2 bg-[#E8DFD4] rounded-full overflow-hidden mb-5"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${((cur + 1) / sents.length) * 100}%`, background: 'linear-gradient(to right, #8B6914, #C4956A)' }} /></div>
      <div className="bg-white border border-[#E8DFD4] rounded-2xl p-6 mb-4 text-center shadow-sm">
        <p className="text-lg text-[#1a1a2e] mb-5">{s.text.split('___').map((p, i) => <span key={i}>{p}{i < s.text.split('___').length - 1 && <span className="inline-block min-w-[100px] mx-1 border-b-2 text-center font-bold" style={{ borderColor: 'rgba(139,105,20,0.5)', color: '#8B6914' }}>{show ? s.answer : '___'}</span>}</span>)}</p>
        <div className="flex justify-center gap-2 mb-3"><input type="text" value={ans} onChange={e => setAns(e.target.value)} onKeyDown={e => e.key === 'Enter' && !show && submit()} disabled={show} placeholder="Type your answer..." className="w-64 px-4 py-2.5 bg-[#F5EFE6] border border-[#E8DFD4] rounded-xl text-center text-base font-medium text-[#1a1a2e] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8B6914] transition" />{!show && <button onClick={submit} className="px-5 py-2.5 text-white rounded-xl text-sm font-semibold hover:scale-[1.02] transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Check</button>}</div>
        <SpeakerButton text={s.text.replace('___', '...')} size="md" />
      </div>
      {show && <div className={`text-center p-3 rounded-xl text-sm font-medium text-white`} style={{ background: ans.trim().toLowerCase() === s.answer.toLowerCase() ? 'linear-gradient(135deg, #8B6914, #C4956A)' : '#C4956A' }}>{ans.trim().toLowerCase() === s.answer.toLowerCase() ? 'Richtig! 🎉' : `Answer: "${s.answer}" 💪`}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#9ca3af] mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-white rounded-xl text-sm font-semibold transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Mark Complete</button></div>; }
