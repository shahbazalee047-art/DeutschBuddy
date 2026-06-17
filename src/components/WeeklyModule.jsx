import { getWeekCompletion, getDayCompletion } from '../utils/progress';

export default function WeeklyModule({ week, completedTasks, onSelectDay, selectedDay, isUnlocked }) {
  const completion = getWeekCompletion(week.days, completedTasks);
  const isComplete = completion === 100;

  return (
    <div className={`rounded-2xl border transition-all duration-300 ease-in-out ${
      isUnlocked
        ? 'bg-slate-800 border-slate-700/50 hover:shadow-lg hover:shadow-slate-900/50'
        : 'bg-slate-800/50 border-slate-700/30 opacity-60 hover:opacity-80 hover:bg-slate-800/70 hover:border-slate-600/40'
    }`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold ${
              isComplete ? 'text-black' :
              isUnlocked ? 'bg-slate-700 border border-slate-600' :
              'bg-slate-700/50 text-slate-500'
            }`}
            style={isComplete ? { background: '#FFCC00' } : isUnlocked ? { color: '#FFCC00' } : {}}>
              {isComplete ? '✓' : `W${week.id}`}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Week {week.id}</span>
                {!isUnlocked && (
                  <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
                {isComplete && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,204,0,0.1)', color: '#FFCC00' }}>Done</span>}
              </div>
              <h3 className="font-bold text-slate-200 text-sm">{week.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{week.theme}</p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,204,0,0.1)', color: '#FFCC00' }}>+{weekXP(week, completedTasks)} XP</span>
        </div>

        {isUnlocked && (
          <>
            <div className="mb-3">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1 uppercase tracking-wider font-medium">
                <span>Progress</span><span>{completion}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${completion}%`, background: 'linear-gradient(to right, #FFCC00, #ffe066)' }} />
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
                        dayDone ? 'text-black' :
                        hasPartial ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                        'bg-slate-800/50 text-slate-500 border border-slate-700/50 hover:text-[#FFCC00]'
                      }`}
                      style={dayDone ? { background: '#FFCC00' } : {}}>
                      {day.day}{dayDone && <span className="text-[7px]">✓</span>}
                    </button>
                    {idx < week.days.length - 1 && <div className={`w-0.5 h-0.5 rounded-full mx-0.5 ${dayDone ? 'bg-[#FFCC00]/50' : 'bg-slate-700'}`} />}
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
