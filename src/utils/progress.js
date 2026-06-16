const STORAGE_KEY = 'german-learning-progress';

export function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    console.warn('Could not save progress to localStorage');
  }
}

export function getDefaultProgress() {
  return {
    xp: 0,
    streak: 0,
    lastStudyDate: null,
    completedTasks: [],
    badges: [],
    unlockedWeeks: { A1: [1], A2: [1] },
    trackMode: 'standard',
    weeklyXP: {},
  };
}

export function addXP(currentXP, amount) {
  return currentXP + amount;
}

export function calculateStreak(lastStudyDate) {
  const today = new Date().toDateString();
  if (!lastStudyDate) return 1;
  const last = new Date(lastStudyDate);
  const diff = Math.floor((new Date(today) - last) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 0;
  if (diff === 1) return 1;
  return 0;
}

export function getWeekCompletion(weekDays, completedTasks) {
  const totalTasks = weekDays.reduce((acc, day) => acc + day.tasks.length, 0);
  const completed = weekDays.reduce((acc, day) =>
    acc + day.tasks.filter(t => completedTasks.includes(t.id)).length, 0
  );
  return totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
}

export function getDayCompletion(dayTasks, completedTasks) {
  return dayTasks.filter(t => completedTasks.includes(t.id)).length;
}

export function checkBadges(xp, streak, completedTasks, existingBadges) {
  const newBadges = [...existingBadges];
  const badgeDefs = [
    { id: 'first-task', name: 'First Steps', icon: '🌟', condition: completedTasks.length >= 1 },
    { id: 'ten-tasks', name: 'Getting Started', icon: '🔥', condition: completedTasks.length >= 10 },
    { id: 'fifty-tasks', name: 'Halfway Hero', icon: '💪', condition: completedTasks.length >= 50 },
    { id: 'hundred-tasks', name: 'Century Club', icon: '🏆', condition: completedTasks.length >= 100 },
    { id: 'streak-3', name: 'On Fire', icon: '🔥', condition: streak >= 3 },
    { id: 'streak-7', name: 'Week Warrior', icon: '⚡', condition: streak >= 7 },
    { id: 'streak-30', name: 'Monthly Master', icon: '👑', condition: streak >= 30 },
    { id: 'xp-100', name: 'XP Hunter', icon: '🎯', condition: xp >= 100 },
    { id: 'xp-500', name: 'XP Champion', icon: '🏅', condition: xp >= 500 },
    { id: 'xp-1000', name: 'XP Legend', icon: '💎', condition: xp >= 1000 },
    { id: 'week-complete', name: 'Week Finisher', icon: '🎓', condition: false },
    { id: 'a1-complete', name: 'A1 Graduate', icon: '🎉', condition: false },
    { id: 'a2-complete', name: 'A2 Graduate', icon: '🌟', condition: false },
  ];

  badgeDefs.forEach(badge => {
    if (badge.condition && !newBadges.find(b => b.id === badge.id)) {
      newBadges.push({ ...badge, earnedAt: new Date().toISOString() });
    }
  });

  return newBadges;
}

export function getTrackMode(weeksCompleted, mode) {
  if (mode === 'fast') {
    return weeksCompleted >= 6 ? 'fast' : 'standard';
  }
  return 'standard';
}
