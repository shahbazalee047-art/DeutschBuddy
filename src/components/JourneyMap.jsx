export default function JourneyMap({ weeks, completedTasks, currentWeek, onSelectWeek, unlockedWeeks }) {
  return (
    <div className="glass-card p-4 overflow-hidden">
      <h3 className="text-sm font-bold text-zinc-300 mb-3">Learning Path</h3>
      <div className="flex items-center overflow-x-auto pb-2 gap-0" style={{ scrollbarWidth: 'none' }}>
        {weeks.map((week, index) => {
          const isUnlocked = unlockedWeeks.includes(week.id);
          const isCurrent = currentWeek === week.id;
          const isCompleted = week.days.every(day => day.tasks.every(t => completedTasks.includes(t.id)));
          return (
            <div key={week.id} className="flex items-center flex-shrink-0">
              <button onClick={() => isUnlocked && onSelectWeek(week.id)} disabled={!isUnlocked}
                className={`flex flex-col items-center gap-1.5 ${isUnlocked ? 'cursor-pointer active:scale-90' : 'cursor-not-allowed opacity-30'}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-base transition-all ${
                  isCompleted ? 'bg-lime-500/20 text-lime-400 border border-lime-500/30' :
                  isCurrent ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20' :
                  isUnlocked ? 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/30 hover:border-zinc-600/50' :
                  'bg-zinc-900/50 text-zinc-700 border border-zinc-800/30'
                }`}>
                  {isCompleted ? '✓' : week.icon}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">W{week.id}</div>
              </button>
              {index < weeks.length - 1 && <div className={`w-5 h-0.5 mx-0.5 rounded-full ${isCompleted ? 'bg-lime-500/40' : 'bg-zinc-800/50'}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
