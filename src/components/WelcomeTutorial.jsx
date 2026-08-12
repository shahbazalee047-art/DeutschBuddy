import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BuddyAvatar } from './buddy';
import { IconArrowRight, IconArrowLeft, IconX } from './Icons';

// In-app first-time tutorial. Shows once per device (localStorage flag) the first
// time a learner lands on the dashboard. A "Replay tutorial" option in Settings
// re-triggers it by clearing the flag.
//
// v2: the old v1 flag was (incorrectly) marked "seen" by the previous lesson
// deep-link flow even when the tutorial was never shown, so browsers that saw
// that version permanently skipped the tutorial. The v2 key gives every device
// a fresh, correctly-marked first run.

const TUTORIAL_KEY = 'db_tutorial_seen_v2';

function markTutorialSeen() {
  try { localStorage.setItem(TUTORIAL_KEY, '1'); } catch { /* ignore */ }
}

const STEPS = [
  {
    buddy: 'waving',
    emoji: '👋',
    title: 'Hallo! I’m Buddy.',
    body: 'Your German guide. You’ll speak real German from your very first lesson — no boring grammar drills, I promise.',
    accent: 'var(--gold)',
  },
  {
    buddy: 'happy',
    emoji: '🗺️',
    title: 'Learn by real-life topics',
    body: 'Each module is a place you’ll actually use: greeting people, the café, the train station, the market. Short days, about 6 mini-tasks each.',
    accent: 'var(--a1-blue)',
  },
  {
    buddy: 'idle',
    emoji: '✨',
    title: 'Tap to start anywhere',
    body: 'Hit the gold “Start Lesson” button to continue where you left off, or tap any week circle below it to jump into that topic.',
    accent: 'var(--gold)',
  },
  {
    buddy: 'encourage',
    emoji: '🔁',
    title: 'Mistakes are welcome',
    body: 'Get something wrong? It quietly goes to your Revise list on the home screen. Retry it until you master it — that’s how it sticks.',
    accent: 'var(--a2-red)',
  },
  {
    buddy: 'happy',
    emoji: '🔥',
    title: 'A little every day',
    body: 'Study daily to keep your streak alive. Even five minutes counts — consistency beats marathons. Earn XP, unlock badges, have fun.',
    accent: 'var(--gold)',
  },
  {
    buddy: 'celebrate',
    emoji: '🎓',
    title: 'Ready when you are',
    body: 'That’s it! You can replay this anytime from Settings. Let’s begin your first lesson. Viel Erfolg!',
    accent: 'var(--gold)',
  },
];

export default function WelcomeTutorial({ onClose }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const close = useCallback(() => {
    markTutorialSeen();
    onClose?.();
  }, [onClose]);

  const next = useCallback(() => {
    if (isLast) { close(); return; }
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  }, [isLast, close]);

  const back = useCallback(() => {
    setStep(s => Math.max(s - 1, 0));
  }, []);

  // Allow keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') back();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close, next, back]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm safe-area-top safe-area-bottom">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full max-w-md db-card overflow-hidden"
          role="dialog"
          aria-labelledby="tutorial-title"
        >
          {/* Skip */}
          {!isLast && (
            <button
              onClick={close}
              aria-label="Skip tutorial"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-text-dark hover:bg-bg-secondary transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>
          )}

          {/* Accent header band */}
          <div
            className="h-1.5 w-full"
            style={{ background: current.accent }}
          />

          <div className="p-7 pt-6 text-center">
            {/* Buddy */}
            <div className="flex justify-center mb-4">
              <BuddyAvatar state={current.buddy} size={96} />
            </div>

            {/* Emoji + title */}
            <div className="text-4xl mb-3">{current.emoji}</div>
            <h2
              id="tutorial-title"
              className="text-2xl font-bold text-text-dark mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {current.title}
            </h2>
            <p className="text-[15px] leading-relaxed text-text-body mb-6">
              {current.body}
            </p>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? 22 : 7,
                    height: 7,
                    background: i === step ? current.accent : 'var(--border-default)',
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {!isFirst && (
                <button
                  onClick={back}
                  className="db-btn db-btn-secondary flex items-center gap-1.5 px-4 py-3 text-sm"
                >
                  <IconArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                onClick={next}
                className="db-btn db-btn-primary flex-1 flex items-center justify-center gap-1.5 py-3 text-sm"
              >
                {isLast ? 'Start learning' : 'Next'}
                {!isLast && <IconArrowRight className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-text-muted mt-4">
              Step {step + 1} of {STEPS.length}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
