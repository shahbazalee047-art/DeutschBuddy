import { IconBolt, IconTarget, IconTrophy, IconDiamond } from './Icons';
import SpeedBlitz from './SpeedBlitz';
import GenderDungeon from './GenderDungeon';
import PictureMatch from './PictureMatch';

function ProgressRing({ xp, target, label, icon: Icon, size = 100, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(xp / target, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--bg-secondary)" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="url(#ringGradient)" strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--gold)" />
              <stop offset="100%" stopColor="var(--gold-light)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-5 h-5 text-gold" />
        </div>
      </div>
      <span className="text-[11px] font-bold text-text-dark">{label}</span>
      <span className="text-[10px] text-text-muted">{xp}/{target} XP</span>
    </div>
  );
}

export default function RightPanel({ progress, streak, activeLevel }) {
  const xp = progress?.xp || 0;
  const daysStreak = streak !== undefined ? streak : 0;

  const milestones = [
    { label: '10 XP', target: 10, icon: IconBolt },
    { label: '50 XP', target: 50, icon: IconTarget },
    { label: '100 XP', target: 100, icon: IconTrophy },
  ];
  const nextMilestone = milestones.find(m => xp < m.target) || { label: 'Legend', target: 1000, icon: IconDiamond, xp: 1000 };

  return (
    <div className="space-y-4">
      {/* Speed Blitz */}
      <SpeedBlitz level={activeLevel} />

      {/* Gender Dungeon */}
      <GenderDungeon />

      {/* Picture Match */}
      <PictureMatch level={activeLevel} />

      {/* Stats */}
      <div className="paper-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <IconBolt className="w-4 h-4 text-gold" />
          <h4 className="text-sm font-bold text-text-body" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Your Stats</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-4 text-center border border-gold/10 bg-gold/5">
            <div className="text-2xl font-bold tabular-nums text-gold">{xp}</div>
            <div className="text-[10px] text-text-muted font-medium uppercase" style={{ letterSpacing: '0.5px' }}>XP Earned</div>
          </div>
          <div className="p-4 text-center border border-gold-light/10 bg-gold-light/5">
            <div className="text-2xl font-bold tabular-nums text-gold-light">{daysStreak}</div>
            <div className="text-[10px] text-text-muted font-medium uppercase" style={{ letterSpacing: '0.5px' }}>Day Streak</div>
          </div>
        </div>

        {/* Milestone rings */}
        <h5 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Next Milestone</h5>
        <div className="flex justify-center gap-4">
          {milestones.concat(nextMilestone).filter((m, i, arr) => i === arr.length - 1 || m.target > xp).slice(0, 3).map(m => (
            <ProgressRing key={m.label} xp={xp} target={m.target} label={m.label} icon={m.icon} size={80} />
          ))}
        </div>
      </div>
    </div>
  );
}
