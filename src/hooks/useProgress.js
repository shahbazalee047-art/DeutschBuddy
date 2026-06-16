import { useState, useEffect, useCallback } from 'react';
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

export function useProgress(level) {
  const { user } = useAuth();
  const [progress, setProgress] = useState({
    xp: 0,
    streak: 0,
    lastStudyDate: null,
    completedTasks: [],
    badges: [],
    unlockedWeeks: [1],
    weeklyXP: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !level) {
      setLoading(false);
      return;
    }
    fetchProgress();
  }, [user, level]);

  async function fetchProgress() {
    try {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('level', level)
        .single();

      if (error) {
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
      }
    } catch (err) {
      console.error('fetchProgress exception:', err);
    } finally {
      setLoading(false);
    }
  }

  const completeTask = useCallback(async (taskId, xpAmount, weekId) => {
    if (!user || !level) return;

    const today = new Date().toDateString();
    const newStreak = progress.lastStudyDate === today
      ? progress.streak
      : progress.streak + calculateStreak(progress.lastStudyDate);

    const newXP = progress.xp + xpAmount;
    const newCompletedTasks = [...progress.completedTasks, taskId];
    const newBadges = checkBadges(newXP, newStreak, newCompletedTasks.length, progress.badges);

    const weekKey = `W${weekId}`;
    const newWeeklyXP = { ...progress.weeklyXP };
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

    try {
      await supabase
        .from('progress')
        .upsert({
          user_id: user.id,
          level,
          xp: newXP,
          streak: Math.max(newStreak, 1),
          last_study_date: today,
          completed_tasks: newCompletedTasks,
          badges: newBadges,
          weekly_xp: newWeeklyXP,
        }, { onConflict: 'user_id,level' });
    } catch (err) {
      console.error('Progress save error:', err);
    }

    try {
      await supabase.from('exercise_results').insert({
        user_id: user.id,
        level,
        week_id: weekId,
        day_number: 0,
        task_id: taskId,
        task_type: 'task',
        score: xpAmount,
        max_score: xpAmount,
        completed: true,
      });
    } catch (err) {
      console.error('Exercise result save error:', err);
    }
  }, [user, level, progress]);

  const unlockWeek = useCallback(async (weekId) => {
    if (!user || !level) return;
    if (progress.unlockedWeeks.includes(weekId)) return;

    const newUnlocked = [...progress.unlockedWeeks, weekId];
    setProgress(prev => ({ ...prev, unlockedWeeks: newUnlocked }));

    try {
      await supabase
        .from('progress')
        .upsert({
          user_id: user.id,
          level,
          unlocked_weeks: newUnlocked,
        }, { onConflict: 'user_id,level' });
    } catch (err) {
      console.error('Unlock week error:', err);
    }
  }, [user, level, progress.unlockedWeeks]);

  const setTrackMode = useCallback(async (mode) => {
    if (!user) return;
    try {
      await supabase
        .from('profiles')
        .upsert({ id: user.id, selected_pacing: mode }, { onConflict: 'id' });
    } catch (err) {
      console.error('Set track mode error:', err);
    }
  }, [user]);

  return {
    progress,
    loading,
    completeTask,
    unlockWeek,
    setTrackMode,
    refetch: fetchProgress,
  };
}
