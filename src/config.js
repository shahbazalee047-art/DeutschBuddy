const env = import.meta.env || {};

// Master switch for all ad integrations. Set to false to disable ads entirely
// (used when ads are not configured, during dev, or if the user opts out).
export const ADS_ENABLED = env.VITE_ADS_ENABLED === 'false' ? false : true;

export const ADMOB = {
  // Native (Capacitor/Android) — from the AdMob console. Empty until supplied,
  // and ads.js no-ops while any required id is missing.
  androidAppId: env.VITE_ADMOB_ANDROID_APP_ID || '',
  bannerUnitId: env.VITE_ADMOB_BANNER_ID || '',
  interstitialUnitId: env.VITE_ADMOB_INTERSTITIAL_ID || '',
  rewardedUnitId: env.VITE_ADMOB_REWARDED_ID || '',
};

export const ADSENSE_CLIENT_ID = env.VITE_ADSENSE_CLIENT_ID || '';

export const INTERSTITIAL_COOLDOWN_MS = 10 * 60 * 1000; // max one per 10 minutes