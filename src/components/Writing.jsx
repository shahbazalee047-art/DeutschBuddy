import { useState } from 'react';
export default function Writing({ content, onComplete }) {
  const [text, setText] = useState(''); const [done, setDone] = useState(false);
  function submit() { if (text.trim().length > 0) { setDone(true); onComplete(); } }
  return (
    <div className="fade-in">
      <h3 className="font-bold text-[#1A1A2E] text-lg mb-5">✍️ Writing Exercise</h3>
      <div className="paper-card p-5">
        <div className="rounded-2xl p-4 mb-4" style={{ background: '#FFF8E1', border: '1px solid #B8860B20' }}><p className="text-[11px] font-bold text-[#B8860B] mb-1 uppercase" style={{ letterSpacing: '0.5px' }}>📝 Task:</p><p className="text-[14px] text-[#4A4A5A]">{content.prompt}</p></div>
        {content.example && <div className="bg-[#F5F5F5] rounded-xl p-3 mb-4"><p className="text-[10px] text-[#8A8A9A] mb-1">Example:</p><p className="text-[12px] text-[#8A8A9A] italic">"{content.example}"</p></div>}
        <textarea value={text} onChange={e => setText(e.target.value)} disabled={done} placeholder="Write your German text here..." rows={4} className="w-full px-4 py-3 paper-input resize-none" />
        {!done && <button onClick={submit} disabled={text.trim().length === 0} className="mt-4 btn-primary px-6 disabled:opacity-40">Submit Writing</button>}
      </div>
      {done && <div className="text-center p-3 rounded-2xl text-sm font-semibold text-white mt-4" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }}>✍️ Gut geschrieben! Keep practicing!</div>}
    </div>
  );
}
