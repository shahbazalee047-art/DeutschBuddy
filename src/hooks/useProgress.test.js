import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { checkBadges, BADGE_DEFINITIONS, getPendingSyncKey, useProgress } from './useProgress';

const mocks = vi.hoisted(() => {
  let upsertError = null;
  let upsertResolves = 0;
  const upsert = vi.fn(async () => {
    if (upsertError && upsertResolves <= 0) return { error: upsertError, data: null };
    upsertResolves = Math.max(0, upsertResolves - 1);
    return { error: null, data: {} };
  });
  const insert = vi.fn(async () => ({ data: {}, error: null }));
  const selectChain = {
    select: () => selectChain,
    eq: () => selectChain,
    single: async () => ({ data: null, error: null }),
  };
  return {
    TEST_USER: { id: 'user-1' },
    upsert,
    getUpsertError: () => upsertError,
    setUpsertError: (err) => { upsertError = err; },
    setUpsertResolves: (n) => { upsertResolves = n; },
    fromImpl: vi.fn(() => ({
      select: () => selectChain,
      insert,
      update: () => selectChain,
      upsert,
    })),
    insert,
  };
});

vi.mock('../lib/supabase', () => ({
  supabase: { from: mocks.fromImpl },
}));

vi.mock('../contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({ user: mocks.TEST_USER }),
}));

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

describe('useProgress failed-upsert resilience', () => {
  beforeEach(() => {
    localStorage.clear();
    mocks.setUpsertError(null);
    mocks.setUpsertResolves(0);
    mocks.upsert.mockClear();
    mocks.insert.mockClear();
    mocks.fromImpl.mockClear();
  });

  it('keeps local progress when the server upsert fails — no rollback', async () => {
    console.log('DBG t1 start');
    mocks.setUpsertError({ code: 'PGRST204', message: 'column missing' });
    const { result } = renderHook(() => useProgress('A1'));
    console.log('DBG t1 hook rendered, loading =', result.current.loading);

    // Wait for the initial fetch to settle so we start from the server state.
    await waitFor(() => expect(result.current.loading).toBe(false));
    console.log('DBG t1 loading settled');

    await act(async () => {
      await result.current.completeTask('a1m1d1t1', 15, 1, 1);
    });
    console.log('DBG t1 after completeTask');

    // The task must be completed locally with XP earned…
    await waitFor(() => {
      expect(result.current.progress.completedTasks).toContain('a1m1d1t1');
      expect(result.current.progress.xp).toBe(15);
    });
    console.log('DBG t1 progress ok, syncStatus =', result.current.syncStatus);

    // …and a pending-sync entry must exist so the write can be retried.
    const pending = JSON.parse(localStorage.getItem(getPendingSyncKey('user-1', 'A1')));
    expect(pending).toBeTruthy();
    expect(pending[0].completed_tasks).toContain('a1m1d1t1');
    expect(result.current.syncStatus).toBe('pending');
    console.log('DBG t1 done');
  });

  it('flushes the pending queue and clears it once the upsert succeeds', async () => {
    mocks.setUpsertError({ code: 'PGRST204', message: 'column missing' });
    const { result } = renderHook(() => useProgress('A1'));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.completeTask('a1m1d1t1', 15, 1, 1);
    });
    await waitFor(() => expect(result.current.syncStatus).toBe('pending'));

    // Server heals (e.g. schema reconciled): the queued snapshot is retried
    // via the online event, and the queue is cleared once it succeeds.
    mocks.setUpsertError(null);
    await act(async () => {
      window.dispatchEvent(new Event('online'));
    });

    await waitFor(() => {
      expect(result.current.syncStatus).toBe('synced');
      expect(localStorage.getItem(getPendingSyncKey('user-1', 'A1'))).toBeNull();
    });
    expect(result.current.progress.completedTasks).toContain('a1m1d1t1');
    expect(result.current.progress.xp).toBe(15);
  });

  it('records the actual task type and score while keeping XP idempotent', async () => {
    const { result } = renderHook(() => useProgress('A1'));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.completeTask('a1m1d1t1', 6, 1, 1, { score: 2, maxScore: 4 }, 'quiz');
      await result.current.completeTask('a1m1d1t1', 6, 1, 1, { score: 4, maxScore: 4 }, 'quiz');
    });

    expect(result.current.progress.xp).toBe(6);
    expect(mocks.insert).toHaveBeenCalledTimes(2);
    expect(mocks.insert).toHaveBeenNthCalledWith(1, expect.objectContaining({
      task_type: 'quiz',
      score: 2,
      max_score: 4,
    }));
    expect(mocks.insert).toHaveBeenNthCalledWith(2, expect.objectContaining({
      task_type: 'quiz',
      score: 4,
      max_score: 4,
    }));
  });
});
