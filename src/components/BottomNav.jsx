import { memo } from 'react';
import { IconHome, IconMap, IconRefresh, IconTrophy, IconUser } from './Icons';

const BottomNav = memo(function BottomNav({ activeView, onViewChange, badges = {} }) {
  const items = [
    { id: 'dashboard', label: 'Learn', icon: IconHome },
    { id: 'journey', label: 'Journey', icon: IconMap },
    { id: 'review', label: 'Review', icon: IconRefresh },
    { id: 'badges', label: 'Badges', icon: IconTrophy },
    { id: 'profile', label: 'Profile', icon: IconUser },
  ];

  const isActive = (id) => {
    if (id === 'progress') {
      return activeView === 'progress' || activeView === 'progress-statistics' || activeView === 'progress-skills' || activeView === 'progress-calendar';
    }
    return activeView === id;
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border pb-safe bg-surface"
      aria-label="Primary navigation"
    >
      <div className="grid grid-cols-5 h-16">
        {items.map(item => {
          const active = isActive(item.id);
          const badge = badges[item.id];
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                relative flex flex-col items-center justify-center gap-1 transition-transform active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
                ${active ? 'text-primary' : 'text-text-muted hover:text-text-dark'}
              `}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              {active && (
                <span className="absolute inset-x-4 top-2 bottom-2 rounded-xl bg-primary/10" />
              )}
              <span className="relative">
                <item.icon className="w-5 h-5" />
                {badge ? (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-gold text-text-on-dark text-[9px] font-bold flex items-center justify-center tabular-nums">
                    {badge > 9 ? '9+' : badge}
                  </span>
                ) : null}
              </span>
              <span className={`text-[10px] font-semibold relative ${active ? 'text-primary' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

export default BottomNav;
