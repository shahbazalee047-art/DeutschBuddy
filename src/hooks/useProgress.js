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

function checkBadges(xp, streak, completedCount, existingBadges) {
  const existingIds = existingBadges.map(b => b.id);
  const badgeDefs = [
    { id: 'first-task', name: 'First Steps', icon: '🌟', condition: completedCount >= 1 },
    { id: 'ten-tasks', name: 'Getting Started', icon: '🔥', condition: completedCount >= 10 },
    { id: 'fifty-tasks', name: 'Halfway Hero', icon: '💪', condition: completedCount >= 50 },
    { id: 'hundred-tasks', name: 'Century Club', icon: '🏆', condition: completedCount >= 100 },
    { id: 'streak-3', name: 'On Fire', icon: '🔥', condition: streak >= 3 },
    { id: 'streak-7', name: 'Week Warrior', icon: '⚡', condition: streak >= 7 },
    { id: 'streak-30', name: 'Monthly Master', icon: '👑', condition: streak >= 30 },
    { id: 'xp-100', name: 'XP Hunter', icon: '🎯', condition: xp >= 100 },
    { id: 'xp-500', name: 'XP Champion', icon: '🏅', condition: xp >= 500 },
    { id: 'xp-1000', name: 'XP Legend', icon: '💎', condition: xp >= 1000 },
  ];
  const newBadges = [...existingBadges];
  badgeDefs.forEach(badge => {
    if (badge.condition && !existingIds.includes(badge.id)) {
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
      unlockedWeeks: Array.isArray(parsed.unlockedWeeks) ? parsed.unlockedWeeks : [1],
      weeklyXP: parsed.weeklyXP && typeof parsed.weeklyXP === 'object' ? parsed.weeklyXP : {},
    };
  } catch { return null; }
}

function saveLocalProgress(userId, level, progress) {
  try { localStorage.setItem(getLocalKey(userId, level), JSON.stringify(progress)); } catch { /* ignore */ }
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

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    levelRef.current = level;
  }, [level]);

  // Reset state synchronously when level changes so stale progress isn't shown
  useEffect(() => {
    if (!user) {
      setProgress(getDefaultProgress());
      return;
    }
    setProgress(loadLocalProgress(user.id, level) || getDefaultProgress());
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
        setProgress({
          xp: data.xp || 0,
          streak: data.streak || 0,
          lastStudyDate: data.last_study_date,
          completedTasks: data.completed_tasks || [],
          badges: data.badges || [],
          unlockedWeeks: data.unlocked_weeks || [1],
          weeklyXP: data.weekly_xp || {},
        });
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

    let upsertPayload = null;

    setProgress(prev => {
      const today = getUTCDateString();
      const streakDelta = calculateStreakDelta(prev.lastStudyDate);
      const newStreak = prev.lastStudyDate === today
        ? prev.streak
        : (streakDelta === -1 ? 1 : prev.streak + streakDelta);

      const newXP = prev.xp + xpAmount;
      const newCompletedTasks = [...new Set([...prev.completedTasks, taskId])];
      const newBadges = checkBadges(newXP, Math.max(newStreak, 0), newCompletedTasks.length, prev.badges);
      const weekKey = `W${weekId}`;
      const newWeeklyXP = { ...prev.weeklyXP, [weekKey]: (prev.weeklyXP[weekKey] || 0) + xpAmount };

      const next = {
        xp: newXP,
        streak: Math.max(newStreak, 0),
        lastStudyDate: today,
        completedTasks: newCompletedTasks,
        badges: newBadges,
        unlockedWeeks: prev.unlockedWeeks,
        weeklyXP: newWeeklyXP,
      };

      upsertPayload = {
        user_id: currentUser.id,
        level: currentLevel,
        xp: next.xp,
        streak: next.streak,
        last_study_date: today,
        completed_tasks: next.completedTasks,
        badges: next.badges,
        unlocked_weeks: next.unlockedWeeks,
        weekly_xp: next.weeklyXP,
      };

      saveLocalProgress(currentUser.id, currentLevel, next);
      return next;
    });

    try {
      const { error: upsertError } = await supabase
        .from('progress')
        .upsert(upsertPayload, { onConflict: 'user_id,level' });

      if (upsertError) {
        console.error('Progress upsert error:', upsertError);
        fetchProgress();
      }
    } catch (err) {
      console.error('Progress save error:', err);
      fetchProgress();
    }

    try {
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
    } catch (err) {
      console.error('Exercise result save error:', err);
    }
  }, [fetchProgress]);

  const unlockWeek = useCallback(async (weekId) => {
    const currentUser = userRef.current;
    const currentLevel = levelRef.current;

    if (!currentUser || !currentLevel) return;

    let upsertPayload = null;

    setProgress(prev => {
      if (prev.unlockedWeeks.includes(weekId)) return prev;
      const newUnlocked = [...prev.unlockedWeeks, weekId];
      upsertPayload = {
        user_id: currentUser.id,
        level: currentLevel,
        unlocked_weeks: newUnlocked,
      };
      const next = { ...prev, unlockedWeeks: newUnlocked };
      saveLocalProgress(currentUser.id, currentLevel, next);
      return next;
    });

    if (!upsertPayload) return;

    try {
      const { error: upsertError } = await supabase
        .from('progress')
        .upsert(upsertPayload, { onConflict: 'user_id,level' });

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

    const today = getUTCDateString();

    setProgress(prev => {
      // Recovery resets streak to 1 if it was broken, otherwise keeps it.
      const wasBroken = calculateStreakDelta(prev.lastStudyDate) === -1;
      const next = {
        ...prev,
        lastStudyDate: today,
        streak: wasBroken ? 1 : prev.streak,
      };
      saveLocalProgress(currentUser.id, currentLevel, next);
      return next;
    });

    try {
      await supabase.from('progress').upsert({
        user_id: currentUser.id,
        level: currentLevel,
        last_study_date: today,
        streak: progressRef.current.streak,
        xp: progressRef.current.xp,
        completed_tasks: progressRef.current.completedTasks,
        badges: progressRef.current.badges,
        unlocked_weeks: progressRef.current.unlockedWeeks,
        weekly_xp: progressRef.current.weeklyXP,
      }, { onConflict: 'user_id,level' });
    } catch (err) { console.error('Streak recovery error:', err); }
  }, []);

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
