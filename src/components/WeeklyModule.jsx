import { getWeekCompletion, getDayCompletion } from '../utils/progress';

export default function WeeklyModule({ week, completedTasks, onSelectDay, selectedDay, isUnlocked }) {
  const completion = getWeekCompletion(week.days, completedTasks);
  const isComplete = completion === 100;

  return (
    <div className={`${isUnlocked ? 'paper-card' : 'paper-card-flat'} transition-all duration-300 ease-in-out ${
      isUnlocked ? '' : 'opacity-60 hover:opacity-80'
    }`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold ${
              isComplete ? 'text-white' :
              isUnlocked ? 'bg-[#E8DFD4] text-[#8B6914]' :
              'bg-[#F5EFE6] text-[#9ca3af]'
            }`}
            style={isComplete ? { background: 'linear-gradient(135deg, #8B6914, #C4956A)' } : {}}>
              {isComplete ? '✓' : `W${week.id}`}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">Week {week.id}</span>
                {!isUnlocked && (
                  <svg className="w-3 h-3 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
                {isComplete && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(139,105,20,0.1)', color: '#8B6914' }}>Done</span>}
              </div>
              <h3 className="font-bold text-[#1a1a2e] text-sm">{week.title}</h3>
              <p className="text-xs text-[#9ca3af] mt-0.5">{week.theme}</p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(139,105,20,0.1)', color: '#8B6914' }}>+{weekXP(week, completedTasks)} XP</span>
        </div>

        {isUnlocked && (
          <>
            <div className="mb-3">
              <div className="flex justify-between text-[10px] text-[#9ca3af] mb-1 uppercase tracking-wider font-medium">
                <span>Progress</span><span>{completion}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E8DFD4] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${completion}%`, background: 'linear-gradient(to right, #8B6914, #C4956A)' }} />
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
                        dayDone ? 'text-white' :
                        hasPartial ? 'bg-[#5B8C7A]/10 text-[#5B8C7A] border border-[#5B8C7A]/30' :
                        'bg-[#F5EFE6] text-[#9ca3af] border border-[#E8DFD4] hover:border-[#8B6914]/50 hover:text-[#8B6914]'
                      }`}
                      style={dayDone ? { background: 'linear-gradient(135deg, #8B6914, #C4956A)' } : {}}>
                      {day.day}{dayDone && <span className="text-[7px]">✓</span>}
                    </button>
                    {idx < week.days.length - 1 && <div className={`w-0.5 h-0.5 rounded-full mx-0.5 ${dayDone ? 'bg-[#8B6914]/50' : 'bg-[#E8DFD4]'}`} />}
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
