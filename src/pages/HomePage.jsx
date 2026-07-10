import { useMemo } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { BuddyAvatar, BuddySpeechBubble, pickPhrase, getGreetingByTime } from '../components/buddy';
import { IconFire, IconStar, IconTrophy, IconClock, IconArrowRight } from '../components/Icons';
import ReviseCard from '../components/ReviseCard';

function getNextLesson(levelData, progress) {
  if (!levelData?.weeks) return null;
  const completed = new Set(progress?.completedTasks || []);
  for (const week of levelData.weeks) {
    for (const day of week.days) {
      const remaining = day.tasks?.filter(t => !completed.has(t.id));
      if (remaining?.length > 0) {
        return { week, day, task: remaining[0], remainingCount: remaining.length };
      }
    }
  }
  return null;
}

export default function HomePage({ onViewJourney }) {
  const { profile, progress, levelData, handleSelectDay, handleSelectTask, unlockedWeeks } = useDashboard();

  const nextLesson = useMemo(() => getNextLesson(levelData, progress), [levelData, progress]);
  const greeting = useMemo(() => pickPhrase(getGreetingByTime()), []);
  const streak = progress?.streak || 0;
  const xp = progress?.xp || 0;
  const dailyGoal = useMemo(() => {
    try {
      const stored = Number(localStorage.getItem('db_daily_goal'));
      return stored > 0 ? stored : 20;
    } catch { return 20; }
  }, []);
  const dailyProgress = Math.min((progress?.todayXP || 0) / dailyGoal, 1);

  const handleStart = () => {
    if (nextLesson) {
      handleSelectDay(nextLesson.week.id, nextLesson.day.day);
    } else if (onViewJourney) {
      onViewJourney();
    }
  };

  const completedSet = new Set(progress?.completedTasks || []);
  const handleWeekClick = (week) => {
    if (!unlockedWeeks?.includes(week.id)) return;
    // Jump straight into the week's next incomplete lesson (or first task if the
    // week is fully complete, so the learner can review).
    const firstIncompleteDay = (week.days || []).find(d =>
      (d.tasks || []).some(t => !completedSet.has(t.id))
    ) || week.days?.[0];
    if (!firstIncompleteDay) return;
    const firstTask = (firstIncompleteDay.tasks || []).find(t => !completedSet.has(t.id))
      || firstIncompleteDay.tasks?.[0];
    handleSelectDay(week.id, firstIncompleteDay.day);
    if (firstTask) handleSelectTask(firstTask);
  };

  // Open a task from the Revise list directly in the lesson player.
  const handleRetryRevise = ({ task, weekId, dayNumber }) => {
    handleSelectDay(weekId, dayNumber);
    handleSelectTask(task);
  };

  return (
    <div className="min-h-full bg-bg-base px-4 py-6 pb-24 lg:pb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header greeting */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <BuddyAvatar state="waving" size={72} />
            <div className="absolute -top-1 -right-1">
              <BuddySpeechBubble position="right" tone="neutral" className="hidden sm:block">
                {greeting}
              </BuddySpeechBubble>
            </div>
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium">{pickPhrase(getGreetingByTime())}</p>
            <h1 className="text-2xl font-bold text-text-dark">
              Hallo, <span className="text-primary">{profile?.full_name?.split(' ')[0] || 'Learner'}</span>!
            </h1>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<IconFire className="w-5 h-5 text-gold" />} value={streak} label="Streak" />
          <StatCard icon={<IconStar className="w-5 h-5 text-gold" />} value={xp} label="XP" />
          <StatCard icon={<IconTrophy className="w-5 h-5 text-primary" />} value={progress?.badges?.length || 0} label="Badges" />
        </div>

        {/* Daily goal */}
        <div className="db-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <IconClock className="w-5 h-5 text-primary" />
              <span className="font-semibold text-text-dark">Daily Goal</span>
            </div>
            <span className="text-sm text-text-muted">{progress?.todayXP || 0} / {dailyGoal} XP</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${dailyProgress * 100}%` }} />
          </div>
        </div>

        {/* Main CTA */}
        <button
          onClick={handleStart}
          data-coachmark="start-lesson"
          className="w-full db-card db-card-hover p-6 text-left group relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">
              {nextLesson ? 'Continue Learning' : 'Start Your Journey'}
            </p>
            <h2 className="text-xl font-bold text-text-dark mb-2">
              {nextLesson
                ? `${nextLesson.week.title} · Day ${nextLesson.day.day}`
                : levelData?.title || 'Deutsch A1–A2'}
            </h2>
            <p className="text-text-muted text-sm mb-4">
              {nextLesson
                ? `${nextLesson.task.title} — ${nextLesson.remainingCount} task${nextLesson.remainingCount > 1 ? 's' : ''} left`
                : 'Begin your first lesson with Buddy today.'}
            </p>
            <span className="db-btn db-btn-primary inline-flex px-6 py-3 text-sm">
              {nextLesson ? 'Start Lesson' : 'Begin Journey'}
              <IconArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
            <BuddyAvatar state="happy" size={140} />
          </div>
        </button>

        {/* Revise list — tasks answered wrong, surfaced for retry */}
        <ReviseCard
          reviseTasks={progress?.reviseTasks || []}
          levelData={levelData}
          onRetry={handleRetryRevise}
        />

        {/* Journey preview */}
        {levelData?.weeks && (
          <div className="db-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-text-dark">Your Journey</h3>
              <button onClick={onViewJourney} className="text-sm font-semibold text-primary hover:underline">
                View Map
              </button>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {levelData.weeks.slice(0, 6).map((week, i) => {
                const isCompleted = progress?.completedTasks?.length > 0 && week.days.every(d =>
                  d.tasks.every(t => completedSet.has(t.id))
                );
                const isCurrent = nextLesson?.week.id === week.id;
                const isLocked = !unlockedWeeks?.includes(week.id);
                return (
                  <button
                    key={week.id}
                    onClick={() => handleWeekClick(week)}
                    disabled={isLocked}
                    aria-label={`Week ${week.id}: ${week.title}${isLocked ? ' (locked)' : isCompleted ? ' (completed)' : ''}`}
                    className={`
                      flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-transform
                      ${isLocked ? 'cursor-not-allowed' : 'hover:scale-110 active:scale-95 cursor-pointer'}
                      ${isCompleted ? 'bg-success text-white' : isCurrent ? 'bg-primary text-white ring-4 ring-primary/20' : isLocked ? 'bg-bg-secondary text-text-muted opacity-50' : 'bg-bg-secondary text-text-dark hover:text-primary'}
                    `}
                  >
                    {isCompleted ? '✓' : i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="db-card p-3 flex flex-col items-center text-center">
      <div className="mb-1">{icon}</div>
      <div className="text-xl font-bold text-text-dark tabular-nums">{value}</div>
      <div className="text-xs text-text-muted font-medium">{label}</div>
    </div>
  );
}
