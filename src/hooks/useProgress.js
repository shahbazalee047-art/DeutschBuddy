import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { getLocalDateString, getYesterdayDateString } from '../utils/date';
import { trackAchievementUnlocked, trackStreakMilestone, STREAK_MILESTONES } from '../utils/analytics';

function calculateStreakDelta(lastStudyDate) {
  if (!lastStudyDate) return 1;
  const today = getLocalDateString();
  const last = lastStudyDate.slice(0, 10);
  if (last === today) return 0;
  const yesterday = getYesterdayDateString();
  if (last === yesterday) return 1;
  return -1;
}

export const BADGE_DEFINITIONS = [
  { id: 'first-task', name: 'First Steps', icon: '🌟', condition: p => p.completedCount >= 1 },
  { id: 'ten-tasks', name: 'Getting Started', icon: '🔥', condition: p => p.completedCount >= 10 },
  { id: 'fifty-tasks', name: 'Halfway Hero', icon: '💪', condition: p => p.completedCount >= 50 },
  { id: 'hundred-tasks', name: 'Century Club', icon: '🏆', condition: p => p.completedCount >= 100 },
  { id: 'streak-3', name: 'On Fire', icon: '🔥', condition: p => p.streak >= 3 },
  { id: 'streak-7', name: 'Week Warrior', icon: '⚡', condition: p => p.streak >= 7 },
  { id: 'streak-30', name: 'Monthly Master', icon: '👑', condition: p => p.streak >= 30 },
  { id: 'xp-100', name: 'XP Hunter', icon: '🎯', condition: p => p.xp >= 100 },
  { id: 'xp-500', name: 'XP Champion', icon: '🏅', condition: p => p.xp >= 500 },
  { id: 'xp-1000', name: 'XP Legend', icon: '💎', condition: p => p.xp >= 1000 },
  { id: 'grammar-guru', name: 'Grammar Guru', icon: '📜', condition: p => p.completedCount >= 25 },
  { id: 'vocab-voyager', name: 'Vocab Voyager', icon: '🚀', condition: p => p.completedCount >= 40 },
  { id: 'night-owl', name: 'Night Owl', icon: '🦉', condition: p => p.streak >= 14 },
  { id: 'early-bird', name: 'Early Bird', icon: '🐦', condition: p => p.streak >= 5 },
  { id: 'perfect-score', name: 'Perfect Score', icon: '💯', condition: p => p.xp >= 2500 },
];

export function checkBadges(progressLike) {
  const existingIds = (progressLike.badges || []).map(b => b.id);
  const newBadges = [...(progressLike.badges || [])];
  BADGE_DEFINITIONS.forEach(badge => {
    if (badge.condition(progressLike) && !existingIds.includes(badge.id)) {
      newBadges.push({ ...badge, earnedAt: new Date().toISOString() });
    }
  });
  return newBadges;
}

function getDefaultProgress() {
  return {
    xp: 0, streak: 0, lastStudyDate: null, completedTasks: [], reviseTasks: [], badges: [],
    unlockedWeeks: [1], weeklyXP: {},
  };
}

function getLocalKey(userId, level) {
  return userId ? `db_progress_${userId}_${level}` : `db_progress_${level}`;
}

function loadLocalProgress(userId, level) {
  try {
    const data = localStorage.getItem(getLocalKey(userId, level));
    if (!data) return null;
    const parsed = JSON.parse(data);
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      xp: Number(parsed.xp) || 0,
      streak: Number(parsed.streak) || 0,
      lastStudyDate: parsed.lastStudyDate || null,
      completedTasks: Array.isArray(parsed.completedTasks) ? parsed.completedTasks : [],
      reviseTasks: Array.isArray(parsed.reviseTasks) ? parsed.reviseTasks : [],
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      unlockedWeeks: Array.isArray(parsed.unlockedWeeks) && parsed.unlockedWeeks.length > 0 ? parsed.unlockedWeeks : [1],
      weeklyXP: parsed.weeklyXP && typeof parsed.weeklyXP === 'object' ? parsed.weeklyXP : {},
    };
  } catch { return null; }
}

function saveLocalProgress(userId, level, progress) {
  try { localStorage.setItem(getLocalKey(userId, level), JSON.stringify(progress)); } catch { /* ignore */ }
}

// ---------------------------------------------------------------------------
// Pending-sync queue: when a server upsert fails (schema drift, transient
// network error), the write is kept locally as the source of truth and queued
// for retry with backoff. Local progress is NEVER discarded on a failed save.
// ---------------------------------------------------------------------------

export function getPendingSyncKey(userId, level) {
  return `db_sync_pending_${userId}_${level}`;
}

