# DEUTSCHBUDDY — PRODUCTION-GRADE QA & SECURITY AUDIT REPORT

**Audit Scope**: Full codebase (`/home/shahbaz/german-learning`) — React 19 + Vite 8 + Tailwind 4 + Supabase + Capacitor
**Git HEAD**: `b9a31ea` (clean working tree)
**Verification Gates**: `npm run lint` ✅ | `npm test` (63/63) ✅ | `npm run build` (1.55s) ✅

---

## 🔴 CRITICAL VULNERABILITIES & HIGH-PRIORITY BUGS

### CV-01: Community Triggers Silently Dropped by Migration Ordering Conflict
**Files**: `supabase/schema.sql:349-373`, `supabase/fix-rls.sql:329-373`, `supabase/community-schema.sql:45-48`
**Severity**: **CRITICAL** — Data integrity loss (upvote/comment counts stop incrementing)

**Root Cause**: Three migration files define the same triggers (`on_community_upvote_change`, `on_community_comment_change`):
- `schema.sql` creates them (canonical)
- `fix-rls.sql` drops & recreates them (repair)
- `community-schema.sql` **drops them without recreating** (lines 45-48)

If `community-schema.sql` runs **after** `fix-rls.sql` (README order: schema → fix-rls → community-schema), the triggers are permanently removed. Upvote/comment counts freeze at current values.

**Evidence**: `community-schema.sql:38-44` comment admits "canonical trigger functions... live in schema.sql" but the drop statements execute unconditionally.

**Fix**: Remove the drop statements from `community-schema.sql` or guard them.

---

### CV-02: useProgress Missing `mountedRef` Guard — State Updates on Unmounted Component
**File**: `src/hooks/useProgress.js` (lines 195-293, 308-321)
**Severity**: **HIGH** — Memory leak / React warning / potential corruption

**Root Cause**: `performSync` sets retry timers (`syncTimerRef.current`) but the hook has **no `mountedRef`** to prevent callbacks from firing after unmount. The cleanup in the `online/visibilitychange` effect only clears `syncTimerRef.current`, but if `performSync` is mid-execution when the component unmounts, the `finally` block resets `syncInFlightRef` and a pending retry timer can still fire `performSyncRef.current()`, calling `setProgress`/`setSyncStatus` on an unmounted component.

**Evidence**: AuthContext has `mountedRef` (line 52) but useProgress does not.

**Fix**: Add `mountedRef` to useProgress and guard all async state updates.

---

### CV-03: Supabase Client Created with Placeholder Credentials — Silent Auth Failure
**File**: `src/lib/supabase.js:10-12`
**Severity**: **HIGH** — UX failure / security confusion

**Root Cause**: When `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` are missing, the client is created with dummy values. All auth operations silently fail (network error to placeholder domain) while the app appears to load. Users see no error, just "auth doesn't work."

**Fix**: Fail fast with explicit error, or show a prominent banner.

---

### CV-04: Rate Limiting on TTS Endpoint Not Persistent in Production
**Files**: `api/tts.js:16-18`, `vite.config.js:85-87`
**Severity**: **HIGH** — DoS vulnerability

**Root Cause**: Both the Vercel serverless function (`api/tts.js`) and Vite dev middleware (`vite.config.js`) use **in-memory `Map`** for IP-based rate limiting. On Vercel, each cold start creates a new function instance with empty buckets — rate limiting is **completely bypassed** in production. An attacker can make unlimited TTS requests.

**Fix**: Use a persistent store (Redis, Upstash, or Supabase `pg_cron` + table) for rate limiting.

---

### CV-05: CSP Uses `'unsafe-inline'` for Scripts — XSS Surface
**File**: `index.html:13`
**Severity**: **MEDIUM** — CSP bypass

**Root Cause**: `script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com` allows any inline script. Since the app is a SPA with no SSR, nonce-based CSP isn't trivial, but `'unsafe-inline'` defeats the primary XSS protection.

