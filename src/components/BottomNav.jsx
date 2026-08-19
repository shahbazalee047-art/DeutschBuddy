import { memo } from 'react';
import { IconHome, IconMap, IconRefresh, IconChart, IconUser } from './Icons';

const items = [
  { id: 'dashboard', label: 'Home', icon: IconHome },
  { id: 'journey', label: 'Learn', icon: IconMap },
  { id: 'review', label: 'Practice', icon: IconRefresh },
  { id: 'progress', label: 'Progress', icon: IconChart },
  { id: 'profile', label: 'Profile', icon: IconUser },
];

function activeFor(id, activeView) {
  if (id === 'progress') return activeView === 'progress' || activeView.startsWith('progress-');
  return activeView === id;
}

const BottomNav = memo(function BottomNav({ activeView, onViewChange, badges = {} }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface pb-safe lg:hidden" aria-label="Primary navigation">
      <div className="grid h-16 grid-cols-5">
        {items.map(({ id, label, icon: Icon }) => {
          const active = activeFor(id, activeView);
          const badge = badges[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => onViewChange(id)}
              aria-current={active ? 'page' : undefined}
              aria-label={label}
              className={`relative flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-xs transition-[color,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active ? 'bg-primary-light text-primary' : 'text-text-muted hover:bg-bg-secondary hover:text-primary'}`}
            >
              <span className="relative">
                <Icon className="h-5 w-5" />
                {badge ? <span className="absolute -right-3 -top-2 min-w-4 bg-primary px-1 text-[9px] font-bold leading-4 text-text-on-primary">{badge > 9 ? '9+' : badge}</span> : null}
              </span>
              <span className="font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

export default BottomNav;
