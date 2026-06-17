import { getWeekCompletion, getDayCompletion } from '../utils/progress';

export default function WeeklyModule({ week, completedTasks, onSelectDay, selectedDay, isUnlocked }) {
  const completion = getWeekCompletion(week.days, completedTasks);
  const isComplete = completion === 100;

  return (
    <div className={`rounded-2xl border transition-all duration-200 relative overflow-hidden ${
      isUnlocked
        ? 'bg-slate-800 border border-slate-700/50 hover:shadow-lg'
        : 'bg-slate-800/50 border border-slate-700/30'
    }`}>
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-900/60 rounded-2xl">
          <span className="text-3xl opacity-50">🔒</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold ${
              isComplete ? 'bg-lime-400 text-slate-900' :
              isUnlocked ? 'bg-slate-700 text-lime-400 border border-slate-600' :
              'bg-slate-800/50 text-slate-500'
            }`}>{isComplete ? '✓' : `W${week.id}`}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Week {week.id}</span>
                {isComplete && <span className="text-[10px] font-bold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-full">Done</span>}
              </div>
              <h3 className="font-bold text-slate-200 text-sm">{week.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{week.theme}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-lime-400 bg-lime-400/10 px-2.5 py-1 rounded-full">+{weekXP(week, completedTasks)} XP</span>
        </div>

        {isUnlocked && (
          <>
            <div className="mb-3">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1 uppercase tracking-wider font-medium">
                <span>Progress</span><span>{completion}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-lime-400 to-lime-300 rounded-full transition-all duration-500 shadow-lg shadow-lime-400/20" style={{ width: `${completion}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {week.days.map((day, idx) => {
                const dayDone = day.tasks.every(t => completedTasks.includes(t.id));
                const hasPartial = day.tasks.some(t => completedTasks.includes(t.id)) && !dayDone;
                return (
                  <div key={day.day} className="flex items-center flex-1">
                    <button onClick={(e) => { e.stopPropagation(); onSelectDay(week.id, day.day); }}
                      disabled={!isUnlocked}
                      className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-200 ${
                        dayDone ? 'bg-lime-400 text-slate-900' :
                        hasPartial ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30' :
                        'bg-slate-800/50 text-slate-500 border border-slate-700/50 hover:border-lime-400/50 hover:text-lime-400'
                      }`}>{day.day}{dayDone && <span className="text-[7px]">✓</span>}</button>
                    {idx < week.days.length - 1 && <div className={`w-0.5 h-0.5 rounded-full mx-0.5 ${dayDone ? 'bg-lime-400/50' : 'bg-slate-700'}`} />}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function weekXP(week, completedTasks) {
  return week.days.reduce((acc, day) => acc + day.tasks.filter(t => completedTasks.includes(t.id)).reduce((a, t) => a + t.xp, 0), 0);
}
