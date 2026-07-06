import { describe, it, expect } from 'vitest';
import { checkBadges, BADGE_DEFINITIONS } from './useProgress';

describe('checkBadges', () => {
  it('awards first-task on the first completed task', () => {
    const result = checkBadges({ xp: 0, streak: 0, completedCount: 1, badges: [] });
    expect(result.some(b => b.id === 'first-task')).toBe(true);
  });

  it('awards xp badges as XP thresholds are crossed', () => {
    const result = checkBadges({ xp: 100, streak: 0, completedCount: 0, badges: [] });
    expect(result.some(b => b.id === 'xp-100')).toBe(true);
    expect(result.some(b => b.id === 'xp-500')).toBe(false);
  });

  it('awards streak badges', () => {
    const result = checkBadges({ xp: 0, streak: 7, completedCount: 0, badges: [] });
    expect(result.some(b => b.id === 'streak-7')).toBe(true);
    expect(result.some(b => b.id === 'streak-30')).toBe(false);
  });

  it('does not duplicate already earned badges', () => {
    const existing = [{ id: 'first-task', earnedAt: '2026-01-01' }];
    const result = checkBadges({ xp: 0, streak: 0, completedCount: 5, badges: existing });
    expect(result.filter(b => b.id === 'first-task').length).toBe(1);
  });
});

describe('BADGE_DEFINITIONS', () => {
  it('contains 15 badges', () => {
    expect(BADGE_DEFINITIONS.length).toBe(15);
  });

  it('covers all badge ids referenced in BadgeGallery', () => {
    const expectedIds = [
      'first-task', 'ten-tasks', 'fifty-tasks', 'hundred-tasks',
      'streak-3', 'streak-7', 'streak-30',
      'xp-100', 'xp-500', 'xp-1000',
      'grammar-guru', 'vocab-voyager', 'night-owl', 'early-bird', 'perfect-score',
    ];
    const ids = BADGE_DEFINITIONS.map(b => b.id);
    expectedIds.forEach(id => expect(ids).toContain(id));
  });
});
