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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-[#1A1A2E] text-lg">✏️ Fill in the Blank</h3><span className="text-sm font-bold" style={{ color: '#B8860B' }}>{score}/{sents.length}</span></div>
      <div className="progress-bar mb-5"><div className="progress-bar-fill" style={{ width: `${((cur + 1) / sents.length) * 100}%` }} /></div>
      <div className="paper-card p-6 mb-4 text-center">
        <p className="text-[18px] text-[#1A1A2E] mb-5">{s.text.split('___').map((p, i) => <span key={i}>{p}{i < s.text.split('___').length - 1 && <span className="inline-block min-w-[100px] mx-1 border-b-2 text-center font-bold" style={{ borderColor: '#B8860B', color: '#B8860B' }}>{show ? s.answer : '___'}</span>}</span>)}</p>
        <div className="flex justify-center gap-3 mb-3">
          <input type="text" value={ans} onChange={e => setAns(e.target.value)} onKeyDown={e => e.key === 'Enter' && !show && submit()} disabled={show} placeholder="Type your answer..." className="w-64 paper-input text-center text-lg font-medium" />
          {!show && <button onClick={submit} className="btn-primary px-6">Check</button>}
        </div>
        <SpeakerButton text={s.text.replace('___', '...')} size="md" />
      </div>
      {show && <div className={`text-center p-3 rounded-2xl text-sm font-semibold text-white`} style={{ background: ans.trim().toLowerCase() === s.answer.toLowerCase() ? '#4CAF50' : '#FF9800' }}>{ans.trim().toLowerCase() === s.answer.toLowerCase() ? 'Richtig! 🎉' : `Answer: "${s.answer}" 💪`}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#8A8A9A] mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
