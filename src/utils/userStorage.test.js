import { describe, it, expect, beforeEach } from 'vitest';
import {
  clearPreAuthState,
  getUserStorageKey,
  getUserValue,
  scopeLocalStateForUser,
  setUserValue,
} from './userStorage';

describe('userStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('keeps values separate for different accounts', () => {
    setUserValue('user-a', 'selected_level', 'A1');
    setUserValue('user-b', 'selected_level', 'A2');

    expect(getUserValue('user-a', 'selected_level')).toBe('A1');
    expect(getUserValue('user-b', 'selected_level')).toBe('A2');
    expect(localStorage.getItem(getUserStorageKey('user-a', 'selected_level'))).toBe('"A1"');
  });

  it('migrates pre-auth onboarding state once without overwriting account state', () => {
    localStorage.setItem('db_selected_level', 'A2');
    localStorage.setItem('db_daily_goal', '30');
    setUserValue('user-a', 'selected_level', 'A1');

    scopeLocalStateForUser('user-a');

    expect(getUserValue('user-a', 'selected_level')).toBe('A1');
    expect(getUserValue('user-a', 'daily_goal')).toBe(30);
    expect(localStorage.getItem('db_selected_level')).toBeNull();
    expect(localStorage.getItem('db_daily_goal')).toBeNull();
  });

  it('clears only pre-auth staging and leaves referral attribution intact', () => {
    localStorage.setItem('db_onboarded', 'true');
    localStorage.setItem('db_pending_referral', 'DB-ABC12345');

    clearPreAuthState();

    expect(localStorage.getItem('db_onboarded')).toBeNull();
    expect(localStorage.getItem('db_pending_referral')).toBe('DB-ABC12345');
  });
});
