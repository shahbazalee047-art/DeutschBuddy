export default function JourneyMap({ weeks, completedTasks, currentWeek, onSelectWeek, unlockedWeeks }) {
  return (
    <div className="relative">
      {/* SVG connector path */}
      <svg className="absolute left-6 top-0 h-full w-1 pointer-events-none" aria-hidden="true">
        <line x1="12" y1="0" x2="12" y2="100%" stroke="#27272a" strokeWidth="2" strokeDasharray="6,4" />
      </svg>

      <div className="space-y-3 pl-14 relative">
        {weeks.map((week) => {
          const isUnlocked = unlockedWeeks.includes(week.id);
          const isCurrent = currentWeek === week.id;
          const isCompleted = week.days.every(day => day.tasks.every(t => completedTasks.includes(t.id)));

          return (
            <div key={week.id} className="relative">
              {/* Connector dot */}
              <div className={`absolute -left-[29px] top-4 w-4 h-4 rounded-full border-2 ${
                isCompleted ? 'bg-lime-400 border-lime-400' :
                isCurrent ? 'bg-zinc-800 border-lime-400 animate-pulse-lime' :
                'bg-zinc-800 border-zinc-700'
              }`} />

              <button
                onClick={() => isUnlocked && onSelectWeek(week.id)}
                disabled={!isUnlocked}
                className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 ${
                  isUnlocked
                    ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:shadow-lg hover:shadow-zinc-900/50'
                    : 'bg-zinc-900/50 border-zinc-800/50 opacity-40 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                      isCompleted ? 'bg-lime-400 text-zinc-950' :
                      isCurrent ? 'bg-zinc-800 text-lime-400 border border-lime-400/30' :
                      'bg-zinc-800 text-zinc-500'
                    }`}>
                      {isCompleted ? '✓' : `W${week.id}`}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Week {week.id}</span>
                        {!isUnlocked && <span className="text-zinc-600">🔒</span>}
                        {isCompleted && <span className="text-[10px] font-bold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-full">Complete</span>}
                      </div>
                      <h3 className="font-bold text-zinc-200 text-sm mt-0.5">{week.title}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">{week.theme}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-lime-400 bg-lime-400/10 px-2.5 py-1 rounded-full">+{weekXP(week, completedTasks)} XP</span>
                </div>

                {isUnlocked && (
                  <div className="mt-3 grid grid-cols-7 gap-1.5">
                    {week.days.map((day) => {
                      const allDone = day.tasks.every(t => completedTasks.includes(t.id));
                      const hasPartial = day.tasks.some(t => completedTasks.includes(t.id)) && !allDone;
                      return (
                        <button
                          key={day.day}
                          onClick={(e) => { e.stopPropagation(); onSelectWeek(week.id); }}
                          className={`aspect-square rounded-lg flex items-center justify-center text-[11px] font-bold transition-all duration-200 ${
                            allDone ? 'bg-lime-400 text-zinc-950' :
                            hasPartial ? 'bg-zinc-800 text-lime-400 border border-lime-400/30' :
                            'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                          }`}>
                          {day.day}
                        </button>
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
