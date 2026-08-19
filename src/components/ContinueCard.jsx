import { useNavigate } from 'react-router-dom';
import { IconArrowRight, IconBookOpen, IconGamepad, IconSparkles } from './Icons';
import { englishTopicTitle } from '../utils/topicTitle';

const DAILY_TASK_TARGET = 5;

export default function ContinueCard({ progress, activeLevel, levelData, onContinue, onStartPractice }) {
  const navigate = useNavigate();
  const weeks = levelData?.weeks || [];
  const completed = new Set(progress?.completedTasks || []);
  let resumeTarget = null;

  for (const week of weeks) {
    for (const day of week.days || []) {
      const task = (day.tasks || []).find(item => !completed.has(item.id));
      if (task) {
        resumeTarget = { weekId: week.id, day: day.day, task, weekTitle: week.title };
        break;
      }
    }
    if (resumeTarget) break;
  }

  const totalTasks = weeks.reduce((sum, week) => sum + (week.days || []).reduce((daySum, day) => daySum + (day.tasks || []).length, 0), 0);
  const completedCount = progress?.completedTasks?.length || 0;
  const pct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  const circumference = 2 * Math.PI * 50;
  const offset = circumference * (1 - pct / 100);
  const isAllComplete = !resumeTarget;
  const hasMetDailyTarget = completedCount >= DAILY_TASK_TARGET;
  const showFreePractice = isAllComplete || (hasMetDailyTarget && !resumeTarget);

  function handleContinue() {
    if (resumeTarget && onContinue) onContinue(resumeTarget.weekId, resumeTarget.day);
    else if (showFreePractice && onStartPractice) onStartPractice();
    else navigate('/dashboard', { replace: true });
  }

  return (
    <section className="db-hero p-5 sm:p-7" aria-labelledby="continue-heading">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <p className="db-section-label mb-3">{isAllComplete ? 'Track complete' : hasMetDailyTarget ? 'Daily target met' : 'Next step'}</p>
          <h2 id="continue-heading" className="mb-2 text-3xl font-bold sm:text-4xl">
            {resumeTarget
              ? `${activeLevel}, Week ${resumeTarget.weekId} · Day ${resumeTarget.day}`
              : isAllComplete
                ? `${activeLevel} track complete`
                : `${activeLevel} daily goal achieved`}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-text-on-dark-muted sm:text-base">
            {resumeTarget
              ? <><span className="font-bold text-text-on-dark">Next:</span> {resumeTarget.task.title} · {englishTopicTitle(resumeTarget.weekTitle)}</>
              : isAllComplete
                ? 'You have completed the available lessons. Keep your German active with a focused practice session.'
                : `You have completed ${DAILY_TASK_TARGET} tasks today. A short review keeps the habit moving.`}
          </p>
          <div className="hero-actions mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={handleContinue} data-coachmark="start-lesson" className="btn-primary inline-flex items-center gap-2 bg-white text-primary hover:bg-bg-cream">
              {showFreePractice ? <IconGamepad className="h-4 w-4" /> : <IconBookOpen className="h-4 w-4" />}
              {showFreePractice ? 'Start practice' : 'Continue learning'} <IconArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:flex-col lg:items-center">
          <div className="relative h-28 w-28 shrink-0" aria-label={`${pct}% course progress`} role="img">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r="50" fill="none" strokeWidth="8" className="db-progress-ring-track" />
              <circle cx="60" cy="60" r="50" fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="db-progress-ring-value" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-bold tabular-nums">{pct}%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-on-dark-muted">complete</span>
            </div>
          </div>
          <div className="text-sm text-text-on-dark-muted lg:text-center">
            <p className="font-bold text-text-on-dark">{completedCount} of {totalTasks} tasks</p>
            <p className="mt-1">Small steps, steady progress.</p>
          </div>
        </div>
      </div>

      {isAllComplete && (
        <div className="mt-6 flex items-center gap-2 border-t border-white/15 pt-4 text-xs text-text-on-dark-muted">
          <IconSparkles className="h-4 w-4 text-success" />
          <span>All {totalTasks} tasks completed. Try a review session or help someone in Community.</span>
        </div>
      )}
    </section>
  );
}
