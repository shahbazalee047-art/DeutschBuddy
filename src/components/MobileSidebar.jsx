import { Link } from 'react-router-dom';
import { IconChart, IconTarget, IconCalendar } from './Icons';

const progressSections = [
  { id: 'statistics', label: 'Learning Statistics', icon: IconChart },
  { id: 'skills', label: 'Skill Breakdown', icon: IconTarget },
  { id: 'calendar', label: 'Activity Calendar', icon: IconCalendar },
];

export default function MobileSidebar({ isOpen, onClose, activeView, activeProgressTab, onViewChange, activeLevel, onLevelChange, xp, onProgressTab }) {
  function handleProgressTab(tabId) {
    if (onProgressTab) onProgressTab(tabId);
    onViewChange('progress');
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] shadow-2xl slide-in overflow-y-auto" onClick={e => e.stopPropagation()}
        style={{ background: '#18181B', borderRight: '1px solid rgba(63, 63, 70, 0.3)' }}>
        <div className="flex items-center justify-between p-4 border-b border-zinc-700/50">
          <Link to="/" onClick={() => { onViewChange('dashboard'); onClose(); }}
            className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-lime-500 to-cyan-500 rounded-xl flex items-center justify-center text-zinc-900 text-sm font-bold shadow-sm shadow-lime-500/20">
              <span>🇩🇪</span>
            </div>
            <span className="text-base font-extrabold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif' }}>DeutschBuddy</span>
          </Link>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 flex items-center justify-center text-zinc-400 transition text-sm">✕</button>
        </div>

        <div className="p-3 pt-4">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Progress</p>
          {progressSections.map(item => (
            <button key={item.id} onClick={() => handleProgressTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] mb-0.5 ${
                activeView === 'progress' && activeProgressTab === item.id
                  ? 'text-zinc-900 bg-lime-500 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-3 pt-2 mt-2 border-t border-zinc-700/50">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Level</p>
          <div className="flex gap-2 px-3">
            {['A1', 'A2'].map(lvl => (
              <button key={lvl} onClick={() => { onLevelChange(lvl); onClose(); }}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all active:scale-95 ${
                  activeLevel === lvl
                    ? lvl === 'A1' ? 'bg-lime-500 text-zinc-900 shadow-sm shadow-lime-500/20' : 'bg-cyan-500 text-zinc-900 shadow-sm shadow-cyan-500/20'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-zinc-200'
                }`}>
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {xp !== undefined && (
          <div className="p-3 pt-2 mt-2 border-t border-zinc-700/50 pb-8">
            <div className="mx-3 px-4 py-3 rounded-xl flex items-center gap-2 bg-lime-500/10 border border-lime-500/20">
              <span className="text-lg">⚡</span>
              <div>
                <span className="text-sm font-bold text-lime-400 tabular-nums">{xp}</span>
                <span className="text-[11px] text-lime-400/60 ml-1">XP</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
