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
  { id: 'grammar-guru', name: 'Grammar Guru', icon: '🧠', condition: 'Master 20 verb lookups' },
  { id: 'vocab-voyager', name: 'Vocab Voyager', icon: '🗺️', condition: 'Complete 100 noun cards' },
  { id: 'night-owl', name: 'Night Owl', icon: '🦉', condition: 'Complete a lesson after 10 PM' },
  { id: 'early-bird', name: 'Early Bird', icon: '🐦', condition: 'Start a streak before 8 AM' },
  { id: 'perfect-score', name: 'Perfect Score', icon: '💯', condition: 'Score 100% on any mock exam' },
];

export default function BadgeGallery({ badges }) {
  return (
    <div className="paper-card p-5 border-t-2 border-t-[#C4956A]">
      <h4 className="text-sm font-bold text-[#1a1a2e] mb-4">🏆 Badges</h4>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {ALL_BADGES.map(badge => {
          const earned = badges.find(b => b.id === badge.id);
          return (
            <div key={badge.id} className={`relative group text-center p-3 rounded-xl transition-all duration-300 ${
              earned ? 'bg-[#FAF5ED] border border-[#E8DFD4] hover:scale-110 hover:shadow-md cursor-pointer' : 'bg-[#F5EFE6]/50 border border-[#E8DFD4]/50 opacity-30 grayscale'
            }`}>
              <div className={`text-2xl mb-1 transition-all duration-300 ${earned ? 'grayscale-0' : 'grayscale opacity-50'}`}>{badge.icon}</div>
              <div className="text-[10px] font-medium text-[#6b7280] leading-tight">{badge.name}</div>
              {earned && <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center" style={{ background: '#8B6914' }}><span className="text-white text-[7px] font-bold">✓</span></div>}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1a1a2e] text-slate-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10 border border-[#2d2d3f]">
                {earned ? `Earned ${new Date(earned.earnedAt).toLocaleDateString()}` : badge.condition}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
