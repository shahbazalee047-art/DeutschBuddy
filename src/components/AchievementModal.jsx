import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BuddyAvatar } from './buddy';
import { IconX } from './Icons';
import { getBadgeById, getBadgeCategory } from '../utils/badges';

const CATEGORY_COLORS = {
  habit: '#3B82F6',
  xp: '#1B3A35',
  grammar: '#22C55E',
  vocab: '#B94A4A',
  exam: '#3B82F6',
};

const CONFETTI_DOTS = [
  { top: 15, left: 12 }, { top: 22, left: 84 }, { top: 78, left: 18 },
  { top: 85, left: 76 }, { top: 35, left: 92 }, { top: 62, left: 8 },
  { top: 12, left: 55 }, { top: 88, left: 45 }, { top: 45, left: 20 },
  { top: 55, left: 80 }, { top: 30, left: 35 }, { top: 70, left: 60 }
];

export default function AchievementModal({ badgeId, onClose }) {
  const badge = getBadgeById(badgeId);

  useEffect(() => {
    const timer = setTimeout(() => onClose?.(), 3500);
    return () => clearTimeout(timer);
  }, [badgeId, onClose]);

  if (!badge) return null;

  const categoryColor = CATEGORY_COLORS[getBadgeCategory(badge.id)];
  const Icon = badge.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center px-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-primary-dark/55" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="modal-card relative w-full max-w-sm overflow-hidden p-8 text-center db-card"
          onClick={e => e.stopPropagation()}
        >
          {/* Confetti-like dots */}
          <div className="absolute inset-0 pointer-events-none">
            {CONFETTI_DOTS.map((dot, i) => (
              <span
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: [categoryColor, '#3B82F6', '#22C55E', '#B94A4A'][i % 4],
                  top: `${dot.top}%`,
                  left: `${dot.left}%`,
                  opacity: 0.4
                }}
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-bg-secondary text-text-muted hover:text-text-dark transition"
            aria-label="Close"
          >
            <IconX className="w-4 h-4" />
          </button>

          <div className="relative mb-4 flex justify-center">
            <BuddyAvatar state="celebrate" size={80} />
          </div>

          <div
            className="relative mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: `${categoryColor}20` }}
          >
            <Icon className="w-8 h-8" style={{ color: categoryColor }} />
          </div>

          <p className="text-sm font-bold text-primary uppercase tracking-wide mb-1">Achievement Unlocked</p>
          <h3 className="text-2xl font-bold text-text-dark mb-2">{badge.name}</h3>
          <p className="text-sm text-text-muted mb-6">{badge.condition}</p>

          <button onClick={onClose} className="db-btn db-btn-primary w-full">
            Awesome!
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
