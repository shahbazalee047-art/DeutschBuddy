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
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#8A8A9A] hover:text-[#1A1A2E] mb-5 transition">
        <span>&larr;</span> Back to Week {week.id}
      </button>

      <div className="paper-card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold text-[#B8860B] bg-[#FFF8E1] px-2.5 py-1 rounded-full uppercase tracking-wider">Week {week.id} · Day {day}</span>
            <h2 className="text-xl font-bold text-[#1A1A2E] mt-2">{dayData.title}</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#8A8A9A] tabular-nums">{completed}/{total}</div>
            <div className="text-[11px] text-[#C0C0C0] mt-0.5">~{total * 5} min</div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }} />
        </div>
        {allDone && (
          <div className="mt-3 text-center text-sm font-semibold py-2 rounded-xl" style={{ background: '#FFF8E1', color: '#B8860B' }}>
            🎉 Day Complete! +{dayData.tasks.reduce((a, t) => a + t.xp, 0)} XP
          </div>
        )}
      </div>

      <div className="space-y-3">
        {dayData.tasks.map((task, index) => {
          const done = completedTasks.includes(task.id);
          return (
            <button key={task.id} onClick={() => onSelectTask(task)}
              className={`w-full text-left paper-card p-4 transition-all duration-200 hover:shadow-md ${done ? 'border-[#B8860B]/20' : ''}`}
              style={done ? { background: '#FFF8E1' } : {}}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                  done ? 'text-white' : 'bg-[#F5EFE6] text-[#8A8A9A]'
                }`} style={done ? { background: 'linear-gradient(135deg, #B8860B, #D4A843)' } : {}}>
                  {done ? '✓' : typeIcons[task.type] || '📌'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-[#8A8A9A] uppercase tracking-wider">{index + 1}. {task.type}</div>
                  <p className="text-[14px] font-semibold text-[#1A1A2E] mt-0.5 truncate">{task.title}</p>
                  <p className="text-[12px] text-[#8A8A9A] mt-0.5 truncate">{task.description}</p>
                </div>
                <span className="text-[12px] font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={done ? { background: '#FFF8E1', color: '#B8860B' } : { background: '#F5F5F5', color: '#8A8A9A' }}>
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
