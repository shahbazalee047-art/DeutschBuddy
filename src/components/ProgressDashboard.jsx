import { memo, useMemo } from 'react';
import {
  IconFire, IconCheckCircle, IconCalendar, IconTrendingUp,
  IconZap, IconTarget, IconClock, IconActivity
} from './Icons';

function getUTCDateString(date = new Date()) {
  return date.toISOString().split('T')[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return getUTCDateString(d);
}

function formatNumber(n) {
  return Number(n || 0).toLocaleString();
}

const ProgressRing = memo(function ProgressRing({ value, max, size = 88, stroke = 8, label, sublabel }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - Math.min(value / max, 1) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            stroke="currentColor" strokeWidth={stroke} fill="transparent"
            className="text-border/40"
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            stroke="currentColor" strokeWidth={stroke} fill="transparent"
            strokeDasharray={circumference} strokeDashoffset={offset}
            className="text-gold transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-text-dark">{formatNumber(value)}</span>
          <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{label}</span>
        </div>
      </div>
      {sublabel && <p className="text-xs text-text-muted mt-2">{sublabel}</p>}
    </div>
  );
});

const StatCard = memo(function StatCard({ icon: Icon, value, label, sublabel, tone = 'gold' }) {
  const toneClasses = {
    gold: 'bg-gold/10 text-gold border-gold/20',
    success: 'bg-success/10 text-success border-success/20',
    info: 'bg-info/10 text-info border-info/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
  }[tone] || toneClasses.gold;

  return (
    <div className="paper-card p-5 flex flex-col items-center justify-center text-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 border ${toneClasses}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-3xl font-bold text-text-dark">{formatNumber(value)}</span>
      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mt-1">{label}</p>
      {sublabel && <p className="text-xs text-text-muted mt-1">{sublabel}</p>}
    </div>
  );
});

function computeCalendarDays(lastStudyDate, streak) {
  const today = getUTCDateString();
  const days = [];
  // Build a 4-week grid; mark today active if studied today, and previous days based on streak.
  for (let i = 27; i >= 0; i--) {
    const date = addDays(today, -i);
    let active = false;
    if (lastStudyDate) {
      if (date === lastStudyDate) active = true;
      else if (streak > 1 && date < lastStudyDate) {
        const diff = Math.floor((new Date(lastStudyDate + 'T00:00:00Z') - new Date(date + 'T00:00:00Z')) / (86400000));
        if (diff > 0 && diff < streak) active = true;
      }
    }
    days.push({ date, active });
  }
  return days;
}

const ActivityCalendar = memo(function ActivityCalendar({ lastStudyDate, streak }) {
  const days = useMemo(() => computeCalendarDays(lastStudyDate, streak), [lastStudyDate, streak]);

  return (
    <div className="paper-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <IconCalendar className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-semibold text-text-dark">Last 28 Days</h3>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-medium transition-colors ${
              d.active ? 'bg-gold text-cta-text' : 'bg-bg-dark-mid text-text-muted'
            }`}
            title={d.date}
          >
            {d.date.slice(8)}
          </div>
        ))}
      </div>
      <p className="text-xs text-text-muted mt-3">
        {streak > 0 ? `You're on a ${streak}-day streak. Keep it up!` : 'Complete a task today to start a streak.'}
      </p>
    </div>
  );
});

