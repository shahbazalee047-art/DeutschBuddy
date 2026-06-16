export default function JourneyMap({ weeks, completedTasks, currentWeek, onSelectWeek, unlockedWeeks }) {
  return (
    <div className="glass-card p-4 overflow-hidden">
      <h3 className="text-sm font-bold text-slate-300 mb-3">Learning Path</h3>
      <div className="flex items-center overflow-x-auto pb-2 gap-0" style={{ scrollbarWidth: 'none' }}>
        {weeks.map((week, index) => {
          const isUnlocked = unlockedWeeks.includes(week.id);
          const isCurrent = currentWeek === week.id;
          const isCompleted = week.days.every(day => day.tasks.every(t => completedTasks.includes(t.id)));
          return (
            <div key={week.id} className="flex items-center flex-shrink-0">
              <button onClick={() => isUnlocked && onSelectWeek(week.id)} disabled={!isUnlocked}
                className={`flex flex-col items-center gap-1.5 ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-base transition-all ${
                  isCompleted ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  isCurrent ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20' :
                  isUnlocked ? 'bg-slate-800/50 text-slate-400 border border-slate-700/30 hover:border-slate-600/50' :
                  'bg-slate-900/50 text-slate-700 border border-slate-800/30'
                }`}>
                  {isCompleted ? '✓' : week.icon}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">W{week.id}</div>
              </button>
              {index < weeks.length - 1 && <div className={`w-5 h-0.5 mx-0.5 rounded-full ${isCompleted ? 'bg-green-500/40' : 'bg-slate-800/50'}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