**Mitigation**: Use `'strict-dynamic'` with a nonce on the root script tag (requires Vite plugin to inject nonce). Or at minimum, add a `trusted-types` policy.

---

## 🔐 AUTHENTICATION & DATA SECURITY FINDINGS

### AS-01: RLS Policy Inconsistency — Community Tables
**Files**: `supabase/schema.sql:262-282` vs `supabase/community-schema.sql:55-96`

| Table | schema.sql Policy | community-schema.sql Policy | Risk |
|-------|-------------------|----------------------------|------|
| `community_posts` | `using (true)` — **public read** | `using (auth.role() = 'authenticated')` — **auth only** | If community-schema runs last, unauthenticated users (e.g., preview links) can't read posts |
| `community_upvotes` | `using (true)` — **public read** | `using (auth.role() = 'authenticated')` — **auth only** | Same |
| `community_comments` | `using (true)` — **public read** | `using (auth.role() = 'authenticated')` — **auth only** | Same |

**Recommendation**: Align to `using (true)` in both files (community is public). Remove the restrictive policies from `community-schema.sql` or make them consistent.

---

### AS-02: Column-Level `REVOKE` Ordering Race in `fix-rls.sql`
**File**: `supabase/fix-rls.sql:190-223`

The script grants `SELECT` on full `profiles` table (line 192), **then** revokes and re-grants specific columns (lines 221-223). If another migration runs between these statements, the `email` column is briefly exposed to `anon`/`authenticated`. The comment acknowledges this (lines 5-9) but the fix is to **never grant full-table select** — only grant the explicit column list.

**Fix**: Remove line 192 (`grant select on public.profiles to anon, authenticated;`) entirely. The column-level grant on line 222 is sufficient.

---

### AS-03: `referrals` Table Missing Index on `referrer_id`
**Files**: `supabase/schema.sql:40-46`, `supabase/referral-schema.sql:28-34`

The `referrals` table has a unique index on `referred_user_id` but **no index on `referrer_id`**. Queries like "show all users I referred" will seq-scan.

**Fix**: Add index.

---

### AS-04: No `updated_at` Auto-Update Triggers
**Files**: All tables have `updated_at` columns but **no triggers** to maintain them.

Only `set_my_referral_info()` manually sets `updated_at`. Progress upserts, exercise_results inserts, community post updates — none update `updated_at`. This breaks audit trails.

**Fix**: Add a generic trigger function.

---

### AS-05: `exercise_results` Missing `updated_at` Column Entirely
**File**: `supabase/schema.sql:70-83`

The table has `created_at` but no `updated_at`. If retries/updates occur, there's no timestamp.

**Fix**: Add column + trigger (see AS-04).

---

### AS-06: Google OAuth Popup Watchdog — Race Condition
**File**: `src/contexts/AuthContext.jsx:247-259`

The watchdog polls `popup.closed` every 500ms. If the auth event fires **and** the popup closes in the same tick, the watchdog's `onPopupClosed` callback may fire after `clearPopupWatchdog()` has already run (line 140), but the interval is already cleared so it's a no-op. Low risk but a minor UX glitch.

**Fix**: Add a guard in the watchdog.

---

### AS-07: Password Policy Too Weak
**Files**: `src/pages/SignupPage.jsx:44`, `src/pages/ResetPasswordPage.jsx:29`

Only minimum 8 characters. No entropy check, no breach check (HaveIBeenPwned), no complexity requirements.

**Recommendation**: Add `zxcvbn` or similar for entropy scoring; optionally integrate HaveIBeenPwned k-anonymity API.

---

## ⚙️ FEATURE LOGIC & EDGE-CASE BUGS

### FL-01: `completeTask` Revise Logic — "Full Score" Assumption for Unscored Types
**File**: `src/hooks/useProgress.js:422-436`

Code comment (line 424-425): "Unscored task types (grammar, flashcards, fun, ...) pass full credit ({ score: 1, maxScore: 1 }) so they are treated as mastered and never revise."