function loadPendingQueue(userId, level) {
  try {
    const raw = localStorage.getItem(getPendingSyncKey(userId, level));
    const value = raw ? JSON.parse(raw) : [];
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

function savePendingQueue(userId, level, queue) {
  try { localStorage.setItem(getPendingSyncKey(userId, level), JSON.stringify(queue)); } catch { /* ignore */ }
}

function clearPendingQueue(userId, level) {
  try { localStorage.removeItem(getPendingSyncKey(userId, level)); } catch { /* ignore */ }
}

export function getPendingSyncSnapshot(userId, level) {
  const queue = loadPendingQueue(userId, level);
  return queue.length > 0 ? queue[queue.length - 1] : null;
}



const SYNC_RETRY_BASE_MS = 2000;
const SYNC_RETRY_MAX_MS = 60000;

function normalizeProgressRow(data) {
  return {
    xp: data.xp || 0,
    streak: data.streak || 0,
    lastStudyDate: data.last_study_date,
    completedTasks: data.completed_tasks || [],
    reviseTasks: Array.isArray(data.revise_tasks) ? data.revise_tasks : [],
    badges: data.badges || [],
    unlockedWeeks: (Array.isArray(data.unlocked_weeks) && data.unlocked_weeks.length > 0) ? data.unlocked_weeks : [1],
    weeklyXP: data.weekly_xp || {},
  };
}

export function useProgress(level) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => {
    if (!user) return getDefaultProgress();
    return loadLocalProgress(user.id, level) || getDefaultProgress();
  });
  const [loading, setLoading] = useState(true);
  const progressRef = useRef(progress);
  const userRef = useRef(user);
  const levelRef = useRef(level);
  const [syncStatus, setSyncStatus] = useState('synced');

  useEffect(() => { progressRef.current = progress; }, [progress]);
  useEffect(() => { userRef.current = user; }, [user]);
  useEffect(() => { levelRef.current = level; }, [level]);

  // Reset state synchronously when user or level changes so stale progress isn't shown
  useEffect(() => {
    if (!user) {
      setProgress(getDefaultProgress());
      return;
    }
    setProgress(loadLocalProgress(user.id, level) || getDefaultProgress());
    setLoading(true);
  }, [user, level]);

  const syncTimerRef = useRef(null);
  const syncAttemptsRef = useRef(0);
  const syncPendingSinceRef = useRef(null);
  const performSyncRef = useRef(null);
  const [syncPendingSince, setSyncPendingSince] = useState(null);

  const markPending = useCallback(() => {
    if (syncPendingSinceRef.current === null) {
      const now = Date.now();
      syncPendingSinceRef.current = now;
      setSyncPendingSince(now);
    }
  }, []);

  const markSynced = useCallback(() => {
    syncPendingSinceRef.current = null;
    setSyncPendingSince(null);
  }, []);

  const performSync = useCallback(async () => {
    const currentUser = userRef.current;
    const currentLevel = levelRef.current;
    if (!currentUser || !currentLevel) return;

    const queue = loadPendingQueue(currentUser.id, currentLevel);
    if (queue.length === 0) {
      setSyncStatus('synced');
      markSynced();
      return;
    }

    const timer = Math.min(SYNC_RETRY_BASE_MS * 2 ** syncAttemptsRef.current, SYNC_RETRY_MAX_MS);
    markPending();
    setSyncStatus('syncing');

    const remaining = [];
    for (const snapshot of queue) {
      try {
        const { error } = await supabase
          .from('progress')
          .upsert(snapshot, { onConflict: 'user_id,level' });
        if (error) {
          remaining.push(snapshot);
          if (error.code === 'PGRST204' || error.code === '42703') {
            console.warn('progress sync pending (schema mismatch):', error.message);
          } else {
            console.warn('progress sync pending:', error.message || error.code);
          }
          break;
        }
      } catch (err) {
        remaining.push(snapshot);
        console.warn('progress sync pending (exception):', String(err).slice(0, 160));
        break;
      }
    }

    if (remaining.length === 0) {
      clearTimeout(syncTimerRef.current);
      clearPendingQueue(currentUser.id, currentLevel);
      syncAttemptsRef.current = 0;
      markSynced();
      setSyncStatus('synced');
      return;
    }

    savePendingQueue(currentUser.id, currentLevel, remaining);
    syncAttemptsRef.current += 1;
    setSyncStatus('pending');
    clearTimeout(syncTimerRef.current);
    const retryTimer = setTimeout(() => {
      if (performSyncRef.current) performSyncRef.current();
    }, timer);
    syncTimerRef.current = retryTimer;
  }, [markPending, markSynced]);

  const queueSync = useCallback((snapshot) => {
    const currentUser = userRef.current;
    const currentLevel = levelRef.current;
    if (!currentUser || !currentLevel) return;
    const queue = loadPendingQueue(currentUser.id, currentLevel);
    queue.push(snapshot);
    if (queue.length > 256) queue.splice(0, queue.length - 256);
    savePendingQueue(currentUser.id, currentLevel, queue);
    markPending();
    performSync();
  }, [performSync, markPending]);

  // Retry on reconnect / foreground so a once-failed upsert heals on its own.
  useEffect(() => {
    const onOnline = () => performSync();
    const onVisibility = () => {
      if (!document.hidden) performSync();
    };
    window.addEventListener('online', onOnline);
    document.addEventListener('visibilitychange', onVisibility);
    performSyncRef.current = performSync;
    return () => {
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(syncTimerRef.current);
    };
  }, [performSync]);

  // Flush any queued writes from a previous session once the app loads.
  useEffect(() => {
    if (!user || !level) return;
    const queue = loadPendingQueue(user.id, level);
    if (queue.length > 0) {
      markPending();
      performSync();
    }
  }, [user, level, performSync, markPending]);

  const fetchProgress = useCallback(async () => {
    const currentUser = userRef.current;
    const currentLevel = levelRef.current;

    if (!currentUser || !currentLevel) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('level', currentLevel)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('fetchProgress error:', error);
      }

      // If a write is queued, the local snapshot is ahead of the server —
      // keep it as the source of truth so a stale refetch can't wipe progress.
      const queued = loadPendingQueue(currentUser.id, currentLevel);
      if (data && queued.length === 0) {
        const normalized = normalizeProgressRow(data);
        setProgress(normalized);
        saveLocalProgress(currentUser.id, currentLevel, normalized);
      } else {
        const local = loadLocalProgress(currentUser.id, currentLevel);
        if (local) setProgress(local);
      }
    } catch (err) {
      console.error('fetchProgress exception:', err);
      const local = loadLocalProgress(currentUser?.id, currentLevel);
      if (local) setProgress(local);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [user, level, fetchProgress]);

  const completeTask = useCallback(async (taskId, xpAmount, weekId, dayNumber = 0, result = null) => {
    const currentUser = userRef.current;
    const currentLevel = levelRef.current;

    if (!currentUser || !currentLevel) return;

    // Snapshot current state outside the updater to avoid stale closures
    const prev = progressRef.current;

    // Idempotency: already completed today or earlier -> record result only, no double XP
    const alreadyCompleted = prev.completedTasks.includes(taskId);

    const today = getLocalDateString();
    const streakDelta = calculateStreakDelta(prev.lastStudyDate);
    const newStreak = prev.lastStudyDate === today
      ? prev.streak
      : Math.max(streakDelta === -1 ? 1 : prev.streak + streakDelta, 0);

    // Fire once when crossing UP to a milestone streak (3/5/7/14/30 days).
    if (STREAK_MILESTONES.includes(newStreak) && prev.streak < newStreak) {
      trackStreakMilestone(newStreak);
    }

    const newXP = alreadyCompleted ? prev.xp : prev.xp + xpAmount;
    const newCompletedTasks = alreadyCompleted
      ? prev.completedTasks
      : [...new Set([...prev.completedTasks, taskId])];
    const weekKey = `W${weekId}`;
    const newWeeklyXP = alreadyCompleted
      ? prev.weeklyXP
      : { ...prev.weeklyXP, [weekKey]: (prev.weeklyXP[weekKey] || 0) + xpAmount };

    // Revise routing: scored tasks (result.maxScore > 0) with any wrong answer go to
    // the revise list; mastering a previously-revised task (full score) clears it.
    // Unscored task types (grammar, flashcards, fun, ...) pass full credit
    // ({ score: 1, maxScore: 1 }) so they are treated as mastered and never revise.
    // This runs inside the same atomic update so there is no stale-state race.
    let nextReviseTasks = Array.isArray(prev.reviseTasks) ? prev.reviseTasks : [];
    if (result && typeof result.score === 'number' && result.maxScore > 0) {
      if (result.score < result.maxScore) {
        if (!nextReviseTasks.includes(taskId)) {
          nextReviseTasks = [...nextReviseTasks, taskId];
        }
      } else if (nextReviseTasks.includes(taskId)) {
        nextReviseTasks = nextReviseTasks.filter(id => id !== taskId);
      }
    }

    const nextBadges = checkBadges({
      xp: newXP,
      streak: newStreak,
      completedCount: newCompletedTasks.length,
      badges: prev.badges,
    });
    const prevBadgeIds = new Set((prev.badges || []).map(b => b.id));
    nextBadges.forEach(badge => {
      if (!prevBadgeIds.has(badge.id)) trackAchievementUnlocked(badge.id);
    });

    const next = {
      xp: newXP,
      streak: newStreak,
      lastStudyDate: today,
      completedTasks: newCompletedTasks,
      reviseTasks: nextReviseTasks,
      badges: nextBadges,
      unlockedWeeks: prev.unlockedWeeks,
      weeklyXP: newWeeklyXP,
    };

    // Update React state, localStorage, then queue the server write.
    setProgress(next);
    saveLocalProgress(currentUser.id, currentLevel, next);

    // Queue the full snapshot for the server. On failure the local state is
    // kept (source of truth) and the write retries with backoff — a failed
    // save must NEVER roll back or discard local progress.
    queueSync({
      user_id: currentUser.id,
      level: currentLevel,
      xp: next.xp,
      streak: next.streak,
      last_study_date: next.lastStudyDate,
      completed_tasks: next.completedTasks,
      revise_tasks: next.reviseTasks,
      badges: next.badges,
      unlocked_weeks: next.unlockedWeeks,
      weekly_xp: next.weeklyXP,
    });

    // The exercise_results insert is independent of the progress upsert —
    // run it in parallel to halve the latency the user feels on completion.
    const exercisePromise = !alreadyCompleted
      ? supabase.from('exercise_results').insert({
          user_id: currentUser.id,
          level: currentLevel,
          week_id: weekId,
          day_number: dayNumber,
          task_id: taskId,
          task_type: 'task',
          score: xpAmount,
          max_score: xpAmount,
          completed: true,
        }).then(({ error }) => {
          if (error) console.error('Exercise result save error:', error);
        })
      : Promise.resolve();

    try {
      await exercisePromise;
    } catch (err) {
      console.error('Exercise result save error:', err);
    }
  }, [queueSync]);

  const unlockWeek = useCallback(async (weekId) => {
    const currentUser = userRef.current;
    const currentLevel = levelRef.current;

    if (!currentUser || !currentLevel) return;

    const prev = progressRef.current;
    if (prev.unlockedWeeks.includes(weekId)) return;

    const next = { ...prev, unlockedWeeks: [...prev.unlockedWeeks, weekId] };

    setProgress(next);
    saveLocalProgress(currentUser.id, currentLevel, next);
    queueSync({
      user_id: currentUser.id,
      level: currentLevel,
      unlocked_weeks: next.unlockedWeeks,
    });
  }, [queueSync]);

  const setTrackMode = useCallback(async (mode) => {
    const currentUser = userRef.current;
    if (!currentUser) return;
    try {
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({ id: currentUser.id, selected_pacing: mode }, { onConflict: 'id' });

      if (upsertError) {
        console.error('Set track mode error:', upsertError);
      }
    } catch (err) {
      console.error('Set track mode error:', err);
    }
  }, []);

  const recoverStreak = useCallback(async () => {
    const currentUser = userRef.current;
    const currentLevel = levelRef.current;

    if (!currentUser || !currentLevel) return;

    const prev = progressRef.current;
    const today = getLocalDateString();
    const wasBroken = calculateStreakDelta(prev.lastStudyDate) === -1;

    const nextBadges = checkBadges({
      xp: prev.xp,
      streak: wasBroken ? 1 : prev.streak,
      completedCount: prev.completedTasks.length,
      badges: prev.badges,
    });
    const prevBadgeIds = new Set((prev.badges || []).map(b => b.id));
    nextBadges.forEach(badge => {
      if (!prevBadgeIds.has(badge.id)) trackAchievementUnlocked(badge.id);
    });

    const next = {
      ...prev,
      lastStudyDate: today,
      streak: wasBroken ? 1 : prev.streak,
      badges: nextBadges,
    };

    setProgress(next);
    saveLocalProgress(currentUser.id, currentLevel, next);

    // Upsert only the fields that recoverStreak actually changes; let the
    // server preserve everything else. This matches unlockWeek's minimal
    // pattern and avoids clobbering concurrently-written fields.
    queueSync({
      user_id: currentUser.id,
      level: currentLevel,
      last_study_date: next.lastStudyDate,
      streak: next.streak,
      badges: next.badges,
    });
  }, [queueSync]);

  return {
    progress,
    loading,
    syncStatus,
    syncPendingSince,
    completeTask,
    unlockWeek,
    setTrackMode,
    recoverStreak,
    refetch: fetchProgress,
  };
}
