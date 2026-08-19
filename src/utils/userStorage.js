// Browser state that belongs to a learner must not be shared between accounts
// on the same device. Onboarding happens before an account exists, so the
// small staging set below intentionally remains unscoped until auth resolves.

export const USER_STORAGE_PREFIX = 'db_user_';

export const PRE_AUTH_STAGED_KEYS = [
  'db_selected_level',
  'db_selected_track',
  'db_onboarded',
  'db_learning_goal',
  'db_daily_goal',
  'db_pending_lesson',
  // Legacy account state from releases before user-scoped storage.
  'db_notification_preferences',
  'db_notif_read',
];

export function getUserStorageKey(userId, key) {
  if (!userId || !key) return null;
  return `${USER_STORAGE_PREFIX}${userId}_${key}`;
}

export function getUserValue(userId, key, fallback = null) {
  const storageKey = getUserStorageKey(userId, key);
  if (!storageKey) return fallback;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw === null) return fallback;
    try { return JSON.parse(raw); } catch { return raw; }
  } catch {
    return fallback;
  }
}

export function setUserValue(userId, key, value) {
  const storageKey = getUserStorageKey(userId, key);
  if (!storageKey) return false;
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeUserValue(userId, key) {
  const storageKey = getUserStorageKey(userId, key);
  if (!storageKey) return;
  try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
}

// Copies pre-auth onboarding choices into the account namespace exactly once.
// Existing account-scoped values win so signing into an established account
// cannot be overwritten by stale onboarding data left by another user.
export function scopeLocalStateForUser(userId) {
  if (!userId) return;
  try {
    for (const key of PRE_AUTH_STAGED_KEYS) {
      const staged = localStorage.getItem(key);
      const scopedKey = getUserStorageKey(userId, key.replace(/^db_/, ''));
      if (staged !== null && scopedKey && localStorage.getItem(scopedKey) === null) {
        localStorage.setItem(scopedKey, staged);
      }
      if (staged !== null) localStorage.removeItem(key);
    }
  } catch {
    // Private browsing/storage-disabled environments already degrade to the
    // server-backed defaults elsewhere in the app.
  }
}

export function clearPreAuthState() {
  try {
    for (const key of PRE_AUTH_STAGED_KEYS) localStorage.removeItem(key);
  } catch { /* ignore */ }
}
