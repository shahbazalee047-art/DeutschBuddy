export default function BottomNav({ activeView, onViewChange }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'badges', label: 'Badges', icon: '🏆' },
    { id: 'community', label: 'Community', icon: '💬' },
    { id: 'resources', label: 'Resources', icon: '📚' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E0D4] z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {items.map(item => (
          <button key={item.id} onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              activeView === item.id
                ? 'text-[#B8860B] scale-110'
                : 'text-[#8A8A9A] hover:text-[#4A4A5A]'
            }`}>
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-semibold">{item.label}</span>
            {activeView === item.id && <div className="w-1 h-1 rounded-full bg-[#B8860B] mt-0.5" />}
          </button>
        ))}
      </div>
    </nav>
  );
}
