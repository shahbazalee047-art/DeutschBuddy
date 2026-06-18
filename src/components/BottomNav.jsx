export default function BottomNav({ activeView, onViewChange }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'badges', label: 'Badges', icon: '🏆' },
    { id: 'community', label: 'Community', icon: '💬' },
    { id: 'resources', label: 'Resources', icon: '📚' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-700/50 safe-area-bottom" style={{ background: 'rgba(24, 24, 27, 0.95)', backdropFilter: 'blur(20px)' }}>
      <div className="flex items-center justify-around h-16 px-1">
        {items.map(item => (
          <button key={item.id} onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all active:scale-90 ${
              activeView === item.id
                ? 'text-lime-400 scale-110'
                : 'text-zinc-600 hover:text-zinc-300'
            }`}>
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-semibold">{item.label}</span>
            {activeView === item.id && <div className="w-1 h-1 rounded-full bg-lime-400 mt-0.5" />}
          </button>
        ))}
      </div>
    </nav>
  );
}
