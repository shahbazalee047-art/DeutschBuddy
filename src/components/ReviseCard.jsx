import { memo } from 'react';
import { findTaskById, englishTopicTitle } from '../utils/topicTitle';
import { IconRefresh, IconArrowRight } from './Icons';

// Surfaces tasks the learner got wrong so they can re-attempt them. A task lands
// here when completed with score < maxScore (any wrong answer) and leaves when
// later mastered with a full score. See useProgress.completeTask.
const ReviseCard = memo(function ReviseCard({ reviseTasks = [], levelData, onRetry }) {
  if (!reviseTasks.length || !levelData) return null;

  const items = reviseTasks
    .map(id => {
      const found = findTaskById(levelData, id);
      return found ? { id, ...found } : null;
    })
    .filter(Boolean);

  if (!items.length) return null;

  return (
    <div className="db-card border-l-4 border-l-primary p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <IconRefresh className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-text-dark leading-tight">Revise</h3>
            <p className="text-[11px] text-text-muted">
              {items.length} item{items.length > 1 ? 's' : ''} to retry — master them to clear the list
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {items.map(({ id, task, week, day }) => (
          <button
            key={id}
            onClick={() => onRetry({ task, weekId: week.id, dayNumber: day.day })}
            className="group flex w-full items-center justify-between gap-3 rounded-[var(--radius-button)] bg-bg-secondary p-3 text-left transition-colors hover:bg-primary-light active:scale-[0.99]"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {englishTopicTitle(week.title)} · W{week.id}
              </p>
              <p className="text-sm font-semibold text-text-dark truncate">{task.title}</p>
              <p className="text-[11px] text-text-muted capitalize">{task.type}</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-primary flex-shrink-0">
              Retry
              <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
});

export default ReviseCard;
