# DeutschBuddy — Complete Project Documentation (info.md)

A line-by-line, function-by-function description of the entire DeutschBuddy codebase. Everything here was read directly from the source at `/home/shahbaz/german-learning` and is current as of **HEAD commit `53ce364` (Aug 6, 2026) plus the uncommitted working tree sitting on top of it** — i.e. the 5-bug polish session, the free-practice mode, the ad (AdMob/AdSense) layer, and the referral program are all reflected here even though they are not yet committed. Line counts are current (`wc -l` on the working tree).

> **Note on documentation drift:** `README.md` and `PROJECT_DOCUMENTATION.md` are stale in places (e.g. README lists `src/data/a1Data.js`, `contexts/AuthContext.jsx` structure, and components like `WeeklyModule.jsx`/`RightPanel.jsx` that have since been rewritten). **Trust the code, and trust this document.** Where a doc and the code disagree, this document reflects the actual source.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Developer Commands & Environment](#3-developer-commands--environment)
4. [Project Structure (complete file tree)](#4-project-structure)
5. [Runtime Entry & Bootstrap](#5-runtime-entry--bootstrap)
6. [Routing & The Auth/Onboarding Layer](#6-routing--the-authonboarding-layer)
7. [The Dashboard Architecture (core)](#7-the-dashboard-architecture-core)
8. [Curriculum Data Model](#8-curriculum-data-model)
9. [Progress Engine (useProgress)](#9-progress-engine)
10. [Spaced Repetition System](#10-spaced-repetition-system)
11. [Text-to-Speech (TTS) Pipeline](#11-text-to-speech-tts-pipeline)
12. [Games (SpeedBlitz / GenderDungeon / PictureMatch)](#12-games)
13. [The Buddy Mascot System](#13-the-buddy-mascot-system)
14. [Community Forum](#14-community-forum)
15. [Supabase Database Schema](#15-supabase-database-schema)
16. [Component Reference (file by file)](#16-component-reference)
17. [Page Reference (file by file)](#17-page-reference)
18. [Utility Reference (file by file)](#18-utility-reference)
19. [Design System (index.css)](#19-design-system)
20. [PWA / Service Worker / Update Flow](#20-pwa--service-worker--update-flow)
21. [Deployment (Vercel, Capacitor/Android)](#21-deployment)
22. [Testing](#22-testing)
23. [localStorage Key Inventory](#23-localstorage-key-inventory)
24. [Known Quirks, Bugs & Data Anomalies](#24-known-quirks--bugs--data-anomalies)
25. [Ads & Monetization](#25-ads--monetization)
26. [Referral Program](#26-referral-program)

---

## 1. Project Overview

**DeutschBuddy** is a gamified, progressive web app (PWA) for learning German at CEFR levels **A1** and **A2**. It is a single-page React application with a custom internal "view" system (not route-based) behind a small auth layer, backed by Supabase (auth + Postgres) and a Vercel serverless function for Edge-TTS pronunciation. It is also packaged for Android via Capacitor.

**Product pillars:**
- **Structured curriculum** — three curriculum tracks: A1 "spoon-fed" (10 modules / 20 days — module 1 is a 7-day "life-first" week), A1 Fast Track (6 weeks), A2 (8 weeks × 7 days).
- **14 task types** — grammar, vocabulary, quiz, listening, flashcards, matching, fillblank, scramble, speaking, writing, review, roleplay, fun, quickwin — all rendered through one dispatcher (`TaskRenderer`).
- **Gamification** — XP, daily streaks, 15 achievement badges, weekly XP buckets, per-day unlock rules, confetti celebrations.
- **Free practice mode** — an 8-task shuffled queue drawn from unlocked weeks, played inside the LessonPlayer without touching the curriculum (no week unlocks, no celebration).
- **Mini-games** — Speed Blitz (translation arcade), Gender Dungeon (der/die/das), Picture Match (emoji memory) — each with local leaderboards and XP rewards.
- **Spaced repetition** — a SM-2-style flashcard deck (`db_srs_cards`) fed by every vocabulary item in the active curriculum.
- **Revise loop** — scored tasks answered imperfectly are tracked and surfaced for retry until mastered (every task type now completes with a score payload, so the whole curriculum feeds it).
- **Buddy mascot** — an animated German Shepherd that reacts to learner actions, with a 6-step first-run tutorial and a "coachmark" spotlight hint.
- **Community** — a Q&A forum (posts, comments, upvotes) with optimistic UI and an offline sample-post fallback.
- **TTS everywhere** — Edge TTS (`de-DE-KatjaNeural`) with a Web Speech API fallback and per-button slow-playback toggle.
- **Analytics** — a lightweight event layer (console + optional gtag hook) now wired through the app: session start, lesson start/complete, per-answer correct/incorrect, games played, achievement unlocks, streak milestones, onboarding/signup completion, referrals.
- **Ads (opt-in)** — an abstraction over AdMob (Android) and AdSense (web): banner on the dashboard home, interstitial at natural session boundaries. Completely no-op when unconfigured.
- **Referral program** — shareable `?ref=CODE` invite links; referring a friend who joins earns 25 XP + the "Community Builder" badge per referral, uncapped.

**Scale of the codebase:** ~100 source files, ~15,100 lines of JS/JSX/SQL (excluding tests, node_modules, dist, android). Curriculum data alone accounts for ~3,300 lines.

---

## 2. Tech Stack & Dependencies

From `package.json` (all pins shown; note Vite 8, React 19, Tailwind 4 — very recent majors):

| Dependency | Version | Purpose |
|---|---|---|
| `react` / `react-dom` | ^19.2.6 | UI framework (StrictMode enabled) |
| `react-router-dom` | ^7.17.0 | Only auth/onboarding routes |
| `framer-motion` | ^12.42.2 | Lesson/tutorial/modal animations |
| `@supabase/supabase-js` | ^2.108.2 | Auth, PostgREST data, GoTrue |
| `edge-tts-universal` | ^1.4.0 | Edge TTS synthesis (server-side) |
| `@capacitor/core`, `@capacitor/android`, `@capacitor/cli` | ^7.6.6 | Android shell + back-button events |
| `@capacitor-community/admob` | ^7.2.0 | AdMob SDK for Capacitor/Android builds (dynamically imported, so web builds never load it) |
| `vite` | ^8.0.12 | Build tool + dev server (also hosts the TTS endpoint via middleware) |
| `@vitejs/plugin-react` | ^6.0.1 | JSX/React transform |
| `@tailwindcss/vite` | ^4.3.1 | Tailwind CSS 4 (CSS-first config — **no `tailwind.config` file**) |
| `tailwindcss` | ^4.3.1 | Utility CSS |
| `vitest` / `jsdom` | ^4.1.9 / ^29.1.1 | Unit + integration tests |
| `@testing-library/react` / `@testing-library/jest-dom` | ^16 / ^6 | DOM test utilities |
| `eslint` + plugins (react-hooks, react-refresh) | ^10.3.0 | Flat-config linting |
| `rollup-plugin-visualizer` | ^6.0.11 | Bundle report (`ANALYZE=true npm run build`) |
| `sharp` | ^0.35.1 | Mascot image processing script |

**Language:** plain JavaScript/JSX — **no TypeScript anywhere** (the `@types/react` dev deps exist but no `.ts` files). ESM (`"type": "module"`). npm only (no yarn/pnpm).

**Notable:** `lucide-react`/`react-icons` listed in the README are **not** in package.json — all icons are hand-rolled inline SVGs in `src/components/Icons.jsx`.

---

## 3. Developer Commands & Environment

```bash
npm install            # install deps
npm run dev            # Vite dev server (also serves /api/tts itself — no separate server)
npm run build          # production build → dist/
npm run preview        # serve the built dist/
npm run lint           # eslint . (flat config, eslint.config.js)
npm test               # vitest run (jsdom)
npm run test:watch     # vitest watch mode
ANALYZE=true npm run build   # additionally writes dist/stats.json (bundle report)
npx vitest run src/utils/topicTitle.test.js   # run a single test file
node scripts/process-buddy.mjs                # regenerate Buddy mascot images
npx cap sync          # sync web build into android/ (after npm run build)
```

**Environment variables** (`.env` / `.env.example`):

```env
VITE_SUPABASE_URL=            # Supabase project URL (auth will silently no-op if missing)
VITE_SUPABASE_ANON_KEY=       # anon/public key
VITE_TTS_API_URL=             # OPTIONAL: absolute TTS endpoint (needed for Capacitor builds)

# OPTIONAL: ads. Leave unset to run completely ad-free — src/services/ads.js no-ops.
VITE_ADS_ENABLED=true                 # master switch (defaults to true when unset!)
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXX    # web PWA banner (AdSense)
VITE_ADMOB_ANDROID_APP_ID=ca-app-pub-XXXX~YYYY   # Capacitor/Android
VITE_ADMOB_BANNER_ID=ca-app-pub-XXXX/YYYY
VITE_ADMOB_INTERSTITIAL_ID=ca-app-pub-XXXX/YYYY
VITE_ADMOB_REWARDED_ID=ca-app-pub-XXXX/YYYY
```

If `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` are missing, `src/lib/supabase.js` creates a client with placeholder values and logs a console warning — **auth silently doesn't work**, the app itself still runs (localStorage-only mode).

**Recommended verification order after changes:** `npm run lint && npm test`.

---

## 4. Project Structure

```
german-learning/
├── AGENTS.md                        # Agent instructions (verified accurate)
├── README.md                        # Marketing README — partially stale
├── PROJECT_DOCUMENTATION.md         # Long-form session-history doc — stale in places
├── ux_refactor_instruction.txt      # "Warm Editorial Luxury" design-system spec
├── info.md                          # THIS document
├── package.json / package-lock.json
├── eslint.config.js                 # Flat config (see §3/§16 notes)
├── vite.config.js                   # React+Tailwind plugins, TTS dev middleware, manualChunks, ANALYZE
├── vitest.config.js                 # jsdom + setup file + CSS
├── vercel.json                      # SPA rewrites; /api/* → serverless
├── capacitor.config.json            # webDir: dist, appId com.deutschbuddy.app
├── index.html                       # App shell, fonts, CSP, splash screen
├── Buddy.png                        # Source image for the mascot pipeline
├── .env / .env.example
├── .gitignore
├── api/
│   └── tts.js                       # Vercel serverless Edge-TTS endpoint (49 lines)
├── scripts/
│   └── process-buddy.mjs            # sharp pipeline → public/buddy/*.webp
├── supabase/
│   ├── schema.sql                   # Full schema: 7 tables, 22 RLS policies, 3 triggers
│   ├── fix-rls.sql                  # Idempotent policy repair script (email REVOKE now fixed)
│   ├── community-schema.sql         # Standalone community tables (authenticated-only)
│   └── referral-schema.sql          # Referral tables + security-definer functions (146 lines)
├── public/
│   ├── sw.js                        # Service worker (CACHE_VERSION 'deutschbuddy-v9')
│   ├── manifest.json                # PWA manifest
│   ├── buddy-icon-192.png / buddy-icon-512.png
│   ├── icons.svg / favicon.svg
│   ├── buddy/                       # Mascot webp variants (generated)
│   │   ├── buddy-square-512.webp, buddy-happy.webp, buddy-celebrate.webp,
│   │   ├── buddy-thinking.webp, buddy-sad.webp, buddy-waving.webp
│   │   └── raw/                     # gitignored source images for regeneration
├── android/                         # Capacitor Android project (gradle, app/…)
└── src/
    ├── main.jsx                     # Entry: StrictMode → ErrorBoundary → BrowserRouter → Theme → App
    ├── App.jsx                      # Route table (auth pages only)
    ├── index.css                    # Tailwind 4 @theme + design system (715 lines)
    ├── config.js                    # Ads config: ADS_ENABLED, ADMOB ids, ADSENSE_CLIENT_ID, cooldown
    ├── assets/                      # hero.png, react.svg, vite.svg (mostly unused legacy)
    ├── components/                  # 60+ components (see §16)
    │   ├── buddy/                   # BuddyAvatar, BuddySpeechBubble, BuddyEmptyState, buddyPhrases
    │   ├── lesson/                  # LessonPlayer (full-screen session player)
    │   ├── DashboardShell.jsx       # The app shell after login (438 lines)
    │   ├── BannerAd.jsx             # Banner ad slot (dashboard home only)
    │   ├── MainContent.jsx          # Internal view dispatcher
    │   ├── TaskRenderer.jsx         # Task-type dispatcher (14 types)
    │   └── ... (see §16)
    ├── contexts/
    │   ├── AuthContext.jsx          # Supabase auth provider
    │   ├── DashboardContext.jsx     # All in-app navigation + overlay + practice state (506 lines)
    │   └── ThemeContext.jsx         # dark/light theme (db_theme)
    ├── hooks/
    │   ├── useProgress.js           # Progress state engine + badge/streak logic (392 lines)
    │   ├── useSpacedRepetition.js   # SM-2 deck state
    │   └── useSpeech.js             # TTS playback hook (Edge TTS → Web Speech fallback)
    ├── lib/
    │   └── supabase.js              # Single supabase client (placeholder-safe)
    ├── pages/
    │   ├── LoginPage.jsx / SignupPage.jsx / ForgotPasswordPage.jsx / ResetPasswordPage.jsx
    │   ├── OnboardingPage.jsx       # 6-step pre-signup flow (444 lines)
    │   ├── HomePage.jsx             # Dashboard home (greeting, stats, ContinueCard, revise, banner)
    │   └── JourneyPage.jsx          # Location-themed journey map
    ├── services/
    │   ├── ads.js                   # AdMob/AdSense abstraction (no-op when unconfigured)
    │   └── referralService.js       # applyPendingReferral — idempotent referral sync
    ├── data/
    │   ├── a1SpoonfedModules.js     # A1: 10 modules / 20 days / 112 tasks
    │   ├── a1FastTrackData.js       # A1 FT: 6 weeks / 24 days / 62 tasks
    │   ├── a2Data.js                # A2: 8 weeks / 56 days / 349 tasks
    │   ├── genderWords.js           # 217 words (76 der / 70 die / 71 das)
    │   ├── pictureWords.js          # 205 emoji words (a1/a2)
    │   └── speedBlitzWords.js       # 298 words (149 per level)
    ├── test/
    │   └── setup.js                 # localStorage mock + act() warning suppression
    └── utils/
        ├── referral.js              # Referral code helpers + localStorage stash
        ├── topicTitle.js            # "German — English" title splitting
        ├── progress.js              # Legacy progress helpers (unused by main flow)
        ├── date.js                  # Local-timezone calendar date helpers
        ├── srs.js                   # SM-2 scheduling math
        ├── vocabExtractor.js        # Curriculum → flashcard items
        ├── badges.js                # Badge catalog + category mapping
        ├── edgeSpeech.js            # Edge TTS client + language detection
        ├── speech.js                # Legacy imperative TTS wrapper
        └── analytics.js             # Event tracking (console + gtag hooks) — fully wired
```

---

## 5. Runtime Entry & Bootstrap

### `src/main.jsx`

```jsx
window.addEventListener('unhandledrejection', ...)
```
- Catches **dynamic-import failures** (`Failed to fetch dynamically imported module`) and reloads the page **once per session** (guarded by `sessionStorage.db_chunk_reload_attempted`) to recover from stale deployed chunks. If a reload was already attempted, the rejection is left alone (prevents infinite reload loops when a deployed chunk is genuinely broken).

**Service worker registration** — only when `navigator.serviceWorker` exists **and** the protocol is `https:` (so `localhost` HTTP dev and Android `http` builds skip registration):
```js
window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))
```
Note the comment: cache versioning in `sw.js` handles updates; the app deliberately does **not** aggressively unregister/reload.

**Render tree:**
```
createRoot(#root) →
  <StrictMode>
    <ErrorBoundary>            // class boundary — branded fallback UI
      <BrowserRouter>
        <ThemeProvider>        // data-theme attr on <html>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
```

### `src/index.html` (shell)

- Fonts: **Inter** (400–700) + **Poppins** (500–800) via Google Fonts with dns-prefetch/preconnect/preload + async `media="print" onload` trick + `<noscript>` fallback.
- **CSP meta:** `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co; img-src 'self' data: blob:; media-src 'self' blob:; frame-src 'none'`.
  ⚠️ The CSP does **not** whitelist AdSense hosts (`pagead2.googlesyndication.com` / `*.doubleclick.net`) — see §24; the web banner silently won't render until the CSP is updated.
- Icons: `buddy-icon-192.png` (favicon + apple-touch-icon), manifest link.
- **Inline splash screen** (`#app-splash`): cream `#FFF9F2` background, a 48px spinner with `border-top-color: #C8442A` (brand accent) and the "DeutschBuddy" label — replaced when React mounts into `#root`.

---

## 6. Routing & The Auth/Onboarding Layer

### `src/App.jsx`

The **entire router** (7 routes):

| Route | Component | Notes |
|---|---|---|
| `/` | `LandingRoute` | If `user` → Dashboard, else redirect `/onboarding` **preserving `location.search`** so `?ref=` invite links survive the redirect (§26) |
| `/onboarding` | `OnboardingPage` (lazy) | Pre-signup 6-step flow + `?ref=` stash |
| `/login` | `LoginPage` (lazy) | Applies stashed referral on first sign-in |
| `/signup` | `SignupPage` (lazy) | Applies stashed referral immediately when a session is returned |
| `/forgot-password` | `ForgotPasswordPage` (lazy) | |
| `/reset-password` | `ResetPasswordPage` (lazy) | |
| `/dashboard` | `<ProtectedRoute><DashboardProvider><DashboardShell /></DashboardProvider></ProtectedRoute>` | The whole app; `?mode=practice` deep-links into free practice (§7.2) |
| `*` | `<Navigate to="/dashboard" replace />` | Catch-all |

**Everything after login is NOT routed.** Lessons, tasks, progress views, badges, community, resources, profile, settings, games, review, free practice — all are internal *views* switched by state in `DashboardContext`/`DashboardShell`. Adding a new screen means adding a new view id, not a new route.

### `src/contexts/AuthContext.jsx` — auth provider

**Exports:** `AuthProvider`, `useAuth()` (throws if used outside provider).

State: `user`, `profile`, `loading`. Refs: `mountedRef` (unmount guard), `profileFetchedRef` (cache flag), `userIdRef`.

Functions (all `useCallback` with empty deps so the context value stays referentially stable — this is explicitly commented as protecting memoized consumers like `Navbar` from re-rendering):

- `getCachedUser()` — reads `localStorage['supabase.auth.token']` synchronously so the first render already knows the user (avoids a flash of logged-out UI).
- `fetchProfile(userId, forceRefresh=false)` — selects `id, full_name, avatar_url, selected_pacing, notification_preferences, created_at, updated_at` from `profiles` by id (the referral columns are **not** selected here — they're read via the `get_my_referral_info` RPC instead, §15.4); skips if already fetched for the same user (unless forced); `PGRST116` (no row) → `profile = null`.
- `refreshProfile()` — force-fetches the profile for the current user.
- `signUp(email, password, fullName)` → `supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })`.
- `signIn(email, password)` → `signInWithPassword` (the return value is now surfaced to callers — LoginPage uses `data.user.id` for the referral sync).
- `signOut()` — resets profile fetch flags.
- `resetPassword(email)` → `resetPasswordForEmail` with `redirectTo: ${origin}/reset-password`.
- `updatePassword(newPassword)` → `updateUser({ password })`.

**Session lifecycle** (`useEffect` once):
1. `supabase.auth.getSession()` → sets user + fetches profile.
2. `supabase.auth.onAuthStateChange(...)` → on sign-in fetches profile (resetting the cache flag if the user id changed); on sign-out clears user/profile/loading.
3. Cleanup: unsubscribe + `mountedRef.current = false`.

### `src/contexts/ThemeContext.jsx`

- `theme` state initialized from `localStorage['db_theme']` (default `'dark'`).
- `useEffect([theme])` — sets `document.documentElement.setAttribute('data-theme', theme)` and persists.
- `toggleTheme()` — flips dark/light.
- Exposes `{ theme, toggleTheme, isDark, isLight }`.

### Auth pages (see §17 for details)

`LoginPage`, `SignupPage`, `ForgotPasswordPage`, `ResetPasswordPage` all follow the same pattern: client-side validation → auth-context call → redirect to `/dashboard` (or `/login` when email confirmation is enabled and no session is returned), and all redirect away if already signed in. `LoginPage` and `SignupPage` additionally participate in the referral flow (§26).

### `src/components/ProtectedRoute.jsx`

- `isOnboarded()` — `localStorage['db_onboarded'] === 'true'` (**fail-open** on storage errors).
- While auth `loading` → branded full-screen loading.
- `!user` → `<Navigate to="/login" replace />`.
- Not onboarded → `<Navigate to="/onboarding" replace />`.
- Else renders children.

---

## 7. The Dashboard Architecture (core)

The four files that wire the entire app together: `DashboardShell.jsx`, `DashboardContext.jsx`, `MainContent.jsx`, and `TaskRenderer.jsx`.

### 7.1 `DashboardContext.jsx` (506 lines) — the state hub

**State (27 items):**
`activeLevel` (from `localStorage['db_selected_level']`, default `'A1'`), `selectedDay` (`{ weekId, day }`), `selectedTask`, `activeView` (default `'dashboard'`), `practiceMode`, `practiceQueue`, `practiceIndex`, `showCelebration`, `todayXP`, `xpToast`, `showQuickTool`, `showSidebarVerbLookup`, `showSpeedBlitz`, `showGenderDungeon`, `showPictureMatch`, `showStreakGuardian`, `showNotifications`, `showSidebar`, `showProfileMenu`, `notifVersion`, `historyStack`, `trackMode` (`localStorage['db_selected_track']` or `profile.selected_pacing`, default `'standard'`), `levelData`, `dataLoading`, `loadError`, `retryKey`, `hasUnreadNotifications`.

**Ref mirroring:** every piece of state that's read in event handlers (`activeView`, `selectedTask`, `selectedDay`, the four modal booleans, `historyStack`) has a `*Ref` twin kept in sync with `useEffect`, so back-navigation handlers always read fresh values without stale closures. `prevTaskRef` additionally tracks the previously-active task to drive one-shot lesson-start analytics.

**Analytics effects:**
- **Lesson start** — an effect on `[selectedTask, activeLevel]` fires `trackLessonStarted(selectedTask.id, activeLevel)` whenever a task *becomes* the active lesson (day view click, revise retry, week jump, practice advance) — not on re-renders of the same task (guarded by `prevTaskRef`).
- **Session start** — a `sessionStartedRef`-guarded effect fires `trackSessionStart({userId, level})` once per provider mount.

**Curriculum loading** (`useEffect [activeLevel, trackMode, retryKey]`):
```js
if (activeLevel === 'A1' && trackMode === 'fast') → import('../data/a1FastTrackData.js')
else if (activeLevel === 'A1')                   → import('../data/a1SpoonfedModules.js')
else                                             → import('../data/a2Data.js')   // A2: standard only
```
Dynamic imports are code-split per curriculum (see `vite.config.js` manualChunks). Failure → `loadError=true` (renders the retry screen in `DashboardShell`); `retryKey` increments to retry.

**Derived:** `visibleWeeks` (= `levelData.weeks`), `unlockedWeeks` (from `progress.unlockedWeeks`, fallback `[1]`), `currentWeek` (the week object of `selectedDay.weekId`).

**Free practice** (`startPractice` / `exitPractice`):
- `startPractice()` — builds a pool of every task in the **unlocked weeks** (`{ weekId, day, task, weekTitle }`), Fisher–Yates shuffles it, takes the first **8**, sets `practiceMode=true`, and starts the first queue item via `selectedDay`/`selectedTask`. No-op if already practicing or no pool.
- `exitPractice()` — resets `practiceMode`/`practiceQueue`/`practiceIndex` and clears day/task, then fires `showInterstitial()` (natural session boundary, §25).

**Navigation handlers (all `useCallback`):**

- `handleSelectDay(weekId, day)` — pushes `{ view:'dashboard', day:null, task:null }` onto `historyStack`, sets `selectedDay`, clears task, view stays `dashboard`.
- `handleSelectTask(task)` — pushes current context onto the stack, sets `selectedTask`.
- `handleStartLesson(weekId, day, task)` — used by the Journey page; pushes stack, sets day + task together.
- `handleCompleteTask(result)` — **the task-completion pipeline**:
  1. Computes **earned XP**: if `result.score` is a number and `maxScore > 0` → `max(1, round(task.xp * score/maxScore))` (proportional XP); else full `task.xp`.
  2. Calls `completeTask(selectedTask.id, earnedXP, selectedDay.weekId, selectedDay.day, result)` (see §9) and `trackLessonCompleted(id, level, score, maxScore, earnedXP)`.
  3. `setTodayXP(+earnedXP)`, `setXpToast(earnedXP)` (triggers `XpToast`).
  4. **Week-completion detection** uses a *projected* completed-set (`[...progress.completedTasks, selectedTask.id]`) to be robust against batched state updates; if the whole week is done → `setShowCelebration(true)` (confetti), `unlockWeek(weekId+1)` if not already unlocked, and `showInterstitial()`. **In practice mode this branch is skipped entirely** (`currentWeekData = practiceMode ? null : …`) — no week unlock / celebration.
  5. **Practice advance:** if `practiceMode`, advances `practiceIndex` to the next queue item (or `exitPractice()` after the last) and returns — no `setSelectedTask(null)`.
  6. Otherwise clears `selectedTask`.
- `handleBackToWeek()` — clears day + task.
- `handleGameScore(game, score)` — converts game score → XP: `min(max(floor(score/2), 0), 50)`; fires `trackGamePlayed(game, score)`; if > 0, completes a synthetic task id `game-${game}-${today}` (week 1 day 1) so games earn XP + count toward daily stats without touching curriculum.
- `handleViewChange(view)` — pushes current context onto the stack, **exits practice mode if active**, sets view, clears day/task, closes notifications.
- `handleLevelChange(level)` — persists `db_selected_level`, resets day/task, view → `dashboard`.
- `handleBackNavigation()` — **exits practice mode first**; else pops `historyStack` (restores view/day/task/level); falls back to clearing task (with an interstitial — leaving a lesson is a session boundary), then day.
- `handleSignOutFromApp()` — `signOut()` + `navigate('/login')`.

**Browser back / Android back (two effects):**

- `popstate` handler with a 300ms `isProcessingBack` re-entrancy guard; precedence order: close modal overlays (returning to the sidebar for games) → restore `event.state.activeView` → if not on dashboard, go to dashboard → else pop the internal history. The `historyStack` is pushed to real browser history via `window.history.pushState({activeView, selectedDay, selectedTask, activeLevel}, '', pathname)` whenever the view state changes — **skipped entirely in practice mode** (the queue advances via state, not history) and on the plain dashboard root / while processing a back.
- **Capacitor `App.addListener('backButton')`** — dynamically imported `@capacitor/core` (guarded so browser builds don't break); mirrors the same modal-closing precedence, then the internal history stack (practice exit included).

**Notifications unread:** reads `db_notif_read`, checks known static notification ids `[1,2,5]`, sets `hasUnreadNotifications` (recomputed when `notifVersion` bumps after the panel closes).

**Profile menu:** outside-`mousedown` close via `profileMenuRef`.

The context value is one big `useMemo` exposing everything above (state, setters wrapped in the handlers, `progress/loading/completeTask/unlockWeek/recoverStreak` from `useProgress`, `visibleWeeks/unlockedWeeks/currentWeek`, and `practiceMode/practiceQueue/practiceIndex/startPractice/exitPractice`).

### 7.2 `DashboardShell.jsx` (438 lines) — the layout shell

Consumes `useDashboard()` and composes everything. Key behaviors:

- **Practice deep-link** — `useSearchParams`; if the URL has `?mode=practice` and data is loaded, it immediately calls `startPractice()` and strips the param (`setSearchParams({}, {replace: true})`) so it can't re-trigger on re-renders.
- **Onboarding handoff** — after onboarding writes `db_pending_lesson` (`{weekId, day, taskId}`), this shell deep-links into that first lesson on first dashboard mount, then removes the key.
- **First-run tutorial** — if `localStorage['db_tutorial_seen_v1'] !== '1'` and data is loaded and no task is deep-linked → `showTutorial` (WelcomeTutorial). On close, if `db_coachmark_seen_v1` unset and no tasks completed → shows the **Coachmark** spotlight on `[data-coachmark='start-lesson']` (which is now anchored to the **ContinueCard's** primary button on HomePage). Entering any lesson dismisses both overlays and marks both flags seen.
- **Modal/overlay wiring** — renders conditionally (each lazy-loaded, most with `Suspense fallback={null}`):
  - `XpToast` when `xpToast` set.
  - `QuickGermanTool` (navbar button or sidebar), `MobileSidebar` (mobile drawer), `GamePanel` wrappers for the three games (with `onScore` handlers mapping to `handleGameScore('speedblitz'|'genderdungeon'|'picturematch', score)`), `NotificationPanel` (close bumps `notifVersion`), `DayCompleteCelebration` (confetti, `xpEarned={todayXP}`), `StreakGuardian` (success → `recoverStreak()`).
  - Notification actions (`handleNotificationNavigate`): string → view change; `{type:'view'}` → view; `{type:'day'}` → select day; `{type:'task'}` → select day then resolve the task from `levelData` and `setSelectedTask` on next tick; `{type:'guardian'}` → open StreakGuardian.
- **Stabilized handlers** — every `onX` prop given to memoized children is a `useCallback` over stable setters so Navbar/BottomNav/MobileSidebar/GamePanel/NotificationPanel don't re-render when the shell re-renders (explicitly commented).
- **`bottomNavBadges`** — `{ dashboard: reviseCount }` only when `reviseTasks.length > 0`; empty case uses a module-level `EMPTY_BADGES = {}` constant so identity is stable.
- **Error/loading gates:** `loadError` → branded "Oops, something went wrong" card with Try Again (`setLoadError(false); setRetryKey(k+1)`) and Reload. `loading || dataLoading || !levelData` → `LoadingScreen`.
- **Layout:**
  - Desktop (`hidden lg:block`): `Navbar`.
  - Mobile header (`lg:hidden`, sticky, blurred): hamburger (opens sidebar), serif "Deutsch**Buddy**" logo (`<Link to="/">` resets view state), streak pill (`IconFire` + count, `animate-streak-blaze` when ≥ 3, dimmed at 0), notification bell (red dot + `animate-bell-ring` when unread), avatar button with inline profile dropdown (Profile / Settings / Sign Out).
  - `<main id="main-content">` — dispatch order:
    1. `selectedTask` → `<LessonPlayer>` (in practice mode the `tasks`/`currentIndex`/`topicTitle` come from the practice queue and `practice` is passed through; otherwise the day's tasks with `topicTitle` = week title; `onExit` is `exitPractice` in practice mode, else clears task+day **after `showInterstitial()`**).
    2. `activeView === 'journey'` → `JourneyPage`.
    3. `activeView === 'review'` → `ReviewDeck`.
    4. `activeView === 'dashboard' && !selectedDay` → `HomePage`.
    5. else → two-column desktop grid: `MainContent` (2 cols) + `RightPanel` (1 col); single column mobile.
  - `BottomNav` (mobile) + `Footer` (desktop).

### 7.3 `MainContent.jsx` — the view dispatcher

Pure presentational; receives everything as props from the shell. Dispatch order (highest priority first):

1. `community` → `<CommunitySection user={user} />`
2. `profile` → `<ProfilePage activeLevel />`
3. `settings` → `<SettingsPage profile user onSignOut />`
4. `progress` / `progress-statistics` / `progress-skills` / `progress-calendar` → `<ProgressDashboard mode=…>`
5. `badges` → `<BadgeGallery badges={progress.badges} />`
6. `resources` → deduped resources from all weeks (by name) → `<ResourceLibrary />`
7. `selectedTask` → task detail page (error UI if malformed) with `<TaskRenderer task onComplete={onCompleteTask} />` — lazy-loaded.
8. `selectedDay && currentWeek` → `<DailyTasks …>`
9. default → dashboard: `visibleWeeks.map(→ <WeeklyModule>)` with `isUnlocked={unlockedWeeks.includes(week.id)}`.

Heavy views (`TaskRenderer`, `ProgressDashboard`, `BadgeGallery`, `CommunitySection`, `ResourceLibrary`, `ProfilePage`, `SettingsPage`) are `lazy()`-imported inside `<Suspense fallback={<ViewLoader />}>`. Every branch is wrapped in `div.view-enter` (entrance animation). **Note:** `ContinueCard` no longer lives here — it moved to `HomePage` (the default-dashboard branch is just the week modules now).

### 7.4 `TaskRenderer.jsx` — task-type dispatcher

- Guards: non-object task, missing `type`, missing `content` → "This task is unavailable." + Continue button.
- Wraps every task in `<TaskErrorBoundary onSkip={onComplete} key={task.id}>` — the key remounts the boundary per task so a prior crash doesn't persist.
- `renderTaskContent(task, onComplete)` — `switch (task.type)` → the component. All 14 types + a default "Content coming soon!" + Mark Complete.

**The task component contract** — every task component receives `{ content, onComplete }`:
- **Graded tasks** call `onComplete({ score, maxScore })`: `Quiz`, `FillBlank`, `ListeningTask`, `Scramble`, `Matching` (now scored: `{score: matched, maxScore: pairs}`).
- **Pass-through tasks** call `onComplete({ score: 1, maxScore: 1 })`: `Flashcards`, `Grammar`, `Vocabulary`, `Speaking`, `Writing`, `Review`, `Roleplay`, `Fun`, `QuickWin` (all now send full credit so the revise router treats them as mastered — see §9).
- The score payload drives proportional XP (see 7.1) and the **Revise list** (see §9).

### 7.5 `LessonPlayer.jsx` — the full-screen session player

- Props: `task`, `tasks`, `currentIndex`, `topicTitle`, `onComplete`, `onExit`, `practice = false`.
- `fixed inset-0 z-50` overlay: exit button (aria-label "Exit lesson"), animated progress bar (`motion.div` width → `(currentIndex+1)/total * 100`, 0.4s easeOut), italic gold German topic (`germanTopicTitle`), **Buddy corner** (absolute top-right, size 64) with speech bubbles.
- In practice mode a gold **"Free Practice · n / total"** label replaces the plain `n / total` index text.
- `triggerBuddy(state, phraseCategory, tone, duration=2000)` — sets Buddy state/phrase/bubble; auto-hides after duration.
- `handleTaskResult(result)` — success = `result.score/result.maxScore >= 0.5` (numeric) else assumed success; on success → `triggerBuddy('happy','correct','success',1800)`; on fail → `triggerBuddy('encourage','incorrect','encourage',2200)`; **then delays `onComplete(result)` by 600ms** so the animation is visible.
- Task content slides via `AnimatePresence mode="wait"` keyed by `task.id || currentIndex`.
- On mount, focuses the container (`tabIndex={-1}`) for keyboard users.

---

## 8. Curriculum Data Model

### 8.1 The universal shapes

```
Level data module (default export):
{
  level: 'A1' | 'A2',
  title, subtitle, description, color,
  weeks: [ Week, ... ]
}

Week:   { id, title: 'German — English', icon?, theme, unlocked?, resources?: [{name, url, description}], days: [Day] }
Day:    { day: N, title, tasks: [Task] }
Task:   { id: 'a1m1d1t1' | 'a2w1d1t1' | 'ftw1d1t1', type, title, description, xp, content }
```

The **task id is the progress key** — it encodes level/module|week/day/task and must be globally unique and stable across all three data files (they are: `a1m*`, `a2w*`, `ftw*` never collide).

### 8.2 Content shapes per task type (complete enumeration)

| type | content shape | who uses it |
|---|---|---|
| `grammar` | `{ rule, steps?: string[], examples: [{german, english}], note? }` | A1 spoonfed has `steps`; A2 + FastTrack do not |
| `vocabulary` | `{ items: [{german, english, pronunciation?, gender?}], note? }` | `gender` appears only in FastTrack; pronunciation always present in spoonfed, often absent in A2 JSON-style |
| `quiz` | `{ questions: [{question, options[], correct, metadata?}] }` | `correct` is a 0-based option index |
| `review` | same as quiz (higher XP: 25–30) | weekly reviews + mock exams |
| `listening` | `{ clip: {title, source, text}, questions: [{question, options[], correct}] }` | `source` is a free-text label ("Nicos Weg", "TTS dialogue", …) |
| `flashcards` | `{ cards: [{front, back, example?}] }` | |
| `matching` | `{ pairs: [{german, english}] }` | |
| `fillblank` | `{ sentences: [{text, answer, hint?}] }` | gap marker is `___` |
| `scramble` | `{ words: [{scrambled, answer, hint}] }` | now in A1 spoonfed (module 1) + A2 week 4 |
| `speaking` | `{ prompt, tips: string[] }` (also `steps` in some) | |
| `writing` | `{ prompt, example?, tips: string[] }` | |
| `roleplay` | `{ scenario, steps: string[] }` | |
| `fun` | `{ facts: string[] }` | |
| `quickwin` | `{}` (always empty) | |

### 8.3 `a1SpoonfedModules.js` — A1 standard (1,555 lines)

- **10 modules / 20 days / 112 tasks, 11 task types** (verified by importing the module):
  `grammar` 19, `quiz` 19, `quickwin` 20, `vocabulary` 18, `listening` 13, `speaking` 6, `matching` 6, `fillblank` 6, `flashcards` 3, `scramble` 1, `roleplay` 1.
- Module list: **1 "Deine Erste Woche — Your First Week: Meeting People" (7 days!)** — a "life-first" usable-conversation arc (introduce yourself → where you're from → family → objects → actions → age → Week One Review); then Alphabet (1d), Zahlen 0–12 (1d), Zahlen 13–19 (1d), Zahlen 20–100 (1d), Meine Familie (1d), Farben (2d), Tage & Monate (2d), Hobbys & Berufe (2d), Aussprache (2d).
- Every day ends with a `quickwin` (xp 5); every module's first task is a `grammar` (xp 15). Standard XP: grammar/vocab 15, everything else 10.
- `unlocked: true` only on module 1 (runtime unlocks drive the rest). Module 9 vocab flagged `[GENERATED]` in comments.
- Example task (grammar, verbatim shape):
  ```js
  { id: 'a1m1d1t1', type: 'grammar', title: 'Your First German Sentences', xp: 15,
    content: { rule: '…', steps: […], examples: [{german, english}], note: '…' } }
  ```

### 8.4 `a1FastTrackData.js` — A1 fast track (810 lines)

- **6 weeks** (Greetings & Basics; Family & Colors; Food & Daily Life; Hobbies & Getting Around; Grammar Intensive; A1 Mock Exam), **24 days** (4 per week: 3 lesson days + 1 "Week N Review"), **62 tasks**, 11 types: `vocabulary` 14, `quiz` 14, `grammar` 7, `review` 6, `fillblank` 6, `speaking` 4, `writing` 3, `roleplay` 3, `matching` 2, `fun` 2, `flashcards` 1.
- **No `listening`, no `quickwin`, no `scramble`.** Week 6 is a skill-structured mock exam: Day 1 Lesen (quiz), Day 2 Hören, Day 3 Schreiben, Day 4 Sprechen & Final Review.
- Higher XP curve (grammar 20, writing 20–25, review 25–30, speaking 15–20).
- Task ids use the `ftw` prefix (`ftw1d1t1`).

### 8.5 `a2Data.js` — A2 (1,130 lines)

- **8 modules** (Past Tenses; Präteritum & Weekend Talk; Family & Social Life; Food & Dining; Work & Professions; Transportation & Travel; Weather, Nature & Health; A2 Mock Exam), **56 days** (7 per module; day 7 is always "Mini Challenge: Week N Review" with a `review` xp-25 + `fun` xp-5), **349 tasks**, all 14 types: `quickwin` 48, `vocabulary` 47, `flashcards` 47, `grammar` 46, `listening` 34, `speaking` 24, `writing` 23, `fillblank` 20, `quiz` 19, `roleplay` 16, `review` 8, `fun` 8, `matching` 7, `scramble` 2 (verified by import).
- Every lesson day: 7 tasks — flashcards warm-up (5) → grammar (15) → vocabulary (15) → practice (10) → listening (10) → speaking/writing/roleplay (10) → quickwin (5).
- **Authoring inconsistency (still present):** weeks 1–2 use local factory helpers `makeDay(day, title, tasks)` / `makeTask(id, type, title, description, xp, content)`; weeks 3–8 are handwritten JSON literals with double-quoted keys.
- **Umlauts:** the working tree restored proper umlauts in weeks 3–8 (`München`, `Frühstück`, `Ärztin`, …) — the old "umlaut-free transliteration" anomaly is gone from the data.

### 8.6 Word lists

| File | Exports | Count | Shape |
|---|---|---|---|
| `genderWords.js` | `derWords`, `dieWords`, `dasWords` | 217 (76/70/71) | `{ de, en }` |
| `pictureWords.js` | `a1Pictures`, `a2Pictures` | 205 (107/98) | `{ emoji, de, en }` |
| `speedBlitzWords.js` | `a1Words`, `a2Words` | 298 (149/149) | `{ de, en }` |

---

## 9. Progress Engine

### `src/hooks/useProgress.js` (392 lines)

The single source of truth for learner progress. Per **user × level** it maintains:
`{ xp, streak, lastStudyDate, completedTasks: [], reviseTasks: [], badges: [], unlockedWeeks: [1], weeklyXP: {} }`

**Storage hierarchy:**
1. React state (via `useRef` mirror `progressRef` to avoid stale closures in async handlers).
2. `localStorage['db_progress_${userId}_${level}']` — always written synchronously on every change (guest mode uses `db_progress_${level}`).
3. Supabase `progress` table — upserted on `user_id,level` conflict.

**Key module-level functions:**
- `calculateStreakDelta(lastStudyDate)` — `1` if never studied; `0` if studied today; `1` if yesterday; `-1` if gap ≥ 2 days.
- `BADGE_DEFINITIONS` — 15 badge rules `{ id, name, icon, condition(progressLike) }`: task-count badges (first-task, ten/fifty/hundred-tasks), streak badges (3/7/30/5/14), XP badges (100/500/1000/2500). `checkBadges(progressLike)` appends newly-earned badges with `earnedAt` ISO timestamp (never duplicates).
- `getDefaultProgress()`, `getLocalKey()`, `loadLocalProgress()` (with full type-coercion normalization + error swallowing), `saveLocalProgress()` (errors ignored), `normalizeProgressRow(data)` (snake_case → camelCase DB row).

**Hook behavior:**
- State initialized from localStorage (or defaults). `useEffect [user, level]` resets state synchronously to avoid stale progress across switches.
- `fetchProgress()` — reads the DB row (`.single()`); `PGRST116` ignored; on success sets state + writes localStorage; on any failure falls back to localStorage. Called on `[user, level]` change.
- **`completeTask(taskId, xpAmount, weekId, dayNumber=0, result=null)`** — the heart of the engine:
  1. **Idempotency:** if the task id is already in `completedTasks`, **no double XP** (only re-logging happens).
  2. Streak: if `lastStudyDate === today` keep; else `max(prev.streak + delta, 0)` (gap ≥ 2 resets to 0). **Milestone analytics:** crossing **up** to a streak in `STREAK_MILESTONES` (`[3, 5, 7, 14, 30]`) fires `trackStreakMilestone`.
  3. XP/weeklyXP: add `xpAmount` to `xp` and `weeklyXP['W${weekId}']` (only once).
  4. **Revise routing:** if `result.maxScore > 0` and `score < maxScore` → add task to `reviseTasks`; if `score === maxScore` → remove from `reviseTasks` (mastered). Unscored/no-payload completions are now effectively impossible — every task component sends `{score, maxScore}` (§7.4), so a task is either revised (imperfect score) or mastered (full score). The code comment notes this explicitly.
  5. Badges recomputed from the projected state; **newly-earned badge ids fire `trackAchievementUnlocked(badge.id)`** (diffed against the previous badge set before the atomic update).
  6. `setProgress` + `saveLocalProgress`, then **parallel** Supabase writes: `progress` upsert (onConflict `user_id,level`) and, only if not already completed, an `exercise_results` insert. Any error → `fetchProgress()` to re-sync. (The parallelization is explicitly commented: "halve the latency the user feels on completion".)
- **`unlockWeek(weekId)`** — no-op if already unlocked; appends to `unlockedWeeks`, persists + upserts only the `unlocked_weeks` column.
- **`setTrackMode(mode)`** — upserts `profiles.selected_pacing` (onConflict `id`).
- **`recoverStreak()`** — sets `lastStudyDate = today`; streak becomes `1` if it was broken, else unchanged; badges recomputed (with the same new-badge analytics diff); minimal upsert of only `last_study_date`, `streak`, `badges` (explicitly commented to avoid clobbering concurrent fields).
- Returns `{ progress, loading, completeTask, unlockWeek, setTrackMode, recoverStreak, refetch }`.

**Who consumes it:** `DashboardContext` (completion pipeline), `ReviseCard` (reviseTasks), `BottomNav` badge count, `StreakGuardian` (recoverStreak on success), `NotificationPanel`, `ProgressDashboard`, `ProfilePage` (read-only copy), `HomePage`.

---

## 10. Spaced Repetition System

### `src/utils/vocabExtractor.js`
`extractVocabulary(levelData)` — walks weeks→days→tasks, collects every `content.items[]` entry with both `german` and `english`, emitting `{ id: 'vocab-${index}', german, english, pronunciation, example, weekId, day, taskId }`. This is what feeds the SRS deck, so **vocabulary tasks are the only SRS source**.

### `src/utils/srs.js` — SM-2 scheduling
- `createCard(item)` → `{ id, german, english, pronunciation, example, interval: 0, repetitions: 0, easeFactor: 2.5, dueDate: now, lastReviewed: null, status: 'new' }`.
- `reviewCard(card, quality)` — quality 0–5 (0 wrong, 3 hard, 4 good, 5 easy):
  - `< 3` → reset repetitions, interval 1, status `'learning'`.
  - `≥ 3` → repetitions+1; interval = 1 (rep 1) → 6 (rep 2) → `round(interval * easeFactor)`; status `'review'`.
  - Ease factor clamp `[1.3, 3.5]` with the classic SM-2 adjustment formula `EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))`.
  - `dueDate = today + interval days`.
- `isDue(card)` / `getDueCards(cards)` (sorted by dueDate) / `getStats(cards)` → `{ due, new, learning, mature (review + repetitions ≥ 3), total }`.

### `src/hooks/useSpacedRepetition.js`
- Deck stored in `localStorage['db_srs_cards']` (JSON array).
- On `[levelData]` change: extracts vocab, **merges** — existing cards keep their SRS state but refresh german/english/pronunciation/example; new items become `createCard`.
- Exposes `{ cards, dueCards, stats, rateCard(cardId, quality), resetDeck }`.

### `src/components/ReviewDeck.jsx` (the UI)
- Due-card queue with 3D flip card (framer-motion `AnimatePresence` rotateY), `SpeakerButton` on front and back (bottom-right, stopPropagation), pronunciation line, example.
- **Rating buttons** appear only when flipped: Again(0, red) / Hard(3, gold) / Good(4, green) / Easy(5, primary) — see `RATING_LABELS`.
- Buddy reacts per rating (≥4 happy "Easy! Super!", 3 encourage, else "Nicht schlimm, review soon!").
- Empty state → `BuddyEmptyState` ("All caught up!", "Reset Deck" → `resetDeck`); session complete → celebrate screen with Review Again / Reset Deck.

---

## 11. Text-to-Speech (TTS) Pipeline

### `src/utils/edgeSpeech.js`
- `EDGE_VOICES` — `german: 'de-DE-KatjaNeural'`, `germanMale: 'de-DE-ConradNeural'`, `english: 'en-US-AriaNeural'`, `englishMale: 'en-US-GuyNeural'`, `britishEnglish: 'en-GB-SoniaNeural'`.
- `detectLanguage(text)` — marker-word scoring (German marker set + English marker set, umlaut/ß short-circuit); **favors German** unless English is clearly dominant (`englishScore > germanScore && englishScore >= 2`); empty → `'de-DE'`.
- `toEdgeRate(rate)` — maps numeric playback rates (1.0, 0.75, etc.) to Edge prosody strings (`-50%`…`+50%`).
- `speakWithEdgeTTS(text, voice, rate, pitch, volume)` — `POST ${VITE_TTS_API_URL || '/api/tts'}` with JSON body; throws on non-OK; returns the audio Blob.
- `speakWithWebSpeech(text, language, rate, onEnd, onError)` / `stopWebSpeech()` — browser SpeechSynthesis fallback (cancels prior utterances, picks a voice matching the language prefix).

### `src/hooks/useSpeech.js`
`useSpeech(language='auto', onAudioEnd, onAudioError)`:
- `speak(text, rate)` — stops current audio; detects language; Edge TTS first (Blob → object URL → `new Audio`); **playbackRate forced to 1.0** because Edge renders prosody at the requested rate ("avoid double-slowing/double-speeding"); falls back to Web Speech on any failure (with `console.warn`).
- `stop()`, `toggleRate()` (flips 1.0 ↔ 0.75 and restarts in-flight audio), `playbackRate`, `isSpeaking`, `error`; cleanup on unmount.
- Also exports `useWordSync(text, isSpeaking)` — splits text into words and highlights one per ~2000ms/totalWords interval (a simple fake word-tracking for reading UI).

### `src/components/SpeakerButton.jsx`
The universal pronunciation button: `{ text, language='auto', onAudioEnd, onAudioError, size='sm|md|lg', showRateToggle }`. Speaking state → gold bg + pulse + glow; disabled when `!text`; titles reflect state ("Listen"/"Stop speaking"/"Speech unavailable"). With `showRateToggle` (used in listening/lesson contexts) a small corner badge toggles slow (¾, blue) vs normal (1) — stopPropagation so the card doesn't flip.

### The two endpoints
- **Dev:** `vite.config.js` `ttsApiPlugin()` — Vite middleware at `POST /api/tts` using `UniversalEdgeTTS(text, voice, {rate, pitch, volume})` → `audio/mpeg` with `Cache-Control: public, max-age=3600`; 400 for missing/long (>5000 chars) text; 405 non-POST; OPTIONS preflight `*`.
- **Prod:** `api/tts.js` — Vercel Node serverless function, same contract + same CORS headers, `req.body` already parsed by Vercel.

---

## 12. Games

The three games share an identical architecture: `idle → playing → finished` state machine, `scoreRef` + `scoreReportedRef` for one-shot `onScore` reporting, a top-10 leaderboard in localStorage, a `compact` prop for sidebar embedding, medal-emoji feedback, and "New Personal Best!" detection (`score === bestScore && score > 0`).

### `SpeedBlitz.jsx` ("Wortblitz") — translation arcade
- Word bank per level (`a1Words`/`a2Words`); **5 mistakes** ends the game.
- Per-word timer: `getWordTime(score) = max(1.5, 5 - floor(score/5) * 0.3)` seconds; a 50ms `setInterval` decrements by 0.05; timeout → mistake. Score also feeds a streak counter (🔥 shown at ≥2).
- `nextQuestion()` — pool refill (< 4 left), correct word + 3 distinct distractors, shuffle 4 options.
- Timer bar color shifts gold → gold-light → error as time runs out.
- Leaderboard: `speedblitz_lb_${level}`, top 10, `{score, date}`.

### `GenderDungeon.jsx` ("Der Die Das Dungeon") — article game
- All 217 gender words; pick der/die/das **before the fill bar runs out**; **3 lives** (hearts); fill time shrinks with score: `max(1.2, 5 - floor(score/5)*0.25)`.
- Word shown without its article (`de.replace(/^(der|die|das) /,'')`) + English gloss; three gradient article buttons (blue/red/green); correct-answer highlight on feedback.
- rAF-based progress fill; `loseLife()` re-picks after 400ms; game over at 0 lives.
- Leaderboard: `gender_dungeon_lb` (not per-level).

### `PictureMatch.jsx` ("Bild Memory") — emoji picture game
- `a1Pictures`/`a2Pictures` per level; see emoji → pick the German word among 4; **5 mistakes** ends the game; progress `{pictures.length - poolRemaining}/{pictures.length}`.
- Leaderboard: `picture_match_lb_${level}`.

### `GamePanel.jsx`
Shared full-screen modal shell: `z-[60]`, blurred dark backdrop (click closes), `max-w-2xl max-h-[90vh]` panel, serif title, scrollable children.

### XP reward
`handleGameScore` in DashboardContext: `xp = min(max(floor(score/2), 0), 50)` → completes synthetic task `game-${game}-${today}` (week 1, day 1) so the XP shows in the daily stats and toasts as `+XP`. Every game completion also fires `trackGamePlayed(game, score)`.

### `StreakGuardian.jsx` — streak rescue modal
When the streak is at risk (≥3 day gap, per NotificationPanel), the learner gets 3 multiple-choice vocab questions **generated from their own completed tasks' `content.items`** (`collectItems` → `pickQuestions`: unique German words, 3 distinct English distractors, 4 shuffled options). All 3 correct → `onSuccess` → `recoverStreak()`; otherwise streak is lost. Requires ≥ 4 available items ("Not enough vocabulary yet" otherwise).

---

## 13. The Buddy Mascot System

### `src/components/buddy/BuddyAvatar.jsx`
- Renders the German Shepherd from `public/buddy/buddy-square-512.webp` for all states, with **CSS-keyframe emotion animations** per state (`stateAnimations`: idle→`buddy-breathe`, happy→`buddy-hop`, celebrate→`buddy-spin`, encourage→`buddy-tilt`, thinking→`buddy-think`, listening→`buddy-bob`, reading→`buddy-breathe`, sad→`buddy-sigh`, loading→`buddy-run`, waving→`buddy-wave`).
- `STATE_IMAGES` overrides for `happy/celebrate/thinking/sad/waving` → `public/buddy/buddy-<state>.webp`.
- Graceful degradation: image error → fall back to base image → fall back to an **inline SVG Buddy** (`BuddySvg`, 112×112 viewBox, per-state eyes/mouth via `getEyeType`/`renderEyes`/`renderMouth`, headphones for `listening`, glasses for `reading`, red "DB" collar tag, paws for loading/waving).
- Props: `state` (invalid → 'idle'), `size` (default 96), `className`, `ariaLabel`, `reducedMotion` (auto-reads `prefers-reduced-motion` via matchMedia).

### `src/components/buddy/BuddySpeechBubble.jsx`
`{ children, position: top|bottom|left|right, tone: neutral|success|encourage|error, className }` — absolute bubble + rotated-square arrow, `role="status" aria-live="polite"`, tone-colored backgrounds from `--db-*` tokens, forced dark text `#2F2F2F`.

### `src/components/buddy/BuddyEmptyState.jsx`
`{ title, message, actionLabel, onAction, buddyState }` — avatar (120) + bubble + optional CTA; used by ReviewDeck and other empty screens.

### `src/components/buddy/buddyPhrases.js`
`BUDDY_PHRASES` — 14 phrase categories (welcome, time-based greetings, lessonStart, correct, incorrect, streakActive/Risk, goalHit, encouragement, loading, empty, error) of German+English phrases; `pickPhrase(category)` (random, with fallback); `getGreetingByTime()` (morning <12 / afternoon <18 / evening).

### Image pipeline — `scripts/process-buddy.mjs`
- Input: `Buddy.png` (root) + optional `Buddy-<state>.*` files in `public/buddy/` or `raw/`.
- `removeBackground()` — chroma-keys the cream background `[253,252,250]` with tolerance 30 and a 16px feather band; if a user-provided `buddy-transparent.webp` with real alpha exists it is used as-is.
- Output: `public/buddy/buddy-square-512.webp` (512×512 cover, WebP q92) + one `buddy-<state>.webp` per emotion; source files renamed into `public/buddy/raw/` (gitignored).
- ⚠️ Header comment mentions `buddy-full.webp` and `buddy-circle-{512,192}.png` as outputs — **the code no longer produces those**; only square-512 + emotion variants.

### `WelcomeTutorial.jsx`
6-step overlay (Buddy states: waving/happy/idle/encourage/happy/celebrate) with keyboard nav (Esc/←/→), clickable progress dots, `db_tutorial_seen_v1` gate, "Replay tutorial" in Settings clears the flag.

### `Coachmark.jsx`
Spotlight hint: measures `targetSelector`'s rect (re-measures at 220ms and on resize/scroll), draws `box-shadow: 0 0 0 9999px rgba(15,20,32,0.55)` ring + gold pulsing ring, tooltip below or above with clamped positioning; dismiss via "Got it", Esc, or 14s auto-timeout; `createPortal` to `document.body`.

---

## 14. Community Forum

`src/components/CommunitySection.jsx` — full Q&A feature backed by `community_posts`, `community_comments`, `community_upvotes` (see §15.3).

- **Fallback mode:** if the DB is empty or any query errors, it renders 4 hard-coded `samplePosts` and disables all write interactions (`usingFallback`).
- `fetchPosts()` — parallel fetch of posts (joined `profiles:user_id(id, full_name, avatar_url)`, order created_at desc, limit 50) and the current user's upvoted post ids.
- `mapPost(row)` — snake_case → UI shape with `user` = profile full_name or "Anonymous", avatar = first letter.
- `handleUpvote(postId)` — **optimistic toggle** with rollback on error (delete or insert into `community_upvotes`; the upvote *count* itself is maintained by DB triggers).
- `handleCreatePost` / `handleCreateComment` — inserts with `.select('*, profiles:user_id(...)')`; on failure `alert()`s that the community schema must be set up in Supabase.
- `formatTime(dateStr)` — "Just now"/"Xm ago"/"Xh ago"/"Xd ago"/localized date.
- Categories: `All | Grammar | Vocabulary | Pronunciation | Culture | General` (horizontal filter chips). Create-post modal with title/content/category; post-detail modal with comments (skeletons while loading), reply form (or "Sign in to leave a comment."), solved pill.
- **CommunitySchema note:** new posts hard-code `level: 'All'`.

---

## 15. Supabase Database Schema

### 15.1 `supabase/schema.sql` — canonical schema

**Extension:** `uuid-ossp`.

**`public.profiles`** — `id uuid PK REFERENCES auth.users ON DELETE CASCADE`, `full_name text`, `email text`, `avatar_url text`, `selected_pacing text DEFAULT 'standard' CHECK IN ('standard','fast')`, `notification_preferences jsonb NOT NULL DEFAULT` (6 booleans: email_notifications, push_notifications, study_reminders, achievement_alerts, tips_and_facts, community_updates), `created_at`/`updated_at timestamptz NOT NULL DEFAULT now()`.
(Plus, after applying `referral-schema.sql`: `referral_code text`, `referred_by uuid REFERENCES profiles`, `referral_count int DEFAULT 0` — see §15.4.)

**`public.progress`** — `id uuid PK DEFAULT uuid_generate_v4()`, `user_id uuid NOT NULL REFERENCES profiles ON DELETE CASCADE`, `level text NOT NULL CHECK IN ('A1','A2')`, `xp int NOT NULL DEFAULT 0`, `streak int NOT NULL DEFAULT 0`, `last_study_date date`, `completed_tasks text[] NOT NULL DEFAULT '{}'`, `revise_tasks text[] NOT NULL DEFAULT '{}'`, `badges jsonb NOT NULL DEFAULT '[]'`, `unlocked_weeks int[] NOT NULL DEFAULT '{1}'`, `weekly_xp jsonb NOT NULL DEFAULT '{}'`, timestamps, **UNIQUE(user_id, level)**.

**`public.exercise_results`** — `id uuid PK`, `user_id FK`, `level CHECK ('A1','A2')`, `week_id int NOT NULL`, `day_number int NOT NULL`, `task_id text NOT NULL`, `task_type text NOT NULL`, `score int`, `max_score int`, `completed bool DEFAULT false`, `time_spent_seconds int DEFAULT 0`, `created_at`.

**`public.exam_scores`** — `id uuid PK`, `user_id FK`, `level CHECK`, `exam_type CHECK IN ('mock','final')`, nullable `lesen_score/hoeren_score/schreiben_score/sprechen_score/total_score int`, `taken_at`.

**`public.community_posts`** — `id`, `user_id FK`, `title`/`content text NOT NULL`, `category text NOT NULL DEFAULT 'General'` (no CHECK here — see community-schema.sql), `level text DEFAULT 'All' CHECK IN ('All','A1','A2')`, `solved bool DEFAULT false`, `upvotes int DEFAULT 0`, `comment_count int DEFAULT 0`, timestamps.

**`public.community_upvotes`** — `id`, `user_id FK`, `post_id FK`, `created_at`, **UNIQUE(user_id, post_id)**.

**`public.community_comments`** — `id`, `user_id FK`, `post_id FK`, `content text NOT NULL`, timestamps.

**Indexes (7):** progress(user_id,level); exercise_results(user_id,level); exam_scores(user_id,level); community_posts(created_at desc); community_posts(category); community_upvotes(post_id); community_comments(post_id).

**RLS: enabled on all 7 tables.** 22 policies:
- profiles: 5 (view own, **view community profiles `using (true)`** — with a `comment on policy` explaining id/full_name/avatar_url are public and email is protected by column revoke, insert own, update own, delete own).
- progress / exercise_results / exam_scores: 4 each (select/insert/update/delete where `auth.uid() = user_id`).
- community_posts: 4 (anyone can view, create own, update own, delete own).
- community_upvotes: 2 (anyone can view, "for all" manage own).
- community_comments: 4 (anyone view, create, update own, delete own).

**Email protection:** `revoke select on public.profiles from anon, authenticated;` + `grant select (id, full_name, avatar_url, selected_pacing, notification_preferences, created_at, updated_at)` — **email is hidden from clients** (clients use the auth session for their own email).

**Functions/triggers (3):**
- `update_post_upvote_count()` — security-definer trigger fn; INSERT +1 / DELETE −1 on `community_posts.upvotes`; trigger `on_community_upvote_change` AFTER INSERT OR DELETE ON community_upvotes.
- `update_post_comment_count()` — same for `comment_count`; trigger `on_community_comment_change`.
- `handle_new_user()` — security-definer trigger fn on signup: inserts `profiles (id, full_name, email)` from `raw_user_meta_data->>'full_name'` (`ON CONFLICT (id) DO NOTHING`), then creates default `progress` rows for **both A1 and A2** (`ON CONFLICT (user_id, level) DO NOTHING`); trigger `on_auth_user_created` AFTER INSERT ON auth.users.
  ⚠️ `referral-schema.sql` **recreates this function** with the referral-code minting added — run it last (see §15.4).

### 15.2 `supabase/fix-rls.sql` — repair script
Idempotent: adds `notification_preferences` if missing, drops all 22 policies (plus legacy snake_case policy names), recreates them, adds table-wide grants (`grant select` + `grant insert, update, delete to authenticated`), re-enables RLS, recreates `handle_new_user` + trigger.
**Email protection now fixed:** the working tree added the column-level `revoke select on public.profiles from anon, authenticated;` + `grant select (id, full_name, avatar_url, selected_pacing, notification_preferences, created_at, updated_at)` **after** the table-wide grant (with a comment that ordering matters — the table-wide grant would otherwise silently restore full-table SELECT). The old "re-run re-exposes email" tension is resolved.

### 15.3 `supabase/community-schema.sql` — standalone community schema
Overlapping community tables with **stricter CHECKs** (`category IN ('Grammar','Vocabulary','Pronunciation','Culture','General')`; `level IN ('A1','A2','All')`), **authenticated-only policies** (vs `using (true)` in schema.sql), and its own trigger functions named `update_comment_count()` / `update_upvotes_count()` — different names from schema.sql's, so **both pairs of functions would exist if both scripts ran**. Comments table has no `updated_at` here.

### 15.4 `supabase/referral-schema.sql` — referral tables + functions (see also §26)
Run **after** `schema.sql` (it depends on `profiles`/`progress` and **recreates `handle_new_user`**):
- **New `profiles` columns:** `referral_code text` (unique via partial index `idx_profiles_referral_code` on `referral_code where referral_code is not null`), `referred_by uuid REFERENCES profiles(id)`, `referral_count int NOT NULL DEFAULT 0`.
- **New table `public.referrals`** — `id uuid PK`, `referrer_id uuid NOT NULL REFERENCES profiles`, `referred_user_id uuid NOT NULL REFERENCES profiles` with **UNIQUE(referred_user_id)** (one referral record per new user), `created_at timestamptz DEFAULT now()`. RLS **enabled with no policies** — all access is via the security-definer functions below.
- **`handle_new_user()` (recreated)** — mints every new profile a code: `'DB-' || upper(substr(md5(random()::text), 1, 8))`.
- **`record_referral(p_ref_code text, p_new_user_id uuid) RETURNS uuid`** — security definer, `set search_path = public`:
  1. Looks up the referrer by `referral_code`; raises if missing, if `p_new_user_id` is the referrer themselves, or if the code is empty.
  2. **Idempotency:** returns null (no reward) if a `referrals` row already exists for `p_new_user_id`.
  3. Inserts the `referrals` row, increments `referrer.referral_count`.
  4. **Reward:** for **both** the referrer's A1 and A2 `progress` rows — `xp + 25` and the badge `{"id":"referral-builder","name":"Community Builder","icon":"🤝","earnedAt":now()}` appended **unless `badges @> '[{"id":"referral-builder"}]'`** (so the badge is granted once per referrer, not per referral; the 25 XP is granted per referral).
  5. Returns the referrer id.
- **`get_my_referral_info() RETURNS jsonb`** — security definer; returns `{referral_code, referral_count, referred_by}` for `auth.uid()` (null-safe).
- `GRANT execute` on both functions **to `authenticated`** only.

### 15.5 `src/lib/supabase.js`
```js
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
                                      import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder')
```
Warns in console when vars are missing. Single shared client.

---

## 16. Component Reference (file by file)

### Shared infra

- **`Icons.jsx`** — the entire icon library: 100+ hand-drawn inline SVG components, each `(props) => si('g', props, […children])`. Builder helpers: `s` (stroke style), `si(type, props, children)` (createElement factory), `p(d)` path, `l(...)` line (also parses a `"x1 y1 x2 y2"` string), `poly(points)` polyline, `c(x,y,r)` circle, `r(x,y,w,h,rx)` rect. Defaults: viewBox 24, `fill="none"`, `stroke="currentColor"`, `strokeWidth 1.5`, round caps/joins, `1em` sizing. Full export list: IconRefresh, IconHome, IconChart, IconTrophy, IconChat, IconBook, IconBookOpen, IconTarget, IconCalendar, IconBell, IconUser, IconWave, IconFire, IconEdit, IconHelpCircle, IconCards, IconLink, IconPencil, IconShuffle, IconMic, IconFeather, IconClipboard, IconTheater, IconSparkles, IconHeadphones, IconBolt, IconLightbulb, IconLock, IconCheck, IconSquare, IconSearch, IconMail, IconCrown, IconDiamond, IconStar, IconMedal, IconMap, IconBird, IconPercent, IconBear, IconTurtle, IconGraduation, IconSpeaker, IconSpeakerMute, IconVideo, IconPodcast, IconNewspaper, IconHash, IconClock, IconAward, IconChevronRight, IconChevronDown, IconChevronUp, IconLeaf, IconTree, IconCertificate, IconArrowLeft, IconArrowUp, IconArrowRight, IconEye, IconEyeOff, IconX, IconMenu, IconPlus, IconThumbsUp, IconMessageCircle, IconImage, IconSettings, IconLogOut, IconFlag, IconHeart, IconZap, IconInfo, IconTrendingUp, IconActivity, IconCheckCircle, IconMoon, IconSun, IconWarning, IconPlay, IconPlayFilled, IconSpeakerX, IconGamepad, **IconUsers, IconCopy** (the last two added for the referral share card). (`IconSpeakerX` ≈ duplicate of `IconSpeakerMute`.)
- **`ErrorBoundary.jsx`** — class boundary; state `{hasError, error, errorInfo}`; branded fallback (dev-only details via `import.meta.env.DEV`); Try Again (clears state) / Reload / Home.
- **`TaskErrorBoundary.jsx`** — per-task boundary; "This task couldn't load, but you can keep going." + Skip & Continue (`onSkip`).
- **`LoadingSpinner.jsx`** — full-viewport spinner + message.
- **`Skeleton.jsx`** — `Skeleton`, `CardSkeleton`, `ListSkeleton({count})` primitives.
- **`SkipLink.jsx`** — a11y skip-to-`#main-content` link (sr-only until focused).
- **`Footer.jsx`** — "Made with ♥ by Shahbaz Ali" + IconHeart, `role="contentinfo"`.
- **`ConfettiEffect.jsx`** — default export **`DayCompleteCelebration`** (name ≠ filename): 80 canvas confetti pieces (gold-heavy palette, 4s rAF animation with rotation/fade, `onComplete` at end) + centered "+{xp} XP" toast text. Full-screen `z-50 pointer-events-none`.
- **`XpToast.jsx`** — transient top-center `+{xp} XP` gold badge; 1.2s visible + 300ms exit, then `onComplete`.
- **`AchievementModal.jsx`** — badge-unlock modal: `CATEGORY_COLORS` (habit/xp gold, grammar green, vocab red, exam blue), 12 confetti dots, Buddy `celebrate`, badge icon in tinted tile, auto-dismiss 3.5s, spring scale-in.
- **`UpdateToast.jsx`** — PWA update prompt; listens for `controllerchange` **only when a controller existed at start** (no prompt on first install); "Reload" → `location.reload()`. Bottom toast `z-[70]`.

### Navigation & shell

- **`Navbar.jsx`** — desktop top nav (`hidden lg:flex`). Props: `activeView, onViewChange, activeLevel, onLevelChange, streak, onQuickTool, onNotifications, hasUnreadNotifications`. Uses `useAuth` (user/profile/signOut). Nav links: Dashboard/Progress/Badges/Community/Resources (gold active pill). A1/A2 segmented toggle (blue `#5C8AC4` vs red `#A8473F`, active underline + glow). Streak pill (IconFire, `animate-streak-blaze` at ≥3). Bell with red dot + `animate-bell-ring`. Verb-lookup search icon. Avatar dropdown (first letter of `profile.full_name || user.email || '?'`): Profile / Settings / Sign Out. Outside-click close via `menuRef`.
- **`BottomNav.jsx`** — mobile 5-tab bar (`lg:hidden`): Learn/Journey/Review/Badges/Profile; active pill; count badges `{review: n}` capped "9+"; special-cases `progress*` views as active for the progress tab (legacy guard).
- **`MobileSidebar.jsx`** — mobile drawer (`lg:hidden`, `w-72`): brand, A1/A2 toggle, Progress sub-nav (Learning Statistics / Skill Breakdown / Activity Calendar), Tools (Verb Lookup), Games 3×3 grid (Wortblitz, Der Die Das Dungeon, Bild Memory). Slide-in animation, backdrop click closes.
- **`RightPanel.jsx`** — desktop right column "Learning Tools": three `GameLauncher` cards + XP/streak stats + milestone rings. `ProgressRing` (SVG donut, gold gradient via `useId` gradient ids), `milestones` = 10/50/100 XP targets with a "Legend" 1000-XP cap; ring selection shows next milestone + following (max 3). Mobile: collapsible toggle.
- **`MainContent.jsx`** — see §7.3.
- **`DashboardShell.jsx`** — see §7.2.
- **`lesson/LessonPlayer.jsx`** — see §7.5. Barrel `lesson/index.js` exports it.

### Dashboard content

- **`HomePage.jsx`** (page, see §17): greeting (Buddy waving + time-based phrase + "Hallo, {firstName}!"), 3 stat cards (streak/XP/badges), Daily Goal progress bar (`db_daily_goal`, default 20, `progress.todayXP`), **`ContinueCard`** (the main CTA, replacing the old inline hero button), `ReviseCard`, Journey preview circles (first 6 weeks, completed/current/locked styling, click → jump straight into the week's next incomplete lesson), and a **`<BannerAd />`** at the bottom of the column. `getNextLesson(levelData, progress)` is still defined here but the Continue card now computes its own resume target.
- **`ContinueCard.jsx`** (149 lines) — hero card computing `resumeTarget` (first incomplete task, triple-nested loop) + SVG circular progress ring (strokeDashoffset, 1.2s transition). Headline states: "Track Complete" (all done), "Daily Target Met!" (≥5 tasks), "Continue Learning". Props now include `onStartPractice`; **Free Practice** calls it (no more dead `/dashboard?mode=practice` navigation — the param is *read* by DashboardShell, §7.2). The primary button carries `data-coachmark="start-lesson"` (the coachmark anchor moved here from HomePage). Footer when complete: "All {totalTasks} tasks completed! Consider visiting the Community…".
- **`WeeklyModule.jsx`** — week card: header (W badge / gold check, English title, theme, `+{weekXP}/{totalWeekXP} XP`, `{completion}%` bar), expandable day-circle stepper. `isDayUnlocked(day)` = all previous days' tasks completed. Day-circle states: completed (check), locked (IconLock), current (gold ring when selected), pending (accent dot when expanded). `getWeekCompletion` from utils. `cardState` complete/active/locked styling; locked cards `pointer-events-none opacity-60`. Toggle expands or jumps to first incomplete day.
- **`DailyTasks.jsx`** — day view: back button, day header (week/day, title, `topicDe`, `{completed}/{total}`, `~{total*5} min`, progress bar, gold "Day Complete! +{sum XP}" banner), task list (`typeIcons` map for 15 types with IconBook fallback; done tasks gold-tinted with check; active dot for pending; `+{xp}` chip).
- **`ReviseCard.jsx`** — surfaces `progress.reviseTasks` via `findTaskById` (skips missing ids); gold left-border card "Revise — {n} item(s) to retry"; row → "Retry →" deep-links into the task.
- **`JourneyMap.jsx`** — (legacy-ish component; the JourneyPage uses its own inline map) vertical timeline: nodes completed (gold + check + glow) / current (white + gold border + pulsing `breath-pulse` ring) / future (dashed, muted); connector segments gold when previous week done; per-week XP; overall progress bar.
- **`Mascot.jsx`** — decorative mood card (random mood on mount, 4 mood pills, non-interactive).
- **`BannerAd.jsx`** (30 lines) — the web/native banner slot (§25). Renders an empty `w-full` container that stays `display:none` until `showBanner(container)` resolves `true`; then gets `minHeight: 50`. On unmount calls `hideBanner()`. `aria-hidden="true"`. Placed only at the bottom of HomePage so an unconfigured ad setup never shifts layout.

### Task components (the 14 types)

All task components now send **score payloads** on completion (see §7.4), and the graded ones emit per-answer analytics:

- **`Grammar.jsx`** — rule box + collapsible examples (each `{german, english}` with SpeakerButton) + note; "I understand this grammar" completes with `{score: 1, maxScore: 1}`. Empty when `!content.rule` (Empty also passes full credit).
- **`Vocabulary.jsx`** — item cards (German + speaker + `[der/die/das]` gender tag with per-gender colors `gc`, English, pronunciation); tap to mark studied; "All studied!" / "Complete (n/m)" buttons; Enter/Space toggle support; completes with full credit.
- **`Quiz.jsx`** — multiple-choice with **German error analysis** (`analyzeGermanError`: `UMLAUT_ERROR` — input matches after umlaut normalization; `CAPITALIZATION_ERROR` — nouns must be capitalized; `CASE_DECLENSION_ERROR` — metadata.category DATIVE/AKKUSATIV/GENITIV suffix shift; `WRONG_VERB_FORM` — metadata.type 'verb' + input in `metadata.forms`; fallback `HARD_WRONG`). Lettered options, reveal styling (green check / red shake / dim), lightbulb error card, auto-advance (correct 2200ms / wrong 5000ms), manual Next cancels the timer, `scoreRef` avoids double-counting the final question. Completes with `{score, maxScore}`; **each answer fires `trackAnswerCorrect('quiz')` / `trackAnswerIncorrect('quiz')`**.
- **`FillBlank.jsx`** — `___` sentence with input; same error analysis (minus WRONG_VERB_FORM, plus `ONE_WORD_OFF`); hint reveals first letter; sentence TTS with blank replaced by `'...'`; Enter submits; auto-advance pattern identical to Quiz; per-answer analytics fired.
- **`Flashcards.jsx`** — 3D flip cards (CSS perspective/rotateY, 500ms), front = German + lg speaker, back = translation + example (each with speaker), progress dots, Prev/Next, click/Enter/Space flips; completes with `{score: cards.length, maxScore: cards.length}`.
- **`Matching.jsx`** — two-column: German column (fixed order) ↔ shuffled English; **proper Fisher–Yates `shuffle()`** (the old biased `sort(() => Math.random() - 0.5)` is gone); **object-identity matching** (`p === pairs[sel]`) to fix duplicate-gloss bugs; wrong pair → `shake` on the English tile + `trackAnswerIncorrect('matching')`, correct → `trackAnswerCorrect('matching')`; all matched → banner + `setTimeout(onComplete({score: next.length, maxScore: pairs.length}), 600)`.
- **`Scramble.jsx`** — scrambled letter tiles + input; `shuffleString` is a Fisher–Yates that **guarantees the result differs** (recurses on identity, returns input unchanged for 1-char/all-same strings); **speaker button only after reveal** (so audio doesn't leak the answer); completes with `{score, maxScore}`.
- **`ListeningTask.jsx`** — clip card (title/source/raw text) + `SpeakerButton size="lg"` on `getListeningText(clip)` (strips curly quotes); questions A/B/C letters; "Check Answers" enabled only when all answered; **"Check Answers" now fires `trackAnswerCorrect/Incorrect('listening')` per question**; reveal styling; "Score: n/m" + Continue with `{score, maxScore}`.
- **`Speaking.jsx`** — prompt + SpeakerButton, step list (selected gold), tips; "I practiced speaking this" checkbox completes (full credit).
- **`Writing.jsx`** — prompt + example + textarea; Submit requires non-empty; disabled after submit; "Gut geschrieben!" banner; full-credit complete.
- **`Roleplay.jsx`** — scenario box + numbered steps (each speakable); "I completed this roleplay" checkbox completes with full credit (unchecking doesn't uncomplete).
- **`Review.jsx`** — thin wrapper: header + `<Quiz>`. (Data shape identical to quiz.)
- **`Fun.jsx`** — random joke/fact/word-meme from `wins`; "Done! Finish Day" completes with full credit. (Same content as QuickWin's; note: `fun` tasks in data use `{facts: []}` — the component ignores facts and uses its own content, a minor mismatch.)
- **`QuickWin.jsx`** — random joke/fact/meme, "Under 3 min" badge, "Done! Finish Day" (full credit; also ignores data content — pure local `wins`).
- **`TaskRenderer.jsx`** — see §7.4.

### Progress & achievements

- **`ProgressDashboard.jsx`** — three modes (`statistics`/`skills`/`calendar`): sub-components `ProgressRing` (SVG donut, gold), `StatCard` (tone map gold/success/info/warning), `computeCalendarDays(lastStudyDate, streak)` (28-day grid via `getLocalDateString`/`addDaysDateString`; active = studied or within streak window), `ActivityCalendar`, `WeeklyBreakdown` (per-week `weeklyXP['W{n}']` bars), `SkillsBreakdown` (counts completed tasks by skill: listening, speaking+roleplay, writing, grammar, vocabulary+flashcards, everything-else=reading), `StatisticsPanel` (total/completed, weeks complete, heuristic `nextLevelXP = max(xp+100, 500)`). "Learning Insights" card at the bottom.
- **`BadgeGallery.jsx`** — "Your Collection" progress card + grid (earned tiles `db-card-hover` + gold check; locked = dashed/grayscale), detail modal (earned date via `badges.find(b => b.id)`), Buddy happy + "{n} earned!" bubble.
- **`Certificate.jsx`** — hard-coded decorative A2 certificate (no data wiring); "Download PDF" = `window.print()`.

### Community, resources, profile, settings

- **`CommunitySection.jsx`** — see §14.
- **`ResourceLibrary.jsx`** — resource grid from week `resources` (deduped by name upstream) with 12-item `FALLBACK_RESOURCES`; category filter chips (`TYPE_ICONS`/`TYPE_COLORS`); external links `target="_blank" rel="noopener noreferrer"`.
- **`ProfilePage.jsx`** (179 lines) — profile view: banner, avatar initial, name/email, "{level} Learner" pill, 3 stat cards; loads from Supabase `progress` (`PGRST116` ignored) with localStorage fallback. **Plus an "Invite friends" card** (§26): loads `get_my_referral_info` via RPC, shows the `DB-XXXXXXXX` code, `handleShare()` → `navigator.share` with `buildReferralLink(code)` falling back to clipboard copy ("Copied!" flash), and shows `referral_count` ("{n} friends joined so far") with the reward copy ("Community Builder badge + 25 XP per friend. No cap.").
- **`SettingsPage.jsx`** (555 lines) — three sub-sections:
  - *Profile Information:* edit `full_name` (`handleSaveProfile` → profiles update + `refreshProfile`, 3s auto-clearing messages), disabled email, member-since, pacing display ("A1 Fast Track"/"Standard Pace").
  - *Notifications:* 6 `Toggle`s (from `notification_preferences`, localStorage `db_notification_preferences` fallback), optimistic per-key save + bulk "Save Preferences".
  - *Privacy & Security:* password-gated (`signInWithPassword` verify → unlock), then email + last sign-in + new-password form (`updateUser({password})`, min 6, match check).
  - Plus: Dark Mode toggle (`useTheme`), `DailyGoalControl` (10/20/30 XP options, `db_daily_goal` default 20), "Replay Tutorial" (removes `db_tutorial_seen_v1` + reload), Sign Out.
- **`QuickGermanTool.jsx`** — verb lookup modal: 15 verbs (`laufen, denken, essen, sprechen, arbeiten, spielen, haben, sein, werden, kommen, gehen, sehen, geben, wissen, machen`), full conjugation table (present/past/future × 6 pronouns) with irregular forms (`läuft`, `ißt`, `war`, `wurde`, `weiß`), fuzzy search (german/english includes), self-contained data.
- **`NotificationPanel.jsx`** — slide-in drawer: 3 static + 7 **dynamic** notifications computed from progress (continue → next task/day; pending count; streak milestone at multiples of 5; reminder when not studied today; streak-at-risk → StreakGuardian; daily tip; daily fact via deterministic day-of-year index). Read-state persisted in `db_notif_read`; detail view for tips/facts; "Mark all as read".
- **`StreakGuardian.jsx`** — see §12.
- **`GenderDungeon.jsx` / `SpeedBlitz.jsx` / `PictureMatch.jsx` / `GamePanel.jsx`** — see §12.

---

## 17. Page Reference (file by file)

- **`OnboardingPage.jsx`** (444 lines) — pre-signup flow, **six steps** (`STEPS = ['intro', 'prior', 'goal', 'time', 'win', 'route']`), deliberately self-report (no placement quiz):
  1. `intro` — Buddy welcome.
  2. `prior` — prior experience → routes: "I'm completely new" / "I know a few phrases" → **A1 standard**; "I've studied before" → **A1 fast**; "I've finished A1" → **A2 standard** (each is a `{level, track}` path).
  3. `goal` — learning goal (`exam / travel / people / fun`).
  4. `time` — daily time budget (5/15/30 min) → writes `db_daily_goal`.
  5. `win` — an instant-win mini **matching game** (`WIN_PAIRS`, German↔English) so the learner experiences success before signup.
  6. `route` — summary ("Day 1: Meeting people" / "Week 1: Alphabet & greetings" / "A1 refresher + Perfekt") → `finish()`.
  `finish()` writes `db_selected_level`, `db_selected_track`, `db_onboarded='true'`, `db_learning_goal`, `db_pending_lesson` (JSON `{weekId, day, taskId}` from `FIRST_TASK[level][track]` — the dashboard deep-links into it, §7.2), fires `trackOnboardingCompleted({level, track, goal})`, and navigates to `/signup`. Also stashes any `?ref=` invite code (§26).
- **`LoginPage.jsx`** (133 lines) — split-screen brand panel (gold-on-dark serif) + form; validation (required, email regex); on success sets `db_onboarded='true'` if a level was previously chosen, **then calls `applyPendingReferral(data.user.id)`** (best-effort; covers the email-confirmation path where the profile was created server-side at signup — §26), and redirects to `/dashboard`.
- **`SignupPage.jsx`** (156 lines) — same split layout; validation incl. password ≥ 6; `signUp(email, password, fullName)`; stashes `?ref=` on direct hits; on a returned session, upserts `selected_pacing` from `db_selected_track` **merged into the referral upsert** (`applyPendingReferral(user.id, {selected_pacing})` — so the track survives the profile sync) and fires `trackSignupCompleted({referralUsed})`; if a session comes back (email confirmation disabled) → `/dashboard`, else → `/login` (referral applied on first login).
- **`ForgotPasswordPage.jsx`** — email form → `resetPassword(email)`; success screen "Check your email".
- **`ResetPasswordPage.jsx`** — new-password form → `updatePassword(password)`; success screen + 2s redirect to `/login`.
- **`HomePage.jsx`** (168 lines) — see §16 (dashboard content): greeting, stats, `ContinueCard` CTA, `ReviseCard`, journey preview, `BannerAd`. Helper `getNextLesson(levelData, progress)` returns first incomplete `{week, day, task, remainingCount}`.
- **`JourneyPage.jsx`** (109 lines) — themed journey: `JOURNEY_LOCATIONS` (Home/Café/Market/Train/Hotel/University/Office/Airport/Celebration emoji nodes cycled by index) along a vertical path; nodes = completed (green check) / current (blue + pulse + "Buddy says: Start here!") / unlocked (emoji) / locked (IconLock, disabled); click → jump into the week's next incomplete task; `onStartLesson` switches back to the dashboard view.

---

## 18. Utility Reference (file by file)

- **`referral.js`** (32 lines) — referral code primitives (§26): `REFERRAL_LS_KEY = 'db_pending_referral'`; `generateReferralCode()` → `'DB-' + 8 random uppercase alphanumerics`; `isValidReferralCode(ref)` → regex `^DB-[A-Z0-9]{8}$`; `stashReferralCode(ref)` / `consumeReferralCode()` (write/read-and-remove the localStorage key); `buildReferralLink(code)` → `` `${window.location.origin}/?ref=${code}` ``.
- **`topicTitle.js`** — `splitTopicTitle(title)` splits on `' — '` (em dash), `' – '` (en dash), `' - '` (hyphen) longest-first; returns `{de, en}` (whole string as `en` when no separator). `englishTopicTitle` (overview views), `germanTopicTitle` (inside lessons), `findTaskById(levelData, id)` → `{week, day, task}`.
- **`date.js`** — **local-calendar-date** utilities (deliberately not UTC so 23:00/01:00 study sessions count as consecutive days): `getLocalDateString()`, `getYesterdayDateString()`, `addDaysDateString(dateStr, days)` (DST-safe calendar-day mutation).
- **`progress.js`** — *legacy* helpers (`german-learning-progress` storage key, `calculateStreak`, `checkBadges` with an older badge set, `getTrackMode`); **the active app does not use this file** (useProgress.js superseded it). Keep around only for history.
- **`srs.js`** — see §10.
- **`vocabExtractor.js`** — see §10.
- **`badges.js`** — the display-side badge catalog: `ALL_BADGES` (15 badges with icon components + human conditions), `BADGE_CATEGORIES` (habit/xp/grammar/vocab/exam), `CATEGORY_COLORS`, `getBadgeCategory(id)`, `getBadgeById(id)`. ⚠️ Note: `BADGE_DEFINITIONS` (earned at runtime) live in `useProgress.js`, and the two lists are slightly different; the *legacy* `progress.js` list has `week-complete`/`a1-complete`/`a2-complete` with `condition: false`, which are dead.
- **`analytics.js`** (102 lines) — the event layer. `EVENTS` enum now has **14** events: `LESSON_STARTED, LESSON_COMPLETED, ANSWER_CORRECT, ANSWER_INCORRECT, ACHIEVEMENT_UNLOCKED, SESSION_START, SESSION_END, GAME_PLAYED, DAILY_GOAL_HIT, SIGNUP_COMPLETED, ONBOARDING_COMPLETED, STREAK_MILESTONE, REFERRAL_USED, REFERRAL_REWARD_EARNED`. Exports `STREAK_MILESTONES = [3, 5, 7, 14, 30]`. `trackEvent` → console log in dev + optional gtag hook + commented fetch backend. Trackers: `trackLessonStarted, trackLessonCompleted, trackAnswerCorrect, trackAnswerIncorrect, trackAchievementUnlocked, trackGamePlayed, trackSessionStart, trackStreakMilestone, trackSignupCompleted({method, referralUsed}), trackOnboardingCompleted({level, track, goal}), trackReferralUsed, trackReferralRewardEarned`. **These are now wired across the app** (DashboardContext, useProgress, task components, auth pages, referralService) — no longer dead code.
- **`speech.js`** — legacy imperative `speakGerman(text, rate=0.85)` wrapper over edgeSpeech (auto language detection, Web Speech fallback). Superseded by the hook-based `useSpeech`/`SpeakerButton`.

**Services (new):**
- **`config.js`** (18 lines) — the ads config surface: `ADS_ENABLED` (`env.VITE_ADS_ENABLED === 'false' ? false : true` — defaults **on** when unset), `ADMOB = { androidAppId, bannerUnitId, interstitialUnitId, rewardedUnitId }` (all `''` until env-supplied), `ADSENSE_CLIENT_ID`, `INTERSTITIAL_COOLDOWN_MS = 10 * 60 * 1000` (max one interstitial per 10 minutes).
- **`services/ads.js`** (157 lines) — the platform-agnostic ad service (§25). Module-level flags: `initialized/available/bannerVisible/lastInterstitialAt/sessionAdShown`. Functions: `isNative()` (detects `window.Capacitor.isNativePlatform() === 'android'`), `isConfigured()` (AdMob appId on native, AdSense client id on web, gated by `ADS_ENABLED`), `initAds()` (idempotent; `AdMob.initialize` on native via dynamic import, else loads the AdSense script `loadAdSenseScript()` and seeds `window.adsbygoogle = []`), `showBanner(container)` (AdMob `showBanner({placementId, position:'BOTTOM_CENTER'})` on native; else injects an `<ins class="adsbygoogle">` element into the container and pushes to adsbygoogle), `hideBanner()`, `showInterstitial()` (AdMob `prepareInterstitial` + `showInterstitial`; capped at one per session **and** one per 10 minutes; **web is a silent no-op**), `showRewarded(onReward)` (interface exists for a future opt-in trigger — none wired; native-only). Every call resolves/fails softly with a `console.warn`; nothing throws into React.
- **`services/referralService.js`** (51 lines) — `applyPendingReferral(userId, extraProfileFields = {})` (§26): queries `get_my_referral_info`, consumes the stashed code, generates an own code if missing, **never overwrites an existing `referral_code`/`referred_by`** (safe to call on every login), upserts the profile (`{...extraProfileFields, id, referral_code[, referred_by]}` onConflict `id`), and on a valid fresh referral calls `record_referral` RPC + fires `trackReferralUsed` / `trackReferralRewardEarned`. Returns the applied ref code or null.

---

## 19. Design System

### `src/index.css` (715 lines) — Tailwind 4 CSS-first

- `@import "tailwindcss";` then a `@theme` block mapping utility tokens to `--db-*` CSS variables: fonts (`--font-sans: Inter`, `--font-display: Poppins`), backgrounds (bg-base/bg-secondary/bg-cream/surface), brand colors (primary/primary-dark/primary-light/accent/accent-light/success/success-light/gold/gold-light/error/error-light), text colors (text-dark/body/muted), plus additional tokens (primary-soft, error-soft, gold-pale, bg-dark/bg-dark-mid/bg-darkest, bg-white, border, forest tones, a1-blue/a2-red, success/error variants, radius-card/radius-modal, shadows db-card/db-glow, fonts). **No `tailwind.config.*` file exists** — all configuration is this CSS.
- Custom component classes: `.db-card`/`.db-card-hover`, `.db-btn`/`.db-btn-primary`/`.db-btn-secondary`, `.paper-card`/`.paper-input` (legacy helpers used widely), `.progress-bar`/`.progress-bar-fill`, day-circle classes (`.day-circle-*`), `.task-item`, game helpers, `.view-enter`, `.slide-in`, `.skeleton`.
- **Light/dark theming:** `data-theme` attribute on `<html>` flips the `--db-*` variables (dark default, light via `:root[data-theme="light"]`).
- **Animations (keyframes):** fadeIn, slideUp, scaleIn, pulse-soft, bellRing, streakBlaze, xpToast, coachmarkPulse, float, shimmer, and the full **Buddy motion set** (buddy-breathe/hop/spin/tilt/think/bob/sigh/run/wave) with squash-and-stretch choreography.
- Accessibility: `@media (prefers-reduced-motion: reduce)` disables Buddy/UI animations; `@media (prefers-contrast: more)` boosts text contrast; safe-area utilities for notched devices (`pb-nav`, `pt-safe`).

---

## 20. PWA / Service Worker / Update Flow

### `public/sw.js` (134 lines)
- `CACHE_VERSION = 'deutschbuddy-v9'` → caches `-static`, `-api`, `-fonts`.
- **Precache (14 entries):** `/`, `/index.html`, `/manifest.json`, both buddy icons, 6 buddy webps.
- **Lifecycle:** install → `cache.addAll(STATIC_ASSETS)` + `skipWaiting()`; activate → delete non-`CACHE_VERSION` caches + `clients.claim()`; `controllerchange` → post `{type:'SW_UPDATED'}` to clients (drives `UpdateToast`).
- **Strategies:** non-GET ignored; cross-origin ignored except Google Fonts (stale-while-revalidate in FONT_CACHE); static assets → SWR in STATIC_CACHE; API (`/api/`, `/rest/v1/`, `/auth/v1/`) → network-first in API_CACHE; all other navigations → network-first with `/index.html` app-shell fallback.
- ⚠️ **Bump `CACHE_VERSION` whenever assets/HTML change** or stale content will be served; the app relies on `skipWaiting` + controllerchange for updates. (Bumped v7 → v9 for the recent HTML/JS changes.)

### `public/manifest.json`
Standalone display, portrait-primary, `#FFF9F2` background / `#F6F1E8` theme, buddy icons 192/512 `any maskable`, categories education/language.

### `index.html` theme-color
`#F6F1E8` (light scheme) / `#1E1E1E` (dark scheme) meta tags.

---


## 21. Deployment

### Vercel (`vercel.json`)
- `/api/(.*)` → serverless (`api/tts.js`).
- everything else → `/index.html` (SPA rewrite).
- HTML responses get `Cache-Control: no-cache, no-store, must-revalidate`.

### Capacitor / Android (`capacitor.config.json`, `android/`)
- `appId: com.deutschbuddy.app`, `appName: DeutschBuddy`, `webDir: dist`.
- Build flow: `npm run build` → `npx cap sync` (copies `dist` into `android/app/src/main/assets/public`; that directory is eslint-ignored).
- Android specifics: minSdk 23, compile/targetSdk 35; the app listens for Capacitor `backButton` events (DashboardContext) to emulate browser back; **TTS requires `VITE_TTS_API_URL`** pointing at the deployed backend since same-origin `/api/tts` doesn't exist on device; SW registration is skipped on non-https.
- **Ads on Android:** requires the `@capacitor-community/admob` plugin to be registered in the Capacitor project and `VITE_ADMOB_*` vars baked into the build — see §25.

---

## 22. Testing

- **Setup (`src/test/setup.js`):** in-memory localStorage mock; suppresses `not wrapped in act` console errors.
- **`src/utils/topicTitle.test.js`** (11 tests) — title splitting (em/en/hyphen dashes, fallbacks), english/german extraction, `findTaskById` (found/not-found/null-data).
- **`src/hooks/useProgress.test.js`** (6 tests) — `checkBadges` awarding rules + no-duplication; `BADGE_DEFINITIONS` contains 15 badges covering all catalog ids.
- **`src/components/TaskRenderer.test.jsx`** (4 tests) — renders quiz/vocabulary, interactive quiz smoke, unknown-type fallback.
- **`src/components/DashboardShell.integration.test.jsx`** (2 tests, **~4s, slow**) — full shell boot with mocked router/auth/progress (the mock now provides `useSearchParams`). (1) the Home **Continue** card button opens the day's lesson; (2) clicking a week circle opens the LessonPlayer directly ("Exit lesson" button present).
- **`src/utils/referral.test.js`** (6 tests) — `generateReferralCode` shape (`DB-` + 8 alphanumerics), `isValidReferralCode` (accepts `DB-XXXXXXXX`, rejects wrong prefix/length/chars), `stashReferralCode`/`consumeReferralCode` round-trip (consume clears the key), no-op on invalid codes.
- **`src/services/referralService.test.js`** (5 tests) — `applyPendingReferral` with a mocked supabase: no user → null; fresh invite stores a profile with `referral_code` + `referred_by`; self-referral rejected (own code is not accepted as the pending ref); idempotency (existing code + nothing pending → null, no upsert); reward path records the referral when valid.
- **`src/services/ads.test.js`** (4 tests) — `isConfigured` gating (ADS_ENABLED=false → no ad SDK; empty AdSense id on web → no ads), `showBanner` no-ops cleanly when unconfigured, `initAds` resolves `false` without config, `showInterstitial` respects the one-per-session / cooldown caps.
- Run: `npm test` (**38 tests across 7 files**), or a single file with `npx vitest run <path>`. jsdom environment, globals on, CSS enabled.

---

## 23. localStorage Key Inventory

| Key | Purpose | Written by |
|---|---|---|
| `supabase.auth.token` | cached auth session | Supabase client / read by `getCachedUser` |
| `db_progress_${userId}_${level}` | progress (user) | useProgress |
| `db_progress_${level}` | progress (guest) | useProgress |
| `db_selected_level` | A1/A2 choice | DashboardContext, OnboardingPage, LoginPage |
| `db_selected_track` | standard/fast pacing | DashboardContext, OnboardingPage, SignupPage |
| `db_onboarded` | 'true' once onboarding done | OnboardingPage, LoginPage |
| `db_learning_goal` | onboarding goal id (exam/travel/people/fun) | OnboardingPage |
| `db_pending_lesson` | `{weekId, day, taskId}` deep-link to Lesson 1 | OnboardingPage; consumed+removed by DashboardShell |
| `db_daily_goal` | daily XP target (5/15/30 from onboarding, 10/20/30 from Settings; default 20) | OnboardingPage, SettingsPage; read by HomePage |
| `db_pending_referral` | stashed invite code (`DB-XXXXXXXX`) | referral.js via OnboardingPage/SignupPage; consumed by referralService |
| `db_tutorial_seen_v1` | first-run tutorial flag | WelcomeTutorial/DashboardShell/Settings |
| `db_coachmark_seen_v1` | Start-lesson coachmark flag | DashboardShell |
| `db_theme` | dark/light | ThemeContext |
| `db_notification_preferences` | notification prefs fallback | SettingsPage |
| `db_notif_read` | read notification ids (JSON array) | NotificationPanel/DashboardContext |
| `db_srs_cards` | SM-2 flashcard deck | useSpacedRepetition |
| `speedblitz_lb_${level}` | Speed Blitz top-10 | SpeedBlitz |
| `gender_dungeon_lb` | Gender Dungeon top-10 | GenderDungeon |
| `picture_match_lb_${level}` | Picture Match top-10 | PictureMatch |
| `db_chunk_reload_attempted` (sessionStorage) | once-per-session chunk reload guard | main.jsx |
| `german-learning-progress` | legacy progress (dead code) | src/utils/progress.js |

---

## 24. Known Quirks, Bugs & Data Anomalies

**Resolved in the current tree (documented so nobody "fixes" them again):** the `ftw2d1t3` `parents:` typo and the duplicate `die Tür` were removed at HEAD 53ce364; A2 weeks 3–8 umlauts were restored in the working tree; `Matching` now uses a proper Fisher–Yates shuffle; every task completes with a score payload (§7.4); the analytics trackers are wired end-to-end; `fix-rls.sql` restores the column-level email REVOKE; `ContinueCard`'s Free Practice is a real feature (the `?mode=practice` param is consumed by the shell).

**Data:**
- `Fun.jsx` and `QuickWin.jsx` ignore `content` entirely (each has its own local joke/fact/meme lists); the `fun` data tasks provide `{facts: []}` the components never display.
- `process-buddy.mjs` header comment documents outputs (`buddy-transparent.webp`, `buddy-full.webp`, `buddy-circle-*.png`) the code no longer generates (only square-512 + per-emotion variants).
- `a2Data.js` authoring asymmetry persists: weeks 1–2 use local `makeDay`/`makeTask` helpers, weeks 3–8 are handwritten double-quoted JSON.
- A1 spoonfed module 1 was restructured into a 7-day "life-first" week — the data shape is unchanged and all ids remain stable (`a1m1d1t1` … `a1m1d7t4`).

**Code:**
- **Web ads vs CSP:** `index.html`'s CSP (`script-src 'self' 'unsafe-inline' 'unsafe-eval'`; `connect-src 'self' https://*.supabase.co`) does **not** allow `pagead2.googlesyndication.com`, so the **web AdSense banner silently never renders** until the CSP is updated. The ads layer still no-ops gracefully (script `onerror` resolves and the container stays hidden). Native Android/AdMob interstitials are unaffected.
- `VITE_ADS_ENABLED` **defaults to true** when unset (`config.js` only turns it off for the literal string `'false'`) — the app is ad-free in practice only because every ad id defaults to `''`; set the switch explicitly to `false` to be safe.
- Practice mode's 8-task queue samples all task types (incl. `quickwin`) and **only unlocked weeks**, so a short free-practice run can surface repetitive low-value tasks — intentional.
- Unscored-ish types (`Grammar`, `Vocabulary`, `Speaking`, `Writing`, `Roleplay`, `Fun`, `QuickWin`, `Flashcards`) complete with `{score: 1, maxScore: 1}` → they are treated as "mastered" and **never enter `reviseTasks`** (only partially-graded finishes do). Deliberate.
- `record_referral` awards +25 XP on **both** the referrer's A1 and A2 `progress` rows for every unique referred user, while the `Community Builder` badge is granted only once per referrer (the `badges @> …` guard) — XP is uncapped, the badge is not.
- `DashboardShell.integration.test.jsx` boots the whole shell (slow, ~4s) — don't run it in a hot loop while developing.
- `preconnectSupabasePlugin` (vite.config.js) injects dns-prefetch/preconnect for the Supabase host when `VITE_SUPABASE_URL` is set.
- `manualChunks` (vite.config.js) splits framer-motion, react vendor, supabase, and each curriculum file into separate cacheable chunks.
- ESLint turns off `react-hooks/set-state-in-effect` globally and `react-refresh/only-export-components` for `src/contexts/`.
- `src/utils/progress.js` is legacy/dead relative to `useProgress.js`.

---

## 25. Ads & Monetization

**Design principle:** the app is 100% operative with ads disabled. Every route through `ads.js` resolves a boolean and logs a `console.warn` on failure — nothing throws into React, and unconfigured setups render zero height (the `BannerAd` container stays `display: none`).

**Config (`src/config.js`) vs env:** read once at import time from `import.meta.env`:
- `VITE_ADS_ENABLED` — `'false'` turns everything off; *unset defaults to true* (see §24 quirk).
- `VITE_ADSENSE_CLIENT_ID` (`ca-pub-…`) — web banner.
- `VITE_ADMOB_ANDROID_APP_ID` (`ca-app-pub-…~…`) — native app id for `AdMob.initialize`.
- `VITE_ADMOB_BANNER_ID` / `VITE_ADMOB_INTERSTITIAL_ID` / `VITE_ADMOB_REWARDED_ID`.
- `INTERSTITIAL_COOLDOWN_MS = 10 * 60 * 1000` (10 min).

**Service (`src/services/ads.js`):**
- `isNative()` — `window.Capacitor` present and `isNativePlatform()`/`getPlatform()==='android'`.
- `initAds()` — idempotent; on native dynamically imports `@capacitor-community/admob` and calls `AdMob.initialize({appId})`; on web seeds `window.adsbygoogle = []` and injects the `pagead2` script (`loadAdSenseScript`, deduped by element id `adsbygoogle-script`).
- `showBanner(container)` — native: `AdMob.showBanner({placementId, position:'BOTTOM_CENTER'})`; web: injects `<ins class="adsbygoogle">` with `data-ad-*` attributes into the container and calls `.push({})`.
- `hideBanner()` — `AdMob.hideBanner()` on native; resets the `bannerVisible` flag.
- `showInterstitial()` — **native-only** (web is a silent no-op): `AdMob.prepareInterstitial` → `AdMob.showInterstitial`, gated by "once per app open" (`sessionAdShown`) AND the 10-minute cooldown.
- `showRewarded(onReward)` — interface for a future opt-in reward trigger (e.g. bonus practice round); **no trigger is wired yet**, native-only.

**UI (`src/components/BannerAd.jsx`):** renders one slot on the **dashboard home** (bottom of `HomePage`). On mount calls `showBanner(containerRef.current)`; on success sets `visible` (min-height 50px); otherwise stays `display: none` / `aria-hidden`; unmount calls `hideBanner()`.

**Interstitial triggers (session boundaries only):** week completion (`handleCompleteTask`), leaving a lesson (`handleBackNavigation` task-exit and the LessonPlayer `onExit` path), and practice-session end/exit (`exitPractice`).

---

## 26. Referral Program (end-to-end)

A friend clicks your share link `https://yourdomain/?ref=DB-XXXXXXXX`:

1. **`LandingRoute`** (`App.jsx`) preserves `location.search` while redirecting `/` → `/onboarding`, so the `ref` param survives.
2. **`OnboardingPage`** and **`SignupPage`** both read `?ref=` and, if `isValidReferralCode` (`^DB-[A-Z0-9]{8}$`), `stashReferralCode` it into `db_pending_referral`.
3. The friend completes onboarding → signup. **`SignupPage`** (immediate-session path) calls `applyPendingReferral(user.id, {selected_pacing})`:
   - `get_my_referral_info` RPC (errors tolerated);
   - `consumeReferralCode()`; an own code is generated only if the signup trigger didn't already mint one;
   - upserts `profiles` with `{...extraProfileFields, id, referral_code[, referred_by]}` — **never overwrites** an existing code/`referred_by` (safe to call on every login);
   - on a valid fresh referral: `trackReferralUsed` + `record_referral(p_ref_code, user_id)` RPC, then `trackReferralRewardEarned` when the RPC returns a referrer id.
4. **Email-confirmation path** (no session at signup): the referral is applied on **first successful login** (`LoginPage`) — same idempotent call.
5. **Reward (server-side):** the referrer gets **+25 XP on both A1 and A2 progress rows** and `referral_count+1`; the **Community Builder 🤝** badge is granted once (`badges @> '[{"id":"referral-builder"}]'` guard). No cap on XP.
6. **Share UI:** the referrer's `ProfilePage` → "Invite friends" card shows the code, `referral_count`, and a Share button (`navigator.share` → clipboard fallback → "Copied!").

**SQL (`supabase/referral-schema.sql`, §15.4):** `profiles.referral_code` + unique partial index, `referred_by`, `referral_count`; `referrals` ledger table with `UNIQUE(referred_user_id)`; `handle_new_user` recreated to mint `DB-` + 8 uppercase hex chars; `record_referral` (self-check, idempotency, XP/badge on both level rows) and `get_my_referral_info` both `security definer` with `set search_path = public`, executed only by `authenticated`.
