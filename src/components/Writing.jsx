import { useState } from 'react';

export default function Writing({ content, onComplete }) {
  const [userText, setUserText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() { if (userText.trim().length > 0) { setSubmitted(true); onComplete(); } }

  return (
    <div className="fade-in">
      <h3 className="font-bold text-slate-200 text-lg mb-5">✍️ Writing Exercise</h3>
      <div className="glass-card p-5">
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-4">
          <p className="text-xs text-indigo-400 font-medium mb-1">📝 Task:</p>
          <p className="text-sm text-indigo-300">{content.prompt}</p>
        </div>
        {content.example && (
          <div className="bg-slate-800/30 rounded-lg p-3 mb-4">
            <p className="text-[10px] text-slate-500 mb-1">Example:</p>
            <p className="text-xs text-slate-400 italic">"{content.example}"</p>
          </div>
        )}
        <textarea value={userText} onChange={(e) => setUserText(e.target.value)} disabled={submitted}
          placeholder="Write your German text here..." rows={4}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition text-sm resize-none" />
        {content.tips && !submitted && (
          <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <p className="text-xs font-bold text-amber-400 mb-1">💡 Tips:</p>
            <ul className="text-xs text-amber-300/70 space-y-0.5">{content.tips.map((t, i) => <li key={i}>• {t}</li>)}</ul>
          </div>
        )}
        {!submitted && (
          <button onClick={handleSubmit} disabled={userText.trim().length === 0}
            className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500 transition disabled:opacity-40 shadow-lg shadow-indigo-500/20">
            Submit Writing
          </button>
        )}
      </div>
      {submitted && (
        <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-sm font-medium text-green-400 mt-4">
          ✍️ Gut geschrieben! Great writing! Practice makes perfect, keep going!
        </div>
      )}
    </div>
  );
}
