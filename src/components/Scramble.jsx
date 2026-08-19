import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconShuffle, IconSparkles, IconHeart, IconArrowRight } from './Icons';
import { trackAnswerCorrect, trackAnswerIncorrect } from '../utils/analytics';

// Fisher–Yates shuffle that guarantees the result differs from the source
// (the old sort(random) was biased and could return the answer as-is). Bails
// early when no differing permutation exists (e.g. "aa", "111").
function shuffleString(str) {
  if (!str || str.length < 2) return str || '';
  if (new Set(str).size < 2) return str;
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const out = arr.join('');
  return out === str ? shuffleString(str) : out;
}

export default function Scramble({ content, onComplete }) {
  const [idx, setIdx] = useState(0); const [input, setInput] = useState(''); const [show, setShow] = useState(false); const [score, setScore] = useState(0);
  const words = Array.isArray(content?.words) ? content.words : [];
  const w = words[idx];
  const [shuffled, setShuffled] = useState(() => w ? shuffleString(w.scrambled || w.answer || '') : '');

  useEffect(() => {
    if (w) setShuffled(shuffleString(w.scrambled || w.answer || ''));
  }, [w, w?.scrambled, w?.answer]);

  if (!words.length) return <Empty onComplete={onComplete} />;
  if (!w) return <Empty onComplete={onComplete} />;

  const answer = w.answer || '';
  const isLast = idx === words.length - 1;
  const isCorrect = input.trim().toLowerCase() === answer.toLowerCase();

  function nextOrFinish() {
    if (isLast) {
      onComplete({ score, maxScore: words.length });
    } else {
      setIdx(p => p + 1); setInput(''); setShow(false);
    }
  }

  function submit() {
    if (isCorrect) { trackAnswerCorrect('scramble'); setScore(p => p + 1); }
    else trackAnswerIncorrect('scramble');
    setShow(true);
  }

  return (
    <div className="fade-in reading-body">
      <div className="mb-5 flex items-center justify-between"><h3 className="flex items-center gap-2 text-lg font-bold text-text-dark"><IconShuffle className="h-5 w-5 text-primary" /> Unscramble</h3><span className="text-sm font-bold text-primary">{score}/{words.length}</span></div>
      <div className="progress-bar mb-5"><div className="progress-bar-fill" style={{ width: `${((idx + 1) / words.length) * 100}%` }} /></div>
      <div className="paper-card p-6 mb-4 text-center">
        <p className="text-[11px] text-text-muted mb-4 uppercase font-medium" style={{ letterSpacing: '0.5px' }}>Unscramble the German word:</p>
        <div className="flex justify-center gap-2 mb-5">{[...shuffled].map((l, i) => (<span key={i} className="w-12 h-12 flex items-center justify-center bg-bg-secondary border border-border text-lg font-bold text-text-body rounded-[var(--radius-sm)]">{l}</span>))}</div>
        <div className="flex items-center justify-center gap-3 mb-3">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !show && submit()} disabled={show} placeholder="Type the word..." autoComplete="off" autoCorrect="off" spellCheck={false} autoCapitalize="off" inputMode="text" className="w-56 paper-input text-center text-lg font-medium fill-blank-input" />
          {/* Speak only AFTER reveal so the audio can't leak the answer pre-solve. */}
          {show && <SpeakerButton text={answer} size="md" />}
        </div>
        {!show && <button onClick={submit} className="btn-primary px-6 active:scale-95">Check</button>}
        {show && (
          <div className="flex justify-center mt-3">
            <button onClick={nextOrFinish} className="btn-primary px-8 py-3 text-sm flex items-center gap-2 active:scale-95">
              {isLast ? 'Finish' : 'Next'} <IconArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      {show && <div className={`p-3 text-center text-sm font-semibold text-white ${isCorrect ? 'bg-success' : 'bg-error'}`}>{isCorrect ? <span className="flex items-center justify-center gap-1">Richtig! <IconSparkles className="w-4 h-4" /></span> : <span className="flex items-center justify-center gap-1">Answer: "{answer}" <IconHeart className="w-4 h-4" /></span>}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }
