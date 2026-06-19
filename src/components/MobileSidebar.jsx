import { Link } from 'react-router-dom';
import { IconChart, IconTarget, IconCalendar, IconX, IconSearch } from './Icons';
import SpeedBlitz from './SpeedBlitz';
import GenderDungeon from './GenderDungeon';
import PictureMatch from './PictureMatch';

const progressSections = [
  { id: 'progress-statistics', label: 'Learning Statistics', icon: IconChart },
  { id: 'progress-skills', label: 'Skill Breakdown', icon: IconTarget },
  { id: 'progress-calendar', label: 'Activity Calendar', icon: IconCalendar },
];

export default function MobileSidebar({ isOpen, onClose, activeView, onViewChange, activeLevel, onLevelChange, onVerbLookup }) {

  function handleNav(view) {
    onViewChange(view);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] shadow-2xl slide-in overflow-y-auto bg-forest-900 border-r border-border/30 pb-20" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" onClick={() => { onViewChange('dashboard'); onClose(); }}
            className="flex items-center gap-2">
            <span className="text-xl leading-none">🇩🇪</span>
            <span className="text-base font-extrabold text-cream-100" style={{ fontFamily: 'DM Serif Display, serif' }}>DeutschBuddy</span>
          </Link>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-forest-800/50 hover:bg-forest-800 flex items-center justify-center text-cream-400 transition"><IconX className="w-4 h-4" /></button>
        </div>

        {/* Level Toggle — TOP */}
        <div className="p-3 pt-4 pb-2">
          <div className="flex gap-2 px-3">
            {['A1', 'A2'].map(lvl => (
              <button key={lvl} onClick={() => { onLevelChange(lvl); onClose(); }}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all active:scale-95 ${
                  activeLevel === lvl
                    ? lvl === 'A1' ? 'bg-sage-400 text-forest-900 shadow-sm shadow-sage-400/20' : 'bg-sky-400 text-forest-900 shadow-sm shadow-sky-400/20'
                    : 'bg-forest-800 text-cream-400 border border-border hover:text-cream-200'
                }`}>
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Sections */}
        <div className="p-3 pt-2 border-t border-border">
          <p className="text-[10px] font-bold text-cream-500 uppercase tracking-widest px-3 mb-2">Progress</p>
          {progressSections.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] mb-0.5 ${
                activeView === item.id
                  ? 'text-forest-900 bg-sage-400 shadow-sm'
                  : 'text-cream-400 hover:text-cream-200 hover:bg-forest-800/50'
              }`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Verb Lookup */}
        <div className="p-3 pt-2 border-t border-border">
          <p className="text-[10px] font-bold text-cream-500 uppercase tracking-widest px-3 mb-2">Tools</p>
          <button onClick={() => { onVerbLookup(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] text-cream-400 hover:text-cream-200 hover:bg-forest-800/50">
            <IconSearch className="w-5 h-5 flex-shrink-0" />
            <span>Verb Lookup</span>
          </button>
        </div>

        {/* Games */}
        <div className="p-3 pt-2 border-t border-border">
          <p className="text-[10px] font-bold text-cream-500 uppercase tracking-widest px-3 mb-2">Games</p>
          <div className="space-y-2">
            <SpeedBlitz level={activeLevel} compact />
            <GenderDungeon compact />
            <PictureMatch level={activeLevel} compact />
          </div>
        </div>

      </div>
    </div>
  );
}
