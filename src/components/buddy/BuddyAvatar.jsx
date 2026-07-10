import { memo, useMemo, useState, useEffect } from 'react';

// Buddy — the German Shepherd mascot.
//
// Rendering strategy:
//   1. Primary: a clean illustrated image (public/buddy/buddy-square-512.webp)
//      with the cream background removed — used for ALL states.
//   2. Emotion is conveyed through natural motion (squash-and-stretch keyframes
//      in index.css) — hop when happy, tilt when curious, deflate when sad, etc.
//   3. Optional per-state image overrides (STATE_IMAGES below) for true facial
//      variety. Drop a file at public/buddy/buddy-<state>.webp and uncomment the
//      line — that state then shows its own expression instead of the animated base.
//   4. Ultimate fallback: the inline SVG (kept below) renders only if the image
//      asset itself fails to load.

const BUDDY_STATES = [
  'idle', 'happy', 'celebrate', 'encourage', 'thinking',
  'listening', 'reading', 'sad', 'loading', 'waving'
];

const stateAnimations = {
  idle: 'buddy-breathe',
  happy: 'buddy-hop',
  celebrate: 'buddy-spin',
  encourage: 'buddy-tilt',
  thinking: 'buddy-think',
  listening: 'buddy-bob',
  reading: 'buddy-breathe',
  sad: 'buddy-sigh',
  loading: 'buddy-run',
  waving: 'buddy-wave'
};

// Base illustration — square-cropped, transparent background, used for every
// state unless an override is configured.
const BASE_IMAGE = '/buddy/buddy-square-512.webp';

// Per-state expression overrides. Each maps a state to its own illustrated
// expression (generated from the same character prompt for consistency). Add a
// buddy-<state>.webp to public/buddy/ and add a line here to enable more.
const STATE_IMAGES = {
  happy: '/buddy/buddy-happy.webp',
  celebrate: '/buddy/buddy-celebrate.webp',
  thinking: '/buddy/buddy-thinking.webp',
  sad: '/buddy/buddy-sad.webp',
  waving: '/buddy/buddy-waving.webp',
};

/* ----------------------------- SVG fallback ----------------------------- */
/* Kept as a graceful degradation if the image asset fails to load.          */

function getEyeType(state) {
  if (state === 'sad') return 'sad';
  if (state === 'thinking') return 'think';
  if (state === 'happy' || state === 'celebrate') return 'happy';
  if (state === 'encourage') return 'wide';
  return 'normal';
}

