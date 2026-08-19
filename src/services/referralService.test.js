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

// rpc calls: get_my_referral_info, set_my_referral_info, then (maybe)
// record_referral.
function setupRpc({ info, recordResult }) {
  supabase.rpc.mockResolvedValueOnce({ data: info, error: null });
  supabase.rpc.mockResolvedValueOnce({ data: null, error: null });
  if (recordResult) supabase.rpc.mockResolvedValueOnce({ data: recordResult, error: null });
}

beforeEach(() => {
  vi.resetAllMocks();
  try { localStorage.removeItem('db_pending_referral'); } catch { /* ignore */ }
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

    const rpcCalls = supabase.rpc.mock.calls;
    expect(rpcCalls[1][0]).toBe('set_my_referral_info');
    expect(rpcCalls[1][1].p_referral_code).toMatch(/^DB-[A-Z0-9]{8}$/);
    expect(rpcCalls[1][1].p_referred_by).toBe('DB-REF12345');
    expect(rpcCalls[2][0]).toBe('record_referral');
    expect(rpcCalls[2][1]).toEqual({ p_ref_code: 'DB-REF12345', p_new_user_id: UID });
  });

  it('never overwrites an existing referral_code and no-ops without a pending ref', async () => {
    setupRpc({ info: { referral_code: 'DB-EXISTING1', referral_count: 2, referred_by: null } });
    const result = await applyPendingReferral(UID);
    expect(result).toBeNull();
    expect(supabase.rpc).toHaveBeenCalledTimes(1); // info check only
  });

  it('keeps the existing code when one already exists', async () => {
    setupRpc({ info: { referral_code: 'DB-EXISTING1', referral_count: 2, referred_by: null } });
    localStorage.setItem('db_pending_referral', 'DB-REF12345');
    const result = await applyPendingReferral(UID);
    expect(result).toBe('DB-REF12345');
    expect(supabase.rpc.mock.calls[1][0]).toBe('set_my_referral_info');
    expect(supabase.rpc.mock.calls[1][1]).toMatchObject({
      p_referral_code: 'DB-EXISTING1',
      p_referred_by: 'DB-REF12345',
    });
  });

  it('ignores a self-referral (pending ref equals own code)', async () => {
    setupRpc({ info: { referral_code: 'DB-EXISTING1', referral_count: 2, referred_by: null } });
    localStorage.setItem('db_pending_referral', 'DB-EXISTING1');
    const result = await applyPendingReferral(UID);
    expect(result).toBeNull();
    expect(supabase.rpc.mock.calls[1][1].p_referred_by).toBeNull();
  });

  it('does not double-credit when already referred', async () => {
    setupRpc({ info: { referral_code: 'DB-EXISTING1', referral_count: 1, referred_by: '99999999-9999-9999-9999-999999999999' } });
    localStorage.setItem('db_pending_referral', 'DB-REF12345');
    const result = await applyPendingReferral(UID);
    expect(result).toBeNull();
    expect(supabase.rpc.mock.calls[1][1].p_referred_by).toBeNull();
    expect(supabase.rpc).toHaveBeenCalledTimes(2); // info + setter, no record_referral
  });
});
