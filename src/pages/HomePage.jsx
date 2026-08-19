import { useMemo } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { BuddyAvatar, BuddySpeechBubble, pickPhrase, getGreetingByTime } from '../components/buddy';
import { IconArrowRight, IconBookOpen, IconClock, IconFire, IconStar, IconTrophy } from '../components/Icons';
import ReviseCard from '../components/ReviseCard';
import ContinueCard from '../components/ContinueCard';
import BannerAd from '../components/BannerAd';
import { getUserValue } from '../utils/userStorage';

function getNextLesson(levelData, progress) {
  if (!levelData?.weeks) return null;
  const completed = new Set(progress?.completedTasks || []);
  for (const week of levelData.weeks) {
    for (const day of week.days || []) {
      const task = (day.tasks || []).find(item => !completed.has(item.id));
      if (task) return { week, day, task };
    }
  }
  return null;
}

export default function HomePage({ onViewJourney }) {
  const { user, profile, progress, levelData, handleSelectDay, handleSelectTask, unlockedWeeks, startPractice, activeLevel } = useDashboard();
  const nextLesson = useMemo(() => getNextLesson(levelData, progress), [levelData, progress]);
  const greeting = useMemo(() => pickPhrase(getGreetingByTime()), []);
  const completedSet = useMemo(() => new Set(progress?.completedTasks || []), [progress?.completedTasks]);
  const dailyGoal = useMemo(() => {
    const stored = Number(getUserValue(user?.id, 'daily_goal', 20));
    return stored > 0 ? stored : 20;
  }, [user?.id]);
  const todayXP = progress?.todayXP || 0;
  const dailyProgress = Math.min(todayXP / dailyGoal, 1);

  function handleWeekClick(week) {
    if (!unlockedWeeks?.includes(week.id)) return;
    const day = (week.days || []).find(item => (item.tasks || []).some(task => !completedSet.has(task.id))) || week.days?.[0];
    if (!day) return;
    const task = (day.tasks || []).find(item => !completedSet.has(item.id)) || day.tasks?.[0];
    handleSelectDay(week.id, day.day);
    if (task) handleSelectTask(task);
  }

  function handleRetryRevise({ task, weekId, dayNumber }) {
    handleSelectDay(weekId, dayNumber);
    handleSelectTask(task);
  }

  return (
    <div className="db-page min-h-full px-4 py-6 pb-24 lg:py-8 lg:pb-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center gap-4">
          <div className="relative shrink-0">
            <BuddyAvatar state="waving" size={72} />
            <BuddySpeechBubble position="right" tone="neutral" className="hidden sm:block">{greeting}</BuddySpeechBubble>
          </div>
          <div className="min-w-0">
            <p className="db-section-label mb-2">{activeLevel} learning workspace</p>
            <h1 className="text-3xl font-bold text-text-dark sm:text-4xl">
              Hallo, <span className="text-primary">{profile?.full_name?.split(' ')[0] || 'Learner'}</span>.
            </h1>
            <p className="mt-1 text-sm text-text-muted">{pickPhrase(getGreetingByTime())}</p>
          </div>
        </header>

        <ContinueCard
          progress={progress}
          activeLevel={activeLevel}
          levelData={levelData}
          onContinue={handleSelectDay}
          onStartPractice={startPractice}
        />

        <section aria-labelledby="today-heading" className="space-y-3">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="db-section-label mb-2">Today</p>
              <h2 id="today-heading" className="db-section-title">A focused session is enough.</h2>
            </div>
            <span className="shrink-0 text-sm font-semibold tabular-nums text-text-muted">{todayXP} / {dailyGoal} XP</span>
          </div>
          <div className="db-surface-list p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-bold text-text-dark"><IconClock className="h-4 w-4 text-primary" /> Daily goal</span>
              <span className="text-xs font-semibold text-text-muted">{Math.round(dailyProgress * 100)}% complete</span>
            </div>
            <div className="progress-bar" aria-label={`${Math.round(dailyProgress * 100)} percent of today's goal`} role="progressbar" aria-valuenow={Math.round(dailyProgress * 100)} aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar-fill" style={{ width: `${dailyProgress * 100}%` }} />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard icon={<IconFire className="h-5 w-5 text-accent" />} value={progress?.streak || 0} label="Day streak" />
          <StatCard icon={<IconStar className="h-5 w-5 text-primary" />} value={progress?.xp || 0} label="Total XP" />
          <StatCard icon={<IconTrophy className="h-5 w-5 text-success" />} value={progress?.badges?.length || 0} label="Badges" />
          <StatCard icon={<IconBookOpen className="h-5 w-5 text-accent" />} value={progress?.completedTasks?.length || 0} label="Tasks done" />
        </div>

        <ReviseCard reviseTasks={progress?.reviseTasks || []} levelData={levelData} onRetry={handleRetryRevise} />

        {levelData?.weeks && (
          <section className="db-surface-list p-4 sm:p-5" aria-labelledby="journey-preview-heading">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="db-section-label mb-2">Course roadmap</p>
                <h2 id="journey-preview-heading" className="db-section-title text-2xl">Your learning journey</h2>
              </div>
              <button type="button" onClick={onViewJourney} className="inline-flex min-h-10 shrink-0 items-center gap-1 text-sm font-bold text-primary hover:underline">
                View all <IconArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {levelData.weeks.slice(0, 6).map((week, index) => {
                const isCompleted = (week.days || []).every(day => (day.tasks || []).every(task => completedSet.has(task.id)));
                const isCurrent = nextLesson?.week.id === week.id;
                const isLocked = !unlockedWeeks?.includes(week.id);
                return (
                  <button
                    key={week.id}
                    type="button"
                    onClick={() => handleWeekClick(week)}
                    disabled={isLocked}
                    aria-label={`Week ${week.id}: ${week.title}${isLocked ? ' (locked)' : isCompleted ? ' (completed)' : ''}`}
                    className={`min-h-20 border p-2 text-left transition-[background-color,border-color,transform] active:scale-[0.96] ${isCompleted ? 'border-success bg-success-light' : isCurrent ? 'border-primary bg-primary-light' : isLocked ? 'border-border bg-bg-secondary text-text-muted opacity-60' : 'border-border bg-surface hover:border-primary'}`}
                  >
                    <span className={`mb-2 flex h-7 w-7 items-center justify-center text-xs font-bold ${isCompleted ? 'bg-success text-white' : isCurrent ? 'bg-primary text-white' : 'bg-bg-secondary text-text-body'}`}>{isCompleted ? '✓' : index + 1}</span>
                    <span className="block truncate text-xs font-bold text-text-dark">Week {week.id}</span>
                    <span className="mt-0.5 block truncate text-[11px] text-text-muted">{week.title}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}
        <BannerAd />
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="db-stat-card">
      <span>{icon}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
