import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '../lib/supabase';

vi.mock('../lib/supabase', () => ({
  supabase: {
    rpc: vi.fn(),
    from: vi.fn(),
  },
}));

import { applyPendingReferral } from './referralService';

const UID = '11111111-1111-1111-1111-111111111111';

// rpc calls: first get_my_referral_info, then (maybe) record_referral.
function setupRpc({ info, recordResult }) {
  supabase.rpc.mockResolvedValueOnce({ data: info, error: null });
  if (recordResult) supabase.rpc.mockResolvedValueOnce({ data: recordResult, error: null });
}

let upsertImpl;

beforeEach(() => {
  vi.resetAllMocks();
  try { localStorage.removeItem('db_pending_referral'); } catch { /* ignore */ }
  upsertImpl = vi.fn(() => Promise.resolve({ error: null }));
  supabase.from.mockReturnValue({ upsert: upsertImpl });
  // Default: no referral info and no reward credited (record_referral falls
  // back to this for tests that don't expect a credit).
  supabase.rpc.mockResolvedValue({ data: null, error: null });
});

describe('applyPendingReferral', () => {
  it('mints a code, records referred_by and credits the referrer for a fresh user', async () => {
    setupRpc({ info: null, recordResult: UID });
    localStorage.setItem('db_pending_referral', 'DB-REF12345');
    const result = await applyPendingReferral(UID);
    expect(result).toBe('DB-REF12345');

    expect(supabase.from).toHaveBeenCalledWith('profiles');
    const payload = upsertImpl.mock.calls[0][0];
    expect(payload.id).toBe(UID);
    expect(payload.referred_by).toBe('DB-REF12345');
    expect(payload.referral_code).toMatch(/^DB-[A-Z0-9]{8}$/);

    const rpcCalls = supabase.rpc.mock.calls;
    expect(rpcCalls[1][0]).toBe('record_referral');
    expect(rpcCalls[1][1]).toEqual({ p_ref_code: 'DB-REF12345', p_new_user_id: UID });
  });

  it('never overwrites an existing referral_code and no-ops without a pending ref', async () => {
    setupRpc({ info: { referral_code: 'DB-EXISTING1', referral_count: 2, referred_by: null } });
    const result = await applyPendingReferral(UID);
    expect(result).toBeNull();
    expect(supabase.from).not.toHaveBeenCalled();
    expect(supabase.rpc).toHaveBeenCalledTimes(1); // info check only
  });

  it('keeps the existing code when one already exists', async () => {
    setupRpc({ info: { referral_code: 'DB-EXISTING1', referral_count: 2, referred_by: null } });
    localStorage.setItem('db_pending_referral', 'DB-REF12345');
    const result = await applyPendingReferral(UID);
    expect(result).toBe('DB-REF12345');
    const payload = upsertImpl.mock.calls[0][0];
    expect(payload.referral_code).toBe('DB-EXISTING1');
    expect(payload.referred_by).toBe('DB-REF12345');
  });

  it('ignores a self-referral (pending ref equals own code)', async () => {
    setupRpc({ info: { referral_code: 'DB-EXISTING1', referral_count: 2, referred_by: null } });
    localStorage.setItem('db_pending_referral', 'DB-EXISTING1');
    const result = await applyPendingReferral(UID);
    expect(result).toBeNull();
    const payload = upsertImpl.mock.calls[0][0];
    expect(payload.referred_by).toBeUndefined();
  });

  it('does not double-credit when already referred', async () => {
    setupRpc({ info: { referral_code: 'DB-EXISTING1', referral_count: 1, referred_by: '99999999-9999-9999-9999-999999999999' } });
    localStorage.setItem('db_pending_referral', 'DB-REF12345');
    const result = await applyPendingReferral(UID);
    expect(result).toBeNull();
    expect(upsertImpl.mock.calls[0][0].referred_by).toBeUndefined();
    expect(supabase.rpc).toHaveBeenCalledTimes(1); // no record_referral call
  });
});