import { useDashboard } from '../contexts/DashboardContext';
import { BuddyAvatar } from '../components/buddy';
import { IconCheck, IconChevronRight, IconLock, IconPlay } from '../components/Icons';
import { englishTopicTitle } from '../utils/topicTitle';

const JOURNEY_LOCATIONS = ['Home', 'Café', 'Market', 'Train station', 'Hotel', 'University', 'Office', 'Airport', 'Exam day'];

export default function JourneyPage({ onStartLesson }) {
  const { levelData, progress, unlockedWeeks, handleSelectDay, handleSelectTask } = useDashboard();
  const completed = new Set(progress?.completedTasks || []);
  const weeks = levelData?.weeks || [];
  const activeIndex = Math.max(0, weeks.findIndex(week => unlockedWeeks.includes(week.id) && !week.days.every(day => day.tasks.every(task => completed.has(task.id)))));
  const completedCount = weeks.filter(week => week.days.every(day => day.tasks.every(task => completed.has(task.id)))).length;

  function handleNodeClick(week) {
    if (!unlockedWeeks.includes(week.id)) return;
    const day = week.days.find(item => item.tasks.some(task => !completed.has(task.id))) || week.days[0];
    const task = day?.tasks?.find(item => !completed.has(item.id)) || day?.tasks?.[0];
    if (!day) return;
    handleSelectDay(week.id, day.day);
    if (task) handleSelectTask(task);
    onStartLesson?.();
  }

  return (
    <div className="db-page min-h-full px-4 py-6 pb-24 lg:py-8 lg:pb-8">
      <div className="db-content-width max-w-4xl">
        <header className="mb-8 flex items-center gap-4">
          <BuddyAvatar state="idle" size={64} />
          <div>
            <p className="db-section-label mb-2">Your roadmap</p>
            <h1 className="text-4xl font-bold text-text-dark">German, one useful step at a time.</h1>
            <p className="mt-1 text-sm text-text-muted">{completedCount} of {weeks.length} weeks complete · Follow the next blue step.</p>
          </div>
        </header>

        <div className="relative">
          <div className="absolute bottom-7 left-5 top-7 w-px bg-border sm:left-6" aria-hidden="true" />
          <div className="space-y-4">
            {weeks.map((week, index) => {
              const location = JOURNEY_LOCATIONS[index % JOURNEY_LOCATIONS.length];
              const isUnlocked = unlockedWeeks.includes(week.id);
              const isCompleted = week.days.every(day => day.tasks.every(task => completed.has(task.id)));
              const isCurrent = index === activeIndex && isUnlocked && !isCompleted;
              return (
                <div key={week.id} className="relative flex items-start gap-4 sm:gap-5">
                  <button
                    type="button"
                    onClick={() => handleNodeClick(week)}
                    disabled={!isUnlocked}
                    aria-label={`${location}: ${week.title}${isUnlocked ? '' : ', locked'}`}
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border text-sm font-bold transition-[background-color,border-color,transform] active:scale-[0.96] sm:h-12 sm:w-12 ${isCompleted ? 'border-success bg-success text-white' : isCurrent ? 'border-primary bg-primary text-white ring-4 ring-primary/15' : isUnlocked ? 'border-primary bg-surface text-primary' : 'border-border bg-bg-secondary text-text-muted'}`}
                  >
                    {isCompleted ? <IconCheck className="h-5 w-5" /> : isCurrent ? <IconPlay className="h-5 w-5" /> : isUnlocked ? <span>{index + 1}</span> : <IconLock className="h-4 w-4" />}
                  </button>
                  <article className={`db-surface-list min-w-0 flex-1 p-4 sm:p-5 ${!isUnlocked ? 'opacity-60' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className={`mb-1 text-[10px] font-bold uppercase tracking-[1.5px] ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-muted'}`}>{location} · Week {week.id}</p>
                        <h2 className="truncate text-2xl font-bold text-text-dark">{englishTopicTitle(week.title)}</h2>
                        <p className="mt-1 text-sm leading-relaxed text-text-muted">{week.description || week.theme}</p>
                      </div>
                      {isCompleted ? <span className="shrink-0 text-xs font-bold text-success">Complete</span> : isCurrent ? <span className="shrink-0 text-xs font-bold text-primary">Current</span> : isUnlocked ? <IconChevronRight className="h-5 w-5 shrink-0 text-text-muted" /> : <IconLock className="h-4 w-4 shrink-0 text-text-muted" />}
                    </div>
                    {isCurrent && <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-sm font-semibold text-primary"><BuddyAvatar state="waving" size={28} /><span>Start here — your next lesson is ready.</span></div>}
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
