import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { getWeekCompletion } from '../utils/progress';
import { englishTopicTitle } from '../utils/topicTitle';
import { IconCheck, IconChevronDown, IconLock } from './Icons';

const WeeklyModule = memo(function WeeklyModule({ week, completedTasks, onSelectDay, selectedDay, isUnlocked }) {
  const [expanded, setExpanded] = useState(false);
  const [shakeDay, setShakeDay] = useState(null);
  const shakeTimerRef = useRef(null);
  const safeDays = Array.isArray(week?.days) ? week.days : [];
  const completedSet = useMemo(() => new Set(Array.isArray(completedTasks) ? completedTasks : []), [completedTasks]);
  const completion = getWeekCompletion(safeDays, completedSet);
  const isComplete = completion === 100;
  const weekXP = safeDays.reduce((sum, day) => sum + (day.tasks || []).filter(task => completedSet.has(task.id)).reduce((taskSum, task) => taskSum + (task.xp || 0), 0), 0);
  const totalWeekXP = safeDays.reduce((sum, day) => sum + (day.tasks || []).reduce((taskSum, task) => taskSum + (task.xp || 0), 0), 0);

  useEffect(() => () => clearTimeout(shakeTimerRef.current), []);

  function isDayUnlocked(day) {
    if (!isUnlocked) return false;
    const index = safeDays.findIndex(item => item.day === day.day);
    if (index <= 0) return true;
    return safeDays.slice(0, index).every(item => (item.tasks || []).length === 0 || item.tasks.every(task => completedSet.has(task.id)));
  }

  function handleDayClick(day) {
    if (!isDayUnlocked(day)) {
      setShakeDay(day.day);
      clearTimeout(shakeTimerRef.current);
      shakeTimerRef.current = setTimeout(() => setShakeDay(null), 400);
      return;
    }
    setExpanded(true);
    onSelectDay(week.id, day.day);
  }

  function handleToggle() {
    if (!isUnlocked || isComplete) return;
    setExpanded(open => !open);
    if (!selectedDay) {
      const firstIncomplete = safeDays.find(day => (day.tasks || []).length > 0 && !day.tasks.every(task => completedSet.has(task.id)));
      if (firstIncomplete) onSelectDay(week.id, firstIncomplete.day);
    }
  }

  const state = isComplete ? 'complete' : isUnlocked ? 'active' : 'locked';
  const accent = 'var(--db-accent)';

  function renderDays() {
    return (
      <div className="relative flex justify-center gap-2 py-3">
        <div className="absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-border" aria-hidden="true" />
        {safeDays.map(day => {
          const tasks = day?.tasks || [];
          const dayDone = tasks.length > 0 && tasks.every(task => completedSet.has(task.id));
          const isCurrentDay = selectedDay?.day === day.day && selectedDay?.weekId === week.id;
          const dayUnlocked = isDayUnlocked(day);
          const shaking = shakeDay === day.day && !dayUnlocked;
          return (
            <button
              key={day.day}
              type="button"
              onClick={() => handleDayClick(day)}
              aria-disabled={!dayUnlocked}
              aria-label={`Day ${day.day}${dayDone ? ', completed' : !dayUnlocked ? ', locked' : ''}`}
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border text-sm font-bold transition-[background-color,border-color,transform] active:scale-[0.96] sm:h-12 sm:w-12 ${shaking ? 'animate-shake' : ''} ${dayDone ? 'border-success bg-success-light text-success' : !dayUnlocked ? 'cursor-not-allowed border-border bg-bg-secondary text-text-muted' : isCurrentDay ? 'border-primary bg-primary-light text-primary ring-2 ring-primary/20' : 'border-border bg-surface text-text-body hover:border-primary'}`}
            >
              {dayDone ? <IconCheck className="h-4 w-4" /> : !dayUnlocked ? <IconLock className="h-3.5 w-3.5" /> : tasks.some(task => !completedSet.has(task.id)) ? <span className="h-2 w-2" style={{ background: accent }} /> : day.day}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <article className={`weekly-module relative overflow-hidden ${state === 'active' ? 'border border-primary/25 border-l-4 border-l-primary bg-primary-light text-text-body shadow-db-card' : state === 'complete' ? 'border border-border border-l-4 border-l-success bg-success-light text-text-body' : 'border-l-4 border-l-border bg-bg-secondary text-text-body opacity-65'}`}>
      {isComplete && <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center bg-success text-white" aria-label="Completed"><IconCheck className="h-4 w-4" /></span>}
      {!isUnlocked && <span className="absolute right-0 top-0 inline-flex items-center gap-1 bg-border px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted"><IconLock className="h-3 w-3" /> Locked</span>}

      <div className="p-5 sm:p-6">
        <button type="button" onClick={handleToggle} disabled={!isUnlocked} aria-expanded={expanded} className="w-full text-left disabled:cursor-not-allowed">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center text-sm font-bold ${isComplete ? 'bg-success text-white' : isUnlocked ? 'border border-primary/30 bg-surface text-primary' : 'bg-bg-secondary text-text-muted'}`}>
                {isComplete ? <IconCheck className="h-5 w-5" /> : `W${week.id}`}
              </span>
              <span className="min-w-0">
                <span className={`mb-1 block text-[10px] font-bold uppercase tracking-[1.5px] ${isComplete ? 'text-success' : isUnlocked ? 'text-primary' : 'text-text-muted'}`}>Week {week.id}</span>
                <span className="block truncate font-display text-2xl font-bold text-text-dark">{englishTopicTitle(week.title)}</span>
                <span className="mt-1 block truncate text-sm text-text-muted">{week.theme}</span>
              </span>
            </div>
            <span className="flex shrink-0 items-center gap-2">
              <span className="hidden text-xs font-bold text-text-muted sm:inline">{isUnlocked ? `${weekXP}/${totalWeekXP} XP` : `${totalWeekXP} XP`}</span>
              <IconChevronDown className={`h-5 w-5 text-text-muted transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </span>
          </div>
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-[11px] font-bold uppercase tracking-wider text-text-muted"><span>Progress</span><span className="tabular-nums">{completion}%</span></div>
            <div className="progress-bar bg-border-light"><div className={`progress-bar-fill ${isComplete ? 'bg-success' : ''}`} style={{ width: `${completion}%` }} /></div>
          </div>
        </button>
        {isUnlocked && !isComplete && (expanded ? renderDays() : <div className="mt-2">{renderDays()}</div>)}
      </div>
    </article>
  );
});

export default WeeklyModule;
