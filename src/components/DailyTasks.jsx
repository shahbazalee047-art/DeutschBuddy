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
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 mb-5 transition">
        <span>&larr;</span> Back to Week {week.id}
      </button>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Week {week.id} · Day {day}</span>
            <h2 className="text-lg font-bold text-zinc-100 mt-2">{dayData.title}</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-zinc-400 tabular-nums">{completed}/{total}</div>
            <div className="text-[10px] text-zinc-600 mt-0.5">~{total * 5} min</div>
          </div>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-lime-400 rounded-full transition-all duration-500" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }} />
        </div>
        {allDone && <div className="mt-3 text-center text-sm font-semibold text-lime-400 bg-lime-400/10 border border-lime-400/20 rounded-xl py-2">🎉 Day Complete! +{dayData.tasks.reduce((a, t) => a + t.xp, 0)} XP</div>}
      </div>

      <div className="space-y-2">
        {dayData.tasks.map((task, index) => {
          const done = completedTasks.includes(task.id);
          return (
            <button key={task.id} onClick={() => onSelectTask(task)}
              className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
                done ? 'bg-lime-400/5 border-lime-400/20' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:shadow-md'
              }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                  done ? 'bg-lime-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {done ? '✓' : typeIcons[task.type] || '📌'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{index + 1}. {task.type}</div>
                  <p className="text-sm font-semibold text-zinc-200 mt-0.5 truncate">{task.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">{task.description}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${done ? 'text-lime-400 bg-lime-400/10' : 'text-zinc-500 bg-zinc-800'}`}>
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
