import { memo } from 'react';
import { IconHome, IconChart, IconTrophy, IconChat, IconBook } from './Icons';

const BottomNav = memo(function BottomNav({ activeView, onViewChange }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: IconHome },
    { id: 'progress', label: 'Progress', icon: IconChart },
    { id: 'badges', label: 'Badges', icon: IconTrophy },
    { id: 'community', label: 'Community', icon: IconChat },
    { id: 'resources', label: 'Resources', icon: IconBook },
  ];

  const isActive = (id) => id === 'progress'
    ? activeView === 'progress' || activeView === 'progress-statistics' || activeView === 'progress-skills' || activeView === 'progress-calendar'
    : activeView === id;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border safe-area-bottom" style={{ background: 'rgba(13, 26, 20, 0.95)', backdropFilter: 'blur(20px)' }}>
      <div className="grid grid-cols-5 h-16">
        {items.map(item => {
          const active = isActive(item.id);
          return (
            <button key={item.id} onClick={() => onViewChange(item.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 transition-all active:scale-90 ${
                active ? 'scale-110' : 'text-cream-500 hover:text-cream-300'
              }`}>
              {active && (
                <span className="absolute inset-0 rounded-2xl mx-2 opacity-10" style={{ background: 'linear-gradient(135deg, #7FB069, #6BA3BE)' }} />
              )}
              <span className={`relative ${active ? 'text-sage-400' : ''}`}>
                <item.icon className={`w-5 h-5 ${active ? 'drop-shadow-sm' : ''}`} style={active ? { filter: 'drop-shadow(0 0 4px rgba(127, 176, 105, 0.4))' } : {}} />
              </span>
              <span className={`text-[10px] font-semibold relative ${active ? 'text-sage-400' : ''}`}>{item.label}</span>
              {active && <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-sage-400" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
});

export default BottomNav;
