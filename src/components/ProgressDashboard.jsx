import { getWeekCompletion } from '../utils/progress';
import BadgeGallery from './BadgeGallery';

export default function ProgressDashboard({ progress, levelData, visibleWeeks }) {
  const levelWeeks = visibleWeeks || levelData.weeks;
  const weeklyStats = levelWeeks.map(week => ({ week: week.id, completion: getWeekCompletion(week.days, progress.completedTasks) }));
  const unlocked = weeklyStats.filter(w => w.completion > 0 || weeklyStats.indexOf(w) < (progress.unlockedWeeks?.length || 1));
  const avgCompletion = unlocked.length > 0 ? Math.round(unlocked.reduce((a, w) => a + w.completion, 0) / unlocked.length) : 0;

  return (
    <div className="fade-in space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '⚡', value: progress.xp, label: 'Total XP', color: '#B8860B' },
          { icon: '🔥', value: progress.streak, label: 'Day Streak', color: '#FF9800' },
          { icon: '📊', value: `${avgCompletion}%`, label: 'Progress', color: '#2D8B7A' },
          { icon: '✅', value: progress.completedTasks?.length || 0, label: 'Tasks Done', color: '#4CAF50' },
        ].map((stat, i) => (
          <div key={i} className="paper-card p-5 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: stat.color, fontFamily: 'Poppins, sans-serif' }}>{stat.value}</div>
            <div className="text-[11px] text-[#8A8A9A] font-medium mt-1 uppercase" style={{ letterSpacing: '0.5px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="paper-card p-5">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Weekly Progress</h3>
        <div className="space-y-3">
          {weeklyStats.map(stat => (
            <div key={stat.week} className="flex items-center gap-3">
              <span className="text-[12px] font-bold text-[#8A8A9A] w-8 tabular-nums">W{stat.week}</span>
              <div className="flex-1 h-3 bg-[#E8E0D4] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${stat.completion}%`, background: 'linear-gradient(90deg, #B8860B, #D4A843)' }} />
              </div>
              <span className="text-[12px] font-bold text-[#B8860B] w-10 text-right tabular-nums">{stat.completion}%</span>
            </div>
          ))}
        </div>
      </div>

      <BadgeGallery badges={progress.badges || []} />
    </div>
  );
}
