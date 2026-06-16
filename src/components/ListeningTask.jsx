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
      <h3 className="font-bold text-slate-200 text-lg mb-4">🎧 Listening Task</h3>
      {clip.title && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <SpeakerButton text={clip.title} size="lg" />
            <div>
              <p className="text-sm font-semibold text-blue-300">{clip.title}</p>
              <p className="text-xs text-blue-400/60">{clip.source || 'Listen and answer'}</p>
            </div>
          </div>
          {clip.text && <p className="text-xs text-blue-300/60 mt-2 italic">{clip.text}</p>}
        </div>
      )}
      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={i} className="glass-card p-4">
            <p className="text-sm font-medium text-slate-200 mb-3"><span className="text-amber-400 font-bold mr-1">{i + 1}.</span> {q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, j) => {
                let style = 'bg-slate-800/30 border-slate-700/30 hover:border-slate-600/50';
                if (submitted) {
                  if (j === q.correct) style = 'bg-green-500/10 border-green-500/30';
                  else if (answers[i] === j) style = 'bg-red-500/10 border-red-500/30';
                  else style = 'bg-slate-800/30 border-slate-700/30 opacity-40';
                } else if (answers[i] === j) style = 'bg-blue-500/10 border-blue-500/30';
                return (
                  <button key={j} onClick={() => !submitted && setAnswers(prev => ({ ...prev, [i]: j }))} disabled={submitted}
                    className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${style}`}>
                    <span className="font-medium text-slate-400">{String.fromCharCode(65 + j)}.</span> <span className="text-slate-300">{opt}</span>
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
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition disabled:opacity-40 shadow-lg shadow-blue-500/20">
            Check Answers
          </button>
        ) : (
          <div className="slide-up">
            <p className="text-sm font-semibold text-slate-300 mb-2">Score: {getScore()}/{questions.length}</p>
            <button onClick={onComplete} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Continue</button>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onComplete }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">🎧</div>
      <p className="text-slate-500 mb-4">Listening content coming soon!</p>
      <button onClick={onComplete} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Mark as Complete</button>
    </div>
  );
}
