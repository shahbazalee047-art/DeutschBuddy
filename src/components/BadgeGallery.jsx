import { useState } from 'react';
import {
  IconStar, IconFire, IconTrophy, IconBolt, IconCrown, IconTarget,
  IconMedal, IconDiamond, IconMap, IconBird, IconPercent, IconHeart,
  IconSparkles, IconLock, IconX, IconCheck
} from './Icons';

const BADGE_CATEGORIES = {
  habit: ['first-task', 'ten-tasks', 'fifty-tasks', 'hundred-tasks', 'streak-3', 'streak-7', 'streak-30'],
  xp: ['xp-100', 'xp-500', 'xp-1000'],
  grammar: ['grammar-guru'],
  vocab: ['vocab-voyager', 'night-owl', 'early-bird'],
  exam: ['perfect-score'],
};

const CATEGORY_COLORS = {
  habit: '#E8B73D',
  xp: '#E8B73D',
  grammar: '#7DA888',
  vocab: '#D0879A',
  exam: '#E8B73D',
};

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

function getBadgeCategory(id) {
  for (const [cat, ids] of Object.entries(BADGE_CATEGORIES)) {
    if (ids.includes(id)) return cat;
  }
  return 'habit';
}

export default function BadgeGallery({ badges }) {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const earnedCount = badges.length;
  const totalCount = ALL_BADGES.length;

  return (
    <div className="fade-in focus-col space-y-6">
      <div>
        <span className="eyebrow">Achievements</span>
        <h1 className="text-3xl font-bold text-text-dark editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.5px' }}>
          Badge <i>Gallery</i>
        </h1>
        <p className="text-text-muted mt-1">Track your achievements and milestones</p>
      </div>

      <div className="paper-card p-6 text-text-on-dark bg-[var(--bg-dark)]" style={{ borderRadius: 'var(--radius-card)' }}>
        <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Your Achievements</h3>
        <div className="text-3xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {earnedCount}/{totalCount} Earned
        </div>
        <div className="w-full h-2 overflow-hidden mb-2 rounded-full bg-[var(--bg-secondary)]">
          <div
            className="h-full transition-all duration-500 rounded-full"
            style={{ width: `${(earnedCount / totalCount) * 100}%`, background: 'var(--gold)' }}
          />
        </div>
        <p className="text-[12px] text-text-on-dark-muted">Keep learning to unlock more!</p>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <IconTrophy className="w-5 h-5 text-gold" />
        <h4 className="text-sm font-bold text-text-body" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>All Badges</h4>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {ALL_BADGES.map(badge => {
          const earned = badges.find(b => b.id === badge.id);
          const category = getBadgeCategory(badge.id);
          const categoryColor = CATEGORY_COLORS[category];
          return (
            <button
              key={badge.id}
              onClick={() => setSelectedBadge({ ...badge, earned })}
              className={`relative group text-center p-4 transition-all duration-300 active:scale-95 ${
                earned
                  ? 'paper-card hover:shadow-lg cursor-pointer'
                  : 'bg-[var(--card-muted)] border border-dashed border-[var(--border-locked)] opacity-80'
              }`}
              style={earned ? { borderLeftColor: categoryColor } : {}}
            >
              <div
                className={`flex justify-center mb-2 transition-all duration-300 ${
                  earned ? 'group-hover:scale-110' : 'grayscale opacity-60'
                }`}
              >
                <badge.icon className="w-7 h-7" style={{ color: earned ? categoryColor : '#8C857C' }} />
              </div>
              <div
                className="text-[11px] font-medium leading-tight"
                style={{ color: earned ? 'var(--text-body)' : '#8C857C', fontFamily: "'DM Sans', sans-serif" }}
              >
                {badge.name}
              </div>
              {earned && (
                <div
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: categoryColor }}
                >
                  <IconCheck className="w-3 h-3" style={{ color: '#1C1A19' }} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setSelectedBadge(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-[calc(100vw-32px)] sm:max-w-sm p-6 text-center scale-in shadow-2xl border border-border bg-[var(--bg-white)]"
            style={{ borderRadius: 'var(--radius-modal)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] flex items-center justify-center text-text-muted transition rounded-[var(--radius-sm)]"
            >
              <IconX className="w-4 h-4" />
            </button>

            <div className={`flex justify-center mb-4 ${selectedBadge.earned ? '' : 'grayscale opacity-50'}`}>
              <selectedBadge.icon
                className="w-14 h-14"
                style={{ color: selectedBadge.earned ? CATEGORY_COLORS[getBadgeCategory(selectedBadge.id)] : '#8C857C' }}
              />
            </div>

            <h3 className="text-xl font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {selectedBadge.name}
            </h3>
            <p className="text-[14px] text-text-muted mb-4">{selectedBadge.condition}</p>

            {selectedBadge.earned ? (
              <div
                className="text-[12px] font-semibold flex items-center justify-center gap-1"
                style={{ color: CATEGORY_COLORS[getBadgeCategory(selectedBadge.id)] }}
              >
                <IconCheck className="w-3.5 h-3.5" />
                Earned {new Date(selectedBadge.earned.earnedAt).toLocaleDateString()}
              </div>
            ) : (
              <div className="text-[12px] font-semibold flex items-center justify-center gap-1" style={{ color: '#8C857C' }}>
                <IconLock className="w-3.5 h-3.5" />
                Not yet unlocked
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}