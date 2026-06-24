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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gold/20 pb-safe" style={{ background: 'var(--bg-dark)', backdropFilter: 'blur(20px)' }}>
      <div className="grid grid-cols-5 h-16">
        {items.map(item => {
          const active = isActive(item.id);
          return (
            <button key={item.id} onClick={() => onViewChange(item.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark ${
                active ? 'scale-110' : 'text-text-on-dark-muted hover:text-text-on-dark'
              }`}>
              {active && (
                <span className="absolute inset-x-1 top-1 bottom-1 opacity-10" style={{ background: 'var(--gold)' }} />
              )}
              <span className={`relative ${active ? 'text-gold' : ''}`}>
                <item.icon className={`w-5 h-5 ${active ? 'drop-shadow-sm' : ''}`} style={active ? { filter: 'drop-shadow(0 0 4px rgba(232,163,61,0.4))' } : {}} />
              </span>
              <span className={`text-[10px] font-semibold relative ${active ? 'text-gold' : ''}`}>{item.label}</span>
              {active && <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-gold" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
});

export default BottomNav;