**Risk**: If any task component forgets to pass `{score: 1, maxScore: 1}` and passes `null` or `{score: 0, maxScore: 0}`, the revise logic treats it as a failed scored task and adds to `reviseTasks`.

**Fix**: Defensive guard in `completeTask`.

---

### FL-02: `handleGameScore` Always Uses `weekId=1` — Cross-Level XP Attribution
**File**: `src/contexts/DashboardContext.jsx:284-294`

Game XP is always attributed to **week 1, day 1** of the **active level**. The `weekId=1` is hardcoded — if curriculum structure changes, this breaks silently.

**Fix**: Derive from active level's first week.

---

### FL-03: `handleCompleteTask` Week-Unlock Race Condition
**File**: `src/contexts/DashboardContext.jsx:247-262`

If two tasks in the same week complete near-simultaneously, both read `progress.completedTasks` before either `completeTask` updates it. Both see `allDone = true`, both call `unlockWeek`. The `unlockWeek` has an idempotency guard but it reads `progressRef.current` which **may be stale**.

**Fix**: Move the week-complete check into `completeTask` itself (where `progressRef` is guaranteed current).

---

### FL-04: `unlockWeek` Called with `weekId + 1` — Off-by-One if Weeks Aren't Sequential
**File**: `src/contexts/DashboardContext.jsx:257-258`

Assumes weeks are numbered 1, 2, 3... If curriculum data has gaps, `weekId + 1` unlocks a non-existent week.

**Fix**: Find the next unlocked week from `visibleWeeks`.

---

### FL-05: `handleBackNavigation` / `popstate` — `isProcessingBack` Guard Too Short
**File**: `src/contexts/DashboardContext.jsx:319-396`

The `isProcessingBack.current = true` is reset after **300ms**. If a user clicks back button rapidly, or if a state update takes >300ms, a second `popstate` can slip through.

**Fix**: Use a counter instead of boolean, or reset only after the state update is confirmed.

---

### FL-06: `LessonPlayer` `completedRef` Not Reset on Task Change
**File**: `src/components/lesson/LessonPlayer.jsx:14, 21, 38-45`

If `task.id` is the same (e.g., retry same task), the ref persists and **blocks re-completion**. The `TaskErrorBoundary` remounts on `key={task.id}`, so a retry creates a new LessonPlayer instance — this works. But if the parent doesn't remount, it's blocked.

**Fix**: Key LessonPlayer on `task.id` in DashboardShell.

---

### FL-07: `CommunitySection` Optimistic Upvote Rollback Only on Exception, Not on Supabase Error
**File**: `src/components/CommunitySection.jsx:155-167`

Supabase returns `{ error }` **without throwing** for RLS/constraint violations. The code handles this (line 162). **Good**. But the `catch` block only catches JS exceptions, not the error object. This is correct.

**Minor**: The `pendingUpvoteRef` debounce is 600ms. If the server responds slower, a second click is ignored. Acceptable.

---

### FL-08: `useSpeech` Web Speech Fallback Doesn't Respect `playbackRate`
**File**: `src/hooks/useSpeech.js:111-124`

The Edge TTS path forces `audio.playbackRate = 1.0` because "Edge TTS audio is already rendered at the requested prosody rate." This is correct for Edge TTS but the comment should clarify that the `rate` passed to `speakWithEdgeTTS` is converted to prosody (`toEdgeRate`), not playback rate.

**No bug found** — just documentation clarity.

---

### FL-09: Task Components — Missing Score Validation
**Files**: Various task components (Matching, Scramble, ListeningTask, Speaking, Writing, Review, Roleplay, Fun)

**Risk**: If any component calls `onComplete()` without arguments or with invalid values, `completeTask` defaults `rawMaxScore` to `xpAmount` and `rawScore` to `xpAmount`, treating it as perfect score. This could award XP for failed attempts.

**Fix**: Add runtime validation in `completeTask`.

---

### FL-10: `DashboardContext` `handleSelectTask` Captures Stale `selectedDay`/`selectedTask` in History
**File**: `src/contexts/DashboardContext.jsx:171-178`

