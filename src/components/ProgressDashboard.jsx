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
          { icon: '⚡', value: progress.xp, label: 'Total XP', color: '#8B6914' },
          { icon: '🔥', value: progress.streak, label: 'Day Streak', color: '#C4956A' },
          { icon: '📊', value: `${avgCompletion}%`, label: 'Progress', color: '#5B8C7A' },
          { icon: '✅', value: progress.completedTasks?.length || 0, label: 'Tasks Done', color: '#8B6914' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-[#E8DFD4] rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-xl font-bold tabular-nums" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[11px] text-[#9ca3af] font-medium mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E8DFD4] rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#1a1a2e] mb-4">Weekly Progress</h3>
        <div className="space-y-3">
          {weeklyStats.map(stat => (
            <div key={stat.week} className="flex items-center gap-3">
              <span className="text-xs text-[#9ca3af] w-8 font-medium tabular-nums">W{stat.week}</span>
              <div className="flex-1 h-6 bg-[#E8DFD4] rounded-lg overflow-hidden relative">
                <div className="h-full rounded-lg transition-all duration-700" style={{ width: `${stat.completion}%`, background: 'linear-gradient(to right, #8B6914, #C4956A)' }} />
                {stat.completion > 0 && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#4a5568]">{stat.completion}%</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BadgeGallery badges={progress.badges || []} />
    </div>
  );
}
