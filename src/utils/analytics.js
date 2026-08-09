const EVENTS = {
  LESSON_STARTED: 'lesson_started',
  LESSON_COMPLETED: 'lesson_completed',
  ANSWER_CORRECT: 'answer_correct',
  ANSWER_INCORRECT: 'answer_incorrect',
  STREAK_MAINTAINED: 'streak_maintained',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
  LESSON_SKIPPED: 'lesson_skipped',
  SESSION_START: 'session_start',
  SESSION_END: 'session_end',
  GAME_PLAYED: 'game_played',
  DAILY_GOAL_HIT: 'daily_goal_hit',
  SIGNUP_COMPLETED: 'signup_completed',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  STREAK_MILESTONE: 'streak_milestone',
  REFERRAL_USED: 'referral_used',
  REFERRAL_REWARD_EARNED: 'referral_reward_earned'
};

export const STREAK_MILESTONES = [3, 5, 7, 14, 30];

export { EVENTS };

export function trackEvent(eventName, properties = {}) {
  if (typeof window === 'undefined') return;

  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    properties
  };

  // Console log in development
  if (import.meta.env?.DEV) {
    console.log('[Analytics]', payload);
  }

  // Optional: send to analytics backend
  // if (import.meta.env?.VITE_ANALYTICS_URL) {
  //   fetch(import.meta.env.VITE_ANALYTICS_URL, { method: 'POST', body: JSON.stringify(payload) });
  // }

  // Expose for external trackers
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }
}

export function trackLessonStarted(lessonId, level) {
  trackEvent(EVENTS.LESSON_STARTED, { lesson_id: lessonId, level });
}

export function trackLessonCompleted(lessonId, level, score, maxScore, xpEarned) {
  trackEvent(EVENTS.LESSON_COMPLETED, {
    lesson_id: lessonId,
    level,
    score,
    max_score: maxScore,
    xp_earned: xpEarned,
    accuracy: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
  });
}

export function trackAnswerCorrect(taskType) {
  trackEvent(EVENTS.ANSWER_CORRECT, { task_type: taskType });
}

export function trackAnswerIncorrect(taskType) {
  trackEvent(EVENTS.ANSWER_INCORRECT, { task_type: taskType });
}

export function trackAchievementUnlocked(badgeId) {
  trackEvent(EVENTS.ACHIEVEMENT_UNLOCKED, { badge_id: badgeId });
}

export function trackGamePlayed(game, score) {
  trackEvent(EVENTS.GAME_PLAYED, { game, score });
}

export function trackSignupCompleted({ method = 'email', referralUsed = false } = {}) {
  trackEvent(EVENTS.SIGNUP_COMPLETED, { method, referral_used: referralUsed });
}

export function trackOnboardingCompleted({ level, track, goal } = {}) {
  trackEvent(EVENTS.ONBOARDING_COMPLETED, { level, track, goal });
}

export function trackSessionStart({ userId, level } = {}) {
  trackEvent(EVENTS.SESSION_START, { user_id: userId, level });
}

export function trackStreakMilestone(streak) {
  trackEvent(EVENTS.STREAK_MILESTONE, { streak, milestone: `${streak}-day` });
}

export function trackReferralUsed(refCode) {
  trackEvent(EVENTS.REFERRAL_USED, { referral_code: refCode });
}

export function trackReferralRewardEarned({ referrerId, refCode } = {}) {
  trackEvent(EVENTS.REFERRAL_REWARD_EARNED, { referrer_id: referrerId, referral_code: refCode });
}
