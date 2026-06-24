import { memo } from 'react';
import { getDayCompletion } from '../utils/progress';
import { IconFire, IconBookOpen, IconEdit, IconHelpCircle, IconCards, IconLink, IconPencil, IconShuffle, IconMic, IconFeather, IconClipboard, IconTheater, IconSparkles, IconHeadphones, IconBolt, IconBook, IconCheck } from './Icons';

const DailyTasks = memo(function DailyTasks({ week, day, completedTasks = [], onSelectTask, onBack, activeLevel }) {
  const dayData = week?.days?.find(d => d.day === day);
  if (!dayData) return null;
  const completed = getDayCompletion(dayData.tasks, completedTasks);
  const total = dayData.tasks.length;
  const allDone = completed === total;

  const typeIcons = { warmup: IconFire, vocabulary: IconBookOpen, grammar: IconEdit, quiz: IconHelpCircle, flashcards: IconCards, matching: IconLink, fillblank: IconPencil, scramble: IconShuffle, speaking: IconMic, writing: IconFeather, review: IconClipboard, roleplay: IconTheater, fun: IconSparkles, listening: IconHeadphones, quickwin: IconBolt };

  const accentColor = activeLevel === 'A2' ? 'var(--a2-red)' : 'var(--a1-blue)';

  return (
    <div className="fade-in focus-col">
      <button onClick={onBack} className="btn-text mb-5">
        <span className="text-base font-bold">&larr;</span> Back to Week {week.id}
      </button>

      <div className="paper-card p-5 mb-5 rounded-[var(--radius-card)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="eyebrow">Week {week.id} &middot; Day {day}</span>
            <h2 className="text-[22px] font-bold text-text-dark mt-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{dayData.title}</h2>
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
          <div className="mt-3 text-center text-sm font-semibold py-2 rounded-[var(--radius-card)]" style={{ background: 'rgba(232,183,61,0.10)', color: 'var(--gold)', border: '1px solid rgba(232,183,61,0.20)' }}>
            <IconSparkles className="w-4 h-4 inline-block mr-1.5" /> Day Complete! +{dayData.tasks.reduce((a, t) => a + t.xp, 0)} XP
          </div>
        )}
      </div>

      <div className="space-y-3">
        {dayData.tasks.map((task, index) => {
          const done = completedTasks.includes(task.id);
          const hasIncomplete = !done;

          return (
            <button
              key={task.id}
              onClick={() => onSelectTask(task)}
              className={`w-full text-left paper-card p-4 transition-all duration-300 hover:border-gold/20 active:scale-[0.99] rounded-[var(--radius-card)] task-item ${
                done ? 'border-gold/20' : ''
              } ${hasIncomplete ? 'morph-expand' : ''}`}
              style={done ? { background: 'rgba(232,163,61,0.05)' } : {}}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 flex items-center justify-center text-lg flex-shrink-0 rounded-[var(--radius-card)] transition-all ${
                  done ? 'text-[var(--cta-text)]' : 'text-[var(--text-muted)] bg-[var(--bg-secondary)]'
                }`} style={done ? { background: 'var(--gold)' } : {}}>
                  {done ? (
                    <IconCheck className="w-5 h-5" />
                  ) : (
                    typeof typeIcons[task.type] === 'function' ? (
                      (() => {
                        const IconComp = typeIcons[task.type];
                        return <IconComp className="w-5 h-5" style={{ color: accentColor }} />;
                      })()
                    ) : (
                      <IconBook className="w-5 h-5" />
                    )
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {index + 1}. {task.type}
                    </span>
                    {hasIncomplete && (
                      <span className="status-dot-active status-dot-a2" />
                    )}
                  </div>
                  <p className="text-[14px] font-semibold text-text-body mt-0.5 truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{task.title}</p>
                  <p className="text-[12px] text-text-muted mt-0.5 truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{task.description}</p>
                </div>

                <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
                  done ? '' : ''
                }`} style={done ? { background: 'rgba(232,183,61,0.15)', color: 'var(--gold)' } : { background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
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