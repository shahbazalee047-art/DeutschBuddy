export default function JourneyMap({ weeks, completedTasks, currentWeek, onSelectWeek, unlockedWeeks }) {
  return (
    <div className="relative">
      <svg className="absolute left-6 top-0 h-full w-1 pointer-events-none" aria-hidden="true">
        <line x1="12" y1="0" x2="12" y2="100%" stroke="#334155" strokeWidth="2" strokeDasharray="6,4" />
      </svg>
      <div className="space-y-3 pl-14 relative">
        {weeks.map((week) => {
          const isUnlocked = unlockedWeeks.includes(week.id);
          const isCurrent = currentWeek === week.id;
          const isCompleted = week.days.every(day => day.tasks.every(t => completedTasks.includes(t.id)));
          return (
            <div key={week.id} className="relative">
              <div className={`absolute -left-[29px] top-4 w-4 h-4 rounded-full border-2 ${
                isCompleted ? 'bg-lime-400 border-lime-400' :
                isCurrent ? 'bg-slate-800 border-lime-400 animate-pulse-lime' :
                'bg-slate-800 border-slate-600'
              }`} />
              <button onClick={() => isUnlocked && onSelectWeek(week.id)} disabled={!isUnlocked}
                className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 ${
                  isUnlocked
                    ? isCurrent ? 'bg-slate-800 border-2 border-lime-400 ring-2 ring-lime-400 ring-offset-2 ring-offset-slate-900' : 'bg-slate-800 border border-slate-700/50 hover:border-slate-600 hover:shadow-lg'
                    : 'bg-slate-800/50 border border-slate-700/30 opacity-60 pointer-events-none'
                }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                      isCompleted ? 'bg-lime-400 text-slate-900' :
                      isCurrent ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30' :
                      'bg-slate-700 text-slate-400'
                    }`}>{isCompleted ? '✓' : `W${week.id}`}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Week {week.id}</span>
                        {isCompleted && <span className="text-[10px] font-bold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-full">Done</span>}
                      </div>
                      <h3 className="font-bold text-slate-200 text-sm">{week.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{week.theme}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-lime-400 bg-lime-400/10 px-2.5 py-1 rounded-full">+{weekXP(week, completedTasks)} XP</span>
                </div>
                {isUnlocked && (
                  <div className="mt-3 grid grid-cols-7 gap-1.5">
                    {week.days.map((day, idx) => {
                      const dayDone = day.tasks.every(t => completedTasks.includes(t.id));
                      const hasPartial = day.tasks.some(t => completedTasks.includes(t.id)) && !dayDone;
                      return (
                        <div key={day.day} className="flex items-center flex-1">
                          <button onClick={(e) => { e.stopPropagation(); onSelectWeek(week.id); }}
                            className={`w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-200 ${
                              dayDone ? 'bg-lime-400 text-slate-900' :
                              hasPartial ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30' :
                              'bg-slate-800/50 text-slate-500 border border-slate-700/50 hover:border-lime-400/50 hover:text-lime-400'
                            }`}>{day.day}{dayDone && <span className="text-[7px] ml-0.5">✓</span>}</button>
                          {idx < week.days.length - 1 && <div className={`w-0.5 h-0.5 rounded-full mx-0.5 ${dayDone ? 'bg-lime-400/50' : 'bg-slate-700'}`} />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function weekXP(week, completedTasks) {
  return week.days.reduce((acc, day) => acc + day.tasks.filter(t => completedTasks.includes(t.id)).reduce((a, t) => a + t.xp, 0), 0);
}
