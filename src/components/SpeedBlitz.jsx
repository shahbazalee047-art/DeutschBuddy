import { useState, useEffect, useRef, useCallback } from 'react';
import { IconZap, IconTrophy } from './Icons';
import { a1Words, a2Words } from '../data/speedBlitzWords';

const WORD_BANKS = { A1: a1Words, A2: a2Words };
const MAX_MISTAKES = 5;
const BASE_TIME = 5;
const MIN_TIME = 1.5;
const TIME_STEP = 0.3;
const SCORE_PER_STEP = 5;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getWordTime(score) {
  return Math.max(MIN_TIME, BASE_TIME - Math.floor(score / SCORE_PER_STEP) * TIME_STEP);
}

function loadLeaderboard(level) {
  try {
    return JSON.parse(localStorage.getItem(`speedblitz_lb_${level}`) || '[]');
  } catch { return []; }
}

function saveLeaderboard(level, entries) {
  localStorage.setItem(`speedblitz_lb_${level}`, JSON.stringify(entries.slice(0, 10)));
}

export default function SpeedBlitz({ level = 'A1', compact }) {
  const [state, setState] = useState('idle');
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  const [wordTimeLeft, setWordTimeLeft] = useState(BASE_TIME);
  const [leaderboard, setLeaderboard] = useState(() => loadLeaderboard(level));

  const wordTimerRef = useRef(null);
  const wordPool = useRef([]);
  const scoreRef = useRef(0);

  useEffect(() => {
    setLeaderboard(loadLeaderboard(level));
  }, [level]);

  const words = WORD_BANKS[level] || a1Words;

  const nextQuestion = useCallback(() => {
    if (wordPool.current.length < 4) {
      wordPool.current = shuffle(words);
    }
    const correct = wordPool.current.pop();
    const wrong = shuffle(words.filter(w => w.de !== correct.de)).slice(0, 3);
    const opts = shuffle([correct, ...wrong]);
    setCurrent(correct);
    setOptions(opts);
    setFeedback(null);
  }, [words]);

  const handleMistake = useCallback(() => {
    setMistakes(prev => {
      if (prev + 1 >= MAX_MISTAKES) {
        return MAX_MISTAKES;
      }
      return prev + 1;
    });
    setStreak(0);
    setFeedback('timeout');
    setTimeout(() => nextQuestion(), 400);
  }, [nextQuestion]);

  const startGame = useCallback(() => {
    setScore(0);
    setMistakes(0);
    setStreak(0);
    setState('playing');
    setFeedback(null);
    scoreRef.current = 0;
    wordPool.current = shuffle(words);
    nextQuestion();
  }, [words, nextQuestion]);

  const finishGame = useCallback(() => {
    setState('finished');
    setCurrent(null);
    setOptions([]);
    setFeedback(null);
    clearInterval(wordTimerRef.current);
  }, []);

  // Handle game over when mistakes reach max
  useEffect(() => {
    if (state === 'playing' && mistakes >= MAX_MISTAKES) {
      finishGame();
    }
  }, [mistakes, state, finishGame]);

  // Word timer: counts down per-word and auto-advances on expire
  useEffect(() => {
    if (state !== 'playing' || !current || feedback) return;

    const currentWordTime = getWordTime(scoreRef.current);
    setWordTimeLeft(currentWordTime);

    const interval = 50;
    const step = interval / 1000;

    wordTimerRef.current = setInterval(() => {
      setWordTimeLeft(prev => {
        const next = prev - step;
        if (next <= 0) {
          clearInterval(wordTimerRef.current);
          handleMistake();
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(wordTimerRef.current);
  }, [state, current, feedback, handleMistake]);

  useEffect(() => {
    if (state === 'finished') {
      const entries = loadLeaderboard(level);
      entries.push({ score: scoreRef.current, date: Date.now() });
      entries.sort((a, b) => b.score - a.score);
      saveLeaderboard(level, entries);
      setLeaderboard(entries);
    }
  }, [state, level]); // intentional: run when state becomes 'finished'

  const handleAnswer = useCallback((word) => {
    if (feedback) return;

    if (word.en === current.en) {
      setFeedback('correct');
      setScore(prev => {
        scoreRef.current = prev + 1;
        return prev + 1;
      });
      setStreak(prev => prev + 1);
      clearInterval(wordTimerRef.current);
      setTimeout(() => nextQuestion(), 350);
    } else {
      setFeedback('wrong');
      setMistakes(prev => prev + 1);
      setStreak(0);
      clearInterval(wordTimerRef.current);
      setTimeout(() => nextQuestion(), 500);
    }
  }, [current, feedback, nextQuestion]);

  const wordTime = getWordTime(score);
  const timerPct = (wordTimeLeft / wordTime) * 100;
  const timerColor = timerPct > 50 ? 'bg-gold' : timerPct > 25 ? 'bg-gold-light' : 'bg-error';
  const bestScore = leaderboard.length > 0 ? leaderboard[0].score : 0;

  const cardClass = compact ? ' border border-border bg-bg-secondary/60 p-2' : 'paper-card p-4';

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-3">
        <IconZap className="w-4 h-4 text-gold-light" />
        <h4 className="text-sm font-bold text-text-body" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Speed Blitz</h4>
      </div>

      {state === 'idle' && (
        <div className="text-center">
          <div className="text-3xl mb-2"></div>
          <p className="text-[11px] text-text-muted mb-1">Answer before time runs out. <span className="text-error">5 mistakes</span> and it's over.</p>
          <p className="text-[10px] text-text-muted mb-3">Speed increases as your score grows.</p>
          {bestScore > 0 && (
            <p className="text-[10px] text-gold-light font-bold mb-3">
              <IconTrophy className="w-3 h-3 inline -mt-0.5 mr-0.5" />
              Best: {bestScore}
            </p>
          )}
          <button onClick={startGame}
            className="mt-1 px-5 py-2  bg-gold-light text-text-on-dark text-xs font-bold hover:bg-gold-pale transition active:scale-95 shadow-sm shadow-gold-light/20">
            Start Game
          </button>
          {leaderboard.length > 1 && (
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider mb-2">Leaderboard</p>
              <div className="space-y-1">
                {leaderboard.slice(0, compact ? 3 : 5).map((entry, i) => (
                  <div key={i} className={`flex items-center justify-between px-2 py-1 rounded-lg text-[11px] ${
                    i === 0 ? 'bg-gold-light/10 text-gold-pale' : 'text-text-muted'
                  }`}>
                    <span className="font-bold">
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                    </span>
                    <span className="font-semibold">{entry.score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {state === 'playing' && current && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
              Score: <span className="text-text-body">{score}</span>
            </span>
            <div className="flex items-center gap-2">
              {streak >= 2 && <span className="text-[10px] font-bold text-gold-light"> {streak}</span>}
              <span className="text-[10px] font-bold text-error">
                ❌ {mistakes}/{MAX_MISTAKES}
              </span>
            </div>
          </div>

          <div className="w-full h-1.5 rounded-full bg-bg-secondary mb-3 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-[50ms] linear ${timerColor}`}
              style={{ width: `${timerPct}%` }} />
          </div>

          <div className={`text-center mb-3 p-3  border transition-colors ${
            feedback === 'correct' ? 'border-gold/40 bg-gold/10' :
            feedback === 'wrong' ? 'border-error/40 bg-error/10' :
            feedback === 'timeout' ? 'border-gold-light/40 bg-gold-light/10' :
            'border-border bg-bg-secondary/30'
          }`}>
            {!feedback && <p className="text-[10px] text-text-muted mb-0.5">Translate</p>}
            {feedback === 'timeout' && <p className="text-[10px] text-gold-light font-bold mb-0.5">Time's up!</p>}
            <p className="text-xl font-bold text-text-dark">{current.de}</p>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)}
                disabled={!!feedback}
                className={`p-2 rounded-lg text-xs font-semibold transition-all active:scale-95 border ${
                  feedback
                    ? opt.en === current.en
                      ? 'border-gold bg-gold/20 text-gold-light'
                      : 'border-border/50 bg-bg-secondary/50 text-text-muted'
                    : 'border-border bg-bg-secondary/50 text-text-body hover:border-cream-400/30 hover:bg-bg-secondary hover:text-text-body'
                }`}>
                {opt.en}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-1 text-[9px] text-text-muted">
            <IconZap className="w-3 h-3" />
            <span>Speed: {wordTime.toFixed(1)}s</span>
          </div>
        </div>
      )}

      {state === 'finished' && (
        <div className="text-center">
          {score === bestScore && score > 0 && (
            <div className={`text-3xl mb-1 ${score >= 10 ? 'animate-bounce' : ''}`}>
              {score >= 20 ? '🏆' : score >= 12 ? '🌟' : score >= 5 ? '👍' : '💪'}
            </div>
          )}
          <p className="text-2xl font-bold text-text-dark">{score}</p>
          <p className="text-[11px] text-text-muted mb-1">
            {score === bestScore && score > 0 ? '🥇 New Personal Best!' : 'Nice try!'}
          </p>
          <p className="text-[10px] text-text-muted mb-3">Mistakes: {mistakes} / {MAX_MISTAKES}</p>

          <button onClick={startGame}
            className="mb-3 px-5 py-2  bg-gold-light text-text-on-dark text-xs font-bold hover:bg-gold-pale transition active:scale-95 shadow-sm shadow-gold-light/20">
            Play Again
          </button>

          {leaderboard.length > 0 && (
            <div className="pt-3 border-t border-border">
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider mb-2">Leaderboard</p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {leaderboard.slice(0, compact ? 3 : 10).map((entry, i) => (
                  <div key={i} className={`flex items-center justify-between px-2 py-1 rounded-lg text-[11px] ${
                    i === 0 ? 'bg-gold-light/10 text-gold-pale' : 'text-text-muted'
                  }`}>
                    <span className="font-bold">
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                    </span>
                    <span className="font-semibold">{entry.score}</span>
                    <span className="text-[9px] text-text-muted">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
