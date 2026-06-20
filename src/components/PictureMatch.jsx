import { useState, useEffect, useRef, useCallback } from 'react';
import { IconTrophy, IconImage } from './Icons';
import { a1Pictures, a2Pictures } from '../data/pictureWords';

const PICTURE_BANKS = { A1: a1Pictures, A2: a2Pictures };
const MAX_MISTAKES = 5;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadLeaderboard(level) {
  try {
    return JSON.parse(localStorage.getItem(`picture_match_lb_${level}`) || '[]');
  } catch { return []; }
}

function saveLeaderboard(level, entries) {
  localStorage.setItem(`picture_match_lb_${level}`, JSON.stringify(entries.slice(0, 10)));
}

export default function PictureMatch({ level = 'A1', compact }) {
  const [state, setState] = useState('idle');
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [leaderboard, setLeaderboard] = useState(() => loadLeaderboard(level));
  const [poolRemaining, setPoolRemaining] = useState(0);

  const pool = useRef([]);
  const scoreRef = useRef(0);

  useEffect(() => {
    setLeaderboard(loadLeaderboard(level));
  }, [level]);

  const pictures = PICTURE_BANKS[level] || a1Pictures;
  const bestScore = leaderboard.length > 0 ? leaderboard[0].score : 0;

  const nextQuestion = useCallback(() => {
    if (pool.current.length < 4) {
      pool.current = shuffle(pictures);
    }
    const correct = pool.current.pop();
    const wrong = shuffle(pictures.filter(p => p.de !== correct.de)).slice(0, 3);
    const opts = shuffle([correct, ...wrong]);
    setCurrent(correct);
    setOptions(opts);
    setFeedback(null);
    setPoolRemaining(pool.current.length);
  }, [pictures]);

  const startGame = useCallback(() => {
    setScore(0);
    setMistakes(0);
    setState('playing');
    setFeedback(null);
    scoreRef.current = 0;
    pool.current = shuffle(pictures);
    setPoolRemaining(pool.current.length);
    nextQuestion();
  }, [pictures, nextQuestion]);

  const finishGame = useCallback(() => {
    setState('finished');
    setCurrent(null);
    setOptions([]);
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (state === 'playing' && mistakes >= MAX_MISTAKES) {
      finishGame();
    }
  }, [mistakes, state, finishGame]);

  useEffect(() => {
    if (state === 'finished') {
      const entries = loadLeaderboard(level);
      entries.push({ score: scoreRef.current, date: Date.now() });
      entries.sort((a, b) => b.score - a.score);
      saveLeaderboard(level, entries);
      setLeaderboard(entries);
    }
  }, [state, level]);

  const handleAnswer = useCallback((item) => {
    if (feedback) return;

    if (item.de === current.de) {
      setFeedback('correct');
      setScore(prev => {
        scoreRef.current = prev + 1;
        return prev + 1;
      });
      setTimeout(() => nextQuestion(), 350);
    } else {
      setFeedback('wrong');
      setMistakes(prev => prev + 1);
      setTimeout(() => nextQuestion(), 500);
    }
  }, [current, feedback, nextQuestion]);

  const cardClass = compact ? ' border border-border bg-bg-secondary/60 p-2' : 'paper-card p-4';

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-3">
        <IconImage className="w-4 h-4 text-gold" />
        <h4 className="text-sm font-bold text-text-body" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Picture Match</h4>
      </div>

      {state === 'idle' && (
        <div className="text-center">
          <div className="text-3xl mb-2">🖼️</div>
          <p className="text-[11px] text-text-muted mb-1">See the picture, pick the right German word!</p>
          <p className="text-[10px] text-text-muted mb-1">{MAX_MISTAKES} mistakes and it's over.</p>
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
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
              Score: <span className="text-text-body">{score}</span>
            </span>
            <span className="text-[10px] font-bold text-error">
              ❌ {mistakes}/{MAX_MISTAKES}
            </span>
          </div>

          <div className="text-center mb-4 p-4  border border-border bg-bg-secondary/40">
            <span className="text-5xl block mb-1">{current.emoji}</span>
            <p className="text-[10px] text-text-muted">What is this?</p>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)}
                disabled={!!feedback}
                className={`p-2 rounded-lg text-xs font-semibold transition-all active:scale-95 border ${
                  feedback
                    ? opt.de === current.de
                      ? 'border-gold bg-gold/20 text-gold-light'
                      : 'border-border/50 bg-bg-secondary/50 text-text-muted'
                    : 'border-border bg-bg-secondary/50 text-text-body hover:border-cream-400/30 hover:bg-bg-secondary hover:text-text-body'
                }`}>
                {opt.de}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-1 text-[9px] text-text-muted">
            <span>{pictures.length - poolRemaining}/{pictures.length}</span>
          </div>
        </div>
      )}

      {state === 'finished' && (
        <div className="text-center">
          <div className={`text-3xl mb-1 ${score >= 10 ? 'animate-bounce' : ''}`}>
            {score >= 20 ? '👑' : score >= 12 ? '🏆' : score >= 5 ? '🌟' : '💪'}
          </div>
          <p className="text-2xl font-bold text-text-dark">{score}</p>
          <p className="text-[11px] text-text-muted mb-1">
            {score === bestScore && score > 0 ? '🥇 New Personal Best!' : score > 5 ? 'Great job!' : 'Keep practicing!'}
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
