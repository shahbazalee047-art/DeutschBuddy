import { useState } from 'react';

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
  const [selectedBadge, setSelectedBadge] = useState(null);
  const earnedCount = badges.length;

  return (
    <div className="paper-card p-5">
      {/* Stats Summary */}
      <div className="rounded-2xl p-5 mb-5 text-white" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }}>
        <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Your Achievements</h3>
        <div className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{earnedCount}/{ALL_BADGES.length} Earned</div>
        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${(earnedCount / ALL_BADGES.length) * 100}%` }} />
        </div>
        <p className="text-[12px] text-white/70">Keep learning to unlock more!</p>
      </div>

      {/* Badge Grid */}
      <h4 className="text-sm font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>🏆 All Badges</h4>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {ALL_BADGES.map(badge => {
          const earned = badges.find(b => b.id === badge.id);
          return (
            <button key={badge.id} onClick={() => setSelectedBadge({ ...badge, earned })}
              className={`relative group text-center p-4 rounded-2xl transition-all duration-300 ${
                earned ? 'paper-card hover:shadow-lg cursor-pointer' : 'bg-[#F5F5F5] border border-[#E8E0D4] opacity-50'
              }`}>
              <div className={`text-3xl mb-2 ${earned ? '' : 'grayscale opacity-50'}`}>{badge.icon}</div>
              <div className="text-[11px] font-medium text-[#4A4A5A] leading-tight">{badge.name}</div>
              {earned && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#4CAF50' }}>
                  <span className="text-white text-[8px] font-bold">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" onClick={() => setSelectedBadge(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative paper-card max-w-sm w-full p-8 text-center scale-in shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedBadge(null)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#F5F5F5] hover:bg-[#E8E0D4] flex items-center justify-center text-[#8A8A9A] transition text-sm">✕</button>
            <div className={`text-6xl mb-4 ${selectedBadge.earned ? 'animate-bounce-in' : 'grayscale opacity-50'}`}>{selectedBadge.icon}</div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedBadge.name}</h3>
            <p className="text-[14px] text-[#8A8A9A] mb-4">{selectedBadge.condition}</p>
            {selectedBadge.earned ? (
              <div className="text-[12px] text-[#4CAF50] font-semibold">
                ✓ Earned {new Date(selectedBadge.earned.earnedAt).toLocaleDateString()}
              </div>
            ) : (
              <div className="text-[12px] text-[#FF9800] font-semibold">🔒 Not yet unlocked</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
