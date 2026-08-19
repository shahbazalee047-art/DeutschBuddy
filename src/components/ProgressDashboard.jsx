import { memo, useMemo } from 'react';
import {
  IconActivity, IconCalendar, IconCheckCircle, IconClock, IconFire,
  IconTarget, IconTrendingUp, IconZap,
} from './Icons';
import { addDaysDateString, getLocalDateString } from '../utils/date';

function formatNumber(value) {
  return Number(value || 0).toLocaleString();
}

function getTotals(levelData, completedTasks = []) {
  const allTasks = (levelData?.weeks || []).flatMap(week => (week.days || []).flatMap(day => day.tasks || []));
  const completed = new Set(completedTasks);
  return { total: allTasks.length, done: allTasks.filter(task => completed.has(task.id)).length };
}

const ProgressRing = memo(function ProgressRing({ value, max, label, size = 128 }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const ratio = max > 0 ? Math.min(value / max, 1) : 0;
  const offset = circumference * (1 - ratio);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`${label}: ${Math.round(ratio * 100)} percent`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--db-border-light)" strokeWidth="8" />
        <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--db-accent)" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.23,1,0.32,1), stroke-dashoffset 1.2s cubic-bezier(0.23,1,0.32,1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-3xl font-bold tabular-nums text-text-dark">{formatNumber(value)}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}</span>
      </div>
    </div>
  );
});

function Metric({ label, value, detail, icon: Icon, tone = 'primary' }) {
  const toneClass = tone === 'success' ? 'bg-success-light text-success' : tone === 'blue' ? 'bg-accent-light text-accent' : 'bg-primary-light text-primary';
  return (
    <div className="db-stat-card">
      <span className={`flex h-9 w-9 items-center justify-center ${toneClass}`}><Icon className="h-4 w-4" /></span>
      <span className="stat-value">{formatNumber(value)}</span>
      <span className="stat-label">{label}</span>
      {detail && <span className="text-xs text-text-muted">{detail}</span>}
    </div>
  );
}

function getRecentActivity(lastStudyDate, streak) {
  const today = getLocalDateString();
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDaysDateString(today, index - 6);
    const diff = lastStudyDate ? Math.floor((new Date(lastStudyDate + 'T00:00:00') - new Date(date + 'T00:00:00')) / 86400000) : -1;
    return { date, active: diff >= 0 && diff < Math.max(streak, 1), value: diff >= 0 && diff < Math.max(streak, 1) ? Math.min(80, 24 + (streak - diff) * 12) : 8 };
  });
}

const WeeklyAnalytics = memo(function WeeklyAnalytics({ progress }) {
  const days = useMemo(() => getRecentActivity(progress?.lastStudyDate, progress?.streak || 0), [progress?.lastStudyDate, progress?.streak]);
  return (
    <section className="db-surface-list p-5 sm:p-6" aria-labelledby="weekly-activity-heading">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div><p className="db-section-label mb-2">Consistency</p><h3 id="weekly-activity-heading" className="text-2xl font-bold text-text-dark">This week</h3></div>
        <IconActivity className="h-5 w-5 text-primary" />
      </div>
      <div className="analytics-chart items-end border-b border-border pb-2">
        {days.map(day => <div key={day.date} className="flex h-full flex-col items-center justify-end gap-2"><div className="analytics-bar" data-active={day.active} style={{ height: `${day.value}px` }} title={day.date} /><span className="text-[10px] font-bold uppercase text-text-muted">{new Date(day.date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2)}</span></div>)}
      </div>
      <p className="mt-4 text-sm text-text-muted">{progress?.streak ? `You have a ${progress.streak}-day streak. Keep the next session short and focused.` : 'Complete one task today to begin your study rhythm.'}</p>
    </section>
  );
});

