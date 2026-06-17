export const ALL_BADGES = [
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

export function checkBadges(progress, verbLookups = 0, nounsStudied = 0) {
  const existingIds = (progress.badges || []).map(b => b.id);
  const newBadges = [...(progress.badges || [])];
  const checks = [
    { id: 'first-task', cond: progress.completedTasks?.length >= 1 },
    { id: 'ten-tasks', cond: progress.completedTasks?.length >= 10 },
    { id: 'fifty-tasks', cond: progress.completedTasks?.length >= 50 },
    { id: 'hundred-tasks', cond: progress.completedTasks?.length >= 100 },
    { id: 'streak-3', cond: progress.streak >= 3 },
    { id: 'streak-7', cond: progress.streak >= 7 },
    { id: 'streak-30', cond: progress.streak >= 30 },
    { id: 'xp-100', cond: progress.xp >= 100 },
    { id: 'xp-500', cond: progress.xp >= 500 },
    { id: 'xp-1000', cond: progress.xp >= 1000 },
    { id: 'grammar-guru', cond: verbLookups >= 20 },
    { id: 'vocab-voyager', cond: nounsStudied >= 100 },
    { id: 'night-owl', cond: new Date().getHours() >= 22 && (progress.completedTasks?.length || 0) > 0 },
    { id: 'early-bird', cond: new Date().getHours() < 8 && progress.streak > 0 },
  ];
  checks.forEach(c => {
    if (c.cond && !existingIds.includes(c.id)) {
      newBadges.push({ id: c.id, earnedAt: new Date().toISOString() });
    }
  });
  return newBadges;
}

export function checkPerfectScoreBadge(progress, score, total) {
  if (score === total && total > 0) {
    const existingIds = (progress.badges || []).map(b => b.id);
    if (!existingIds.includes('perfect-score')) {
      return [...(progress.badges || []), { id: 'perfect-score', earnedAt: new Date().toISOString() }];
    }
  }
  return progress.badges || [];
}

export default function BadgeGallery({ badges }) {
  return (
    <div className="glass-card p-5">
      <h4 className="text-sm font-bold text-slate-200 mb-4">🏆 Badge Collection</h4>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
        {ALL_BADGES.map(badge => {
          const earned = badges.find(b => b.id === badge.id);
          return (
            <div key={badge.id} className="relative group text-center p-3 rounded-xl transition-all bg-[#0F1420]/50 border border-slate-700/40 hover:border-slate-600/60">
              <div className={`text-2xl mb-1 ${earned ? '' : 'opacity-25 grayscale'}`}>{badge.icon}</div>
              <div className="text-[10px] font-medium text-slate-500 leading-tight">{badge.name}</div>
              {earned && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0F1420] flex items-center justify-center">
                  <span className="text-white text-[7px]">✓</span>
                </div>
              )}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10 border border-slate-700">
                {earned ? `Earned ${new Date(earned.earnedAt).toLocaleDateString()}` : badge.condition}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
