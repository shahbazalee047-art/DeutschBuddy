import { getDayCompletion } from '../utils/progress';

export default function DailyTasks({ week, day, completedTasks, onSelectTask, onBack }) {
  const dayData = week.days.find(d => d.day === day);
  if (!dayData) return null;

  const completed = getDayCompletion(dayData.tasks, completedTasks);
  const total = dayData.tasks.length;
  const allDone = completed === total;

  const typeIcons = {
    warmup: '🔥', vocabulary: '📖', grammar: '📝', quiz: '❓', flashcards: '🃏',
    matching: '🔗', fillblank: '✏️', scramble: '🔀', speaking: '🗣️',
    writing: '✍️', review: '📋', roleplay: '🎭', fun: '🎉', listening: '🎧', quickwin: '⚡',
  };

  const typeGradients = {
    warmup: 'from-orange-500/20 to-amber-500/20 border-orange-500/20',
    vocabulary: 'from-blue-500/20 to-indigo-500/20 border-blue-500/20',
    grammar: 'from-purple-500/20 to-violet-500/20 border-purple-500/20',
    quiz: 'from-amber-500/20 to-yellow-500/20 border-amber-500/20',
    flashcards: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/20',
    matching: 'from-pink-500/20 to-rose-500/20 border-pink-500/20',
    fillblank: 'from-green-500/20 to-emerald-500/20 border-green-500/20',
    scramble: 'from-orange-500/20 to-red-500/20 border-orange-500/20',
    speaking: 'from-rose-500/20 to-pink-500/20 border-rose-500/20',
    writing: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/20',
    review: 'from-slate-500/20 to-gray-500/20 border-slate-500/20',
    roleplay: 'from-violet-500/20 to-purple-500/20 border-violet-500/20',
    fun: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/20',
    listening: 'from-teal-500/20 to-cyan-500/20 border-teal-500/20',
    quickwin: 'from-green-500/20 to-emerald-500/20 border-green-500/20',
  };

  const typeLabels = {
    warmup: 'Warm Up', vocabulary: 'Vocabulary', grammar: 'Grammar', quiz: 'Quiz',
    flashcards: 'Flashcards', matching: 'Matching', fillblank: 'Fill in Blank',
    scramble: 'Unscramble', speaking: 'Speaking', writing: 'Writing', review: 'Review',
    roleplay: 'Roleplay', fun: 'Fun', listening: 'Listening', quickwin: 'Quick Win',
  };

  return (
    <div className="fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 mb-5 transition">
        <span>&larr;</span> Back to Week {week.id}
      </button>

      <div className="glass-card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Week {week.id} · Day {day}</span>
            <h2 className="text-lg font-bold text-slate-100 mt-2">{dayData.title}</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 tabular-nums">{completed}/{total}</div>
            <div className="text-[10px] text-slate-600 mt-0.5">~{total * 5} min</div>
          </div>
        </div>

        <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%`, background: allDone ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 'linear-gradient(90deg, #3b82f6, #60a5fa)' }} />
        </div>

        {allDone && <div className="mt-3 text-center text-sm font-semibold text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl py-2">🎉 Day Complete! +{dayData.tasks.reduce((a, t) => a + t.xp, 0)} XP</div>}
      </div>

      <div className="space-y-2.5">
        {dayData.tasks.map((task, index) => {
          const done = completedTasks.includes(task.id);
          const gradient = typeGradients[task.type] || 'from-slate-500/20 to-gray-500/20 border-slate-500/20';
          return (
            <button key={task.id} onClick={() => onSelectTask(task)}
              className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 ${
                done ? 'bg-green-500/5 border-green-500/20' : `glass-card hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/5`
              }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                  done ? 'bg-green-500/20 text-green-400 border border-green-500/30' : `bg-gradient-to-br ${gradient} text-slate-300`
                }`}>
                  {done ? '✓' : typeIcons[task.type] || '📌'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{index + 1}. {typeLabels[task.type] || task.type}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-200 mt-0.5 truncate">{task.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{task.description}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1.5 rounded-full ${done ? 'text-green-400 bg-green-500/10' : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'}`}>
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
