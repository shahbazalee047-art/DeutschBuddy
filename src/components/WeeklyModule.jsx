import { getWeekCompletion } from '../utils/progress';

export default function WeeklyModule({ week, completedTasks, onSelectDay, selectedDay, isUnlocked }) {
  const completion = getWeekCompletion(week.days, completedTasks);
  const isComplete = completion === 100;
  const weekXP = week.days.reduce((acc, day) => acc + day.tasks.filter(t => completedTasks.includes(t.id)).reduce((a, t) => a + t.xp, 0), 0);

  return (
    <div className={`paper-card transition-all duration-300 ${!isUnlocked ? 'opacity-50' : 'hover:shadow-lg'}`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold ${
              isComplete ? 'text-white shadow-md' : isUnlocked ? 'bg-[#FFF8E1] text-[#B8860B]' : 'bg-[#F5F5F5] text-[#C0C0C0]'
            }`} style={isComplete ? { background: 'linear-gradient(135deg, #B8860B, #D4A843)' } : {}}>
              {isComplete ? '✓' : `W${week.id}`}
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8A8A9A] uppercase tracking-widest">Week {week.id}</span>
              <h3 className="text-[16px] font-bold text-[#1A1A2E]">{week.title}</h3>
              <p className="text-[13px] text-[#8A8A9A]">{week.theme}</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: '#FFF8E1', color: '#B8860B' }}>+{weekXP} XP</span>
        </div>

        {isUnlocked && (
          <>
            <div className="mb-4">
              <div className="flex justify-between text-[11px] text-[#8A8A9A] mb-1.5 uppercase font-medium" style={{ letterSpacing: '0.5px' }}>
                <span>Progress</span><span>{completion}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${completion}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {week.days.map((day) => {
                const dayDone = day.tasks.every(t => completedTasks.includes(t.id));
                return (
                  <button key={day.day} onClick={() => onSelectDay(week.id, day.day)}
                    className={`day-circle ${dayDone ? 'day-circle-completed' : 'day-circle-current'}`}>
                    {dayDone ? '✓' : day.day}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {!isUnlocked && (
          <div className="flex items-center justify-center gap-2 py-2 text-[#8A8A9A] text-sm">
            <span>🔒</span> Complete previous week to unlock
          </div>
        )}
      </div>
    </div>
  );
}
