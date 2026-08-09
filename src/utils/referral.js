// Referral helpers. The ref code travels as a URL param (?ref=CODE) from the
// invite link; onboarding and signup stash it in localStorage so it survives
// the onboarding -> signup navigation.

export const REFERRAL_LS_KEY = 'db_pending_referral';

export function generateReferralCode() {
  const randomPart = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `DB-${randomPart}`;
}

export function stashReferralCode(code) {
  if (!code) return;
  try { localStorage.setItem(REFERRAL_LS_KEY, code); } catch { /* ignore */ }
}

export function consumeReferralCode() {
  let code;
  try { code = localStorage.getItem(REFERRAL_LS_KEY); } catch { code = null; }
  if (code) {
    try { localStorage.removeItem(REFERRAL_LS_KEY); } catch { /* ignore */ }
  }
  return code;
}

export function buildReferralLink(code) {
  return `${window.location.origin}/?ref=${encodeURIComponent(code)}`;
}

export function isValidReferralCode(code) {
  return typeof code === 'string' && /^DB-[A-Z0-9]{8}$/.test(code);
}
