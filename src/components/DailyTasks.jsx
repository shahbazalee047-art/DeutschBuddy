import { getDayCompletion } from '../utils/progress';
import { IconFire, IconBookOpen, IconEdit, IconHelpCircle, IconCards, IconLink, IconPencil, IconShuffle, IconMic, IconFeather, IconClipboard, IconTheater, IconSparkles, IconHeadphones, IconBolt, IconBook, IconCheck } from './Icons';

export default function DailyTasks({ week, day, completedTasks = [], onSelectTask, onBack }) {
  const dayData = week?.days?.find(d => d.day === day);
  if (!dayData) return null;
  const completed = getDayCompletion(dayData.tasks, completedTasks);
  const total = dayData.tasks.length;
  const allDone = completed === total;

  const typeIcons = { warmup: IconFire, vocabulary: IconBookOpen, grammar: IconEdit, quiz: IconHelpCircle, flashcards: IconCards, matching: IconLink, fillblank: IconPencil, scramble: IconShuffle, speaking: IconMic, writing: IconFeather, review: IconClipboard, roleplay: IconTheater, fun: IconSparkles, listening: IconHeadphones, quickwin: IconBolt };

  return (
    <div className="fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-lime-400 mb-5 transition">
        <span>&larr;</span> Back to Week {week.id}
      </button>

      <div className="glass-card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold text-lime-400 bg-lime-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider border border-lime-500/20">Week {week.id} · Day {day}</span>
            <h2 className="text-xl font-bold text-zinc-100 mt-2">{dayData.title}</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-zinc-400 tabular-nums">{completed}/{total}</div>
            <div className="text-[11px] text-zinc-600 mt-0.5">~{total * 5} min</div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }} />
        </div>
        {allDone && (
          <div className="mt-3 text-center text-sm font-semibold py-2 rounded-xl text-lime-400 border border-lime-500/20" style={{ background: 'rgba(163, 230, 53, 0.1)' }}>
            <IconSparkles className="w-4 h-4 inline-block mr-1.5" /> Day Complete! +{dayData.tasks.reduce((a, t) => a + t.xp, 0)} XP
          </div>
        )}
      </div>

      <div className="space-y-3">
        {dayData.tasks.map((task, index) => {
          const done = completedTasks.includes(task.id);
          return (
            <button key={task.id} onClick={() => onSelectTask(task)}
              className={`w-full text-left glass-card p-4 transition-all duration-200 hover:border-lime-500/20 active:scale-[0.99] ${done ? 'border-lime-500/20' : ''}`}
              style={done ? { background: 'rgba(163, 230, 53, 0.05)' } : {}}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                  done ? 'text-zinc-900' : 'text-zinc-400 bg-zinc-800'
                }`} style={done ? { background: 'linear-gradient(135deg, #A3E635, #06B6D4)' } : {}}>
                  {(() => { const IconComp = done ? IconCheck : (typeIcons[task.type] || IconBook); return <IconComp className="w-5 h-5" />; })()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{index + 1}. {task.type}</div>
                  <p className="text-[14px] font-semibold text-zinc-200 mt-0.5 truncate">{task.title}</p>
                  <p className="text-[12px] text-zinc-400 mt-0.5 truncate">{task.description}</p>
                </div>
                <span className="text-[12px] font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={done ? { background: 'rgba(163, 230, 53, 0.15)', color: '#A3E635' } : { background: '#3F3F46', color: '#A1A1AA' }}>
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
