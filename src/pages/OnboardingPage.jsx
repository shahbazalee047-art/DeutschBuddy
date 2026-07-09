import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BuddyAvatar } from '../components/buddy';
import { IconArrowRight, IconCheck, IconX, IconSparkles, IconBookOpen, IconMap } from '../components/Icons';

// Pre-signup onboarding. Deliberately minimal: a single level-choice screen,
// with an optional 3-question placement test for users who already know some
// German. The rich app overview happens AFTER signup via the WelcomeTutorial
// (see DashboardShell), so we don't duplicate it here.
//
// Placement uses a difficulty spread: a freebie for confidence, an A1 item, and
// an A2 Perfekt discriminator that actually separates the levels.

const placementQuestions = [
  {
    german: 'Hallo',
    prompt: 'What does this mean?',
    options: ['Hello', 'Goodbye', 'Please', 'Thanks'],
    answer: 0,
  },
  {
    german: 'Ich ___ aus Spanien.',
    prompt: 'Fill in the blank',
    options: ['komme', 'kommst', 'kommt', 'kommen'],
    answer: 0,
  },
  {
    german: 'Ich habe den Film ___.',
    prompt: 'Choose the correct form',
    options: ['gesehen', 'sehe', 'sah', 'seht'],
    answer: 0,
  },
];

const PATHS = [
  {
    id: 'zero',
    icon: IconSparkles,
    title: 'I’m new to German',
    desc: 'Start from zero — greetings, alphabet, your first sentences.',
    level: 'A1',
  },
  {
    id: 'some',
    icon: IconMap,
    title: 'I know a little',
    desc: 'Take a quick 3-question check and we’ll place you.',
    level: null, // decided by placement
  },
  {
    id: 'a1-done',
    icon: IconBookOpen,
    title: 'I’ve finished A1',
    desc: 'Past tenses, longer sentences, real conversations.',
    level: 'A2',
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('level'); // level | placement
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  function finish(level) {
    try {
      localStorage.setItem('db_selected_level', level);
      localStorage.setItem('db_onboarded', 'true');
    } catch { /* ignore */ }
    navigate('/signup');
  }

  function handlePathChoose(path) {
    if (path.id === 'some') {
      setStep('placement');
      return;
    }
    finish(path.level);
  }

  function handleAnswer(i) {
    if (showResult) return;
    setSelected(i);
    const isCorrect = i === placementQuestions[qIndex].answer;
    if (isCorrect) setScore(s => s + 1);
    setShowResult(true);
    setTimeout(() => {
      if (qIndex < placementQuestions.length - 1) {
        setQIndex(idx => idx + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        // Reaching 2/3 requires getting beyond the freebie — i.e. some real
        // foundation. The A1/A2 toggle in the navbar lets learners self-correct.
        const finalScore = score + (isCorrect ? 1 : 0);
        finish(finalScore >= 2 ? 'A2' : 'A1');
      }
    }, 950);
  }

  return (
    <div className="min-h-dvh bg-bg-base flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === 'level' && (
            <motion.div
              key="level"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28 }}
            >
              <div className="text-center mb-7">
                <div className="flex justify-center mb-4">
                  <BuddyAvatar state="waving" size={104} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">DeutschBuddy</p>
                <h1 className="text-[28px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  What’s your German level?
                </h1>
                <p className="text-text-muted text-sm">Pick whichever feels right — you can change it anytime.</p>
              </div>

              <div className="space-y-3">
                {PATHS.map(path => (
                  <button
                    key={path.id}
                    onClick={() => handlePathChoose(path)}
                    className="w-full p-4 rounded-[var(--radius-card)] border bg-surface border-border hover:border-gold/40 hover:bg-bg-secondary transition-all active:scale-[0.99] text-left flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <path.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-text-dark">{path.title}</p>
                      <p className="text-[13px] text-text-muted leading-snug">{path.desc}</p>
                    </div>
                    <IconArrowRight className="w-4 h-4 text-text-muted group-hover:text-gold group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>

              <p className="text-center text-[12px] text-text-muted mt-6">
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="font-semibold text-primary hover:underline">Log in</button>
              </p>
            </motion.div>
          )}

          {step === 'placement' && (
            <motion.div
              key="placement"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
            >
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-gold uppercase tracking-[1.5px]">Quick placement</p>
                  <p className="text-xs text-text-muted tabular-nums">{qIndex + 1} / {placementQuestions.length}</p>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${((qIndex + 1) / placementQuestions.length) * 100}%` }} />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {placementQuestions[qIndex].german}
                </h2>
                <p className="text-text-muted text-sm">{placementQuestions[qIndex].prompt}</p>
              </div>

              <div className="space-y-3">
                {placementQuestions[qIndex].options.map((option, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === placementQuestions[qIndex].answer;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={showResult}
                      className={`
                        w-full p-4 rounded-xl border-2 text-left font-medium transition-all active:scale-[0.98]
                        ${showCorrect ? 'border-success bg-success/10' :
                          showWrong ? 'border-error bg-error/10' :
                          isSelected ? 'border-primary bg-primary/10' :
                          'border-border bg-surface hover:border-gold/40'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showCorrect && <IconCheck className="w-5 h-5 text-success" />}
                        {showWrong && <IconX className="w-5 h-5 text-error" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
