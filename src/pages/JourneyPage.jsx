import { useDashboard } from '../contexts/DashboardContext';
import { BuddyAvatar } from '../components/buddy';
import { IconLock, IconCheck, IconPlay } from '../components/Icons';
import { englishTopicTitle } from '../utils/topicTitle';

const JOURNEY_LOCATIONS = [
  { id: 'home', title: 'Home', emoji: '🏠' },
  { id: 'cafe', title: 'Café', emoji: '☕' },
  { id: 'market', title: 'Market', emoji: '🛒' },
  { id: 'train', title: 'Train Station', emoji: '🚉' },
  { id: 'hotel', title: 'Hotel', emoji: '🏨' },
  { id: 'university', title: 'University', emoji: '🎓' },
  { id: 'office', title: 'Office', emoji: '💼' },
  { id: 'airport', title: 'Airport', emoji: '✈️' },
  { id: 'celebration', title: 'Celebration', emoji: '🎉' }
];

export default function JourneyPage({ onStartLesson }) {
  const { levelData, progress, unlockedWeeks, handleSelectDay, handleSelectTask } = useDashboard();
  const completed = new Set(progress?.completedTasks || []);

  const weeks = levelData?.weeks || [];
  const currentWeekIndex = weeks.findIndex((w) => {
    if (!unlockedWeeks.includes(w.id)) return false;
    return !w.days.every(d => d.tasks.every(t => completed.has(t.id)));
  });
  const activeIndex = currentWeekIndex >= 0 ? currentWeekIndex : Math.min(unlockedWeeks.length - 1, weeks.length - 1);

  const handleNodeClick = (week) => {
    if (!unlockedWeeks.includes(week.id)) return;
    const remainingDay = week.days.find(d => d.tasks.some(t => !completed.has(t.id))) || week.days[0];
    const remainingTask = remainingDay.tasks.find(t => !completed.has(t.id)) || remainingDay.tasks[0];
    handleSelectDay(week.id, remainingDay.day);
    handleSelectTask(remainingTask);
    if (onStartLesson) onStartLesson();
  };

  return (
    <div className="min-h-full bg-bg-base px-4 py-6 pb-24 lg:pb-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <BuddyAvatar state="idle" size={64} />
          <div>
            <h1 className="text-2xl font-bold text-text-dark">Your German Journey</h1>
            <p className="text-text-muted text-sm">Travel through real-life destinations with Buddy.</p>
          </div>
        </div>

        <div className="relative pl-8">
          {/* Path line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-bg-secondary rounded-full" />

          <div className="space-y-4">
            {weeks.map((week, index) => {
              const location = JOURNEY_LOCATIONS[index % JOURNEY_LOCATIONS.length];
              const isUnlocked = unlockedWeeks.includes(week.id);
              const isCompleted = week.days.every(d => d.tasks.every(t => completed.has(t.id)));
              const isCurrent = index === activeIndex;

              return (
                <div key={week.id} className="relative flex items-start gap-4">
                  {/* Node */}
                  <button
                    onClick={() => isUnlocked && handleNodeClick(week, index)}
                    disabled={!isUnlocked}
                    aria-label={`${location.title}: ${week.title}${isUnlocked ? '' : ', locked'}`}
                    className={`
                      relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-card
                      transition-transform active:scale-95
                      ${isCompleted ? 'bg-success text-white' :
                        isCurrent ? 'bg-primary text-white ring-4 ring-primary/20 animate-pulse-soft' :
                        isUnlocked ? 'bg-surface border-2 border-primary text-primary' :
                        'bg-bg-secondary text-text-muted border-2 border-border'}
                    `}
                  >
                    {isCompleted ? <IconCheck className="w-6 h-6" /> :
                     isCurrent ? <IconPlay className="w-6 h-6" /> :
                     isUnlocked ? location.emoji : <IconLock className="w-5 h-5" />}
                  </button>

                  {/* Card */}
                  <div className={`
                    flex-1 db-card p-4 transition-opacity
                    ${isUnlocked ? '' : 'opacity-60'}
                  `}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-wide">{location.title}</p>
                        <h3 className="font-bold text-text-dark">{englishTopicTitle(week.title)}</h3>
                        <p className="text-sm text-text-muted mt-1">{week.description}</p>
                      </div>
                      {!isUnlocked && <IconLock className="w-5 h-5 text-text-muted" />}
                    </div>
                    {isCurrent && (
                      <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-primary">
                        <BuddyAvatar state="waving" size={28} />
                        <span>Buddy says: Start here!</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
