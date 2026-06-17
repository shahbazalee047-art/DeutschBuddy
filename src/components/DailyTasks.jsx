import { getDayCompletion } from '../utils/progress';

export default function DailyTasks({ week, day, completedTasks, onSelectTask, onBack }) {
  const dayData = week.days.find(d => d.day === day);
  if (!dayData) return null;
  const completed = getDayCompletion(dayData.tasks, completedTasks);
  const total = dayData.tasks.length;
  const allDone = completed === total;

  const typeIcons = { warmup: '🔥', vocabulary: '📖', grammar: '📝', quiz: '❓', flashcards: '🃏', matching: '🔗', fillblank: '✏️', scramble: '🔀', speaking: '🗣️', writing: '✍️', review: '📋', roleplay: '🎭', fun: '🎉', listening: '🎧', quickwin: '⚡' };

  return (
    <div className="fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#9ca3af] hover:text-[#1a1a2e] mb-5 transition">
        <span>&larr;</span> Back to Week {week.id}
      </button>

      <div className="paper-card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: 'rgba(139,105,20,0.1)', color: '#8B6914' }}>Week {week.id} · Day {day}</span>
            <h2 className="text-lg font-bold text-[#1a1a2e] mt-2">{dayData.title}</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#6b7280] tabular-nums">{completed}/{total}</div>
            <div className="text-[10px] text-[#9ca3af] mt-0.5">~{total * 5} min</div>
          </div>
        </div>
        <div className="w-full h-1.5 bg-[#E8DFD4] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%`, background: 'linear-gradient(to right, #8B6914, #C4956A)' }} />
        </div>
        {allDone && <div className="mt-3 text-center text-sm font-semibold py-2 rounded-xl" style={{ background: 'rgba(139,105,20,0.1)', color: '#8B6914', border: '1px solid rgba(139,105,20,0.2)' }}>🎉 Day Complete! +{dayData.tasks.reduce((a, t) => a + t.xp, 0)} XP</div>}
      </div>

      <div className="space-y-2">
        {dayData.tasks.map((task, index) => {
          const done = completedTasks.includes(task.id);
          return (
            <button key={task.id} onClick={() => onSelectTask(task)}
              className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
                done ? 'border-[#8B6914]/20' : 'paper-card hover:shadow-md'
              }`}
              style={done ? { background: 'rgba(139,105,20,0.05)' } : {}}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                  done ? 'text-white' : 'bg-[#F5EFE6] text-[#6b7280]'
                }`}
                style={done ? { background: 'linear-gradient(135deg, #8B6914, #C4956A)' } : {}}>
                  {done ? '✓' : typeIcons[task.type] || '📌'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">{index + 1}. {task.type}</div>
                  <p className="text-sm font-semibold text-[#1a1a2e] mt-0.5 truncate">{task.title}</p>
                  <p className="text-xs text-[#9ca3af] mt-0.5 truncate">{task.description}</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={done ? { background: 'rgba(139,105,20,0.1)', color: '#8B6914' } : { background: '#F5EFE6', color: '#9ca3af' }}>
                  {done ? '✓' : `+${task.xp}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
