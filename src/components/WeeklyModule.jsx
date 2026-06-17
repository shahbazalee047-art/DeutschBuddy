import { getWeekCompletion, getDayCompletion } from '../utils/progress';

export default function WeeklyModule({ week, completedTasks, onSelectDay, selectedDay, isUnlocked }) {
  const completion = getWeekCompletion(week.days, completedTasks);
  const weekXP = week.days.reduce((acc, day) => acc + day.tasks.reduce((a, t) => a + t.xp, 0), 0);
  const isComplete = completion === 100;

  return (
    <div className={`rounded-2xl border transition-all duration-300 ${
      isUnlocked
        ? 'glass-card hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5'
        : 'bg-[#0f172a]/50 border-slate-800/50 opacity-50'
    }`}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
              isComplete ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              isUnlocked ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-slate-800/50 text-slate-600 border border-slate-700/30'
            }`}>
              {isComplete ? '✓' : week.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">Week {week.id}</span>
                {!isUnlocked && <span className="text-xs text-slate-600">🔒</span>}
                {isComplete && <span className="text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">Complete ✓</span>}
              </div>
              <h3 className="font-bold text-slate-200 text-sm">{week.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{week.theme}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">+{weekXP} XP</span>
        </div>

        {isUnlocked && (
          <>
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-slate-500 mb-1.5 uppercase tracking-wider font-medium">
                <span>Progress</span><span>{completion}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${completion}%`, background: isComplete ? 'linear-gradient(90deg, #22c55e, #16a34a)' : completion > 0 ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' : '#1e293b' }} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-1">
              {week.days.map((day, idx) => {
                const dayDone = getDayCompletion(day.tasks, completedTasks);
                const allDone = dayDone === day.tasks.length;
                const isSelected = selectedDay?.weekId === week.id && selectedDay?.day === day.day;
                return (
                  <div key={day.day} className="flex items-center flex-1">
                    <button onClick={(e) => { e.stopPropagation(); onSelectDay(week.id, day.day); }}
                      className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-200 ${
                        isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' :
                        allDone ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        'bg-slate-800/30 text-slate-500 border border-slate-700/30 hover:border-slate-600/50'
                      }`}>
                      {day.day}
                      {allDone && <span className="text-[7px] text-green-400">✓</span>}
                    </button>
                    {idx < week.days.length - 1 && <div className={`w-0.5 h-0.5 rounded-full mx-0.5 ${allDone ? 'bg-green-500/50' : 'bg-slate-700/50'}`} />}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!isUnlocked && <p className="text-xs text-slate-600 mt-2 text-center">Complete previous week to unlock</p>}
      </div>
    </div>
  );
}
