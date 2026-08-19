import {
  IconStar, IconFire, IconTrophy, IconBolt, IconCrown, IconTarget,
  IconMedal, IconDiamond, IconMap, IconBird, IconPercent, IconHeart,
  IconSparkles
} from '../components/Icons';

export const BADGE_CATEGORIES = {
  habit: ['first-task', 'ten-tasks', 'fifty-tasks', 'hundred-tasks', 'streak-3', 'streak-7', 'streak-30'],
  xp: ['xp-100', 'xp-500', 'xp-1000'],
  grammar: ['grammar-guru'],
  vocab: ['vocab-voyager', 'night-owl', 'early-bird'],
  exam: ['perfect-score'],
};

export const CATEGORY_COLORS = {
  habit: '#3B82F6',
  xp: '#1B3A35',
  grammar: '#22C55E',
  vocab: '#B94A4A',
  exam: '#3B82F6',
};

export const ALL_BADGES = [
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
  { id: 'grammar-guru', name: 'Grammar Guru', icon: IconSparkles, condition: 'Complete 25 tasks' },
  { id: 'vocab-voyager', name: 'Vocab Voyager', icon: IconMap, condition: 'Complete 40 tasks' },
  { id: 'night-owl', name: 'Night Owl', icon: IconStar, condition: 'Reach a 14-day streak' },
  { id: 'early-bird', name: 'Early Bird', icon: IconBird, condition: 'Reach a 5-day streak' },
  { id: 'perfect-score', name: 'Perfect Score', icon: IconPercent, condition: 'Earn 2,500 XP' },
];

export function getBadgeCategory(id) {
  for (const [cat, ids] of Object.entries(BADGE_CATEGORIES)) {
    if (ids.includes(id)) return cat;
  }
  return 'habit';
}

export function getBadgeById(id) {
  return ALL_BADGES.find(b => b.id === id);
}
