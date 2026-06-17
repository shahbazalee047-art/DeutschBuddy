import { useState } from 'react';

export default function Writing({ content, onComplete }) {
  const [userText, setUserText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() { if (userText.trim().length > 0) { setSubmitted(true); onComplete(); } }

  return (
    <div className="fade-in">
      <h3 className="font-bold text-zinc-200 text-lg mb-5">✍️ Writing Exercise</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <div className="bg-lime-400/10 border border-lime-400/20 rounded-xl p-4 mb-4">
          <p className="text-xs text-lime-400 font-medium mb-1">📝 Task:</p>
          <p className="text-sm text-zinc-300">{content.prompt}</p>
        </div>
        {content.example && (
          <div className="bg-zinc-800 rounded-lg p-3 mb-4">
            <p className="text-[10px] text-zinc-500 mb-1">Example:</p>
            <p className="text-xs text-zinc-400 italic">"{content.example}"</p>
          </div>
        )}
        <textarea value={userText} onChange={(e) => setUserText(e.target.value)} disabled={submitted}
          placeholder="Write your German text here..." rows={4}
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50 transition text-sm resize-none" />
        {!submitted && (
          <button onClick={handleSubmit} disabled={userText.trim().length === 0}
            className="mt-4 px-5 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition disabled:opacity-40">
            Submit Writing
          </button>
        )}
      </div>
      {submitted && <div className="text-center p-3 bg-lime-400/10 border border-lime-400/20 rounded-xl text-sm font-medium text-lime-400 mt-4">✍️ Gut geschrieben! Keep practicing!</div>}
    </div>
  );
}
