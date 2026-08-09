import { describe, it, expect, vi, beforeEach } from 'vitest';

// Ads must no-op (resolve false) when unconfigured — the default in tests and
// for any environment without AdMob/AdSense ids in .env.
describe('ads service (unconfigured)', () => {
  let ads;
  let config;

  beforeEach(async () => {
    vi.resetModules();
    config = await import('../config');
    ads = await import('./ads');
  });

  it('initAds resolves false without ids', async () => {
    expect(config.ADS_ENABLED).toBe(true);
    expect(config.ADMOB.androidAppId).toBe('');
    expect(await ads.initAds()).toBe(false);
  });

  it('showBanner/hideBanner no-op safely', async () => {
    const container = document.createElement('div');
    expect(await ads.showBanner(container)).toBe(false);
    expect(container.innerHTML).toBe('');
    await expect(ads.hideBanner()).resolves.toBeUndefined();
  });

  it('showInterstitial no-ops (no web interstitial, no ids)', async () => {
    expect(await ads.showInterstitial()).toBe(false);
  });

  it('showRewarded no-ops', async () => {
    const onReward = vi.fn();
    expect(await ads.showRewarded(onReward)).toBe(false);
    expect(onReward).not.toHaveBeenCalled();
  });
});