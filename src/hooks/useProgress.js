import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

function calculateStreak(lastStudyDate) {
  if (!lastStudyDate) return 1;
  const today = new Date().toDateString();
  const last = new Date(lastStudyDate);
  const diff = Math.floor((new Date(today) - last) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 0;
  if (diff === 1) return 1;
  return 0;
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

function loadLocalProgress(level) {
  try {
    const data = localStorage.getItem(`db_progress_${level}`);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

function saveLocalProgress(level, progress) {
  try { localStorage.setItem(`db_progress_${level}`, JSON.stringify(progress)); } catch {}
}

export function useProgress(level) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => {
    if (!user) return getDefaultProgress();
    const local = loadLocalProgress(level);
    return local || getDefaultProgress();
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
        const local = loadLocalProgress(level);
        if (local) setProgress(local);
      }
    } catch (err) {
      console.error('fetchProgress exception:', err);
      const local = loadLocalProgress(level);
      if (local) setProgress(local);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [user, level, fetchProgress]);

  const completeTask = useCallback(async (taskId, xpAmount, weekId) => {
    const currentUser = userRef.current;
    const currentLevel = levelRef.current;

    if (!currentUser || !currentLevel) return;

    const currentProgress = progressRef.current;
    const today = new Date().toDateString();
    const newStreak = currentProgress.lastStudyDate === today
      ? currentProgress.streak
      : currentProgress.streak + calculateStreak(currentProgress.lastStudyDate);

    const newXP = currentProgress.xp + xpAmount;
    const newCompletedTasks = [...new Set([...currentProgress.completedTasks, taskId])];
    const newBadges = checkBadges(newXP, newStreak, newCompletedTasks.length, currentProgress.badges);

    const weekKey = `W${weekId}`;
    const newWeeklyXP = { ...currentProgress.weeklyXP };
    newWeeklyXP[weekKey] = (newWeeklyXP[weekKey] || 0) + xpAmount;

    const newState = {
      xp: newXP,
      streak: Math.max(newStreak, 1),
      lastStudyDate: today,
      completedTasks: newCompletedTasks,
      badges: newBadges,
      weeklyXP: newWeeklyXP,
    };

    setProgress(prev => ({ ...prev, ...newState }));
    saveLocalProgress(level, { ...progress, ...newState });

    try {
      const { error: upsertError } = await supabase
        .from('progress')
        .upsert({
          user_id: currentUser.id,
          level: currentLevel,
          xp: newXP,
          streak: Math.max(newStreak, 1),
          last_study_date: today,
          completed_tasks: newCompletedTasks,
          badges: newBadges,
          weekly_xp: newWeeklyXP,
        }, { onConflict: 'user_id,level' });

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
        day_number: 0,
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

    const currentProgress = progressRef.current;
    if (currentProgress.unlockedWeeks.includes(weekId)) return;

    const newUnlocked = [...currentProgress.unlockedWeeks, weekId];
    setProgress(prev => ({ ...prev, unlockedWeeks: newUnlocked }));
    saveLocalProgress(level, { ...progress, unlockedWeeks: newUnlocked });

    try {
      const { error: upsertError } = await supabase
        .from('progress')
        .upsert({
          user_id: currentUser.id,
          level: currentLevel,
          unlocked_weeks: newUnlocked,
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
    const currentProgress = progressRef.current;

    if (!currentUser || !currentLevel) return;
    const today = new Date().toDateString();
    const newState = {
      ...currentProgress,
      lastStudyDate: today,
    };
    setProgress(prev => ({ ...prev, lastStudyDate: today }));
    saveLocalProgress(currentLevel, newState);
    try {
      await supabase.from('progress').upsert({
        user_id: currentUser.id,
        level: currentLevel,
        last_study_date: today,
        streak: currentProgress.streak,
        xp: currentProgress.xp,
        completed_tasks: currentProgress.completedTasks,
        badges: currentProgress.badges,
        unlocked_weeks: currentProgress.unlockedWeeks,
        weekly_xp: currentProgress.weeklyXP,
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