const ActivityCalendar = memo(function ActivityCalendar({ lastStudyDate, streak }) {
  const days = useMemo(() => {
    const today = getLocalDateString();
    return Array.from({ length: 28 }, (_, index) => {
      const date = addDaysDateString(today, index - 27);
      const diff = lastStudyDate ? Math.floor((new Date(lastStudyDate + 'T00:00:00') - new Date(date + 'T00:00:00')) / 86400000) : -1;
      return { date, active: diff >= 0 && diff < Math.max(streak, 1) };
    });
  }, [lastStudyDate, streak]);
  return (
    <section className="db-surface-list p-5 sm:p-6" aria-labelledby="calendar-heading">
      <div className="mb-5 flex items-center gap-2"><IconCalendar className="h-5 w-5 text-primary" /><h3 id="calendar-heading" className="text-2xl font-bold text-text-dark">Study calendar</h3></div>
      <div className="grid grid-cols-7 gap-2">{days.map(day => <div key={day.date} className={`flex aspect-square items-center justify-center text-[10px] font-bold ${day.active ? 'bg-success text-white' : 'bg-bg-secondary text-text-muted'}`} title={day.date}>{day.date.slice(8)}</div>)}</div>
      <p className="mt-4 text-sm text-text-muted">Green squares show days included in your current streak.</p>
    </section>
  );
});

