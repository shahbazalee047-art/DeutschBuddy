import { getWeekCompletion, getDayCompletion } from '../utils/progress';

export default function WeeklyModule({ week, completedTasks, onSelectDay, selectedDay, isUnlocked }) {
  const completion = getWeekCompletion(week.days, completedTasks);
  const isComplete = completion === 100;

  return (
    <div className={`rounded-2xl border transition-all duration-200 relative overflow-hidden ${
      isUnlocked
        ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
        : 'bg-zinc-900/30 border-zinc-800/30'
    }`}>
      {/* Lock overlay for locked weeks */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-zinc-950/40 rounded-2xl">
          <span className="text-3xl opacity-50">🔒</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold ${
              isComplete ? 'bg-lime-400 text-zinc-950' :
              isUnlocked ? 'bg-zinc-800 text-lime-400 border border-zinc-700' :
              'bg-zinc-800/50 text-zinc-600'
            }`}>
              {isComplete ? '✓' : `W${week.id}`}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Week {week.id}</span>
                {isComplete && <span className="text-[10px] font-bold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-full">Done</span>}
              </div>
              <h3 className="font-bold text-zinc-200 text-sm">{week.title}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{week.theme}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-lime-400 bg-lime-400/10 px-2.5 py-1 rounded-full">+{weekXP(week, completedTasks)} XP</span>
        </div>

        {isUnlocked && (
          <>
            <div className="mb-3">
              <div className="flex justify-between text-[10px] text-zinc-500 mb-1 uppercase tracking-wider font-medium">
                <span>Progress</span><span>{completion}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{
                  width: `${completion}%`,
                  background: completion === 100 ? '#a3e635' : completion > 0 ? '#22d3ee' : '#27272a',
                }} />
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {week.days.map((day, idx) => {
                const dayDone = getDayCompletion(day.tasks, completedTasks);
                const allDone = dayDone === day.tasks.length;
                const hasPartial = dayDone > 0 && !allDone;
                return (
                  <div key={day.day} className="flex items-center flex-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelectDay(week.id, day.day); }}
                      disabled={!isUnlocked}
                      className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-200 ${
                        allDone ? 'bg-lime-400 text-zinc-950' :
                        hasPartial ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' :
                        'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                      }`}>
                      {day.day}
                      {allDone && <span className="text-[7px]">✓</span>}
                    </button>
                    {idx < week.days.length - 1 && <div className={`w-0.5 h-0.5 rounded-full mx-0.5 ${allDone ? 'bg-lime-400/50' : 'bg-zinc-800'}`} />}
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
