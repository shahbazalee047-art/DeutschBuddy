import { useState } from 'react';
export default function Writing({ content, onComplete }) {
  const [text, setText] = useState(''); const [done, setDone] = useState(false);
  function submit() { if (text.trim().length > 0) { setDone(true); onComplete(); } }
  return (
    <div className="fade-in">
      <h3 className="font-bold text-slate-200 text-lg mb-5">✍️ Writing Exercise</h3>
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-5">
        <div className="bg-lime-400/10 border border-lime-400/20 rounded-xl p-4 mb-4"><p className="text-xs text-lime-400 font-medium mb-1">📝 Task:</p><p className="text-sm text-slate-300">{content.prompt}</p></div>
        {content.example && <div className="bg-slate-900/50 rounded-lg p-3 mb-4"><p className="text-[10px] text-slate-500 mb-1">Example:</p><p className="text-xs text-slate-400 italic">"{content.example}"</p></div>}
        <textarea value={text} onChange={e => setText(e.target.value)} disabled={done} placeholder="Write your German text here..." rows={4} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-400 transition text-sm resize-none" />
        {!done && <button onClick={submit} disabled={text.trim().length === 0} className="mt-4 px-5 py-2 bg-lime-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-lime-300 transition disabled:opacity-40">Submit Writing</button>}
      </div>
      {done && <div className="text-center p-3 bg-lime-400/10 border border-lime-400/20 rounded-xl text-sm font-medium text-lime-400 mt-4">✍️ Gut geschrieben! Keep practicing!</div>}
    </div>
  );
}
