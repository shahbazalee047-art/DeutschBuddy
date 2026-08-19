import { useMemo } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { BuddyAvatar, BuddySpeechBubble, pickPhrase, getGreetingByTime } from '../components/buddy';
import { IconFire, IconStar, IconTrophy, IconClock } from '../components/Icons';
import ReviseCard from '../components/ReviseCard';
import ContinueCard from '../components/ContinueCard';
import BannerAd from '../components/BannerAd';
import { getUserValue } from '../utils/userStorage';

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
  const { user, profile, progress, levelData, handleSelectDay, handleSelectTask, unlockedWeeks, startPractice, activeLevel } = useDashboard();

  const nextLesson = useMemo(() => getNextLesson(levelData, progress), [levelData, progress]);
  const greeting = useMemo(() => pickPhrase(getGreetingByTime()), []);
  const streak = progress?.streak || 0;
  const xp = progress?.xp || 0;
  const dailyGoal = useMemo(() => {
    const stored = Number(getUserValue(user?.id, 'daily_goal', 20));
    return stored > 0 ? stored : 20;
  }, [user?.id]);
  const dailyProgress = Math.min((progress?.todayXP || 0) / dailyGoal, 1);

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

        {/* Main CTA — resumes the track, or offers Free Practice when the track
            is complete or the daily target is met. data-coachmark anchors the
            first-run Start Here hint. */}
        <ContinueCard
          progress={progress}
          activeLevel={activeLevel}
          levelData={levelData}
          onContinue={handleSelectDay}
          onStartPractice={startPractice}
        />

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
        <BannerAd />
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
