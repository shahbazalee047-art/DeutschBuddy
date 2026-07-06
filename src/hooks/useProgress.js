import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

function getUTCDateString(date = new Date()) {
  return date.toISOString().split('T')[0];
}

function calculateStreakDelta(lastStudyDate) {
  if (!lastStudyDate) return 1;
  const today = getUTCDateString();
  const last = lastStudyDate.slice(0, 10);
  if (last === today) return 0;
  const yesterday = getUTCDateString(new Date(Date.now() - 86400000));
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
    xp: 0, streak: 0, lastStudyDate: null, completedTasks: [], badges: [],
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
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      unlockedWeeks: Array.isArray(parsed.unlockedWeeks) && parsed.unlockedWeeks.length > 0 ? parsed.unlockedWeeks : [1],
      weeklyXP: parsed.weeklyXP && typeof parsed.weeklyXP === 'object' ? parsed.weeklyXP : {},
    };
  } catch { return null; }
}

function saveLocalProgress(userId, level, progress) {
  try { localStorage.setItem(getLocalKey(userId, level), JSON.stringify(progress)); } catch { /* ignore */ }
}

function normalizeProgressRow(data) {
  return {
    xp: data.xp || 0,
    streak: data.streak || 0,
    lastStudyDate: data.last_study_date,
    completedTasks: data.completed_tasks || [],
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

      if (data) {
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

  const completeTask = useCallback(async (taskId, xpAmount, weekId, dayNumber = 0) => {
    const currentUser = userRef.current;
    const currentLevel = levelRef.current;

    if (!currentUser || !currentLevel) return;

    // Snapshot current state outside the updater to avoid stale closures
    const prev = progressRef.current;

    // Idempotency: already completed today or earlier -> record result only, no double XP
    const alreadyCompleted = prev.completedTasks.includes(taskId);

    const today = getUTCDateString();
    const streakDelta = calculateStreakDelta(prev.lastStudyDate);
    const newStreak = prev.lastStudyDate === today
      ? prev.streak
      : Math.max(streakDelta === -1 ? 1 : prev.streak + streakDelta, 0);

    const newXP = alreadyCompleted ? prev.xp : prev.xp + xpAmount;
    const newCompletedTasks = alreadyCompleted
      ? prev.completedTasks
      : [...new Set([...prev.completedTasks, taskId])];
    const weekKey = `W${weekId}`;
    const newWeeklyXP = alreadyCompleted
      ? prev.weeklyXP
      : { ...prev.weeklyXP, [weekKey]: (prev.weeklyXP[weekKey] || 0) + xpAmount };

    const next = {
      xp: newXP,
      streak: newStreak,
      lastStudyDate: today,
      completedTasks: newCompletedTasks,
      badges: checkBadges({
        xp: newXP,
        streak: newStreak,
        completedCount: newCompletedTasks.length,
        badges: prev.badges,
      }),
      unlockedWeeks: prev.unlockedWeeks,
      weeklyXP: newWeeklyXP,
    };

    // Update React state, localStorage, then server
    setProgress(next);
    saveLocalProgress(currentUser.id, currentLevel, next);

    try {
      const { error: upsertError } = await supabase
        .from('progress')
        .upsert({
          user_id: currentUser.id,
          level: currentLevel,
          xp: next.xp,
          streak: next.streak,
          last_study_date: next.lastStudyDate,
          completed_tasks: next.completedTasks,
          badges: next.badges,
          unlocked_weeks: next.unlockedWeeks,
          weekly_xp: next.weeklyXP,
        }, { onConflict: 'user_id,level' });

      if (upsertError) {
        console.error('Progress upsert error:', upsertError);
        fetchProgress();
      }
    } catch (err) {
      console.error('Progress save error:', err);
      fetchProgress();
    }

    // Always log the attempt, but avoid duplicate exercise_result rows for repeats in the same session
    try {
      if (!alreadyCompleted) {
        const { error: exerciseError } = await supabase.from('exercise_results').insert({
          user_id: currentUser.id,
          level: currentLevel,
          week_id: weekId,
          day_number: dayNumber,
          task_id: taskId,
          task_type: 'task',
          score: xpAmount,
          max_score: xpAmount,
          completed: true,
        });

        if (exerciseError) {
          console.error('Exercise result save error:', exerciseError);
        }
      }
    } catch (err) {
      console.error('Exercise result save error:', err);
    }
  }, [fetchProgress]);

  const unlockWeek = useCallback(async (weekId) => {
    const currentUser = userRef.current;
    const currentLevel = levelRef.current;

    if (!currentUser || !currentLevel) return;

    const prev = progressRef.current;
    if (prev.unlockedWeeks.includes(weekId)) return;

    const next = { ...prev, unlockedWeeks: [...prev.unlockedWeeks, weekId] };

    setProgress(next);
    saveLocalProgress(currentUser.id, currentLevel, next);

    try {
      const { error: upsertError } = await supabase
        .from('progress')
        .upsert({
          user_id: currentUser.id,
          level: currentLevel,
          unlocked_weeks: next.unlockedWeeks,
        }, { onConflict: 'user_id,level' });

      if (upsertError) {
        console.error('Unlock week error:', upsertError);
        fetchProgress();
      }
    } catch (err) {
      console.error('Unlock week error:', err);
      fetchProgress();
    }
  }, [fetchProgress]);

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
    const today = getUTCDateString();
    const wasBroken = calculateStreakDelta(prev.lastStudyDate) === -1;

    const next = {
      ...prev,
      lastStudyDate: today,
      streak: wasBroken ? 1 : prev.streak,
      badges: checkBadges({
        xp: prev.xp,
        streak: wasBroken ? 1 : prev.streak,
        completedCount: prev.completedTasks.length,
        badges: prev.badges,
      }),
    };

    setProgress(next);
    saveLocalProgress(currentUser.id, currentLevel, next);

    try {
      const { error: upsertError } = await supabase
        .from('progress')
        .upsert({
          user_id: currentUser.id,
          level: currentLevel,
          last_study_date: next.lastStudyDate,
          streak: next.streak,
          xp: next.xp,
          completed_tasks: next.completedTasks,
          badges: next.badges,
          unlocked_weeks: next.unlockedWeeks,
          weekly_xp: next.weeklyXP,
        }, { onConflict: 'user_id,level' });

      if (upsertError) {
        console.error('Streak recovery error:', upsertError);
        fetchProgress();
      }
    } catch (err) {
      console.error('Streak recovery error:', err);
      fetchProgress();
    }
  }, [fetchProgress]);

  return {
    progress,
    loading,
    completeTask,
    unlockWeek,
    setTrackMode,
    recoverStreak,
    refetch: fetchProgress,
  };
}
