import { useState, useCallback, useMemo } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconEdit, IconSparkles, IconHeart, IconLightbulb } from './Icons';

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

  const sents = content.sentences || [];

  const s = useMemo(() => sents[cur] || { text: '', answer: '', metadata: {} }, [sents, cur]);
  const isLast = cur === sents.length - 1;
  const hasSentences = sents.length > 0;
  const isCorrect = ans.trim().toLowerCase() === s.answer.toLowerCase();

  const submit = useCallback(() => {
    const correct = ans.trim().toLowerCase() === s.answer.toLowerCase();

    if (correct) {
      setScore((p) => p + 1);
      setShow(true);
      setErrorInfo(null);
    } else {
      const err = analyzeGermanError(ans, s.answer, s.metadata || {});
      setErrorInfo(err);
      setShow(true);
    }

    setTimeout(() => {
      if (isLast) {
        onComplete();
      } else {
        setCur((p) => p + 1);
        setAns('');
        setShow(false);
        setErrorInfo(null);
        setShowHint(false);
      }
    }, correct ? 1200 : 2500);
  }, [ans, s, isLast, onComplete]);

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
          <IconEdit className="w-5 h-5 text-gold" /> Fill in the Blank
        </h3>
        <span className="text-sm font-bold text-gold">{score}/{sents.length}</span>
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
                <span className="inline-block min-w-[100px] mx-1 border-b-2 text-center font-bold" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
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
              className={`w-full max-w-md paper-input text-center text-lg font-medium fill-blank-input ${
                show && !isCorrect ? 'border-[var(--error)]' : ''
              }`}
            />
          </div>

          {!show && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-[12px] text-text-muted hover:text-gold transition"
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
        <div className="paper-card p-4 mb-4 rounded-[var(--radius-card)]" style={{ borderLeft: '4px solid var(--gold)' }}>
          <div className="flex items-start gap-3">
            <IconLightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
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
          className="text-center p-4 rounded-[var(--radius-card)] text-sm font-semibold text-[var(--cta-text)] transition-all"
          style={{ background: isCorrect ? 'var(--success)' : 'var(--error)' }}
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
    </div>
  );
}