const WeeklyBreakdown = memo(function WeeklyBreakdown({ weeklyXP, visibleWeeks }) {
  const weeks = useMemo(() => {
    if (!visibleWeeks) return [];
    return visibleWeeks.map(w => ({
      id: w.id,
      title: w.title,
      xp: weeklyXP?.[`W${w.id}`] || 0,
    }));
  }, [weeklyXP, visibleWeeks]);

  const max = Math.max(...weeks.map(w => w.xp), 1);

  return (
    <div className="paper-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <IconActivity className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-semibold text-text-dark">XP by Week</h3>
      </div>
      <div className="space-y-3">
        {weeks.map(w => (
          <div key={w.id}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-body truncate">Week {w.id}: {w.title}</span>
              <span className="text-text-muted">{w.xp} XP</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.min((w.xp / max) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const SkillsBreakdown = memo(function SkillsBreakdown({ completedTasks, levelData }) {
  const stats = useMemo(() => {
    if (!levelData?.weeks || !completedTasks) {
      return { listening: 0, speaking: 0, reading: 0, writing: 0, grammar: 0, vocab: 0 };
    }
    const counts = { listening: 0, speaking: 0, reading: 0, writing: 0, grammar: 0, vocab: 0 };
    levelData.weeks.forEach(w => {
      w.days.forEach(d => {
        d.tasks.forEach(t => {
          if (!completedTasks.includes(t.id)) return;
          if (t.type === 'listening') counts.listening++;
          else if (t.type === 'speaking' || t.type === 'roleplay') counts.speaking++;
          else if (t.type === 'writing') counts.writing++;
          else if (t.type === 'grammar') counts.grammar++;
          else if (t.type === 'vocabulary' || t.type === 'flashcards') counts.vocab++;
          else counts.reading++;
        });
      });
    });
    return counts;
  }, [completedTasks, levelData]);

  const skills = [
    { id: 'vocab', label: 'Vocabulary', value: stats.vocab },
    { id: 'grammar', label: 'Grammar', value: stats.grammar },
    { id: 'listening', label: 'Listening', value: stats.listening },
    { id: 'speaking', label: 'Speaking', value: stats.speaking },
    { id: 'reading', label: 'Reading', value: stats.reading },
    { id: 'writing', label: 'Writing', value: stats.writing },
  ];
  const max = Math.max(...skills.map(s => s.value), 1);

  return (
    <div className="paper-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <IconTarget className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-semibold text-text-dark">Skill Breakdown</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skills.map(s => (
          <div key={s.id} className="bg-bg-dark-mid p-3 rounded-md">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-body">{s.label}</span>
              <span className="text-text-muted">{s.value}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${Math.min((s.value / max) * 100, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const StatisticsPanel = memo(function StatisticsPanel({ progress, levelData, visibleWeeks }) {
  const totalTasks = useMemo(() => {
    if (!levelData?.weeks) return 0;
    return levelData.weeks.reduce((sum, w) => sum + w.days.reduce((dSum, d) => dSum + d.tasks.length, 0), 0);
  }, [levelData]);

  const completedCount = progress?.completedTasks?.length || 0;
  const weeksComplete = useMemo(() => {
    if (!levelData?.weeks || !progress?.completedTasks) return 0;
    return levelData.weeks.filter(w =>
      w.days.every(d => d.tasks.every(t => progress.completedTasks.includes(t.id)))
    ).length;
  }, [levelData, progress]);

  const nextLevelXP = Math.max((progress?.xp || 0) + 100, 500);
  const xpRemaining = Math.max(nextLevelXP - (progress?.xp || 0), 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ProgressRing
          value={progress?.xp || 0}
          max={nextLevelXP}
          label="XP"
          sublabel={`${xpRemaining} XP to next milestone`}
        />
        <StatCard icon={IconFire} value={progress?.streak || 0} label="Day Streak" tone="warning" />
        <StatCard icon={IconCheckCircle} value={completedCount} label="Tasks Done" sublabel={`of ${totalTasks} total`} tone="success" />
        <StatCard icon={IconCalendar} value={weeksComplete} label="Weeks Complete" sublabel={`of ${visibleWeeks?.length || 8} weeks`} tone="info" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeeklyBreakdown weeklyXP={progress?.weeklyXP} visibleWeeks={visibleWeeks} />
        <ActivityCalendar lastStudyDate={progress?.lastStudyDate} streak={progress?.streak || 0} />
      </div>
    </div>
  );
});

export default function ProgressDashboard({ progress, levelData, visibleWeeks, activeLevel, mode = 'statistics' }) {
  const title = mode === 'skills'
    ? 'Skill Breakdown'
    : mode === 'calendar'
      ? 'Study Calendar'
      : 'Progress Statistics';

  return (
    <div className="view-enter space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <IconTrendingUp className="w-5 h-5 text-gold" />
        <span className="eyebrow mb-0">{activeLevel}</span>
        <h2 className="text-2xl font-semibold text-text-dark editorial-heading">{title}</h2>
      </div>

      {mode === 'skills' && <SkillsBreakdown completedTasks={progress?.completedTasks} levelData={levelData} />}
      {mode === 'calendar' && <ActivityCalendar lastStudyDate={progress?.lastStudyDate} streak={progress?.streak || 0} />}
      {(mode === 'statistics' || !mode) && (
        <StatisticsPanel progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} />
      )}

      <div className="paper-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <IconZap className="w-5 h-5 text-gold" />
          <h3 className="text-lg font-semibold text-text-dark">Learning Insights</h3>
        </div>
        <ul className="space-y-2 text-sm text-text-body">
          <li className="flex items-start gap-2">
            <IconClock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <span>Last studied: {progress?.lastStudyDate ? new Date(progress.lastStudyDate + 'T00:00:00Z').toLocaleDateString() : 'Not yet'}</span>
          </li>
          <li className="flex items-start gap-2">
            <IconCheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <span>Completed tasks: {progress?.completedTasks?.length || 0}</span>
          </li>
          <li className="flex items-start gap-2">
            <IconTrendingUp className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <span>Total XP: {progress?.xp || 0}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
