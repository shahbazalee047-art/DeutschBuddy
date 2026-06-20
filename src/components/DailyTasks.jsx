import { memo } from 'react';
import { getDayCompletion } from '../utils/progress';
import { IconFire, IconBookOpen, IconEdit, IconHelpCircle, IconCards, IconLink, IconPencil, IconShuffle, IconMic, IconFeather, IconClipboard, IconTheater, IconSparkles, IconHeadphones, IconBolt, IconBook, IconCheck } from './Icons';

const DailyTasks = memo(function DailyTasks({ week, day, completedTasks = [], onSelectTask, onBack }) {
  const dayData = week?.days?.find(d => d.day === day);
  if (!dayData) return null;
  const completed = getDayCompletion(dayData.tasks, completedTasks);
  const total = dayData.tasks.length;
  const allDone = completed === total;

  const typeIcons = { warmup: IconFire, vocabulary: IconBookOpen, grammar: IconEdit, quiz: IconHelpCircle, flashcards: IconCards, matching: IconLink, fillblank: IconPencil, scramble: IconShuffle, speaking: IconMic, writing: IconFeather, review: IconClipboard, roleplay: IconTheater, fun: IconSparkles, listening: IconHeadphones, quickwin: IconBolt };

  return (
    <div className="fade-in">
      <button onClick={onBack} className="btn-text mb-5">
        <span className="text-base font-bold">&larr;</span> Back to Week {week.id}
      </button>

      <div className="paper-card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="eyebrow">Week {week.id} · Day {day}</span>
            <h2 className="text-xl font-bold text-text-dark mt-1 editorial-heading">{dayData.title}</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-muted tabular-nums">{completed}/{total}</div>
            <div className="text-[11px] text-text-muted mt-0.5">~{total * 5} min</div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }} />
        </div>
        {allDone && (
          <div className="mt-3 text-center text-sm font-semibold py-2 text-gold border border-gold/20 bg-gold/10">
            <IconSparkles className="w-4 h-4 inline-block mr-1.5" /> Day Complete! +{dayData.tasks.reduce((a, t) => a + t.xp, 0)} XP
          </div>
        )}
      </div>

      <div className="space-y-3">
        {dayData.tasks.map((task, index) => {
          const done = completedTasks.includes(task.id);
          return (
            <button key={task.id} onClick={() => onSelectTask(task)}
              className={`w-full text-left paper-card p-4 transition-all duration-200 hover:border-gold/20 active:scale-[0.99] ${done ? 'border-gold/20' : ''}`}
              style={done ? { background: 'rgba(196,146,74,0.05)' } : {}}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 flex items-center justify-center text-lg flex-shrink-0 ${
                  done ? 'text-text-on-dark bg-gold' : 'text-text-muted bg-bg-secondary'
                }`}>
                  {(() => { const IconComp = done ? IconCheck : (typeIcons[task.type] || IconBook); return <IconComp className="w-5 h-5" />; })()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{index + 1}. {task.type}</div>
                  <p className="text-[14px] font-semibold text-text-body mt-0.5 truncate">{task.title}</p>
                  <p className="text-[12px] text-text-muted mt-0.5 truncate">{task.description}</p>
                </div>
                <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${done ? 'bg-gold/15 text-gold' : 'bg-bg-secondary text-text-muted'}`}>
                  {done ? <IconCheck className="w-4 h-4" /> : `+${task.xp}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default DailyTasks;
