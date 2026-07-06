import { useState } from 'react';
import { IconLock, IconX, IconCheck } from './Icons';
import { BuddyAvatar, BuddySpeechBubble } from './buddy';
import { ALL_BADGES, CATEGORY_COLORS, getBadgeCategory } from '../utils/badges';

export default function BadgeGallery({ badges }) {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const earnedCount = badges?.length || 0;
  const totalCount = ALL_BADGES.length;

  return (
    <div className="fade-in max-w-3xl mx-auto px-4 py-6 pb-24 lg:pb-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <BuddyAvatar state="happy" size={72} />
          <div className="absolute -top-2 -right-16">
            <BuddySpeechBubble position="right" tone="success">
              {earnedCount} earned!
            </BuddySpeechBubble>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-dark">Achievements</h1>
          <p className="text-text-muted text-sm">Collect badges as you learn with Buddy</p>
        </div>
      </div>

      <div className="db-card p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-text-dark">Your Collection</h3>
          <span className="text-sm font-bold text-primary">{earnedCount}/{totalCount}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(earnedCount / totalCount) * 100}%` }}
          />
        </div>
        <p className="text-xs text-text-muted mt-2">Keep learning to unlock more!</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {ALL_BADGES.map(badge => {
          const earned = badges?.find(b => b.id === badge.id);
          const category = getBadgeCategory(badge.id);
          const categoryColor = CATEGORY_COLORS[category];
          return (
            <button
              key={badge.id}
              onClick={() => setSelectedBadge({ ...badge, earned })}
              className={`
                relative group text-center p-4 rounded-xl transition-all active:scale-95
                ${earned
                  ? 'db-card db-card-hover cursor-pointer'
                  : 'bg-bg-secondary border border-dashed border-border opacity-70'}
              `}
            >
              <div className={`flex justify-center mb-2 transition-transform ${earned ? 'group-hover:scale-110' : 'grayscale'}`}>
                <badge.icon className="w-7 h-7" style={{ color: earned ? categoryColor : 'var(--db-text-muted)' }} />
              </div>
              <div className="text-[11px] font-medium leading-tight text-text-dark">
                {badge.name}
              </div>
              {earned && (
                <div
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: categoryColor }}
                >
                  <IconCheck className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setSelectedBadge(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm p-6 text-center scale-in db-card"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-bg-secondary hover:bg-bg-cream flex items-center justify-center text-text-muted transition rounded-lg"
              aria-label="Close"
            >
              <IconX className="w-4 h-4" />
            </button>

            <div className={`flex justify-center mb-4 ${selectedBadge.earned ? '' : 'grayscale opacity-50'}`}>
              <selectedBadge.icon
                className="w-14 h-14"
                style={{ color: selectedBadge.earned ? CATEGORY_COLORS[getBadgeCategory(selectedBadge.id)] : 'var(--db-text-muted)' }}
              />
            </div>

            <h3 className="text-xl font-bold text-text-dark mb-2">
              {selectedBadge.name}
            </h3>
            <p className="text-sm text-text-muted mb-4">{selectedBadge.condition}</p>

            {selectedBadge.earned ? (
              <div className="text-xs font-semibold flex items-center justify-center gap-1 text-success">
                <IconCheck className="w-3.5 h-3.5" />
                Earned {new Date(selectedBadge.earned.earnedAt).toLocaleDateString()}
              </div>
            ) : (
              <div className="text-xs font-semibold flex items-center justify-center gap-1 text-text-muted">
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
