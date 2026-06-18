import { useState, useEffect, useRef, useCallback } from 'react';
import { IconZap, IconClock, IconStar } from './Icons';
import { a1Words, a2Words } from '../data/speedBlitzWords';

const WORD_BANKS = { A1: a1Words, A2: a2Words };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SpeedBlitz({ level = 'A1', compact }) {
  const [state, setState] = useState('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem(`speedblitz_high_${level}`) || '0', 10));
  const [timeLeft, setTimeLeft] = useState(30);
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  const timerRef = useRef(null);
  const wordPool = useRef([]);

  useEffect(() => {
    setHighScore(parseInt(localStorage.getItem(`speedblitz_high_${level}`) || '0', 10));
  }, [level]);

  const saveHighScore = useCallback((s) => {
    const key = `speedblitz_high_${level}`;
    const current = parseInt(localStorage.getItem(key) || '0', 10);
    if (s > current) {
      setHighScore(s);
      localStorage.setItem(key, String(s));
    }
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

  const startGame = useCallback(() => {
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setState('playing');
    setFeedback(null);
    wordPool.current = shuffle(words);
    nextQuestion();
  }, [words, nextQuestion]);

  const finishGame = useCallback(() => {
    setState('finished');
    setCurrent(null);
    setOptions([]);
    setFeedback(null);
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (state === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [state, finishGame]);

  useEffect(() => {
    if (state === 'finished') {
      saveHighScore(score);
    }
  }, [state, score, saveHighScore]);

  const handleAnswer = useCallback((word) => {
    if (feedback) return;
    if (word.en === current.en) {
      setFeedback('correct');
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setTimeout(() => nextQuestion(), 400);
    } else {
      setFeedback('wrong');
      setStreak(0);
      setTimeout(() => nextQuestion(), 600);
    }
  }, [current, feedback, nextQuestion]);

  const timerColor = timeLeft <= 10 ? 'text-error' : timeLeft <= 20 ? 'text-amber-400' : 'text-sage-400';
  const timerPct = (timeLeft / 30) * 100;

  const cardClass = compact ? 'rounded-2xl border border-border bg-forest-800/60 p-3' : 'glass-card p-4';

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-3">
        <IconZap className="w-4 h-4 text-amber-400" />
        <h4 className="text-sm font-bold text-cream-200" style={{ fontFamily: 'DM Serif Display, serif' }}>Speed Blitz</h4>
      </div>

      {state === 'idle' && (
        <div className="text-center">
          <div className="text-3xl mb-2">⚡</div>
          <p className="text-[11px] text-cream-500 mb-1">30 seconds. How many can you get?</p>
          {highScore > 0 && (
            <p className="text-[10px] text-amber-400 font-bold mb-3">
              <IconStar className="w-3 h-3 inline -mt-0.5 mr-0.5" />
              Best: {highScore}
            </p>
          )}
          <button onClick={startGame}
            className="mt-1 px-5 py-2 rounded-xl bg-amber-400 text-forest-900 text-xs font-bold hover:bg-amber-300 transition active:scale-95 shadow-sm shadow-amber-400/20">
            Start Game
          </button>
        </div>
      )}

      {state === 'playing' && current && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-cream-500 uppercase tracking-wider">
              Score: <span className="text-cream-200">{score}</span>
            </span>
            <div className="flex items-center gap-1.5">
              {streak >= 2 && <span className="text-[10px] font-bold text-amber-400">🔥 {streak}</span>}
              <IconClock className={`w-3.5 h-3.5 ${timerColor}`} />
              <span className={`text-xs font-bold tabular-nums ${timerColor}`}>{timeLeft}s</span>
            </div>
          </div>

          <div className="w-full h-1 rounded-full bg-forest-700 mb-4 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 linear ${timerColor.replace('text-', 'bg-')}`}
              style={{ width: `${timerPct}%` }} />
          </div>

          <div className={`text-center mb-4 p-3 rounded-xl border transition-colors ${
            feedback === 'correct' ? 'border-sage-400/40 bg-sage-400/10' :
            feedback === 'wrong' ? 'border-error/40 bg-error/10' :
            'border-border bg-forest-800/30'
          }`}>
            <p className="text-sm text-cream-500 mb-0.5">Translate</p>
            <p className="text-xl font-bold text-cream-100">{current.de}</p>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)}
                disabled={!!feedback}
                className={`p-2 rounded-lg text-xs font-semibold transition-all active:scale-95 border ${
                  feedback
                    ? opt.en === current.en
                      ? 'border-sage-400 bg-sage-400/20 text-sage-300'
                      : 'border-border/50 bg-forest-800/50 text-cream-600'
                    : 'border-border bg-forest-800/50 text-cream-300 hover:border-cream-400/30 hover:bg-forest-800 hover:text-cream-200'
                }`}>
                {opt.en}
              </button>
            ))}
          </div>
        </div>
      )}

      {state === 'finished' && (
        <div className="text-center">
          <div className={`text-3xl mb-1 ${score >= 10 ? 'animate-bounce' : ''}`}>
            {score >= 15 ? '🏆' : score >= 10 ? '🌟' : score >= 5 ? '👍' : '💪'}
          </div>
          <p className="text-lg font-bold text-cream-100">{score}</p>
          <p className="text-[11px] text-cream-500 mb-1">{score > highScore ? 'New Best!' : `${score > 5 ? 'Great' : score > 2 ? 'Nice' : 'Keep practicing'}!`}</p>
          {score > 0 && score === highScore && (
            <p className="text-[10px] text-amber-400 font-bold mb-2">✨ Personal Record</p>
          )}
          <button onClick={startGame}
            className="mt-1 px-5 py-2 rounded-xl bg-amber-400 text-forest-900 text-xs font-bold hover:bg-amber-300 transition active:scale-95 shadow-sm shadow-amber-400/20">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
