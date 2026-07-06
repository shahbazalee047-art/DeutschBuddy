import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BuddyAvatar, BuddySpeechBubble } from '../components/buddy';
import { IconTarget, IconBook, IconClock, IconArrowRight, IconCheck, IconX } from '../components/Icons';

const slides = [
  {
    title: 'Hallo! Ich bin Buddy.',
    description: 'Your German Shepherd companion. I\'ll guide you through every word, phrase, and grammar rule.',
    buddyState: 'waving'
  },
  {
    title: 'Bite-sized lessons',
    description: 'Learn real German through everyday scenes: cafés, trains, shops, and more.',
    buddyState: 'happy'
  },
  {
    title: 'Practice every day',
    description: 'Build a streak, earn XP, and collect badges while Buddy cheers you on.',
    buddyState: 'celebrate'
  }
];

const placementQuestions = [
  { german: 'Hallo', options: ['Hello', 'Goodbye', 'Please', 'Thanks'], answer: 0 },
  { german: 'Danke', options: ['Sorry', 'Thanks', 'Yes', 'No'], answer: 1 },
  { german: 'Wasser', options: ['Bread', 'Water', 'Apple', 'Coffee'], answer: 1 },
  { german: 'Ich heiße...', options: ['I am...', 'My name is...', 'I come from...', 'I live in...'], answer: 1 }
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('intro'); // intro | level | placement | goal | done
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [placementScore, setPlacementScore] = useState(0);
  const [placementIndex, setPlacementIndex] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleNextSlide = () => {
    if (slideIndex < slides.length - 1) setSlideIndex(i => i + 1);
    else setStep('level');
  };

  const handleStartPlacement = () => setStep('placement');

  const handlePlacementAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    const isCorrect = index === placementQuestions[placementIndex].answer;
    if (isCorrect) setPlacementScore(s => s + 1);
    setShowResult(true);
    setTimeout(() => {
      if (placementIndex < placementQuestions.length - 1) {
        setPlacementIndex(i => i + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const recommended = placementScore + (isCorrect ? 1 : 0) >= 2 ? 'A2' : 'A1';
        setSelectedLevel(recommended);
        setStep('goal');
      }
    }, 900);
  };

  const handleFinish = () => {
    try {
      localStorage.setItem('db_selected_level', selectedLevel || 'A1');
      localStorage.setItem('db_daily_goal', String(dailyGoal));
      localStorage.setItem('db_onboarded', 'true');
    } catch { /* ignore */ }
    navigate('/signup');
  };

  const slide = slides[slideIndex];

  return (
    <div className="min-h-dvh bg-bg-base flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6 relative">
                <BuddyAvatar state={slide.buddyState} size={160} />
                <div className="absolute -top-2 -right-4">
                  <BuddySpeechBubble position="right" tone="neutral">
                    {slide.title}
                  </BuddySpeechBubble>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-text-dark mb-3">{slide.title}</h1>
              <p className="text-text-muted text-base mb-8 leading-relaxed">{slide.description}</p>

              <div className="flex justify-center gap-2 mb-8">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${i === slideIndex ? 'w-8 bg-primary' : 'w-2 bg-border'}`}
                  />
                ))}
              </div>

              <button onClick={handleNextSlide} className="db-btn db-btn-primary w-full mb-3">
                {slideIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                <IconArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button onClick={() => setStep('level')} className="db-btn db-btn-ghost w-full">
                Skip Intro
              </button>
            </motion.div>
          )}

          {step === 'level' && (
            <motion.div
              key="level"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-6">
                <BuddyAvatar state="thinking" size={80} />
                <h2 className="text-2xl font-bold text-text-dark mt-4">Where should we start?</h2>
                <p className="text-text-muted text-sm">Pick a level or take a quick placement test.</p>
              </div>

              <div className="space-y-3 mb-6">
                <LevelCard
                  selected={selectedLevel === 'A1'}
                  onClick={() => setSelectedLevel('A1')}
                  icon={<IconTarget className="w-7 h-7 text-primary" />}
                  title="A1 — Beginner"
                  description="No prior German. Alphabet, greetings, basics."
                />
                <LevelCard
                  selected={selectedLevel === 'A2'}
                  onClick={() => setSelectedLevel('A2')}
                  icon={<IconBook className="w-7 h-7 text-primary" />}
                  title="A2 — Elementary"
                  description="Some German. Travel, past tense, longer sentences."
                />
              </div>

              <button
                onClick={handleStartPlacement}
                className="w-full db-btn db-btn-secondary mb-3"
              >
                Take Placement Test
              </button>
              <button
                onClick={() => selectedLevel && setStep('goal')}
                disabled={!selectedLevel}
                className="w-full db-btn db-btn-primary disabled:opacity-40"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 'placement' && (
            <motion.div
              key="placement"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-4">
                <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Placement Test</p>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${((placementIndex + 1) / placementQuestions.length) * 100}%` }} />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-text-dark mb-2">
                  {placementQuestions[placementIndex].german}
                </h2>
                <p className="text-text-muted text-sm">What does this mean?</p>
              </div>

              <div className="space-y-3">
                {placementQuestions[placementIndex].options.map((option, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === placementQuestions[placementIndex].answer;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;
                  return (
                    <button
                      key={i}
                      onClick={() => handlePlacementAnswer(i)}
                      disabled={showResult}
                      className={`
                        w-full p-4 rounded-xl border-2 text-left font-medium transition-all active:scale-98
                        ${showCorrect ? 'border-success bg-db-success-light' :
                          showWrong ? 'border-db-error bg-db-error-light' :
                          isSelected ? 'border-primary bg-primary-light' :
                          'border-border bg-surface hover:border-primary/50'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showCorrect && <IconCheck className="w-5 h-5 text-success" />}
                        {showWrong && <IconX className="w-5 h-5 text-db-error" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 'goal' && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <BuddyAvatar state="happy" size={100} />
              <h2 className="text-2xl font-bold text-text-dark mt-4 mb-2">Set your daily goal</h2>
              <p className="text-text-muted text-sm mb-6">Buddy will help you stay on track.</p>

              <div className="space-y-3 mb-8">
                {[10, 20, 30].map(goal => (
                  <button
                    key={goal}
                    onClick={() => setDailyGoal(goal)}
                    className={`
                      w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all
                      ${dailyGoal === goal ? 'border-primary bg-primary-light' : 'border-border bg-surface hover:border-primary/50'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <IconClock className={`w-6 h-6 ${dailyGoal === goal ? 'text-primary' : 'text-text-muted'}`} />
                      <div className="text-left">
                        <p className="font-bold text-text-dark">{goal} XP / day</p>
                        <p className="text-xs text-text-muted">{goal <= 10 ? '~5 min' : goal <= 20 ? '~10 min' : '~15 min'}</p>
                      </div>
                    </div>
                    {dailyGoal === goal && <IconCheck className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>

              <button onClick={handleFinish} className="db-btn db-btn-primary w-full">
                Start Learning
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LevelCard({ selected, onClick, icon, title, description }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-xl border-2 text-left flex items-start gap-4 transition-all active:scale-98
        ${selected ? 'border-primary bg-primary-light' : 'border-border bg-surface hover:border-primary/50'}
      `}
    >
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-bold text-text-dark">{title}</h3>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
    </button>
  );
}
