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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-slate-200 text-lg">✏️ Fill in the Blank</h3><span className="text-sm font-bold" style={{ color: '#FFCC00' }}>{score}/{sents.length}</span></div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-5"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${((cur + 1) / sents.length) * 100}%`, background: 'linear-gradient(to right, #FFCC00, #ffe066)' }} /></div>
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-6 mb-4 text-center">
        <p className="text-lg text-slate-200 mb-5">{s.text.split('___').map((p, i) => <span key={i}>{p}{i < s.text.split('___').length - 1 && <span className="inline-block min-w-[100px] mx-1 border-b-2 text-center font-bold" style={{ borderColor: 'rgba(255,204,0,0.5)', color: '#FFCC00' }}>{show ? s.answer : '___'}</span>}</span>)}</p>
        <div className="flex justify-center gap-2 mb-3"><input type="text" value={ans} onChange={e => setAns(e.target.value)} onKeyDown={e => e.key === 'Enter' && !show && submit()} disabled={show} placeholder="Type your answer..." className="w-64 px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-center text-base font-medium text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] transition" />{!show && <button onClick={submit} className="px-5 py-2.5 text-black rounded-xl text-sm font-semibold hover:scale-[1.02] transition" style={{ background: '#FFCC00' }}>Check</button>}</div>
        <SpeakerButton text={s.text.replace('___', '...')} size="md" />
      </div>
      {show && <div className={`text-center p-3 rounded-xl text-sm font-medium ${ans.trim().toLowerCase() === s.answer.toLowerCase() ? 'text-black' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`} style={ans.trim().toLowerCase() === s.answer.toLowerCase() ? { background: '#FFCC00' } : {}}>{ans.trim().toLowerCase() === s.answer.toLowerCase() ? 'Richtig! 🎉' : `Answer: "${s.answer}" 💪`}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-black rounded-xl text-sm font-semibold transition" style={{ background: '#FFCC00' }}>Mark Complete</button></div>; }