function SkillsBreakdown({ completedTasks, levelData }) {
  const skills = useMemo(() => {
    const counts = { vocabulary: 0, grammar: 0, listening: 0, speaking: 0, writing: 0, reading: 0 };
    const completed = new Set(completedTasks || []);
    (levelData?.weeks || []).forEach(week => (week.days || []).forEach(day => (day.tasks || []).forEach(task => {
      if (!completed.has(task.id)) return;
      if (task.type === 'listening') counts.listening++;
      else if (task.type === 'speaking' || task.type === 'roleplay') counts.speaking++;
      else if (task.type === 'writing') counts.writing++;
      else if (task.type === 'grammar') counts.grammar++;
      else if (task.type === 'vocabulary' || task.type === 'flashcards') counts.vocabulary++;
      else counts.reading++;
    })));
    return Object.entries(counts).map(([id, value]) => ({ id, label: id[0].toUpperCase() + id.slice(1), value }));
  }, [completedTasks, levelData]);
  const max = Math.max(...skills.map(skill => skill.value), 1);
  return (
    <section className="db-surface-list p-5 sm:p-6" aria-labelledby="skills-heading">
      <div className="mb-5 flex items-center gap-2"><IconTarget className="h-5 w-5 text-primary" /><h3 id="skills-heading" className="text-2xl font-bold text-text-dark">Skill breakdown</h3></div>
      <div className="grid gap-4 sm:grid-cols-2">{skills.map(skill => <div key={skill.id}><div className="mb-2 flex justify-between text-sm"><span className="font-bold text-text-body">{skill.label}</span><span className="tabular-nums text-text-muted">{skill.value}</span></div><div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${Math.min((skill.value / max) * 100, 100)}%` }} /></div></div>)}</div>
    </section>
  );
}

function WeekProgress({ visibleWeeks, weeklyXP }) {
  const weeks = visibleWeeks || [];
  const max = Math.max(...weeks.map(week => weeklyXP?.[`W${week.id}`] || 0), 1);
  return (
    <section className="db-surface-list p-5 sm:p-6" aria-labelledby="week-progress-heading">
      <div className="mb-5 flex items-center gap-2"><IconZap className="h-5 w-5 text-primary" /><h3 id="week-progress-heading" className="text-2xl font-bold text-text-dark">Course progress</h3></div>
      <div className="space-y-4">{weeks.map(week => { const value = weeklyXP?.[`W${week.id}`] || 0; const percent = Math.min((value / max) * 100, 100); return <div key={week.id} className="flex items-center gap-3"><div className="relative flex h-9 w-9 shrink-0 items-center justify-center"><svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true"><circle cx="20" cy="20" r="16" fill="none" stroke="var(--db-border-light)" strokeWidth="3" /><circle cx="20" cy="20" r="16" fill="none" stroke="var(--db-accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray={2 * Math.PI * 16} strokeDashoffset={2 * Math.PI * 16 * (1 - percent / 100)} /></svg><span className="text-[10px] font-bold text-text-dark">W{week.id}</span></div><div className="min-w-0 flex-1"><div className="mb-1 flex justify-between gap-2 text-xs"><span className="truncate font-bold text-text-body">{week.title}</span><span className="shrink-0 text-text-muted">{value} XP</span></div><div className="progress-bar h-1.5"><div className="progress-bar-fill" style={{ width: `${percent}%` }} /></div></div></div>; })}</div>
    </section>
  );
}

export default function ProgressDashboard({ progress, levelData, visibleWeeks, activeLevel, mode = 'statistics' }) {
  const { total, done } = useMemo(() => getTotals(levelData, progress?.completedTasks), [levelData, progress?.completedTasks]);
  const title = mode === 'skills' ? 'Your skill balance' : mode === 'calendar' ? 'Your study rhythm' : 'Your learning progress';
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="progress-dashboard view-enter">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="db-section-label mb-2">{activeLevel} · Progress</p><h1 className="text-4xl font-bold text-text-dark">{title}</h1><p className="mt-1 text-sm text-text-muted">See the language skills behind the numbers.</p></div>
        <div className="text-right"><span className="font-display text-3xl font-bold tabular-nums text-primary">{percent}%</span><p className="text-xs font-bold uppercase tracking-wider text-text-muted">course complete</p></div>
      </header>

      <section className="db-surface-list flex flex-col items-center gap-6 p-5 sm:flex-row sm:p-6">
        <ProgressRing value={done} max={Math.max(total, 1)} label="lessons" />
        <div className="min-w-0 flex-1 text-center sm:text-left"><p className="text-sm font-bold uppercase tracking-wider text-primary">Actual learning progress</p><h2 className="mt-2 text-3xl font-bold text-text-dark">{done} lessons completed</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">Keep the focus on the next useful German skill. XP and streaks are here to support the habit, not compete with it.</p></div>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric icon={IconCheckCircle} value={done} label="Lessons done" detail={`of ${total}`} tone="success" />
        <Metric icon={IconFire} value={progress?.streak || 0} label="Day streak" detail="keep it steady" tone="blue" />
        <Metric icon={IconClock} value={progress?.todayXP || 0} label="Today" detail="XP earned" tone="blue" />
        <Metric icon={IconTrendingUp} value={progress?.xp || 0} label="Total XP" detail="secondary metric" tone="primary" />
      </div>

      {mode === 'skills' && <SkillsBreakdown completedTasks={progress?.completedTasks} levelData={levelData} />}
      {mode === 'calendar' && <ActivityCalendar lastStudyDate={progress?.lastStudyDate} streak={progress?.streak || 0} />}
      {(mode === 'statistics' || !mode) && <div className="grid gap-5 lg:grid-cols-2"><WeeklyAnalytics progress={progress} /><WeekProgress visibleWeeks={visibleWeeks} weeklyXP={progress?.weeklyXP} /></div>}
      {mode === 'skills' && <div className="grid gap-5 lg:grid-cols-2"><WeeklyAnalytics progress={progress} /><WeekProgress visibleWeeks={visibleWeeks} weeklyXP={progress?.weeklyXP} /></div>}
      {mode === 'calendar' && <WeekProgress visibleWeeks={visibleWeeks} weeklyXP={progress?.weeklyXP} />}

      <section className="db-surface-list p-5 sm:p-6"><div className="mb-4 flex items-center gap-2"><IconZap className="h-5 w-5 text-primary" /><h3 className="text-2xl font-bold text-text-dark">A useful read on your progress</h3></div><ul className="space-y-3 text-sm text-text-body"><li className="flex gap-3"><IconClock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>Last studied: <strong>{progress?.lastStudyDate ? new Date(progress.lastStudyDate + 'T00:00:00').toLocaleDateString() : 'Not yet'}</strong></span></li><li className="flex gap-3"><IconCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" /><span>Completed lessons: <strong>{done}</strong> of {total}</span></li><li className="flex gap-3"><IconTrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>Next focus: <strong>{done < total ? 'one more lesson' : 'review and practice'}</strong></span></li></ul></section>
    </div>
  );
}
