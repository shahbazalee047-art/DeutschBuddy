import { IconHome, IconChart, IconTrophy, IconChat, IconBook } from './Icons';

export default function BottomNav({ activeView, onViewChange }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: IconHome },
    { id: 'progress', label: 'Progress', icon: IconChart },
    { id: 'badges', label: 'Badges', icon: IconTrophy },
    { id: 'community', label: 'Community', icon: IconChat },
    { id: 'resources', label: 'Resources', icon: IconBook },
  ];

  const isProgressActive = activeView === 'progress' || activeView === 'progress-statistics' || activeView === 'progress-skills' || activeView === 'progress-calendar';

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-700/50 safe-area-bottom" style={{ background: 'rgba(24, 24, 27, 0.95)', backdropFilter: 'blur(20px)' }}>
      <div className="grid grid-cols-5 h-16">
        {items.map(item => (
          <button key={item.id} onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all active:scale-90 ${
              item.id === 'progress'
                ? isProgressActive
                  ? 'text-lime-400 scale-110'
                  : 'text-zinc-600 hover:text-zinc-300'
                : activeView === item.id
                  ? 'text-lime-400 scale-110'
                  : 'text-zinc-600 hover:text-zinc-300'
            }`}>
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{item.label}</span>
            {(item.id === 'progress' ? isProgressActive : activeView === item.id) && <div className="w-1 h-1 rounded-full bg-lime-400 mt-0.5" />}
          </button>
        ))}
      </div>
    </nav>
  );
}
