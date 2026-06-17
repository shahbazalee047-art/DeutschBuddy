import { getWeekCompletion } from '../utils/progress';
import BadgeGallery, { ALL_BADGES } from './BadgeGallery';

export default function ProgressDashboard({ progress, levelData, visibleWeeks }) {
  const levelWeeks = visibleWeeks || levelData.weeks;
  const streak = progress.streak;
  const badges = progress.badges;

  const weeklyStats = levelWeeks.map(week => ({
    week: week.id,
    completion: getWeekCompletion(week.days, progress.completedTasks),
  }));

  const unlocked = weeklyStats.filter(w => w.completion > 0 || weeklyStats.indexOf(w) < (progress.unlockedWeeks?.length || 1));
  const avgCompletion = unlocked.length > 0 ? Math.round(unlocked.reduce((a, w) => a + w.completion, 0) / unlocked.length) : 0;
  const completedCount = progress.completedTasks.length;

  return (
    <div className="fade-in space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '⚡', value: progress.xp, label: 'Total XP', bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400' },
          { icon: '🔥', value: streak, label: 'Day Streak', bg: 'bg-orange-500/10 border-orange-500/20', text: 'text-orange-400' },
          { icon: '📊', value: `${avgCompletion}%`, label: 'Progress', bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-400' },
          { icon: '✅', value: completedCount, label: 'Tasks Done', bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-400' },
        ].map((stat, i) => (
          <div key={i} className={`glass-card p-4 text-center`}>
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-xl font-bold ${stat.text} tabular-nums`}>{stat.value}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-slate-200 mb-4">Weekly Progress</h3>
        <div className="space-y-3">
          {weeklyStats.map(stat => (
            <div key={stat.week} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-8 font-medium tabular-nums">W{stat.week}</span>
              <div className="flex-1 h-5 bg-slate-800/50 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${stat.completion}%`, background: stat.completion === 100 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : stat.completion > 0 ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' : '#1e293b' }} />
              </div>
              <span className="text-xs text-slate-500 w-8 text-right font-medium tabular-nums">{stat.completion}%</span>
            </div>
          ))}
        </div>
      </div>

      <BadgeGallery badges={badges} allBadges={ALL_BADGES} />

      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-slate-200 mb-4">External Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { icon: '📺', title: 'Nicos Weg (DW)', desc: 'Free video course', href: 'https://learngerman.dw.com/en/overview' },
            { icon: '🎬', title: 'Easy German', desc: 'YouTube street interviews', href: 'https://www.youtube.com/@EasyGerman' },
            { icon: '📖', title: 'Verbformen', desc: 'Verb conjugations', href: 'https://www.verbformen.de/' },
            { icon: '🏛️', title: 'Goethe-Institut', desc: 'Official exam materials', href: 'https://goethe.de' },
          ].map((r, i) => (
            <a key={i} href={r.href} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 p-3.5 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:border-blue-500/30 hover:bg-slate-800/50 transition">
              <span className="text-xl">{r.icon}</span>
              <div>
                <div className="font-medium text-sm text-slate-300">{r.title}</div>
                <div className="text-xs text-slate-500">{r.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
