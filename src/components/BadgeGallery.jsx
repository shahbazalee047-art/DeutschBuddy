import { useState } from 'react';
import { IconStar, IconFire, IconTrophy, IconBolt, IconCrown, IconTarget, IconMedal, IconDiamond, IconMap, IconBird, IconPercent, IconHeart, IconSparkles, IconLock, IconX, IconCheck } from './Icons';

const ALL_BADGES = [
  { id: 'first-task', name: 'First Steps', icon: IconStar, condition: 'Complete your first task' },
  { id: 'ten-tasks', name: 'Getting Started', icon: IconFire, condition: 'Complete 10 tasks' },
  { id: 'fifty-tasks', name: 'Halfway Hero', icon: IconHeart, condition: 'Complete 50 tasks' },
  { id: 'hundred-tasks', name: 'Century Club', icon: IconTrophy, condition: 'Complete 100 tasks' },
  { id: 'streak-3', name: 'On Fire', icon: IconFire, condition: '3 day streak' },
  { id: 'streak-7', name: 'Week Warrior', icon: IconBolt, condition: '7 day streak' },
  { id: 'streak-30', name: 'Monthly Master', icon: IconCrown, condition: '30 day streak' },
  { id: 'xp-100', name: 'XP Hunter', icon: IconTarget, condition: 'Earn 100 XP' },
  { id: 'xp-500', name: 'XP Champion', icon: IconMedal, condition: 'Earn 500 XP' },
  { id: 'xp-1000', name: 'XP Legend', icon: IconDiamond, condition: 'Earn 1000 XP' },
  { id: 'grammar-guru', name: 'Grammar Guru', icon: IconSparkles, condition: 'Master 20 verb lookups' },
  { id: 'vocab-voyager', name: 'Vocab Voyager', icon: IconMap, condition: 'Complete 100 noun cards' },
  { id: 'night-owl', name: 'Night Owl', icon: IconStar, condition: 'Complete a lesson after 10 PM' },
  { id: 'early-bird', name: 'Early Bird', icon: IconBird, condition: 'Start a streak before 8 AM' },
  { id: 'perfect-score', name: 'Perfect Score', icon: IconPercent, condition: 'Score 100% on any mock exam' },
];

export default function BadgeGallery({ badges }) {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const earnedCount = badges.length;

  return (
    <div className="fade-in space-y-5">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <IconTrophy className="w-8 h-8 text-sage-400" />
          <h1 className="text-3xl font-bold text-cream-100" style={{ fontFamily: 'DM Serif Display, serif', letterSpacing: '-0.5px' }}>Badge Gallery</h1>
        </div>
        <p className="text-cream-500" style={{ fontSize: '16px', lineHeight: '1.5' }}>Track your achievements and milestones</p>
      </div>

      {/* Stats Summary */}
      <div className="rounded-2xl p-6 text-forest-900" style={{ background: 'linear-gradient(135deg, #7FB069, #6BA3BE)' }}>
        <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'DM Serif Display, serif' }}>Your Achievements</h3>
        <div className="text-3xl font-bold mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>{earnedCount}/{ALL_BADGES.length} Earned</div>
        <div className="w-full h-2 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(13, 26, 20, 0.3)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(earnedCount / ALL_BADGES.length) * 100}%`, background: '#0D1A14' }} />
        </div>
        <p className="text-[12px] text-forest-900/70">Keep learning to unlock more!</p>
      </div>

      {/* Badge Grid */}
      <div className="flex items-center gap-2 mb-3">
        <IconTrophy className="w-5 h-5 text-sage-400" />
        <h4 className="text-sm font-bold text-cream-200" style={{ fontFamily: 'DM Serif Display, serif' }}>All Badges</h4>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {ALL_BADGES.map(badge => {
          const earned = badges.find(b => b.id === badge.id);
          return (
            <button key={badge.id} onClick={() => setSelectedBadge({ ...badge, earned })}
              className={`relative group text-center p-4 rounded-2xl transition-all duration-300 active:scale-95 ${
                earned ? 'glass-card hover:shadow-lg hover:border-sage-400/30 cursor-pointer' : 'bg-forest-800/50 border border-border opacity-50'
              }`}>
              <div className={`flex justify-center mb-2 transition-all duration-300 ${earned ? 'group-hover:scale-110' : 'grayscale opacity-50'}`}>
                <badge.icon className={`w-7 h-7 ${earned ? 'text-sage-400' : 'text-cream-500'}`} />
              </div>
              <div className="text-[11px] font-medium text-cream-300 leading-tight">{badge.name}</div>
              {earned && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#7FB069' }}>
                  <IconCheck className="w-3 h-3 text-forest-900" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" onClick={() => setSelectedBadge(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative max-w-sm w-full p-8 text-center scale-in shadow-2xl rounded-3xl border border-border bg-card" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedBadge(null)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-forest-800 hover:bg-forest-700 flex items-center justify-center text-cream-400 transition"><IconX className="w-4 h-4" /></button>
            <div className={`flex justify-center mb-4 ${selectedBadge.earned ? 'animate-bounce-in' : 'grayscale opacity-50'}`}>
              <selectedBadge.icon className={`w-14 h-14 ${selectedBadge.earned ? 'text-sage-400' : 'text-cream-500'}`} />
            </div>
            <h3 className="text-xl font-bold text-cream-100 mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>{selectedBadge.name}</h3>
            <p className="text-[14px] text-cream-400 mb-4">{selectedBadge.condition}</p>
            {selectedBadge.earned ? (
              <div className="text-[12px] text-sage-400 font-semibold">
                ✓ Earned {new Date(selectedBadge.earned.earnedAt).toLocaleDateString()}
              </div>
            ) : (
              <div className="text-[12px] text-warning font-semibold flex items-center justify-center gap-1"><IconLock className="w-3.5 h-3.5" /> Not yet unlocked</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
