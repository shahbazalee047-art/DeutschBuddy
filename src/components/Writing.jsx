import { useState } from 'react';
export default function Writing({ content, onComplete }) {
  const [text, setText] = useState(''); const [done, setDone] = useState(false);
  function submit() { if (text.trim().length > 0) { setDone(true); onComplete(); } }
  return (
    <div className="fade-in">
      <h3 className="font-bold text-[#1a1a2e] text-lg mb-5">✍️ Writing Exercise</h3>
      <div className="bg-white border border-[#E8DFD4] rounded-2xl p-5 shadow-sm">
        <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(139,105,20,0.1)', border: '1px solid rgba(139,105,20,0.2)' }}><p className="text-xs font-medium mb-1" style={{ color: '#8B6914' }}>📝 Task:</p><p className="text-sm text-[#4a5568]">{content.prompt}</p></div>
        {content.example && <div className="bg-[#F5EFE6] rounded-lg p-3 mb-4 border border-[#E8DFD4]"><p className="text-[10px] text-[#9ca3af] mb-1">Example:</p><p className="text-xs text-[#6b7280] italic">"{content.example}"</p></div>}
        <textarea value={text} onChange={e => setText(e.target.value)} disabled={done} placeholder="Write your German text here..." rows={4} className="w-full px-4 py-3 bg-[#F5EFE6] border border-[#E8DFD4] rounded-xl text-[#1a1a2e] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8B6914] transition text-sm resize-none" />
        {!done && <button onClick={submit} disabled={text.trim().length === 0} className="mt-4 px-5 py-2 text-white rounded-xl text-sm font-semibold hover:scale-[1.02] transition disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Submit Writing</button>}
      </div>
      {done && <div className="text-center p-3 rounded-xl text-sm font-medium text-white mt-4" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>✍️ Gut geschrieben! Keep practicing!</div>}
    </div>
  );
}
