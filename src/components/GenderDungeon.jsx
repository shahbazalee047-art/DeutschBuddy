import { useState, useEffect, useRef, useCallback } from 'react';
import { IconTrophy } from './Icons';
import { derWords, dieWords, dasWords } from '../data/genderWords';

const ALL_WORDS = [
  ...derWords.map(w => ({ ...w, gender: 'der' })),
  ...dieWords.map(w => ({ ...w, gender: 'die' })),
  ...dasWords.map(w => ({ ...w, gender: 'das' })),
];

const BASE_FILL_TIME = 5;
const MIN_FILL_TIME = 1.2;
const TIME_STEP = 0.25;
const SCORE_PER_STEP = 5;
const MAX_LIVES = 3;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getFillTime(score) {
  return Math.max(MIN_FILL_TIME, BASE_FILL_TIME - Math.floor(score / SCORE_PER_STEP) * TIME_STEP);
}

function loadLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem('gender_dungeon_lb') || '[]');
  } catch { return []; }
}

function saveLeaderboard(entries) {
  localStorage.setItem('gender_dungeon_lb', JSON.stringify(entries.slice(0, 10)));
}

export default function GenderDungeon({ compact }) {
  const [state, setState] = useState('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [current, setCurrent] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState(0);
  const [leaderboard, setLeaderboard] = useState(loadLeaderboard);

  const wordPool = useRef([]);
  const animRef = useRef(null);
  const lastTimeRef = useRef(null);
  const scoreRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);

  const bestScore = leaderboard.length > 0 ? leaderboard[0].score : 0;

  const pickWord = useCallback(() => {
    if (wordPool.current.length < 3) {
      wordPool.current = shuffle(ALL_WORDS);
    }
    const word = wordPool.current.pop();
    setCurrent(word);
    setProgress(0);
    setFeedback(null);
    lastTimeRef.current = null;
  }, []);

  const finishGame = useCallback(() => {
    setState('finished');
    setCurrent(null);
    setFeedback(null);
    cancelAnimationFrame(animRef.current);
  }, []);

  const loseLife = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    livesRef.current -= 1;
    setLives(livesRef.current);
    setFeedback('wrong');
    if (livesRef.current <= 0) {
      finishGame();
    } else {
      setTimeout(() => pickWord(), 400);
    }
  }, [pickWord, finishGame]);

  const startGame = useCallback(() => {
    setScore(0);
    setLives(MAX_LIVES);
    setState('playing');
    scoreRef.current = 0;
    livesRef.current = MAX_LIVES;
    wordPool.current = shuffle(ALL_WORDS);
    pickWord();
  }, [pickWord]);

  const handleAnswer = useCallback((gender) => {
    if (feedback || !current) return;
    cancelAnimationFrame(animRef.current);

    if (gender === current.gender) {
      setFeedback('correct');
      setScore(prev => {
        scoreRef.current = prev + 1;
        return prev + 1;
      });
      setTimeout(() => pickWord(), 300);
    } else {
      loseLife();
    }
  }, [current, feedback, pickWord, loseLife]);

  const fillTime = getFillTime(score);

  useEffect(() => {
    if (state !== 'playing' || !current || feedback) return;

    const ct = fillTime * 1000;

    function tick(timestamp) {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;
      const pct = Math.min(elapsed / ct, 1);
      setProgress(pct);
      if (pct >= 1) {
        cancelAnimationFrame(animRef.current);
        loseLife();
        return;
      }
      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [state, current, feedback, fillTime, loseLife]);

  useEffect(() => {
    if (state === 'finished') {
      const entries = loadLeaderboard();
      entries.push({ score: scoreRef.current, date: Date.now() });
      entries.sort((a, b) => b.score - a.score);
      saveLeaderboard(entries);
      setLeaderboard(entries);
    }
  }, [state]);

  const barColor = progress > 0.75 ? 'bg-error' : progress > 0.5 ? 'bg-gold-light' : 'bg-gold';
  const cardClass = compact ? ' border border-border bg-bg-secondary/60 p-2' : 'paper-card p-4';

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🏰</span>
        <h4 className="text-sm font-bold text-text-body" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Der Die Das Dungeon</h4>
      </div>

      {state === 'idle' && (
        <div className="text-center">
          <div className="text-3xl mb-2">⚔️</div>
          <p className="text-[11px] text-text-muted mb-1">Choose the correct article before time runs out!</p>
          <p className="text-[10px] text-text-muted mb-1">Speed increases as your score grows.</p>
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
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-0.5">
              {Array.from({ length: MAX_LIVES }).map((_, i) => (
                <span key={i} className={`text-sm ${i < lives ? 'text-error drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]' : 'text-forest-700'}`}>
                  ♥
                </span>
              ))}
            </div>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
              Score: <span className="text-text-body">{score}</span>
            </span>
          </div>

          <div className={`text-center mb-3 p-4  border transition-colors ${
            feedback === 'correct' ? 'border-gold/40 bg-gold/10' :
            feedback === 'wrong' ? 'border-error/40 bg-error/10' :
            'border-border bg-bg-secondary/40'
          }`}>
            <p className="text-[10px] text-text-muted mb-0.5">Select the correct article</p>
            <p className="text-xl font-bold text-text-dark">{current.de.replace(/^(der|die|das) /, '')}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{current.en}</p>
          </div>

          <div className="w-full h-2 rounded-full bg-bg-secondary mb-3 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-75 linear ${barColor}`}
              style={{ width: `${progress * 100}%` }} />
          </div>

          <div className="flex items-stretch gap-2 h-12">
            {['der', 'die', 'das'].map(g => {
              const gradient = g === 'der' ? 'from-[#6FA0D0] to-[#5A8FC0]' : g === 'die' ? 'from-[#D0879A] to-[#B86F82]' : 'from-[#7DA888] to-[#5A9278]';
              return (
                <button key={g} onClick={() => handleAnswer(g)}
                  disabled={!!feedback}
                  className={`flex-1  text-base font-extrabold transition-all active:scale-95 border shadow-sm bg-gradient-to-b ${gradient} ${
                    feedback && g === current.gender ? 'ring-2 scale-105 brightness-125 text-[#1C1A19]' :
                    feedback && g !== current.gender ? 'opacity-40 text-[#F0EAE0]' :
                    'text-[#F0EAE0] hover:brightness-110'
                  }`}>
                  {g}
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-center gap-1 text-[9px] text-text-muted">
            <span>⏱ {fillTime.toFixed(1)}s</span>
            <span className="mx-1">·</span>
            <span>word {score + 1}</span>
          </div>
        </div>
      )}

      {state === 'finished' && (
        <div className="text-center">
          <div className={`text-3xl mb-1 ${score >= 10 ? 'animate-bounce' : ''}`}>
            {score >= 20 ? '👑' : score >= 12 ? '🏆' : score >= 5 ? '🌟' : '💀'}
          </div>
          <p className="text-2xl font-bold text-text-dark">{score}</p>
          <p className="text-[11px] text-text-muted mb-1">
            {score === bestScore && score > 0 ? '🥇 New Personal Best!' : score > 5 ? 'Great run!' : 'Keep practicing!'}
          </p>

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
