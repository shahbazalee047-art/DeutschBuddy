import { memo } from 'react';
import { getWeekCompletion } from '../utils/progress';
import { IconLock } from './Icons';

const WeeklyModule = memo(function WeeklyModule({ week, completedTasks, onSelectDay, selectedDay, isUnlocked }) {
  const completion = getWeekCompletion(week.days, completedTasks);
  const isComplete = completion === 100;
  const weekXP = week.days.reduce((acc, day) => acc + day.tasks.filter(t => completedTasks.includes(t.id)).reduce((a, t) => a + t.xp, 0), 0);
  const totalWeekXP = week.days.reduce((acc, day) => acc + day.tasks.reduce((a, t) => a + t.xp, 0), 0);

  return (
    <div className={`glass-card transition-all duration-300 overflow-hidden ${!isUnlocked ? 'opacity-60' : 'hover:border-sage-400/20 hover:shadow-lg'}`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold ${
              isComplete
                ? 'text-forest-900 shadow-md bg-gradient-to-br from-sage-400 to-sky-400'
                : isUnlocked
                  ? 'text-sage-400 border border-sage-400/20 bg-sage-400/10'
                  : 'text-cream-500 bg-forest-800'
            }`}>
              {isComplete ? '✓' : `W${week.id}`}
            </div>
            <div>
              <span className="text-[10px] font-bold text-cream-500 uppercase tracking-widest">Week {week.id}</span>
              <h3 className="text-[16px] font-bold text-cream-100">{week.title}</h3>
              <p className="text-[13px] text-cream-400">{week.theme}</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full text-sage-400 border border-sage-400/20" style={{ background: 'rgba(127, 176, 105, 0.1)' }}>
            {isUnlocked ? `+${weekXP}/${totalWeekXP} XP` : `+${totalWeekXP} XP`}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-[11px] text-cream-500 mb-1.5 uppercase font-medium" style={{ letterSpacing: '0.5px' }}>
            <span>Progress</span><span>{completion}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${completion}%` }} />
          </div>
        </div>

        {/* Day timeline with connecting line */}
        <div className="relative flex justify-center gap-2 py-2">
          {isUnlocked && (
            <div className="absolute top-1/2 left-10 right-10 h-0.5 -translate-y-1/2 rounded-full" style={{ background: 'linear-gradient(90deg, #7FB06933, #7FB06933)' }} />
          )}
          {week.days.map((day, idx) => {
            const dayDone = day.tasks.every(t => completedTasks.includes(t.id));
            const isCurrentDay = selectedDay?.day === day.day && selectedDay?.weekId === week.id;
            return (
              <button key={day.day} onClick={() => onSelectDay(week.id, day.day)}
                disabled={!isUnlocked}
                className={`relative z-10 day-circle ${
                  dayDone
                    ? 'day-circle-completed'
                    : isCurrentDay
                      ? 'day-circle-current ring-2 ring-amber-400/40'
                      : isUnlocked
                        ? 'day-circle-current'
                        : 'day-circle-locked'
                } active:scale-90 transition-transform`}>
                {dayDone ? '✓' : day.day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default WeeklyModule;
