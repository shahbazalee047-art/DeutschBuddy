import { useState } from 'react';
export default function Writing({ content, onComplete }) {
  const [text, setText] = useState(''); const [done, setDone] = useState(false);
  function submit() { if (text.trim().length > 0) { setDone(true); onComplete(); } }
  return (
    <div className="fade-in">
      <h3 className="font-bold text-slate-200 text-lg mb-5">✍️ Writing Exercise</h3>
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-5">
        <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,204,0,0.1)', border: '1px solid rgba(255,204,0,0.2)' }}><p className="text-xs font-medium mb-1" style={{ color: '#FFCC00' }}>📝 Task:</p><p className="text-sm text-slate-300">{content.prompt}</p></div>
        {content.example && <div className="bg-slate-900/50 rounded-lg p-3 mb-4"><p className="text-[10px] text-slate-500 mb-1">Example:</p><p className="text-xs text-slate-400 italic">"{content.example}"</p></div>}
        <textarea value={text} onChange={e => setText(e.target.value)} disabled={done} placeholder="Write your German text here..." rows={4} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] transition text-sm resize-none" />
        {!done && <button onClick={submit} disabled={text.trim().length === 0} className="mt-4 px-5 py-2 text-black rounded-xl text-sm font-semibold hover:scale-[1.02] transition disabled:opacity-40" style={{ background: '#FFCC00' }}>Submit Writing</button>}
      </div>
      {done && <div className="text-center p-3 rounded-xl text-sm font-medium text-black mt-4" style={{ background: '#FFCC00' }}>✍️ Gut geschrieben! Keep practicing!</div>}
    </div>
  );
}
