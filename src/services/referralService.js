// Shared referral sync. Called at signup when the user is immediately signed
// in, and again at first login for the email-confirmation path (signup returns
// a user but no session). It is idempotent and never overwrites an existing
// referral_code — so it is safe to call on every login.

import { supabase } from '../lib/supabase';
import { generateReferralCode, consumeReferralCode } from '../utils/referral';
import { trackReferralUsed, trackReferralRewardEarned } from '../utils/analytics';

export async function applyPendingReferral(userId, extraProfileFields = {}) {
  if (!userId) return null;

  let info = null;
  try {
    const { data } = await supabase.rpc('get_my_referral_info');
    info = data;
  } catch (err) {
    console.warn('Referral info check failed:', err);
  }

  const pendingRef = consumeReferralCode();
  const hasCode = !!info?.referral_code;
  const alreadyReferred = !!info?.referred_by;

  // Nothing new pending and this profile is already set up.
  if (!pendingRef && hasCode) return null;

  const ownCode = info?.referral_code || generateReferralCode();
  const validRef = pendingRef && pendingRef !== ownCode ? pendingRef : null;

  // Guards: the referral credit must NEVER take down the sign-up/login flow.
  // Every failure here is logged and retried on the next login instead.
  const payload = { ...extraProfileFields, id: userId, referral_code: ownCode };
  if (validRef && !alreadyReferred) payload.referred_by = validRef;

  let upsertError;
  try {
    ({ error: upsertError } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'id' }));
  } catch (err) {
    upsertError = err;
  }
  if (upsertError) {
    console.error('Profile referral sync error:', upsertError);
    return null;
  }

  if (validRef && !alreadyReferred) {
    trackReferralUsed(validRef);
    const { data: rpcData, error: rpcError } = await supabase
      .rpc('record_referral', { p_ref_code: validRef, p_new_user_id: userId });
    if (rpcError) console.error('Referral record error:', rpcError);
    // rpcData is the referrer id; only present when a reward was actually
    // granted (idempotent per referred user), so analytics fire once.
    if (rpcData) trackReferralRewardEarned({ referrerId: rpcData, refCode: validRef });
    return validRef;
  }

  return null;
}