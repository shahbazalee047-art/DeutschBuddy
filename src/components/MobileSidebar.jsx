import { Link } from 'react-router-dom';
import { IconChart, IconTarget, IconCalendar, IconX, IconSearch, IconZap, IconImage, IconTrophy } from './Icons';

const progressSections = [
  { id: 'progress-statistics', label: 'Learning Statistics', icon: IconChart },
  { id: 'progress-skills', label: 'Skill Breakdown', icon: IconTarget },
  { id: 'progress-calendar', label: 'Activity Calendar', icon: IconCalendar },
];

export default function MobileSidebar({
  isOpen, onClose, activeView, onViewChange, activeLevel, onLevelChange,
  onVerbLookup, onOpenSpeedBlitz, onOpenGenderDungeon, onOpenPictureMatch
}) {

  function handleNav(view) {
    onViewChange(view);
    onClose();
  }

  function handleOpenGame(openFn) {
    openFn();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] shadow-2xl slide-in overflow-y-auto bg-bg-dark border-r border-border/30 pb-20" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" onClick={() => { onViewChange('dashboard'); onClose(); }}
            className="flex items-center gap-2">
            <span className="text-base font-extrabold text-text-on-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Deutsch</span>
            <span className="text-base font-extrabold text-gold italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Buddy</span>
          </Link>
          <button onClick={onClose} className="w-8 h-8 bg-bg-dark-mid/50 hover:bg-bg-dark-mid flex items-center justify-center text-text-on-dark-muted transition"><IconX className="w-4 h-4" /></button>
        </div>

        {/* Level Toggle — TOP */}
        <div className="p-3 pt-4 pb-2">
          <div className="flex gap-2 px-3 min-w-0">
            {['A1', 'A2'].map(lvl => (
              <button key={lvl} onClick={() => { onLevelChange(lvl); onClose(); }}
                className={`flex-1 py-2.5 text-[13px] transition-all active:scale-95 truncate min-w-0 ${
                  activeLevel === lvl
                    ? 'bg-gold text-text-on-dark shadow-sm font-bold underline underline-offset-4'
                    : 'bg-bg-dark-mid text-text-on-dark-muted border border-gold/20 hover:text-text-on-dark font-medium'
                }`}>
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Sections */}
        <div className="p-3 pt-2 border-t border-gold/20">
          <p className="text-[10px] font-bold text-text-on-dark-muted uppercase tracking-widest px-3 mb-2">Progress</p>
          {progressSections.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] mb-0.5 ${
                activeView === item.id
                  ? 'text-text-on-dark bg-gold shadow-sm'
                  : 'text-text-on-dark-muted hover:text-text-on-dark hover:bg-bg-dark-mid/50'
              }`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Verb Lookup */}
        <div className="p-3 pt-2 border-t border-gold/20">
          <p className="text-[10px] font-bold text-text-on-dark-muted uppercase tracking-widest px-3 mb-2">Tools</p>
          <button onClick={() => { onVerbLookup(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] text-text-on-dark-muted hover:text-text-on-dark hover:bg-bg-dark-mid/50">
            <IconSearch className="w-5 h-5 flex-shrink-0" />
            <span>Verb Lookup</span>
          </button>
        </div>

        {/* Games */}
        <div className="p-3 pt-2 border-t border-gold/20">
          <p className="text-[10px] font-bold text-text-on-dark-muted uppercase tracking-widest px-3 mb-2">Games</p>
          <div className="grid grid-cols-3 gap-2 px-3">
            <button onClick={() => handleOpenGame(onOpenSpeedBlitz)}
              className="aspect-square flex flex-col items-center justify-center gap-1.5 p-2 bg-bg-dark-mid border border-gold/20 text-text-on-dark-muted hover:text-text-on-dark hover:bg-gold/10 hover:border-gold/40 transition active:scale-[0.98]">
              <IconZap className="w-6 h-6 text-gold-light" />
              <span className="text-[10px] font-semibold leading-tight text-center">Wortblitz</span>
            </button>
            <button onClick={() => handleOpenGame(onOpenGenderDungeon)}
              className="aspect-square flex flex-col items-center justify-center gap-1.5 p-2 bg-bg-dark-mid border border-gold/20 text-text-on-dark-muted hover:text-text-on-dark hover:bg-gold/10 hover:border-gold/40 transition active:scale-[0.98]">
              <IconTrophy className="w-6 h-6 text-gold-light" />
              <span className="text-[10px] font-semibold leading-tight text-center">Der Die Das Dungeon</span>
            </button>
            <button onClick={() => handleOpenGame(onOpenPictureMatch)}
              className="aspect-square flex flex-col items-center justify-center gap-1.5 p-2 bg-bg-dark-mid border border-gold/20 text-text-on-dark-muted hover:text-text-on-dark hover:bg-gold/10 hover:border-gold/40 transition active:scale-[0.98]">
              <IconImage className="w-6 h-6 text-gold-light" />
              <span className="text-[10px] font-semibold leading-tight text-center">Bild Memory</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
