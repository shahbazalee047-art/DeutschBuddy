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
    <div className="db-card p-4 border-l-4 border-l-gold">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
            <IconRefresh className="w-4 h-4 text-gold" />
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
            className="w-full flex items-center justify-between gap-3 p-3 rounded-[var(--radius-button)] bg-bg-secondary hover:bg-bg-dark-mid transition-colors active:scale-[0.99] text-left group"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
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
