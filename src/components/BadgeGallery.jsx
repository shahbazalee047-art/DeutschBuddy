const ALL_BADGES = [
  { id: 'first-task', name: 'First Steps', icon: '🌟', condition: 'Complete your first task' },
  { id: 'ten-tasks', name: 'Getting Started', icon: '🔥', condition: 'Complete 10 tasks' },
  { id: 'fifty-tasks', name: 'Halfway Hero', icon: '💪', condition: 'Complete 50 tasks' },
  { id: 'hundred-tasks', name: 'Century Club', icon: '🏆', condition: 'Complete 100 tasks' },
  { id: 'streak-3', name: 'On Fire', icon: '🔥', condition: '3 day streak' },
  { id: 'streak-7', name: 'Week Warrior', icon: '⚡', condition: '7 day streak' },
  { id: 'streak-30', name: 'Monthly Master', icon: '👑', condition: '30 day streak' },
  { id: 'xp-100', name: 'XP Hunter', icon: '🎯', condition: 'Earn 100 XP' },
  { id: 'xp-500', name: 'XP Champion', icon: '🏅', condition: 'Earn 500 XP' },
  { id: 'xp-1000', name: 'XP Legend', icon: '💎', condition: 'Earn 1000 XP' },
];

export default function BadgeGallery({ badges }) {
  return (
    <div className="paper-card p-5">
      <h4 className="text-lg font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>🏆 Badges</h4>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {ALL_BADGES.map(badge => {
          const earned = badges.find(b => b.id === badge.id);
          return (
            <div key={badge.id} className={`relative group text-center p-4 rounded-2xl transition-all duration-300 ${
              earned ? 'paper-card hover:shadow-lg cursor-pointer' : 'bg-[#F5F5F5] border border-[#E8E0D4] opacity-50'
            }`}>
              <div className={`text-3xl mb-2 ${earned ? '' : 'grayscale opacity-50'}`}>{badge.icon}</div>
              <div className="text-[11px] font-medium text-[#4A4A5A] leading-tight">{badge.name}</div>
              {earned && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#4CAF50' }}>
                  <span className="text-white text-[8px] font-bold">✓</span>
                </div>
              )}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A2E] text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                {earned ? `Earned ${new Date(earned.earnedAt).toLocaleDateString()}` : badge.condition}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
