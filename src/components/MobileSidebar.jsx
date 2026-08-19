import { Link } from 'react-router-dom';
import { IconChart, IconTarget, IconCalendar, IconX, IconSearch, IconZap, IconImage, IconTrophy, IconChevronRight } from './Icons';

const progressSections = [
  { id: 'progress-statistics', label: 'Learning statistics', icon: IconChart },
  { id: 'progress-skills', label: 'Skill breakdown', icon: IconTarget },
  { id: 'progress-calendar', label: 'Activity calendar', icon: IconCalendar },
];

export default function MobileSidebar({ isOpen, onClose, activeView, onViewChange, activeLevel, onLevelChange, onVerbLookup, onOpenSpeedBlitz, onOpenGenderDungeon, onOpenPictureMatch }) {
  if (!isOpen) return null;
  function handleNav(view) { onViewChange(view); onClose(); }
  function handleTool(open) { open(); onClose(); }
  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation" onClick={onClose}>
      <div className="absolute inset-0 bg-primary-dark/40" aria-hidden="true" />
      <aside className="absolute bottom-0 left-0 top-0 w-80 max-w-[calc(100vw-32px)] overflow-y-auto border-r border-border bg-surface p-4 shadow-2xl" onClick={event => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border pb-4"><Link to="/" onClick={() => handleNav('dashboard')} className="db-wordmark text-2xl">Deutsch<em>Buddy</em></Link><button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center text-text-muted hover:bg-bg-secondary hover:text-primary" aria-label="Close navigation"><IconX className="h-5 w-5" /></button></div>
        <div className="border-b border-border py-5"><p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-text-muted">Course level</p><div className="grid grid-cols-2 border border-border">{['A1', 'A2'].map(level => <button key={level} type="button" onClick={() => { onLevelChange(level); onClose(); }} className={`min-h-11 text-sm font-bold ${activeLevel === level ? 'bg-primary text-white underline decoration-2 underline-offset-4' : 'bg-surface text-text-muted hover:bg-bg-secondary'}`}>{level}</button>)}</div></div>
        <div className="border-b border-border py-5"><p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-text-muted">Progress</p>{progressSections.map(item => <button key={item.id} type="button" onClick={() => handleNav(item.id)} className={`flex min-h-12 w-full items-center gap-3 px-3 text-left text-sm font-semibold ${activeView === item.id ? 'bg-primary-light text-primary' : 'text-text-body hover:bg-bg-secondary'}`}><item.icon className="h-5 w-5 shrink-0" /><span>{item.label}</span><IconChevronRight className="ml-auto h-4 w-4 text-text-muted" /></button>)}</div>
        <div className="border-b border-border py-5"><p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-text-muted">Tools</p><button type="button" onClick={onVerbLookup} className="flex min-h-12 w-full items-center gap-3 px-3 text-left text-sm font-semibold text-text-body hover:bg-bg-secondary"><IconSearch className="h-5 w-5 text-primary" /> Verb lookup <IconChevronRight className="ml-auto h-4 w-4 text-text-muted" /></button></div>
        <div className="py-5"><p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-text-muted">Quick practice</p><div className="grid grid-cols-3 gap-2"><ToolButton label="Speed" icon={IconZap} onClick={() => handleTool(onOpenSpeedBlitz)} /><ToolButton label="Gender" icon={IconTrophy} onClick={() => handleTool(onOpenGenderDungeon)} /><ToolButton label="Pictures" icon={IconImage} onClick={() => handleTool(onOpenPictureMatch)} /></div></div>
      </aside>
    </div>
  );
}

function ToolButton({ label, icon: Icon, onClick }) {
  return <button type="button" onClick={onClick} className="flex aspect-square min-h-16 flex-col items-center justify-center gap-1 border border-border bg-bg-secondary p-2 text-xs font-bold text-text-body hover:border-primary hover:bg-primary-light"><Icon className="h-5 w-5 text-primary" />{label}</button>;
}
