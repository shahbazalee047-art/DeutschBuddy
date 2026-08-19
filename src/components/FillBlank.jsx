import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconEdit, IconSparkles, IconHeart, IconLightbulb, IconArrowRight } from './Icons';
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
        detail: `Your answer: "${userInput}" | Correct: "${correctString}"`
      };
    }
  }

  if (cleanInput === correctWithoutUmlauts && cleanInput !== cleanCorrect) {
    return {
      type: 'CAPITALIZATION_ERROR',
      message: 'Grammar Rule: ALL German nouns must be capitalized.',
      detail: `Your answer: "${userInput}" | Correct: "${correctString}"`
    };
  }

  if (metadata.category === 'DATIVE' || metadata.category === 'AKKUSATIV' || metadata.category === 'GENITIV') {
    const inputSuffix = cleanInput.match(/(\w+)$/)?.[1] || '';
    const correctSuffix = cleanCorrect.match(/(\w+)$/)?.[1] || '';
    if (inputSuffix !== correctSuffix && cleanInput.length > 0) {
      return {
        type: 'CASE_DECLENSION_ERROR',
        message: `Case Check: The ${(metadata.category || 'case').toLowerCase()} assignment shifts structural suffixes here.`,
        detail: `Your ending: "${inputSuffix}" | Expected: "${correctSuffix}"`
      };
    }
  }

  if (cleanInput.length > 0 && cleanInput !== cleanCorrect) {
    const inputWords = cleanInput.split(/\s+/);
    const correctWords = cleanCorrect.split(/\s+/);
    if (inputWords.length === correctWords.length) {
      let sameWordCount = 0;
      for (let i = 0; i < inputWords.length; i++) {
        if (inputWords[i] === correctWords[i]) sameWordCount++;
      }
      if (sameWordCount === inputWords.length - 1) {
        return {
          type: 'ONE_WORD_OFF',
          message: 'So close! Just one word needs adjustment.',
          detail: null
        };
      }
    }
  }

  return {
    type: 'HARD_WRONG',
    message: 'Not quite! Examine the sentence structure carefully.',
    detail: null
  };
}

export default function FillBlank({ content, onComplete }) {
  const [cur, setCur] = useState(0);
  const [ans, setAns] = useState('');
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  const [errorInfo, setErrorInfo] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const sents = useMemo(() => (content.sentences || []).filter(
    s => s && typeof s.answer === 'string' && s.answer.length > 0
  ), [content.sentences]);

  const s = useMemo(() => sents[cur] || { text: '', answer: '', metadata: {} }, [sents, cur]);
  const isLast = cur === sents.length - 1;
  const hasSentences = sents.length > 0;
  const isCorrect = ans.trim().toLowerCase() === (s.answer || '').toLowerCase();

  const advanceTimer = useRef(null);
  const scoreRef = useRef(0);
  useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); }, []);

  // Reads scoreRef so the timeout path and the manual Next path report the same
  // correct total (avoids the manual-Next double-count on the last question).
  const advance = useCallback(() => {
    if (isLast) {
      onComplete({ score: scoreRef.current, maxScore: sents.length });
    } else {
      setCur((p) => p + 1);
      setAns('');
      setShow(false);
      setErrorInfo(null);
      setShowHint(false);
    }
  }, [isLast, sents.length, onComplete]);

  const submit = useCallback(() => {
    const correct = ans.trim().toLowerCase() === (s.answer || '').toLowerCase();

    if (correct) {
      trackAnswerCorrect('fillblank');
      setScore((p) => p + 1);
      scoreRef.current += 1; // synchronous so advance() sees it on either path
      setShow(true);
      setErrorInfo(null);
    } else {
      trackAnswerIncorrect('fillblank');
      const err = analyzeGermanError(ans, s.answer || '', s.metadata || {});
      setErrorInfo(err);
      setShow(true);
    }

    // Auto-advance fallback; the Next button cancels this and advances immediately.
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(advance, correct ? 2200 : 5000);
  }, [ans, s, advance]);

  const next = useCallback(() => {
    if (advanceTimer.current) { clearTimeout(advanceTimer.current); advanceTimer.current = null; }
    advance();
  }, [advance]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !show) submit();
  };

  if (!hasSentences) {
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
          <IconEdit className="h-5 w-5 text-primary" /> Fill in the Blank
        </h3>
        <span className="text-sm font-bold text-primary">{score}/{sents.length}</span>
      </div>

      <div className="progress-bar mb-5">
        <div className="progress-bar-fill" style={{ width: `${((cur + 1) / sents.length) * 100}%` }} />
      </div>

      <div className="paper-card p-6 mb-4 text-center">
        <p className="text-[18px] text-text-body mb-5 leading-relaxed">
          {s.text.split('___').map((p, i) => (
            <span key={i}>
              {p}
              {i < s.text.split('___').length - 1 && (
                <span className="mx-1 inline-block min-w-[100px] border-b-2 text-center font-bold text-primary" style={{ borderColor: 'var(--db-primary)' }}>
                  {show ? s.answer : showHint ? s.answer[0] + '...' : '___'}
                </span>
              )}
            </span>
          ))}
        </p>

        <div className="flex flex-col items-center gap-3 mb-3">
          <div>
            <input
              type="text"
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={show}
              placeholder="Type your answer..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              autoCapitalize="off"
              inputMode="text"
              className={`w-full max-w-md paper-input text-center text-lg font-medium fill-blank-input ${
                show && !isCorrect ? 'border-[var(--error)]' : ''
              }`}
            />
          </div>

          {!show && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-[12px] text-text-muted transition hover:text-primary"
            >
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
          )}

          <div className="flex items-center gap-3">
            {!show && (
              <button onClick={submit} className="btn-primary px-6 active:scale-95">
                Check
              </button>
            )}
            <SpeakerButton text={s.text.replace('___', '...')} size="md" />
          </div>
        </div>
      </div>

      {show && errorInfo && (
        <div className="paper-card mb-4 rounded-[var(--radius-card)] border-l-4 border-primary p-4">
          <div className="flex items-start gap-3">
            <IconLightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <div className="text-[13px] font-semibold text-text-body mb-1">{errorInfo.message}</div>
              {errorInfo.detail && (
                <div className="text-[12px] text-text-muted font-mono">{errorInfo.detail}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {show && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-[var(--radius-card)] border p-4 text-center text-sm font-semibold ${isCorrect ? 'border-success/30 bg-success-light text-success' : 'border-error/30 bg-error-light text-error'}`}
        >
          {isCorrect ? (
            <span className="flex items-center justify-center gap-2">
              <IconSparkles className="w-4 h-4" /> Richtig! Perfect!
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Answer: "{s.answer}" <IconHeart className="w-4 h-4" />
            </span>
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