The `selectedDay` and `selectedTask` in the dependency array are the **current render's values**. When pushing to history, it correctly captures the **previous** day/task. But if `handleSelectTask` is called twice in one render (unlikely), the second push would capture the already-updated state. Acceptable.

---

## 📊 SCHEMA & MIGRATION ALIGNMENT

### SM-01: `handle_new_user` Defined in 4 Places — Drift Risk
**Files**: 
- `supabase/schema.sql:386-422`
- `supabase/fix-rls.sql:229-264`
- `supabase/referral-schema.sql:45-81`
- `supabase/migrations/20260812_auth_google_profiles.sql`
- `supabase/migrations/20260819_referral_security_alignment.sql`

**Risk**: Any `create or replace` that omits a field (Google `avatar_url`, `referral_code`, `search_path`) silently regresses new signups.

**Fix**: Single source of truth. Use a migration that **only** adds columns/tables, and keep the trigger function in `schema.sql` only.

---

### SM-02: `notification_preferences` Default Mismatch Risk
**Files**: `supabase/schema.sql:17-24`, `supabase/fix-rls.sql:33-41`, `supabase/migrations/20260809_reconcile_live_schema.sql:33-41`

All three define the same JSON default. If one diverges, new users get different defaults.

**Fix**: Extract default to a SQL function or constant, or document "must stay identical."

---

### SM-03: `exercise_results` Foreign Key to `progress` Missing
**File**: `supabase/schema.sql:70-83`

`exercise_results` has `user_id`, `level`, `week_id`, `day_number`, `task_id` but **no FK to `progress`**. The comment says "with FK to progress for referential integrity" but it's not in the DDL.

**Fix**: Add FK.

---

### SM-04: `community_upvotes` Unique Constraint on `(post_id, user_id)` vs `(user_id, post_id)`
**File**: `supabase/schema.sql:122-128` vs `supabase/community-schema.sql:29-35`

- `schema.sql`: `unique(user_id, post_id)`
- `community-schema.sql`: `unique(post_id, user_id)`

Order doesn't matter for uniqueness, but index ordering affects query plans. Pick one and standardize.

---

### SM-05: Migration `20260819` Re-Defines Tables Already in `20260810`
**Files**: `supabase/migrations/20260810_referral_schema_live.sql` and `supabase/migrations/20260819_referral_security_alignment.sql`

Both create `referrals` table, `handle_new_user`, `set_my_referral_info`, `record_referral`, `get_my_referral_info`. The 20260819 migration comment says "earlier referral migration may already be present... editing that older file would not replay its corrected grants." This is a **migration squash** pattern but creates confusion.

**Fix**: Make 20260819 only contain the grant/revoke changes. Use `if not exists` for tables/functions.

---

## 🛡️ ERROR HANDLING & BOUNDARY CHECKS

### EH-01: Missing Error Boundaries on Auth Pages
**Files**: `src/pages/LoginPage.jsx`, `SignupPage.jsx`, `ForgotPasswordPage.jsx`, `ResetPasswordPage.jsx`, `VerifyEmailPage.jsx`

No `ErrorBoundary` wraps these pages. A render error during auth (e.g., `Icons` import failure) crashes the entire auth flow with no recovery UI.

**Fix**: Wrap auth pages in `ErrorBoundary` (already exists at `src/components/ErrorBoundary.jsx`) or add per-page boundaries.

---

### EH-02: `useAuth` `getSession` Promise Not Awaited in Cleanup
**File**: `src/contexts/AuthContext.jsx:119-135`

If the component unmounts **before** the promise settles, `mountedRef.current = false` (cleanup) prevents `setUser`/`setLoading`, but the promise still resolves and runs `.then()`. The `mountedRef` guard handles this. **Good**.

---

### EH-03: `LessonPlayer` `completeTimerRef` / `bubbleTimerRef` Cleaned Up
**File**: `src/components/lesson/LessonPlayer.jsx:22-25`

**Good** — proper cleanup.

---

