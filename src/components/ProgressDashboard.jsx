import { getWeekCompletion } from '../utils/progress';
import BadgeGallery from './BadgeGallery';

export default function ProgressDashboard({ progress, levelData, visibleWeeks }) {
  const levelWeeks = visibleWeeks || levelData.weeks;
  const weeklyStats = levelWeeks.map(week => ({ week: week.id, completion: getWeekCompletion(week.days, progress.completedTasks) }));
  const unlocked = weeklyStats.filter(w => w.completion > 0 || weeklyStats.indexOf(w) < (progress.unlockedWeeks?.length || 1));
  const avgCompletion = unlocked.length > 0 ? Math.round(unlocked.reduce((a, w) => a + w.completion, 0) / unlocked.length) : 0;

  return (
    <div className="fade-in space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '⚡', value: progress.xp, label: 'Total XP', color: '#FFCC00' },
          { icon: '🔥', value: progress.streak, label: 'Day Streak', color: '#DD0000' },
          { icon: '📊', value: `${avgCompletion}%`, label: 'Progress', color: '#FFCC00' },
          { icon: '✅', value: progress.completedTasks?.length || 0, label: 'Tasks Done', color: '#22c55e' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-xl font-bold tabular-nums" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-slate-200 mb-4">Weekly Progress</h3>
        <div className="space-y-3">
          {weeklyStats.map(stat => (
            <div key={stat.week} className="flex items-center gap-3">
              <span className="text-xs text-slate-400 w-8 font-medium tabular-nums">W{stat.week}</span>
              <div className="flex-1 h-6 bg-slate-700 rounded-lg overflow-hidden relative">
                <div className="h-full rounded-lg transition-all duration-700" style={{ width: `${stat.completion}%`, background: 'linear-gradient(to right, #FFCC00, #ffe066)' }} />
                {stat.completion > 0 && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">{stat.completion}%</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BadgeGallery badges={progress.badges || []} />
    </div>
  );
}
