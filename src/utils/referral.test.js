import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateReferralCode,
  stashReferralCode,
  consumeReferralCode,
  buildReferralLink,
  isValidReferralCode,
  REFERRAL_LS_KEY,
} from './referral';

describe('generateReferralCode', () => {
  it('produces a valid DB-XXXXXXX code', () => {
    const code = generateReferralCode();
    expect(isValidReferralCode(code)).toBe(true);
  });

  it('produces distinct codes across calls', () => {
    const a = generateReferralCode();
    const b = generateReferralCode();
    expect(a).not.toBe(b);
  });
});

describe('stash/consume referral code', () => {
  beforeEach(() => {
    try { localStorage.removeItem(REFERRAL_LS_KEY); } catch { /* ignore */ }
  });

  it('stashes then consumes exactly once', () => {
    stashReferralCode('DB-ABC12345');
    expect(isValidReferralCode(consumeReferralCode())).toBe(true);
    expect(consumeReferralCode()).toBeNull();
  });

  it('ignores silent stash with no code', () => {
    stashReferralCode(null);
    expect(consumeReferralCode()).toBeNull();
  });
});

describe('isValidReferralCode', () => {
  it('rejects malformed codes', () => {
    expect(isValidReferralCode('')).toBe(false);
    expect(isValidReferralCode('foo')).toBe(false);
    expect(isValidReferralCode('DB-abc')).toBe(false);
    expect(isValidReferralCode(null)).toBe(false);
    expect(isValidReferralCode(42)).toBe(false);
  });
});

describe('buildReferralLink', () => {
  it('builds a root path invite link with the code', () => {
    const link = buildReferralLink('DB-ABC12345');
    const url = new URL(link, window.location.origin);
    expect(url.pathname).toBe('/');
    expect(url.searchParams.get('ref')).toBe('DB-ABC12345');
  });
});