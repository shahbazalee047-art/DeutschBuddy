import { IconBolt, IconTarget, IconTrophy, IconDiamond } from './Icons';

export default function RightPanel({ progress, streak }) {
  const xp = progress?.xp || 0;
  const daysStreak = streak !== undefined ? streak : 0;

  const milestones = [
    { label: '10 XP', target: 10, icon: IconBolt },
    { label: '50 XP', target: 50, icon: IconTarget },
    { label: '100 XP', target: 100, icon: IconTrophy },
  ];
  const nextMilestone = milestones.find(m => xp < m.target) || { label: 'Legend', target: 1000, icon: IconDiamond };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <IconBolt className="w-4 h-4 text-sage-400" />
          <h4 className="text-sm font-bold text-cream-200" style={{ fontFamily: 'DM Serif Display, serif' }}>Your Stats</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-2xl p-4 text-center border border-sage-400/10" style={{ background: 'rgba(127, 176, 105, 0.05)' }}>
            <div className="text-2xl font-bold tabular-nums text-sage-400">{xp}</div>
            <div className="text-[10px] text-cream-500 font-medium uppercase" style={{ letterSpacing: '0.5px' }}>XP Earned</div>
          </div>
          <div className="rounded-2xl p-4 text-center border border-amber-400/10" style={{ background: 'rgba(212, 165, 116, 0.05)' }}>
            <div className="text-2xl font-bold tabular-nums text-amber-400">{daysStreak}</div>
            <div className="text-[10px] text-cream-500 font-medium uppercase" style={{ letterSpacing: '0.5px' }}>Day Streak</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[12px] text-cream-400 mb-1">
            <span>Next: <nextMilestone.icon className="w-3.5 h-3.5 inline-block align-text-bottom text-sage-400" /> {nextMilestone.label}</span>
            <span>{xp}/{nextMilestone.target}</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#1B3429' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((xp / nextMilestone.target) * 100, 100)}%`, background: 'linear-gradient(90deg, #7FB069, #D4A574)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}