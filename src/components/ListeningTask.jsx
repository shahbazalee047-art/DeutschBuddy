import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function ListeningTask({ content, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const questions = content.questions || [];
  const clip = content.clip || {};
  if (questions.length === 0) return <EmptyState onComplete={onComplete} />;
  function getScore() { return questions.reduce((c, q, i) => c + (answers[i] === q.correct ? 1 : 0), 0); }

  return (
    <div className="fade-in">
      <h3 className="font-bold text-zinc-200 text-lg mb-4">🎧 Listening</h3>
      {clip.title && (
        <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <SpeakerButton text={clip.title} size="lg" />
            <div>
              <p className="text-sm font-semibold text-cyan-300">{clip.title}</p>
              <p className="text-xs text-cyan-400/60">{clip.source}</p>
            </div>
          </div>
          {clip.text && <p className="text-xs text-cyan-300/60 mt-2 italic">{clip.text}</p>}
        </div>
      )}
      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p className="text-sm font-medium text-zinc-200 mb-3"><span className="text-lime-400 font-bold mr-1">{i + 1}.</span>{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, j) => {
                let style = 'bg-zinc-800 border-zinc-700 hover:border-zinc-600';
                if (submitted) {
                  if (j === q.correct) style = 'bg-lime-400/10 border-lime-400/30';
                  else if (answers[i] === j) style = 'bg-red-500/10 border-red-500/30';
                  else style = 'bg-zinc-800 border-zinc-700 opacity-40';
                } else if (answers[i] === j) style = 'bg-zinc-700 border-zinc-600';
                return (
                  <button key={j} onClick={() => !submitted && setAnswers(p => ({ ...p, [i]: j }))} disabled={submitted}
                    className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${style}`}>
                    <span className="font-medium text-zinc-400">{String.fromCharCode(65 + j)}.</span> <span className="text-zinc-300">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        {!submitted ? (
          <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < questions.length}
            className="px-5 py-2.5 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition disabled:opacity-40">
            Check Answers
          </button>
        ) : (
          <div className="slide-up">
            <p className="text-sm font-semibold text-zinc-300 mb-2">Score: {getScore()}/{questions.length}</p>
            <button onClick={onComplete} className="px-5 py-2.5 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Continue</button>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onComplete }) {
  return <div className="text-center py-12"><p className="text-zinc-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>;
}
