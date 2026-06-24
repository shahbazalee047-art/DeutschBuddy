import { useNavigate } from 'react-router-dom';
import { IconBookOpen, IconSparkles, IconGamepad } from './Icons';

const DAILY_TASK_TARGET = 5;

export default function ContinueCard({ progress, activeLevel, levelData }) {
  const navigate = useNavigate();

  const weeks = levelData?.weeks || [];
  const completed = new Set(progress?.completedTasks || []);

  let resumeTarget = null;
  for (const week of weeks) {
    for (const day of week.days || []) {
      for (const task of day.tasks || []) {
        if (!completed.has(task.id)) {
          resumeTarget = { weekId: week.id, day: day.day, task, weekTitle: week.title };
          break;
        }
      }
      if (resumeTarget) break;
    }
    if (resumeTarget) break;
  }

  const totalTasks = weeks.reduce((sum, w) => sum + (w.days || []).reduce((s, d) => s + (d.tasks || []).length, 0), 0);
  const completedCount = progress?.completedTasks?.length || 0;
  const pct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  const circumference = 2 * Math.PI * 50;
  const offset = circumference * (1 - pct / 100);

  const isAllComplete = !resumeTarget;
  const hasMetDailyTarget = completedCount >= DAILY_TASK_TARGET;
  const showFreePractice = isAllComplete || (hasMetDailyTarget && !resumeTarget);

  function handleContinue() {
    if (showFreePractice) {
      navigate('/dashboard?mode=practice', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }
  }

  function handleFreePractice() {
    navigate('/dashboard?mode=practice', { replace: true });
  }

  return (
    <div
      className="relative overflow-hidden rounded-[var(--radius-card)] text-text-on-dark p-6 mb-6 shadow-[0_12px_40px_rgba(232,163,61,0.15)]"
      style={{ background: 'var(--bg-dark)' }}
    >
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gold/5 -translate-y-1/2 translate-x-1/2" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gold mb-3">
            <span className="w-6 h-[1px] bg-gold" />
            {isAllComplete ? 'Track Complete' : hasMetDailyTarget ? 'Daily Target Met!' : 'Continue Learning'}
          </div>

          <h2
            className="text-[28px] lg:text-[32px] font-bold leading-tight mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {resumeTarget
              ? `${activeLevel}, Week ${resumeTarget.weekId} · Day ${resumeTarget.day}`
              : isAllComplete
                ? `${activeLevel} Track Complete!`
                : `${activeLevel} Daily Goal Achieved!`}
          </h2>

          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-on-dark-muted)' }}>
            {resumeTarget
              ? `Next up: ${resumeTarget.task.title} · ${resumeTarget.weekTitle}`
              : isAllComplete
                ? 'Outstanding! You have completed all available tasks. Explore free practice to reinforce what you have learned.'
                : `You have met your daily goal of ${DAILY_TASK_TARGET} tasks! Continue practicing or take a well-deserved break.`}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative w-[100px] h-[100px] flex-shrink-0">
            <svg width="100" height="100" className="-rotate-90">
              <circle cx="50" cy="50" r="50" fill="none" stroke="rgba(245,240,232,0.12)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="50" fill="none"
                stroke={isAllComplete ? 'var(--success)' : hasMetDailyTarget ? 'var(--a1-blue)' : 'var(--gold)'}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.23, 1, 0.32, 1)' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold tabular-nums" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {pct}%
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {showFreePractice ? (
              <>
                <button
                  onClick={handleFreePractice}
                  className="btn-primary rounded-[var(--radius-button)] flex items-center gap-2"
                  style={{ background: 'var(--a1-blue)', color: '#F0EAE0' }}
                >
                  <IconGamepad className="w-4 h-4" />
                  Free Practice →
                </button>
                <button
                  onClick={handleContinue}
                  className="btn-secondary rounded-[var(--radius-button)] flex items-center gap-2"
                >
                  <IconBookOpen className="w-4 h-4" />
                  Keep Going
                </button>
              </>
            ) : (
              <button onClick={handleContinue} className="btn-primary rounded-[var(--radius-button)] flex items-center gap-2">
                <IconBookOpen className="w-4 h-4" />
                Continue →
              </button>
            )}
          </div>
        </div>
      </div>

      {isAllComplete && (
        <div className="mt-4 pt-4 border-t border-gold/10 flex items-center gap-2">
          <IconSparkles className="w-4 h-4 text-gold" />
          <span className="text-[12px]" style={{ color: 'var(--text-on-dark-muted)' }}>
            All {totalTasks} tasks completed! Consider visiting the Community to help others or review in Flashcards.
          </span>
        </div>
      )}
    </div>
  );
}