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
        <span className="eyebrow">Achievements</span>
        <h1 className="text-3xl font-bold text-text-dark editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.5px' }}>Badge <i>Gallery</i></h1>
        <p className="text-text-muted" style={{ fontSize: '16px', lineHeight: '1.5' }}>Track your achievements and milestones</p>
      </div>

      {/* Stats Summary */}
      <div className="p-6 text-text-on-dark bg-bg-dark">
        <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Your Achievements</h3>
        <div className="text-3xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{earnedCount}/{ALL_BADGES.length} Earned</div>
        <div className="w-full h-2 overflow-hidden mb-2 bg-bg-dark-mid">
          <div className="h-full transition-all duration-500" style={{ width: `${(earnedCount / ALL_BADGES.length) * 100}%`, background: 'var(--gold)' }} />
        </div>
        <p className="text-[12px] text-text-on-dark/70">Keep learning to unlock more!</p>
      </div>

      {/* Badge Grid */}
      <div className="flex items-center gap-2 mb-3">
        <IconTrophy className="w-5 h-5 text-gold" />
        <h4 className="text-sm font-bold text-text-body" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>All Badges</h4>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {ALL_BADGES.map(badge => {
          const earned = badges.find(b => b.id === badge.id);
          return (
            <button key={badge.id} onClick={() => setSelectedBadge({ ...badge, earned })}
              className={`relative group text-center p-4 transition-all duration-300 active:scale-95 ${
                earned ? 'paper-card hover:shadow-lg hover:border-gold/30 cursor-pointer' : 'bg-bg-secondary border border-border opacity-50'
              }`}>
              <div className={`flex justify-center mb-2 transition-all duration-300 ${earned ? 'group-hover:scale-110' : 'grayscale opacity-50'}`}>
                <badge.icon className={`w-7 h-7 ${earned ? 'text-gold' : 'text-text-muted'}`} />
              </div>
              <div className="text-[11px] font-medium text-text-body leading-tight">{badge.name}</div>
              {earned && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)' }}>
                  <IconCheck className="w-3 h-3 text-text-on-dark" />
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
          <div className="relative max-w-sm w-full p-8 text-center scale-in shadow-2xl border border-border bg-bg-white" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedBadge(null)} className="absolute top-4 right-4 w-8 h-8 bg-bg-secondary hover:bg-bg-primary flex items-center justify-center text-text-muted transition"><IconX className="w-4 h-4" /></button>
            <div className={`flex justify-center mb-4 ${selectedBadge.earned ? 'animate-bounce-in' : 'grayscale opacity-50'}`}>
              <selectedBadge.icon className={`w-14 h-14 ${selectedBadge.earned ? 'text-gold' : 'text-text-muted'}`} />
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{selectedBadge.name}</h3>
            <p className="text-[14px] text-text-muted mb-4">{selectedBadge.condition}</p>
            {selectedBadge.earned ? (
              <div className="text-[12px] text-gold font-semibold flex items-center justify-center gap-1"><IconCheck className="w-3.5 h-3.5" /> Earned {new Date(selectedBadge.earned.earnedAt).toLocaleDateString()}</div>
            ) : (
              <div className="text-[12px] text-warning font-semibold flex items-center justify-center gap-1"><IconLock className="w-3.5 h-3.5" /> Not yet unlocked</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
