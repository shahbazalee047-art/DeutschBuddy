import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskRenderer from '../TaskRenderer';
import { BuddyAvatar, BuddySpeechBubble, pickPhrase } from '../buddy';
import { germanTopicTitle } from '../../utils/topicTitle';
import { IconArrowLeft, IconX } from '../Icons';

export default function LessonPlayer({ task, tasks, currentIndex, topicTitle, onComplete, onExit, practice = false }) {
  const containerRef = useRef(null);
  const [buddyState, setBuddyState] = useState('idle');
  const [buddyPhrase, setBuddyPhrase] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleTone, setBubbleTone] = useState('neutral');
  const completedRef = useRef(undefined);
  const completeTimerRef = useRef(null);
  const bubbleTimerRef = useRef(null);
  const total = tasks?.length || 1;
  const progress = useMemo(() => ((currentIndex + 1) / total) * 100, [currentIndex, total]);
  const topicDe = useMemo(() => germanTopicTitle(topicTitle), [topicTitle]);

  useEffect(() => { completedRef.current = undefined; }, [task?.id]);
  useEffect(() => () => {
    clearTimeout(completeTimerRef.current);
    clearTimeout(bubbleTimerRef.current);
  }, []);

  const triggerBuddy = useCallback((state, phraseCategory, tone = 'neutral', duration = 2000) => {
    setBuddyState(state);
    setBuddyPhrase(pickPhrase(phraseCategory));
    setBubbleTone(tone);
    setShowBubble(true);
    if (duration > 0) {
      clearTimeout(bubbleTimerRef.current);
      bubbleTimerRef.current = setTimeout(() => setShowBubble(false), duration);
    }
  }, []);

  const handleTaskResult = useCallback((result) => {
    if (completedRef.current) return;
    completedRef.current = true;
    const isSuccess = result && typeof result.score === 'number' && result.maxScore > 0 ? result.score / result.maxScore >= 0.5 : true;
    triggerBuddy(isSuccess ? 'happy' : 'encourage', isSuccess ? 'correct' : 'incorrect', isSuccess ? 'success' : 'encourage', 1800);
    clearTimeout(completeTimerRef.current);
    completeTimerRef.current = setTimeout(() => onComplete?.(result), 600);
  }, [onComplete, triggerBuddy]);

  useEffect(() => { containerRef.current?.focus(); }, []);

  return (
    <div ref={containerRef} tabIndex={-1} className="fixed inset-0 z-[60] flex flex-col bg-bg-base outline-none" role="dialog" aria-label={task?.title || 'German lesson'}>
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-surface px-4 py-3 safe-area-top sm:px-6">
        <button type="button" onClick={onExit} className="flex h-10 w-10 items-center justify-center text-text-muted transition-colors hover:bg-bg-secondary hover:text-primary" aria-label="Exit lesson">
          <IconArrowLeft className="h-5 w-5" />
        </button>
        <div className="mx-4 min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">
            <span>{practice ? 'Practice session' : 'Lesson progress'}</span>
            <span className="tabular-nums">{currentIndex + 1} / {total}</span>
          </div>
          <div className="progress-bar" role="progressbar" aria-label="Exercise progress" aria-valuenow={currentIndex + 1} aria-valuemin="1" aria-valuemax={total}><motion.div className="progress-bar-fill" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: 'easeOut' }} /></div>
        </div>
        <button type="button" onClick={onExit} className="flex h-10 w-10 items-center justify-center text-text-muted transition-colors hover:bg-bg-secondary hover:text-primary" aria-label="Close lesson"><IconX className="h-5 w-5" /></button>
      </header>

      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
          <div>{topicDe && <p className="text-sm font-semibold italic text-primary">{topicDe}</p>}<p className="mt-0.5 text-xs text-text-muted">Take your time. German content comes first.</p></div>
          <div className="hidden items-center gap-2 sm:flex"><BuddyAvatar state={buddyState} size={40} />{showBubble && <BuddySpeechBubble position="bottom" tone={bubbleTone}>{buddyPhrase}</BuddySpeechBubble>}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={task?.id || currentIndex} initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }} transition={{ duration: 0.22 }} className="exercise-content mx-auto w-full max-w-3xl">
            <TaskRenderer task={task} onComplete={handleTaskResult} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
