import { memo, useMemo } from 'react';
import { getDayCompletion } from '../utils/progress';
import { germanTopicTitle } from '../utils/topicTitle';
import {
  IconFire, IconBookOpen, IconEdit, IconHelpCircle, IconCards, IconLink,
  IconPencil, IconShuffle, IconMic, IconFeather, IconClipboard, IconTheater,
  IconSparkles, IconHeadphones, IconBolt, IconBook, IconCheck, IconArrowLeft,
} from './Icons';

const typeIcons = {
  warmup: IconFire, vocabulary: IconBookOpen, grammar: IconEdit, quiz: IconHelpCircle,
  flashcards: IconCards, matching: IconLink, fillblank: IconPencil, scramble: IconShuffle,
  speaking: IconMic, writing: IconFeather, review: IconClipboard, roleplay: IconTheater,
  fun: IconSparkles, listening: IconHeadphones, quickwin: IconBolt,
};

const DailyTasks = memo(function DailyTasks({ week, day, completedTasks = [], onSelectTask, onBack }) {
  const dayData = week?.days?.find(item => item.day === day);
  const completedSet = useMemo(() => new Set(Array.isArray(completedTasks) ? completedTasks : []), [completedTasks]);
  if (!dayData) return null;
  const completed = getDayCompletion(dayData.tasks, completedSet);
  const total = dayData.tasks.length;
  const allDone = completed === total;
  const topicDe = germanTopicTitle(week?.title);
  const accentColor = 'var(--db-accent)';

  return (
    <div className="fade-in focus-col">
      <button type="button" onClick={onBack} className="btn-text mb-5 inline-flex items-center gap-2"><IconArrowLeft className="h-4 w-4" /> Back to Week {week.id}</button>

      <header className="db-surface-list mb-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="db-section-label mb-2">Week {week.id} · Day {day}</p>
            <h2 className="text-3xl font-bold text-text-dark">{dayData.title}</h2>
            {topicDe && <p className="mt-1 font-display text-lg italic text-primary">{topicDe}</p>}
          </div>
          <div className="shrink-0 text-right">
            <p className="text-lg font-bold tabular-nums text-text-dark">{completed}/{total}</p>
            <p className="text-xs text-text-muted">about {total * 5} min</p>
          </div>
        </div>
        <div className="mt-5" role="progressbar" aria-label="Day progress" aria-valuenow={completed} aria-valuemin="0" aria-valuemax={total}>
          <div className="mb-2 flex justify-between text-[11px] font-bold uppercase tracking-wider text-text-muted"><span>Day progress</span><span>{total > 0 ? Math.round((completed / total) * 100) : 0}%</span></div>
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }} /></div>
        </div>
        {allDone && <div className="mt-4 flex items-center justify-center gap-2 bg-success-light px-3 py-3 text-sm font-bold text-success"><IconCheck className="h-4 w-4" /> Day complete · +{dayData.tasks.reduce((sum, task) => sum + task.xp, 0)} XP</div>}
      </header>

      <div className="exercise-list">
        {dayData.tasks.map((task, index) => {
          const done = completedSet.has(task.id);
          const Icon = typeIcons[task.type] || IconBook;
          return (
            <button
              key={task.id}
              type="button"
              onClick={() => onSelectTask(task)}
              className={`task-item db-surface-list flex w-full items-center gap-4 text-left ${done ? 'border-success/40 bg-success-light/40' : 'hover:border-primary'}`}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center ${done ? 'bg-success text-white' : 'bg-primary-light'}`}>
                {done ? <IconCheck className="h-5 w-5" /> : <Icon className="h-5 w-5" style={{ color: accentColor }} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-text-muted"><span>{index + 1}. {task.type}</span>{!done && <span className="h-1.5 w-1.5 bg-primary" aria-label="Not completed" />}</span>
                <span className={`block line-clamp-2 text-base font-bold ${done ? 'text-text-muted' : 'text-text-dark'}`}>{task.title}</span>
                <span className="mt-0.5 block line-clamp-2 text-sm text-text-muted">{task.description}</span>
              </span>
              <span className={`shrink-0 text-xs font-bold ${done ? 'text-success' : 'text-text-muted'}`}>{done ? 'Done' : `+${task.xp} XP`}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default DailyTasks;
