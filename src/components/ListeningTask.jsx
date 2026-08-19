import { useState, useMemo } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconHeadphones, IconPlayFilled } from './Icons';
import { trackAnswerCorrect, trackAnswerIncorrect } from '../utils/analytics';

function getListeningText(clip) {
  if (!clip) return '';
  // Prefer the spoken text, then title; remove quote marks for cleaner TTS.
  return (clip.text || clip.title || '').replace(/[""]/g, '"').trim();
}

export default function ListeningTask({ content, onComplete }) {
  const [ans, setAns] = useState({});
  const [sub, setSub] = useState(false);
  const qs = useMemo(() => (content.questions || []).filter(
    q => q && Array.isArray(q.options) && q.options.length > 0 && typeof q.correct === 'number' && q.correct < q.options.length
  ), [content.questions]);
  const clip = useMemo(() => content.clip || {}, [content.clip]);
  const audioText = useMemo(() => getListeningText(clip), [clip]);

  if (!qs.length) return <Empty onComplete={onComplete} />;

  const finalScore = qs.reduce((c, q, i) => c + (ans[i] === q.correct ? 1 : 0), 0);

  const handleCheck = () => {
    qs.forEach((q, i) => {
      if (ans[i] === q.correct) trackAnswerCorrect('listening');
      else trackAnswerIncorrect('listening');
    });
    setSub(true);
  };

  return (
    <div className="fade-in reading-body">
      <h3 className="font-bold text-text-dark text-lg mb-4 flex items-center gap-2">
        <IconHeadphones className="h-5 w-5 text-primary" /> Listening
      </h3>

      {clip.title && (
        <div className="mb-4 border border-primary/20 bg-primary-light p-4">
          <div className="flex items-center gap-3 mb-3">
            <SpeakerButton text={audioText} size="lg" />
            <div>
              <p className="text-sm font-semibold text-text-body">{clip.title}</p>
              <p className="text-[11px] text-text-muted">{clip.source || 'Listen carefully and answer'}</p>
            </div>
          </div>
          {clip.text && (
            <div className="mt-2 flex items-start gap-2 border border-border/50 bg-surface p-3">
              <IconPlayFilled className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-[13px] text-text-muted italic leading-relaxed">{clip.text}</p>
            </div>
          )}
          <p className="text-[11px] text-text-muted mt-2">
            Tip: Click the speaker button to hear the text again.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {qs.map((q, i) => (
          <div key={i} className="paper-card p-4">
            <p className="text-[14px] font-medium text-text-body mb-3">
              <span className="mr-1 font-bold text-primary">{i + 1}.</span>{q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((o, j) => {
                let s = 'bg-bg-secondary border-border hover:border-primary/30';
                if (sub) {
                  if (j === q.correct) s = 'bg-success/10 border-success text-success';
                  else if (ans[i] === j) s = 'bg-error/10 border-error text-error';
                  else s = 'bg-bg-secondary/50 border-border opacity-40';
                } else if (ans[i] === j) {
                  s = 'bg-bg-secondary border-primary';
                }
                return (
                  <button
                    key={j}
                    onClick={() => !sub && setAns(p => ({ ...p, [i]: j }))}
                    disabled={sub}
                    className={`w-full text-left border text-sm transition-all active:scale-[0.98] rounded-[var(--radius-exercise)] quiz-option ${s}`}
                  >
                    <span className="font-medium text-text-muted">{String.fromCharCode(65 + j)}.</span>{' '}
                    <span className="text-text-body">{o}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        {!sub ? (
          <button
            onClick={handleCheck}
            disabled={Object.keys(ans).length < qs.length}
            className="btn-primary px-6 disabled:opacity-40 active:scale-95"
          >
            Check Answers
          </button>
        ) : (
          <div className="slide-up">
            <p className="text-sm font-semibold text-text-body mb-2">Score: {finalScore}/{qs.length}</p>
            <button
              onClick={() => onComplete({ score: finalScore, maxScore: qs.length })}
              className="btn-primary px-6 active:scale-95"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Empty({ onComplete }) {
  return (
    <div className="text-center py-12">
      <p className="text-text-muted mb-4">Coming soon!</p>
      <button onClick={() => onComplete({ score: 1, maxScore: 1 })} className="btn-primary px-6">Mark Complete</button>
    </div>
  );
}
