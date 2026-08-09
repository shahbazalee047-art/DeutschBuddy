// Ad service abstraction. Calling components never know which platform they
// are on: this module detects the runtime and calls the correct SDK —
// AdMob (@capacitor-community/admob) on Capacitor/Android, AdSense on the web
// PWA. Every call is a no-op (and resolves `false`) when ads are disabled or
// not configured, so the app never depends on external ad services being live.

import { ADS_ENABLED, ADMOB, ADSENSE_CLIENT_ID, INTERSTITIAL_COOLDOWN_MS } from '../config';

let initialized = false;
let available = false;
let bannerVisible = false;
let lastInterstitialAt = 0;
let sessionAdShown = false;

function isNative() {
  return typeof window !== 'undefined'
    && !!window.Capacitor
    && (typeof window.Capacitor.isNativePlatform === 'function'
      ? window.Capacitor.isNativePlatform()
      : window.Capacitor.getPlatform?.() === 'android');
}

function isConfigured() {
  if (!ADS_ENABLED) return false;
  if (isNative()) return !!ADMOB.androidAppId;
  return !!ADSENSE_CLIENT_ID;
}

function loadAdSenseScript() {
  return new Promise((resolve) => {
    try {
      if (document.getElementById('adsbygoogle-script')) { resolve(); return; }
      const script = document.createElement('script');
      script.id = 'adsbygoogle-script';
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
      script.crossOrigin = 'anonymous';
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.head.appendChild(script);
    } catch { resolve(); }
  });
}

export async function initAds() {
  if (initialized) return available;
  initialized = true;
  if (!isConfigured()) return false;

  if (isNative()) {
    try {
      const { AdMob } = await import('@capacitor-community/admob');
      await AdMob.initialize({ appId: ADMOB.androidAppId });
      available = true;
    } catch (err) {
      console.warn('[ads] AdMob init failed:', err);
    }
  } else {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      await loadAdSenseScript();
      available = true;
    } catch { /* ads remain off */ }
  }
  return available;
}

export async function showBanner(container) {
  if (!(await initAds())) return false;
  if (bannerVisible) return true;

  if (isNative()) {
    if (!ADMOB.bannerUnitId) return false;
    try {
      const { AdMob } = await import('@capacitor-community/admob');
      await AdMob.showBanner({ placementId: ADMOB.bannerUnitId, position: 'BOTTOM_CENTER' });
      bannerVisible = true;
      return true;
    } catch (err) {
      console.warn('[ads] Banner show failed:', err);
      return false;
    }
  }

  if (!container) return false;
  try {
    container.innerHTML = '';
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.dataset.adClient = ADSENSE_CLIENT_ID;
    ins.dataset.adSlot = '';
    ins.dataset.adFormat = 'auto';
    ins.dataset.fullWidthResponsive = 'true';
    container.appendChild(ins);
    (window.adsbygoogle || []).push({});
    bannerVisible = true;
    return true;
  } catch (err) {
    console.warn('[ads] AdSense banner render failed:', err);
    return false;
  }
}

export async function hideBanner() {
  if (!available) return;
  if (isNative()) {
    try {
      const { AdMob } = await import('@capacitor-community/admob');
      await AdMob.hideBanner();
    } catch { /* ignore */ }
  }
  bannerVisible = false;
}

// Interstitial — only at natural session boundaries, and never more than once
// per 10 minutes and once per app open.
export async function showInterstitial() {
  if (!(await initAds())) return false;
  const now = Date.now();
  if (sessionAdShown || now - lastInterstitialAt < INTERSTITIAL_COOLDOWN_MS) return false;

  if (isNative()) {
    if (!ADMOB.interstitialUnitId) return false;
    try {
      const { AdMob } = await import('@capacitor-community/admob');
      await AdMob.prepareInterstitial({ adId: ADMOB.interstitialUnitId });
      await AdMob.showInterstitial();
      lastInterstitialAt = now;
      sessionAdShown = true;
      return true;
    } catch (err) {
      console.warn('[ads] Interstitial show failed:', err);
      return false;
    }
  }

  // No web interstitial SDK — skip silently.
  return false;
}

// Rewarded ads: the interface exists for a future opt-in trigger (e.g. bonus
// practice round). No trigger is wired yet, and web has no rewarded SDK.
export async function showRewarded(onReward) {
  if (!(await initAds())) return false;
  if (!isNative() || !ADMOB.rewardedUnitId) return false;
  try {
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.prepareRewardVideoAd({ adId: ADMOB.rewardedUnitId });
    await AdMob.showRewardVideoAd();
    if (onReward) onReward();
    return true;
  } catch (err) {
    console.warn('[ads] Rewarded show failed:', err);
    return false;
  }
}