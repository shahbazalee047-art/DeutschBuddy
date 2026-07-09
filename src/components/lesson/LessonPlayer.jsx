import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskRenderer from '../TaskRenderer';
import { BuddyAvatar, BuddySpeechBubble, pickPhrase } from '../buddy';
import { germanTopicTitle } from '../../utils/topicTitle';
import { IconX } from '../Icons';

export default function LessonPlayer({ task, tasks, currentIndex, topicTitle, onComplete, onExit }) {
  const containerRef = useRef(null);
  const [buddyState, setBuddyState] = useState('idle');
  const [buddyPhrase, setBuddyPhrase] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleTone, setBubbleTone] = useState('neutral');

  const total = tasks?.length || 1;
  const progress = useMemo(() => ((currentIndex + 1) / total) * 100, [currentIndex, total]);
  const topicDe = useMemo(() => germanTopicTitle(topicTitle), [topicTitle]);

  const triggerBuddy = useCallback((state, phraseCategory, tone = 'neutral', duration = 2000) => {
    setBuddyState(state);
    setBuddyPhrase(pickPhrase(phraseCategory));
    setBubbleTone(tone);
    setShowBubble(true);
    if (duration > 0) {
      setTimeout(() => setShowBubble(false), duration);
    }
  }, []);

  const handleTaskResult = useCallback((result) => {
    const isSuccess = result && typeof result.score === 'number' && result.maxScore > 0
      ? result.score / result.maxScore >= 0.5
      : true;

    if (isSuccess) {
      triggerBuddy('happy', 'correct', 'success', 1800);
    } else {
      triggerBuddy('encourage', 'incorrect', 'encourage', 2200);
    }

    // Delay completion slightly so the animation plays.
    setTimeout(() => {
      onComplete?.(result);
    }, 600);
  }, [onComplete, triggerBuddy]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex flex-col bg-bg-base outline-none"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border safe-area-top">
        <button
          onClick={onExit}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors"
          aria-label="Exit lesson"
        >
          <IconX className="w-6 h-6 text-text-muted" />
        </button>

        <div className="flex-1 mx-4">
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <p className="text-center text-xs text-text-muted mt-1">
            {currentIndex + 1} / {total}
          </p>
        </div>

        <div className="w-10" />
      </div>

      {/* Topic name (German) — revealed inside the lesson */}
      {topicDe && (
        <div className="px-4 pt-3 bg-surface">
          <p className="max-w-2xl mx-auto text-[12px] font-semibold tracking-wide" style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
            {topicDe}
          </p>
        </div>
      )}

      {/* Buddy corner */}
      <div className="absolute top-16 right-4 z-20 flex flex-col items-end">
        <BuddyAvatar state={buddyState} size={64} />
        {showBubble && (
          <BuddySpeechBubble position="bottom" tone={bubbleTone} className="mt-2">
            {buddyPhrase}
          </BuddySpeechBubble>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={task?.id || currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl mx-auto pt-16"
          >
            <TaskRenderer task={task} onComplete={handleTaskResult} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
