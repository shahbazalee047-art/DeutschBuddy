import { memo, useState } from 'react';
import { getWeekCompletion } from '../utils/progress';
import { IconCheck, IconLock } from './Icons';

const WeeklyModule = memo(function WeeklyModule({ week, completedTasks, onSelectDay, selectedDay, isUnlocked, activeLevel }) {
  const [expanded, setExpanded] = useState(false);
  const safeDays = Array.isArray(week?.days) ? week.days : [];
  const safeCompleted = Array.isArray(completedTasks) ? completedTasks : [];
  const completion = getWeekCompletion(safeDays, safeCompleted);
  const isComplete = completion === 100;
  const weekXP = safeDays.reduce((acc, day) => acc + (day.tasks || []).filter(t => safeCompleted.includes(t.id)).reduce((a, t) => a + (t.xp || 0), 0), 0);
  const totalWeekXP = safeDays.reduce((acc, day) => acc + (day.tasks || []).reduce((a, t) => a + (t.xp || 0), 0), 0);

  const cardState = isComplete
    ? 'complete'
    : isUnlocked
      ? 'active'
      : 'locked';

  const accentColor = activeLevel === 'A2' ? 'var(--a2-red)' : 'var(--a1-blue)';

  const stateClasses = {
    active: 'bg-[var(--bg-dark)] text-text-on-dark rounded-[var(--radius-card)] border-l-4 border-l-gold shadow-[0_12px_40px_rgba(232,163,61,0.15)]',
    complete: 'bg-[var(--bg-primary)] text-text-body rounded-[var(--radius-card)] border border-border border-l-4 border-l-[var(--success)]',
    locked: 'bg-[var(--card-muted)] text-text-body rounded-[var(--radius-card)] border-l-4 border-l-[var(--text-locked)] border-dashed opacity-60 pointer-events-none',
  };

  const handleToggle = () => {
    if (isUnlocked && !isComplete) {
      setExpanded(!expanded);
    }
    if (isUnlocked && !selectedDay) {
      // default to first incomplete day
      const firstIncomplete = safeDays.find(day => {
        const tasks = day.tasks || [];
        return tasks.length > 0 && !tasks.every(t => safeCompleted.includes(t.id));
      });
      if (firstIncomplete) onSelectDay(week.id, firstIncomplete.day);
    }
  };

  return (
    <div className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[max-height,opacity] overflow-hidden ${stateClasses[cardState]}`}>
      {isComplete && (
        <div className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full" style={{ background: 'var(--success)', color: 'var(--cta-text)' }}>
          <IconCheck className="w-4 h-4" />
        </div>
      )}
      {cardState === 'locked' && (
        <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-md text-[10px] uppercase font-bold tracking-widest flex items-center gap-1" style={{ background: 'rgba(138,133,124,0.15)', color: 'var(--text-locked)' }}>
          <IconLock className="w-3 h-3" /> Locked
        </div>
      )}

      <div className="p-5">
        <button onClick={handleToggle} className="w-full text-left">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 flex items-center justify-center text-lg font-bold rounded-[var(--radius-card)] transition-all ${
                isComplete
                  ? 'text-[var(--cta-text)]'
                  : isUnlocked
                    ? 'text-gold border border-gold/20 bg-gold/10'
                    : 'text-[var(--text-locked)] bg-[var(--bg-secondary)]'
              }`}>
                {isComplete ? (
                  <IconCheck className="w-6 h-6" />
                ) : (
                  <span>W{week.id}</span>
                )}
              </div>
              <div>
                <span className="eyebrow" style={{ color: isUnlocked ? 'var(--gold)' : 'var(--text-locked)' }}>Week {week.id}</span>
                <h3 className="text-[22px] font-bold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: isUnlocked ? 'var(--text-on-dark)' : 'var(--text-dark)' }}>{week.title}</h3>
                <p className="text-[14px] font-medium" style={{ color: isUnlocked ? 'var(--text-on-dark-muted)' : 'var(--text-muted)' }}>{week.theme}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{
                background: isUnlocked ? 'rgba(232,183,61,0.10)' : 'var(--bg-secondary)',
                color: isUnlocked ? 'var(--gold)' : 'var(--text-locked)',
                border: `1px solid ${isUnlocked ? 'rgba(232,183,61,0.20)' : 'var(--border-default)'}`
              }}>
                {isUnlocked ? `+${weekXP}/${totalWeekXP} XP` : `+${totalWeekXP} XP`}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-[11px] mb-1.5 uppercase font-medium" style={{ color: isUnlocked ? 'var(--text-on-dark-muted)' : 'var(--text-muted)', letterSpacing: '0.5px' }}>
              <span>Progress</span><span>{completion}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </button>

        {isUnlocked && !isComplete && expanded && (
          <div className="relative flex justify-center gap-2 py-3 morph-expand">
            <div className="absolute top-1/2 left-10 right-10 h-0.5 -translate-y-1/2" style={{ background: 'rgba(232,163,61,0.15)' }} />
            {safeDays.map((day) => {
              const tasks = day?.tasks || [];
              const dayDone = tasks.length > 0 && tasks.every(t => safeCompleted.includes(t.id));
              const isCurrentDay = selectedDay?.day === day.day && selectedDay?.weekId === week.id;
              const dayHasIncomplete = tasks.length > 0 && !tasks.every(t => safeCompleted.includes(t.id));

              return (
                <button key={day.day} onClick={() => onSelectDay(week.id, day.day)}
                  disabled={!isUnlocked}
                  className={`relative z-10 day-circle w-9 md:w-12 h-9 md:h-12 rounded-full shrink-0 text-sm md:text-base transition-all active:scale-90 ${
                    dayDone
                      ? 'day-circle-completed'
                      : isCurrentDay
                        ? 'day-circle-current ring-2 ring-gold-light/40'
                        : isUnlocked
                          ? 'day-circle-current'
                          : 'day-circle-locked'
                  }`}>
                  {dayDone ? (
                    <IconCheck className="w-4 h-4" />
                  ) : dayHasIncomplete && isUnlocked ? (
                    <span className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
                  ) : (
                    day.day
                  )}
                </button>
              );
            })}
          </div>
        )}

        {isUnlocked && !isComplete && !expanded && (
          <div className="relative flex justify-center gap-2 py-2">
            <div className="absolute top-1/2 left-10 right-10 h-0.5 -translate-y-1/2" style={{ background: 'rgba(232,163,61,0.15)' }} />
            {safeDays.map((day) => {
              const tasks = day?.tasks || [];
              const dayDone = tasks.length > 0 && tasks.every(t => safeCompleted.includes(t.id));
              const isCurrentDay = selectedDay?.day === day.day && selectedDay?.weekId === week.id;

              return (
                <button key={day.day} onClick={() => onSelectDay(week.id, day.day)}
                  disabled={!isUnlocked}
                  className={`relative z-10 day-circle w-9 md:w-12 h-9 md:h-12 rounded-full shrink-0 text-sm md:text-base ${
                    dayDone
                      ? 'day-circle-completed'
                      : isCurrentDay
                        ? 'day-circle-current ring-2 ring-gold-light/40'
                        : isUnlocked
                          ? 'day-circle-current'
                          : 'day-circle-locked'
                  } active:scale-90 transition-transform`}>
                  {dayDone ? <IconCheck className="w-4 h-4" /> : day.day}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

export default WeeklyModule;