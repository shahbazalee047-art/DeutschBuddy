import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconHelpCircle, IconCheck, IconX, IconSparkles, IconLightbulb, IconArrowRight } from './Icons';
import { trackAnswerCorrect, trackAnswerIncorrect } from '../utils/analytics';

const UMLAUT_MAP = { 'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss' };

function analyzeGermanError(userInput, correctString, metadata = {}) {
  const cleanInput = userInput.trim().toLowerCase();
  const cleanCorrect = correctString.trim().toLowerCase();

  const normalizeUmlauts = (str) =>
    str.replace(/[äöüß]/g, (m) => UMLAUT_MAP[m] || m);

  const withoutUmlauts = normalizeUmlauts(cleanInput);
  const correctWithoutUmlauts = normalizeUmlauts(cleanCorrect);

  if (withoutUmlauts === correctWithoutUmlauts && cleanInput !== cleanCorrect) {
    if (/[äöüß]/.test(cleanInput) || /[äöüß]/.test(cleanCorrect)) {
      return {
        type: 'UMLAUT_ERROR',
        message: 'Umlauts shift semantic meaning! (e.g., "schon" = already, "schön" = beautiful)',
        detail: `"${userInput}" vs "${correctString}"`
      };
    }
  }

  if (cleanInput === correctWithoutUmlauts && cleanInput !== cleanCorrect) {
    return {
      type: 'CAPITALIZATION_ERROR',
      message: 'Grammar Rule: ALL German nouns must be capitalized.',
      detail: `Check capitalization of: "${correctString}"`
    };
  }

  if (metadata.category === 'DATIVE' || metadata.category === 'AKKUSATIV' || metadata.category === 'GENITIV') {
    const inputSuffix = cleanInput.match(/(\w+)$/)?.[1] || '';
    const correctSuffix = cleanCorrect.match(/(\w+)$/)?.[1] || '';
    if (inputSuffix !== correctSuffix && cleanInput.length > 0) {
      return {
        type: 'CASE_DECLENSION_ERROR',
        message: `Case Check: The ${metadata.category.toLowerCase()} assignment shifts structural suffixes here.`,
        detail: `Expected ending: "${correctSuffix}"`
      };
    }
  }

  if (metadata.type === 'verb') {
    const verbForms = metadata.forms || [];
    if (verbForms.includes(cleanInput)) {
      return {
        type: 'WRONG_VERB_FORM',
        message: 'This verb form exists, but check which form is needed here.',
        detail: `Accepted forms: ${verbForms.join(', ')}`
      };
    }
  }

  return {
    type: 'HARD_WRONG',
    message: 'Not quite! Examine the sentence structure carefully.',
    detail: null
  };
}

