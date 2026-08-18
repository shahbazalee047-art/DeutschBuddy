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
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-text-dark text-lg flex items-center gap-2"><IconLink className="w-5 h-5 text-gold" /> Matching</h3><span className="text-sm text-text-muted">{matched.length}/{pairs.length}</span></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 exercise-list">
        <div className="space-y-2"><h4 className="text-[11px] font-bold text-gold mb-2 text-center uppercase flex items-center justify-center gap-1" style={{ letterSpacing: '0.5px' }}><IconFlag className="w-3.5 h-3.5" /> Deutsch</h4>
          {pairs.map((p, i) => (<div key={i} role="button" tabIndex={0} aria-pressed={matched.includes(i)} onClick={() => clickDE(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); clickDE(i); } }} className={`w-full text-left border transition-all active:scale-95 rounded-[var(--radius-exercise)] matching-tile cursor-pointer ${matched.includes(i) ? 'bg-gold/10 border-gold/20 text-gold' : sel === i ? 'bg-gold/10 border-gold text-text-body' : 'paper-card text-text-body hover:border-gold/30'}`}>
            <div className="flex items-center justify-between"><span className="font-medium">{p.german}</span><div className="flex items-center gap-1">{matched.includes(i) && <IconCheck className="w-4 h-4 text-gold" />}<SpeakerButton text={p.german} size="sm" /></div></div></div>))}
        </div>
        <div className="space-y-2"><h4 className="text-[11px] font-bold text-text-muted mb-2 text-center uppercase flex items-center justify-center gap-1" style={{ letterSpacing: '0.5px' }}><IconMessageCircle className="w-3.5 h-3.5" /> English</h4>
          {shuffled.map((p, k) => { const isMatched = matched.some(m => pairs[m] === p); const isWrong = wrongEN === k; return (
            <button key={k} onClick={() => clickEN(p, k)} disabled={isMatched} className={`w-full text-left border transition-all active:scale-95 rounded-[var(--radius-exercise)] matching-tile ${isMatched ? 'bg-gold/10 border-gold/20 text-gold' : isWrong ? 'border-error bg-error/10 text-error shake' : 'paper-card text-text-body hover:border-gold/30'}`}><span className="font-medium">{p.english}</span></button>
          );})}
        </div>
      </div>
      {matched.length === pairs.length && <div className="text-center mt-4 p-3  font-bold text-sm text-text-on-dark flex items-center justify-center gap-1.5" style={{ background: 'var(--gold)' }}><IconSparkles className="w-4 h-4" /> All matched! Ausgezeichnet!</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={() => onComplete({ score: 1, maxScore: 1 })} className="btn-primary px-6">Mark Complete</button></div>; }