function renderEyes(eyeType) {
  if (eyeType === 'happy') {
    return (
      <>
        <path d="M34 44 Q42 38 50 44" stroke="#2F2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M62 44 Q70 38 78 44" stroke="#2F2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    );
  }
  if (eyeType === 'sad') {
    return (
      <>
        <circle cx="42" cy="46" r="5" fill="#2F2F2F" />
        <circle cx="70" cy="46" r="5" fill="#2F2F2F" />
        <path d="M34 42 Q42 38 50 42" stroke="#2F2F2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M62 42 Q70 38 78 42" stroke="#2F2F2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>
    );
  }
  if (eyeType === 'think') {
    return (
      <>
        <circle cx="42" cy="44" r="5" fill="#2F2F2F" />
        <circle cx="70" cy="44" r="5" fill="#2F2F2F" />
        <circle cx="74" cy="40" r="2" fill="#2F2F2F" />
      </>
    );
  }
  if (eyeType === 'wide') {
    return (
      <>
        <circle cx="42" cy="44" r="6" fill="#2F2F2F" />
        <circle cx="70" cy="44" r="6" fill="#2F2F2F" />
        <circle cx="44" cy="42" r="2" fill="#FFFFFF" />
        <circle cx="72" cy="42" r="2" fill="#FFFFFF" />
      </>
    );
  }
  return (
    <>
      <circle cx="42" cy="44" r="5" fill="#2F2F2F" />
      <circle cx="70" cy="44" r="5" fill="#2F2F2F" />
      <circle cx="44" cy="42" r="1.8" fill="#FFFFFF" />
      <circle cx="72" cy="42" r="1.8" fill="#FFFFFF" />
    </>
  );
}

function renderMouth(state) {
  if (state === 'happy' || state === 'celebrate' || state === 'waving') {
    return <path d="M48 58 Q56 66 64 58" stroke="#2F2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />;
  }
  if (state === 'sad') {
    return <path d="M48 64 Q56 58 64 64" stroke="#2F2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />;
  }
  if (state === 'thinking') {
    return <ellipse cx="56" cy="60" rx="3" ry="2" fill="#2F2F2F" />;
  }
  return <path d="M52 60 Q56 63 60 60" stroke="#2F2F2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
}

function renderAccessories(state) {
  if (state === 'listening') {
    return (
      <g>
        <rect x="26" y="28" width="8" height="16" rx="3" fill="#4F8EF7" opacity="0.9" />
        <rect x="78" y="28" width="8" height="16" rx="3" fill="#4F8EF7" opacity="0.9" />
        <path d="M34 34 Q24 34 24 44" stroke="#4F8EF7" strokeWidth="2" fill="none" />
        <path d="M78 34 Q88 34 88 44" stroke="#4F8EF7" strokeWidth="2" fill="none" />
      </g>
    );
  }
  if (state === 'reading') {
    return (
      <g>
        <circle cx="38" cy="40" r="7" fill="#FFFFFF" opacity="0.8" />
        <circle cx="74" cy="40" r="7" fill="#FFFFFF" opacity="0.8" />
        <rect x="34" y="38" width="8" height="2" fill="#2F2F2F" />
        <rect x="70" y="38" width="8" height="2" fill="#2F2F2F" />
      </g>
    );
  }
  return null;
}

function BuddySvg({ state, size }) {
  const eyeType = getEyeType(state);
  return (
    <svg viewBox="0 0 112 112" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" className="buddy-svg">
      <path d="M24 28 L18 12 L38 22 Z" fill="#3E2723" />
      <path d="M88 28 L94 12 L74 22 Z" fill="#3E2723" />
      <ellipse cx="56" cy="52" rx="42" ry="38" fill="#D7A46F" />
      <path d="M30 28 Q56 18 82 28 Q88 52 82 72 Q56 66 30 72 Q24 52 30 28 Z" fill="#5D4037" opacity="0.85" />
      <ellipse cx="56" cy="62" rx="22" ry="16" fill="#EED0AA" />
      <ellipse cx="56" cy="54" rx="7" ry="5" fill="#2F2F2F" />
      {renderEyes(eyeType)}
      {renderMouth(state)}
      {state === 'celebrate' && <path d="M54 62 Q56 72 58 62" fill="#E85D3F" />}
      <path d="M22 26 Q18 8 34 18" fill="#D7A46F" stroke="#5D4037" strokeWidth="2" />
      <path d="M90 26 Q94 8 78 18" fill="#D7A46F" stroke="#5D4037" strokeWidth="2" />
      {(state === 'loading' || state === 'waving') && (
        <>
          <ellipse cx="34" cy="92" rx="8" ry="6" fill="#D7A46F" />
          <ellipse cx="78" cy="92" rx="8" ry="6" fill="#D7A46F" />
        </>
      )}
      {renderAccessories(state)}
      <path d="M40 82 L56 96 L72 82 L56 88 Z" fill="#E85D3F" />
      <circle cx="56" cy="88" r="5" fill="#FFFFFF" />
      <text x="56" y="90.5" textAnchor="middle" fontSize="5" fontWeight="700" fill="#E85D3F" fontFamily="Poppins, sans-serif">DB</text>
    </svg>
  );
}

/* ------------------------------- Component ------------------------------- */

const BuddyAvatar = memo(function BuddyAvatar({
  state = 'idle',
  size = 96,
  className = '',
  ariaLabel,
  reducedMotion
}) {
  if (!BUDDY_STATES.includes(state)) state = 'idle';

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  const animationClass = (reducedMotion ?? prefersReducedMotion) ? '' : stateAnimations[state];

  // Degrade gracefully: per-state image → base image → SVG.
  const intendedSrc = STATE_IMAGES[state] || BASE_IMAGE;
  const [src, setSrc] = useState(intendedSrc);
  const [useSvg, setUseSvg] = useState(false);

  useEffect(() => {
    setSrc(STATE_IMAGES[state] || BASE_IMAGE);
    setUseSvg(false);
  }, [state]);

  function handleError() {
    if (src !== BASE_IMAGE) setSrc(BASE_IMAGE);      // state image missing → base
    else setUseSvg(true);                             // base missing → SVG fallback
  }

  return (
    <div
      className={`buddy-anim inline-flex items-end justify-center ${animationClass} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel || `Buddy the German Shepherd puppy, ${state}`}
    >
      {useSvg ? (
        <BuddySvg state={state} size={size} />
      ) : (
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          loading="eager"
          decoding="async"
          draggable="false"
          onError={handleError}
          className="select-none pointer-events-none"
          style={{ width: size, height: size, objectFit: 'contain' }}
        />
      )}
    </div>
  );
});

export default BuddyAvatar;