export default function Quiz({ content, onComplete }) {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  const [errorInfo, setErrorInfo] = useState(null);

  const qs = useMemo(() => (content.questions || []).filter(
    q => q && Array.isArray(q.options) && q.options.length > 0 && typeof q.correct === 'number' && q.correct < q.options.length
  ), [content.questions]);

  const q = useMemo(() => qs[cur] || { question: '', options: [], correct: 0, metadata: {} }, [qs, cur]);
  const isLast = cur === qs.length - 1;
  const hasQuestions = qs.length > 0;

  const advanceTimer = useRef(null);
  const scoreRef = useRef(0);

  // Clear any pending auto-advance on unmount.
  useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); }, []);

  // Reads scoreRef (not the `score` closure) so the timeout path and the manual
  // Next path both report the same correct total. Without this, the manual Next
  // button double-counts the final question (score closure is fresh there).
  const advance = useCallback(() => {
    if (isLast) {
      onComplete({ score: scoreRef.current, maxScore: qs.length });
    } else {
      setCur((p) => p + 1);
      setSel(null);
      setShow(false);
      setErrorInfo(null);
    }
  }, [isLast, qs.length, onComplete]);

  const handlePick = useCallback((i) => {
    if (show) return;
    setSel(i);
    setErrorInfo(null);

    const isCorrect = i === q.correct;

    if (isCorrect) {
      trackAnswerCorrect('quiz');
      setScore((p) => p + 1);
      scoreRef.current += 1; // synchronous so advance() sees it on either path
      setShow(true);
    } else {
      trackAnswerIncorrect('quiz');
      const err = analyzeGermanError(q.options[i], q.options[q.correct], q.metadata || {});
      setErrorInfo(err);
      setShow(true);
    }

    // Auto-advance as a fallback; the Next button cancels this and goes immediately.
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(advance, isCorrect ? 2200 : 5000);
  }, [show, q, advance]);

  const next = useCallback(() => {
    if (advanceTimer.current) { clearTimeout(advanceTimer.current); advanceTimer.current = null; }
    advance();
  }, [advance]);

  if (!hasQuestions) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted mb-4">Coming soon!</p>
        <button onClick={onComplete} className="btn-primary px-6">Mark Complete</button>
      </div>
    );
  }

  return (
    <div className="fade-in reading-body focus-col">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-text-dark text-lg flex items-center gap-2">
          <IconHelpCircle className="w-5 h-5 text-gold" /> Quiz
        </h3>
        <span className="text-sm font-bold text-gold">{score}/{qs.length}</span>
      </div>

      <div className="progress-bar mb-5">
        <div className="progress-bar-fill" style={{ width: `${((cur + 1) / qs.length) * 100}%` }} />
      </div>

      <div className="paper-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-5">
          <p className="text-[16px] font-medium text-text-body flex-1">{q.question}</p>
          <SpeakerButton text={q.question.replace(/['"]/g, '')} size="sm" />
        </div>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let base = 'bg-[var(--bg-secondary)] border-[var(--border-default)] text-text-body';

            if (show) {
              if (i === q.correct) {
                base = 'bg-[rgba(125,168,136,0.10)] border-[var(--success)] text-[var(--success)]';
              } else if (i === sel) {
                base = 'bg-[rgba(201,69,63,0.10)] border-[var(--error)] text-[var(--error)] shake';
              } else {
                base = 'bg-[var(--bg-secondary)]/50 border-[var(--border-default)] text-text-muted opacity-40';
              }
            } else if (i === sel) {
              base = 'bg-[var(--bg-secondary)] border-gold text-text-body';
            }

            return (
              <button
                key={i}
                onClick={() => handlePick(i)}
                disabled={show}
                className={`w-full text-left p-4 border transition-all active:scale-[0.96] rounded-[var(--radius-exercise)] quiz-option ${base}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-[var(--radius-sm)] ${
                    i === sel && !show ? 'bg-gold/20 text-gold' : 'bg-[var(--bg-secondary)] text-text-muted'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[14px] font-medium">{opt}</span>
                  {show && i === q.correct && (
                    <IconCheck className="w-5 h-5 ml-auto" style={{ color: 'var(--success)' }} />
                  )}
                  {show && i === sel && i !== q.correct && (
                    <IconX className="w-5 h-5 ml-auto" style={{ color: 'var(--error)' }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {show && errorInfo && (
        <div className="paper-card p-4 mb-4 rounded-[var(--radius-card)]" style={{ borderLeft: '4px solid var(--gold)' }}>
          <div className="flex items-start gap-3">
            <IconLightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
            <div>
              <div className="text-[13px] font-semibold text-text-body mb-1">{errorInfo.message}</div>
              {errorInfo.detail && (
                <div className="text-[12px] text-text-muted">{errorInfo.detail}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {show && (
        <div
          className={`text-center p-4 rounded-[var(--radius-card)] text-sm font-semibold text-[var(--cta-text)] transition-all`}
          style={{
            background: sel === q.correct ? 'var(--success)' : 'var(--error)'
          }}
        >
          {sel === q.correct ? (
            <span className="flex items-center justify-center gap-2">
              <IconSparkles className="w-4 h-4" /> Richtig! Perfect!
            </span>
          ) : (
            <span>Fast richtig! Almost there!</span>
          )}
        </div>
      )}

      {show && (
        <div className="flex justify-center mt-4">
          <button onClick={next} className="btn-primary px-8 py-3 text-sm flex items-center gap-2 active:scale-95">
            {isLast ? 'Finish' : 'Next'}
            <IconArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}