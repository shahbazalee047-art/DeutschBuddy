import { memo } from 'react';
import { getWeekCompletion } from '../utils/progress';
import { IconCheck } from './Icons';

const WeeklyModule = memo(function WeeklyModule({ week, completedTasks, onSelectDay, selectedDay, isUnlocked }) {
  const completion = getWeekCompletion(week.days, completedTasks);
  const isComplete = completion === 100;
  const weekXP = week.days.reduce((acc, day) => acc + day.tasks.filter(t => completedTasks.includes(t.id)).reduce((a, t) => a + t.xp, 0), 0);
  const totalWeekXP = week.days.reduce((acc, day) => acc + day.tasks.reduce((a, t) => a + t.xp, 0), 0);

  return (
    <div className={`paper-card transition-all duration-300 overflow-hidden ${!isUnlocked ? 'opacity-60' : 'hover:border-gold/20 hover:shadow-lg'}`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 flex items-center justify-center text-lg font-bold ${
              isComplete
                ? 'text-text-on-dark bg-gold'
                : isUnlocked
                  ? 'text-gold border border-gold/20 bg-gold/10'
                  : 'text-text-muted bg-bg-secondary'
            }`}>
              {isComplete ? <IconCheck className="w-6 h-6" /> : `W${week.id}`}
            </div>
            <div>
              <span className="eyebrow">Week {week.id}</span>
              <h3 className="text-[16px] font-bold text-text-dark">{week.title}</h3>
              <p className="text-[13px] text-text-muted">{week.theme}</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full text-gold border border-gold/20 bg-gold/10">
            {isUnlocked ? `+${weekXP}/${totalWeekXP} XP` : `+${totalWeekXP} XP`}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-[11px] text-text-muted mb-1.5 uppercase font-medium" style={{ letterSpacing: '0.5px' }}>
            <span>Progress</span><span>{completion}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${completion}%` }} />
          </div>
        </div>

        {/* Day timeline with connecting line */}
        <div className="relative flex justify-center gap-2 py-2">
          {isUnlocked && (
            <div className="absolute top-1/2 left-10 right-10 h-0.5 -translate-y-1/2" style={{ background: 'rgba(196,146,74,0.15)' }} />
          )}
          {week.days.map((day) => {
            const dayDone = day.tasks.every(t => completedTasks.includes(t.id));
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
      </div>
    </div>
  );
});

export default WeeklyModule;
