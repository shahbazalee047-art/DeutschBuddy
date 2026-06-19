import { useState, useMemo, useCallback } from 'react';
import { IconFire, IconCheck, IconX } from './Icons';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function collectItems(levelData, completedTasks) {
  const items = [];
  for (const week of levelData.weeks || []) {
    for (const day of week.days || []) {
      for (const task of day.tasks || []) {
        if (completedTasks.includes(task.id) && task.content?.items) {
          for (const item of task.content.items) {
            if (item.german && item.english) {
              items.push({ german: item.german, english: item.english });
            }
          }
        }
      }
    }
  }
  return items;
}

function pickQuestions(items, count = 3) {
  const shuffled = shuffle(items);
  const questions = [];
  const used = new Set();

  for (const correct of shuffled) {
    if (used.has(correct.german)) continue;
    used.add(correct.german);

    const wrong = shuffle(items.filter(i => i.german !== correct.german))
      .slice(0, 3)
      .map(i => i.english);

    const fill = shuffle(items.filter(i => i.german !== correct.german));
    while (wrong.length < 3 && fill.length > 0) {
      const w = fill.pop().english;
      if (!wrong.includes(w)) wrong.push(w);
    }

    const options = shuffle([correct.english, ...wrong.slice(0, 3)]);
    questions.push({ german: correct.german, correct: correct.english, options });

    if (questions.length >= count) break;
  }

  return questions;
}

export default function StreakGuardian({ levelData, completedTasks, onSuccess, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => {
    const items = collectItems(levelData, completedTasks);
    return items.length >= 4 ? pickQuestions(items, 3) : [];
  }, [levelData, completedTasks]);

  const hasEnoughWords = questions.length === 3;

  const handleAnswer = useCallback((selected) => {
    const correct = selected === questions[step].correct;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);

    if (step >= 2) {
      setFinished(true);
    } else {
      setTimeout(() => setStep(s => s + 1), correct ? 350 : 600);
    }
  }, [step, answers, questions]);

  const allCorrect = finished && answers.every(Boolean);
  const passed = answers.filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden bg-card scale-in" onClick={e => e.stopPropagation()}>
        {!hasEnoughWords ? (
          <div className="p-6 text-center">
            <div className="text-3xl mb-3">😴</div>
            <p className="text-cream-200 font-bold text-sm mb-1">Not enough vocabulary yet</p>
            <p className="text-[11px] text-cream-500 mb-4">Complete more lessons to unlock Streak Guardian.</p>
            <button onClick={onClose}
              className="px-5 py-2 rounded-xl bg-forest-700 text-cream-300 text-xs font-bold hover:bg-forest-600 transition">
              Close
            </button>
          </div>
        ) : !finished ? (
          <div>
            <div className="p-5 border-b border-border flex items-center gap-2">
              <IconFire className="w-5 h-5 text-amber-400 animate-streak-blaze" />
              <h3 className="text-base font-bold text-cream-100" style={{ fontFamily: 'DM Serif Display, serif' }}>Streak Guardian</h3>
            </div>

            <div className="px-5 pt-4 pb-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-cream-500 uppercase tracking-wider">
                  Question {step + 1} of 3
                </span>
                <span className="text-[10px] font-bold text-amber-400">🔥 Save your streak!</span>
              </div>
              <div className="flex gap-1.5 mb-4">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors ${
                    i < answers.length ? (answers[i] ? 'bg-sage-400' : 'bg-error') :
                    i === answers.length ? 'bg-amber-400/50' : 'bg-forest-700'
                  }`} />
                ))}
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className={`text-center mb-4 p-4 rounded-xl border transition-colors ${
                answers.length > step ? (
                  answers[step] ? 'border-sage-400/40 bg-sage-400/10' : 'border-error/40 bg-error/10'
                ) : 'border-border bg-forest-800/40'
              }`}>
                <p className="text-xs text-cream-500 mb-1">What does this mean?</p>
                <p className="text-2xl font-bold text-cream-100">{questions[step].german}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {questions[step].options.map((opt, i) => {
                  const isSelected = answers.length > step;
                  const isCorrect = opt === questions[step].correct;
                  return (
                    <button key={i} onClick={() => !isSelected && handleAnswer(opt)}
                      disabled={isSelected}
                      className={`p-3 rounded-xl text-sm font-semibold transition-all active:scale-95 border ${
                        isSelected
                          ? isCorrect
                            ? 'border-sage-400 bg-sage-400/20 text-sage-300'
                            : 'border-error/50 bg-error/10 text-cream-500'
                          : 'border-border bg-forest-800/50 text-cream-300 hover:border-cream-400/30 hover:bg-forest-800 hover:text-cream-200'
                      }`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className={`text-4xl mb-3 ${allCorrect ? 'animate-bounce' : ''}`}>
              {allCorrect ? '🎉' : '😢'}
            </div>
            <p className="text-lg font-bold text-cream-100 mb-1">
              {allCorrect ? 'Streak Saved!' : 'Streak Lost'}
            </p>
            <p className="text-[12px] text-cream-500 mb-1">
              {allCorrect
                ? 'You answered all 3 correctly. Your streak is safe!'
                : `${passed}/3 correct. You need all 3 to save your streak.`}
            </p>
            <div className="flex items-center justify-center gap-3 my-4">
              {answers.map((a, i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  a ? 'bg-sage-400/20 text-sage-400' : 'bg-error/20 text-error'
                }`}>
                  {a ? <IconCheck className="w-4 h-4" /> : <IconX className="w-4 h-4" />}
                </div>
              ))}
            </div>
            <button onClick={allCorrect ? onSuccess : onClose}
              className={`mt-2 px-6 py-2.5 rounded-xl text-xs font-bold transition active:scale-95 shadow-sm ${
                allCorrect
                  ? 'bg-sage-400 text-forest-900 hover:bg-sage-300 shadow-sage-400/20'
                  : 'bg-forest-700 text-cream-300 hover:bg-forest-600'
              }`}>
              {allCorrect ? 'Continue Learning' : 'Close'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
