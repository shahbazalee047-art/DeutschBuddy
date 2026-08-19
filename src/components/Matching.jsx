import { useState, useEffect, useMemo, useRef } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconLink, IconCheck, IconFlag, IconMessageCircle, IconSparkles } from './Icons';
import { trackAnswerCorrect, trackAnswerIncorrect } from '../utils/analytics';
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export default function Matching({ content, onComplete }) {
  const [sel, setSel] = useState(null); const [matched, setMatched] = useState([]); const [shuffled, setShuffled] = useState([]);
  const [wrongEN, setWrongEN] = useState(null);
  const pairs = useMemo(() => content.pairs || [], [content.pairs]);
  const wrongTimerRef = useRef(null);
  const completeTimerRef = useRef(null);

  useEffect(() => () => {
    clearTimeout(wrongTimerRef.current);
    clearTimeout(completeTimerRef.current);
  }, []);

  useEffect(() => { if (pairs.length) setShuffled(shuffle(pairs)); }, [pairs]);
  if (!pairs.length) return <Empty onComplete={onComplete} />;
  function clickDE(i) { if (!matched.includes(i)) { setSel(i); setWrongEN(null); } }
  // Match by object identity, NOT by English string — duplicate glosses no longer
  // break the board. Give wrong attempts a brief red/shake so learners get feedback.
  function clickEN(p, k) {
    if (sel === null) return;
    if (p === pairs[sel]) {
      trackAnswerCorrect('matching');
      const next = [...matched, sel];
      setMatched(next); setSel(null); setWrongEN(null);
      // Guarded like the other task components: a rapid second tap on the
      // final pair must not award completion twice (LessonPlayer also guards,
      // but the score snapshot here would be taken twice regardless).
      if (next.length === pairs.length && !completeTimerRef.current) {
        completeTimerRef.current = setTimeout(() => onComplete({ score: next.length, maxScore: pairs.length }), 600);
      }
    } else {
      trackAnswerIncorrect('matching');
      setWrongEN(k);
      clearTimeout(wrongTimerRef.current);
      wrongTimerRef.current = setTimeout(() => setWrongEN(w => (w === k ? null : w)), 700);
    }
  }
  return (
    <div className="fade-in reading-body">
      <div className="mb-5 flex items-center justify-between"><h3 className="flex items-center gap-2 text-lg font-bold text-text-dark"><IconLink className="h-5 w-5 text-primary" /> Matching</h3><span className="text-sm text-text-muted">{matched.length}/{pairs.length}</span></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 exercise-list">
        <div className="space-y-2"><h4 className="mb-2 flex items-center justify-center gap-1 text-center text-[11px] font-bold uppercase text-primary" style={{ letterSpacing: '0.5px' }}><IconFlag className="h-3.5 w-3.5" /> Deutsch</h4>
          {pairs.map((p, i) => (<div key={i} role="button" tabIndex={0} aria-pressed={matched.includes(i)} onClick={() => clickDE(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); clickDE(i); } }} className={`matching-tile w-full cursor-pointer rounded-[var(--radius-exercise)] border text-left transition-all active:scale-95 ${matched.includes(i) ? 'border-success/20 bg-success-light text-success' : sel === i ? 'border-primary bg-primary-light text-text-body' : 'paper-card text-text-body hover:border-primary/30'}`}>
            <div className="flex items-center justify-between"><span className="font-medium">{p.german}</span><div className="flex items-center gap-1">{matched.includes(i) && <IconCheck className="h-4 w-4 text-success" />}<SpeakerButton text={p.german} size="sm" /></div></div></div>))}
        </div>
        <div className="space-y-2"><h4 className="text-[11px] font-bold text-text-muted mb-2 text-center uppercase flex items-center justify-center gap-1" style={{ letterSpacing: '0.5px' }}><IconMessageCircle className="w-3.5 h-3.5" /> English</h4>
          {shuffled.map((p, k) => { const isMatched = matched.some(m => pairs[m] === p); const isWrong = wrongEN === k; return (
            <button key={k} onClick={() => clickEN(p, k)} disabled={isMatched} className={`matching-tile w-full rounded-[var(--radius-exercise)] border text-left transition-all active:scale-95 ${isMatched ? 'border-success/20 bg-success-light text-success' : isWrong ? 'border-error bg-error/10 text-error shake' : 'paper-card text-text-body hover:border-primary/30'}`}><span className="font-medium">{p.english}</span></button>
          );})}
        </div>
      </div>
      {matched.length === pairs.length && <div className="mt-4 flex items-center justify-center gap-1.5 bg-success p-3 text-center text-sm font-bold text-white"><IconSparkles className="h-4 w-4" /> All matched! Ausgezeichnet!</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={() => onComplete({ score: 1, maxScore: 1 })} className="btn-primary px-6">Mark Complete</button></div>; }