### EH-04: `Quiz` / `FillBlank` Auto-Advance Timer Cleared on Unmount
**Files**: `src/components/Quiz.jsx:85`, `src/components/FillBlank.jsx:92`

**Good** — proper cleanup.

---

### EH-05: `useSpeech` Cleanup on Unmount
**File**: `src/hooks/useSpeech.js:146-154`

**Good** — thorough cleanup of audio, fetch, timers.

---

### EH-06: `CommunitySection` `fetchPosts` — Upvotes Query Failure Doesn't Fail Posts
**File**: `src/components/CommunitySection.jsx:66-101`

**Good** — upvotes query is independent; failure only affects arrow highlighting, not post list.

---

### EH-06: `DashboardContext` Curriculum Load — No Retry Backoff, Just `retryKey`
**File**: `src/contexts/DashboardContext.jsx:126-155`

On load failure, `setLoadError(true)` and user must click "Try Again" which increments `retryKey`. No automatic retry with backoff. For transient network errors, this forces user action.

**Fix**: Add auto-retry with exponential backoff (max 3 attempts) before showing error UI.

---

### EH-07: `MainContent` Lazy Views — No Error Boundary for Failed Chunk Loads
**File**: `src/components/MainContent.jsx:5-11`, `src/components/DashboardShell.jsx`

`main.jsx` has a global `ErrorBoundary`, but lazy-loaded views that fail to load (network error on chunk) will throw during render. The global boundary catches it, but the user sees a generic error instead of a "retry loading this view" option.

**Fix**: Wrap each `Suspense` fallback with a retry button, or add a chunk-load error handler in `main.jsx` that reloads the page.

---

### EH-08: Missing Dependency in `useEffect` — `DashboardContext` Line 112
**File**: `src/contexts/DashboardContext.jsx:107-112`

The callback uses `getUserValue` and `setUserValue` from `userStorage` — stable imports. No missing deps. **OK**.

---

### EH-09: `useProgress` `fetchProgress` — Stale Closure Guard Correct but Complex
**File**: `src/hooks/useProgress.js:333-380`

Uses `fetchIdRef` to discard stale responses. **Correct**. The logic correctly handles queued writes vs server data.

---

### EH-10: `useProgress` `loadLocalProgress` — Silent JSON Parse Failure
**File**: `src/hooks/useProgress.js:57-74`

Corrupted localStorage returns `null` → `getDefaultProgress()`. **Good** — fails safe.

---

## ⚡ PERFORMANCE & CODE QUALITY IMPROVEMENTS

### PQ-01: `DashboardContext` Massive `useMemo` Dependency Array (516-534)
**File**: `src/contexts/DashboardContext.jsx:483-534`

The context value `useMemo` has **50+ dependencies**. Any state change recreates the entire context value, causing all consumers (`useDashboard()`) to re-render.

**Optimization**: Split into multiple contexts or use a state management library (Zustand/Jotai) for fine-grained subscriptions.

---

### PQ-02: `useProgress` `snapshotsEqual` Uses `JSON.stringify` — Slow for Large Objects
**File**: `src/hooks/useProgress.js:102-104`

Called on every sync loop iteration. Progress object grows with `completedTasks` array (can be 500+ items). `JSON.stringify` is O(n) and allocates strings.

**Fix**: Use a shallow comparison or hash.

---

### PQ-03: `useProgress` `snapshotsEqual` Called on Every Queue Item
**File**: `src/hooks/useProgress.js:248-249`

Compares **entire queue** against previous queue. Since the queue is coalesced to 1 item, this is usually 1 comparison. Acceptable.

---

### PQ-04: `edgeSpeech.js` `detectLanguage` — Regex on Every Character
**File**: `src/utils/edgeSpeech.js:25-46`

The Unicode property escape `\p{L}\p{N}` is relatively slow. For short TTS phrases (<100 chars), negligible. But called on every `SpeakerButton` click.

**Optimization**: Cache results per text.

---

