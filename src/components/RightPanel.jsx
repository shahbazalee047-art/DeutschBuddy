import { useState } from 'react';
import { IconBolt, IconChevronDown, IconChevronUp, IconGamepad, IconTarget, IconTrophy, IconDiamond, IconFire } from './Icons';

function ProgressRing({ xp, target, label, icon: Icon }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(xp / target, 1);
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0">
        <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90" aria-hidden="true"><circle cx="20" cy="20" r={radius} fill="none" stroke="var(--db-border-light)" strokeWidth="3" /><circle cx="20" cy="20" r={radius} fill="none" stroke="var(--db-accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - ratio)} /></svg>
        <Icon className="absolute inset-0 m-auto h-4 w-4 text-primary" />
      </div>
      <div><p className="text-xs font-bold text-text-dark">{label}</p><p className="text-[11px] text-text-muted">{xp}/{target} XP</p></div>
    </div>
  );
}

function GameLauncher({ title, description, icon: Icon, onClick }) {
  return <button type="button" onClick={onClick} className="db-surface-list flex min-h-16 w-full items-center gap-3 p-3 text-left transition-[border-color,transform] hover:border-primary active:scale-[0.96]"><span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary-light text-primary"><Icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-text-dark">{title}</span><span className="block truncate text-xs text-text-muted">{description}</span></span><IconGamepad className="h-4 w-4 shrink-0 text-text-muted" /></button>;
}

export default function RightPanel({ progress, streak, onOpenSpeedBlitz, onOpenGenderDungeon, onOpenPictureMatch }) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const xp = progress?.xp || 0;
  const daysStreak = streak || 0;
  const nextMilestone = xp < 10 ? 10 : xp < 50 ? 50 : xp < 100 ? 100 : 250;
  return (
    <aside className="right-panel space-y-4" aria-label="Practice tools and secondary progress">
      <button type="button" onClick={() => setToolsOpen(open => !open)} aria-expanded={toolsOpen} className="mobile-tools-toggle flex w-full items-center justify-between border border-border bg-surface px-4 text-left text-xs font-bold uppercase tracking-widest text-primary lg:hidden"><span>Show tools</span>{toolsOpen ? <IconChevronUp className="h-4 w-4" /> : <IconChevronDown className="h-4 w-4" />}</button>
      <div className={`space-y-4 ${toolsOpen ? '' : 'hidden lg:block'}`}>
        <section className="db-surface-list p-4"><div className="mb-4 flex items-center justify-between"><div><p className="db-section-label mb-2">Practice</p><h2 className="text-2xl font-bold text-text-dark">Keep it active</h2></div><IconGamepad className="h-5 w-5 text-primary" /></div><div className="space-y-2"><GameLauncher title="Speed Blitz" description="Fast vocabulary recall" icon={IconBolt} onClick={onOpenSpeedBlitz} /><GameLauncher title="Gender practice" description="der · die · das" icon={IconTrophy} onClick={onOpenGenderDungeon} /><GameLauncher title="Picture memory" description="Match words with images" icon={IconTarget} onClick={onOpenPictureMatch} /></div></section>
        <section className="db-surface-list p-4"><div className="mb-4 flex items-center gap-2"><IconFire className="h-4 w-4 text-accent" /><h2 className="text-2xl font-bold text-text-dark">Motivation</h2></div><div className="grid grid-cols-2 gap-3"><div className="bg-bg-secondary p-3"><p className="text-2xl font-bold tabular-nums text-text-dark">{xp}</p><p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Total XP</p></div><div className="bg-bg-secondary p-3"><p className="text-2xl font-bold tabular-nums text-text-dark">{daysStreak}</p><p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Day streak</p></div></div><div className="mt-5 border-t border-border pt-4"><div className="mb-3 flex items-center gap-2"><IconDiamond className="h-4 w-4 text-primary" /><p className="text-xs font-bold uppercase tracking-wider text-text-muted">Next milestone</p></div><ProgressRing xp={xp} target={nextMilestone} label={`${nextMilestone} XP`} icon={IconTrophy} /></div></section>
      </div>
    </aside>
  );
}