### PQ-05: `community-schema.sql` — `auth.role() = 'authenticated'` Slower Than `auth.uid() IS NOT NULL`
**File**: `supabase/community-schema.sql:58, 74, 88`

`auth.role()` requires a function call per row. `auth.uid() IS NOT NULL` is a simple null check. For `using (true)` (public read), no auth check needed.

---

### PQ-06: `CommunitySection` Fetches All Posts + Upvotes in Parallel — Good
**File**: `src/components/CommunitySection.jsx:66-101`

Parallel fetch with independent error handling. **Good pattern**.

---

### PQ-07: `TaskRenderer` Remounts Error Boundary Per Task — Good
**File**: `src/components/TaskRenderer.jsx:48-52`

Keyed by `task.id` so a crashed task doesn't poison the next. **Excellent**.

---

### PQ-08: `MainContent` Uses `React.memo` + `lazy` — Good
**File**: `src/components/MainContent.jsx:17, 5-11`

Prevents re-renders when props unchanged; code-splits heavy views. **Good**.

---

### PQ-09: `useProgress` Parallel `exercise_results` Insert — Good
**File**: `src/hooks/useProgress.js:483-501`

Fire-and-forget doesn't block UI. **Good**.

---

### PQ-10: `vite.config.js` Manual Chunks — Good
**File**: `vite.config.js:255-267`

Separate chunks for framer-motion, vendor-ui, supabase, each curriculum. **Good**.

---

## 📋 SUMMARY TABLE

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Auth & Security | 1 (CV-03) | 3 (AS-01, AS-02, AS-04) | 3 (AS-05, AS-06, AS-07) | 0 | 7 |
| Feature Logic | 0 | 3 (FL-01, FL-03, FL-05) | 4 (FL-02, FL-04, FL-06, FL-09) | 2 (FL-07, FL-08) | 9 |
| Schema & Migrations | 1 (CV-01) | 1 (SM-01) | 3 (SM-02, SM-03, SM-04) | 1 (SM-05) | 6 |
| Error Handling | 1 (CV-02) | 0 | 2 (EH-01, EH-06) | 1 (EH-07) | 4 |
| Performance | 0 | 0 | 2 (PQ-01, PQ-02) | 4 (PQ-03, PQ-04, PQ-05, PQ-06) | 6 |
| **TOTAL** | **3** | **7** | **14** | **8** | **32** |

---

## 🎯 PRIORITIZED ACTION PLAN

| Priority | Issue | Effort | Risk if Unfixed |
|----------|-------|--------|-----------------|
| **P0** | CV-01 Community triggers dropped | 5 min | Data corruption (counts freeze) |
| **P0** | CV-02 `useProgress` missing `mountedRef` | 10 min | Memory leaks, React warnings |
| **P0** | CV-03 Placeholder Supabase client | 5 min | Silent auth failure in prod |
| **P0** | CV-04 TTS rate limit bypass | 30 min | DoS / cost explosion |
| **P1** | AS-01 Community RLS inconsistency | 10 min | Access control confusion |
| **P1** | AS-02 Column REVOKE ordering | 5 min | Email exposure window |
| **P1** | AS-03 Missing `referrer_id` index | 5 min | Slow referral queries |
| **P1** | AS-04 Missing `updated_at` triggers | 15 min | Broken audit trail |
| **P1** | FL-01 Revise logic assumption | 10 min | Incorrect revise queue |
| **P1** | FL-03 Week-unlock race | 15 min | Duplicate unlocks / missed unlocks |
| **P2** | FL-02 Hardcoded game week | 5 min | Curriculum drift |
| **P2** | FL-05 Back navigation guard | 10 min | Double-back glitches |
| **P2** | SM-01 `handle_new_user` drift | 30 min | Silent signup regression |
| **P2** | SM-03 Missing FK on exercise_results | 5 min | Orphaned exercise rows |
| **P3** | PQ-01 Context mega-memo | 60 min | Unnecessary re-renders |
| **P3** | PQ-02 `JSON.stringify` in sync loop | 20 min | Sync slowdown at scale |