# DEUTSCHBUDDY — FIXES APPLIED (Post-QA Audit)

**Date**: 2026-09-04  
**Base Commit**: `b9a31ea`  
**Verification**: `npm run lint` ✅ | `npm test` (63/63) ✅ | `npm run build` (1.45s) ✅

---

## ✅ CRITICAL VULNERABILITIES — FIXED

| ID | Issue | Files Changed | Summary |
|----|-------|---------------|---------|
| **CV-01** | Community triggers dropped by migration ordering | `supabase/community-schema.sql` | Removed unconditional `DROP TRIGGER` statements that deleted canonical triggers from `schema.sql`/`fix-rls.sql` |
| **CV-02** | `useProgress` missing `mountedRef` guard | `src/hooks/useProgress.js` | Added `mountedRef` + guards in `performSync` and `fetchProgress` to prevent state updates on unmounted component |
| **CV-03** | Supabase client created with placeholder credentials | `src/lib/supabase.js` | Now throws explicit error if `VITE_SUPABASE_URL`/`ANON_KEY` missing instead of silently failing |
| **CV-04** | TTS rate limiting bypassed in production (in-memory Maps) | `supabase/migrations/20260904_tts_rate_limit_persistent.sql` (new), `api/tts.js` | Added persistent rate-limit table + RPC; API now uses Supabase for rate limiting |
| **CV-05** | CSP uses `'unsafe-inline'` for scripts | `index.html`, `src/main.jsx` | Added `trusted-types default` policy; `'strict-dynamic'` in CSP |

---

## 🔐 AUTHENTICATION & DATA SECURITY — FIXED

| ID | Issue | Files Changed | Summary |
|----|-------|---------------|---------|
| **AS-01** | Community RLS policy inconsistency | `supabase/community-schema.sql` | Aligned all community tables to `using (true)` for public read |
| **AS-02** | Column-level REVOKE ordering race | `supabase/fix-rls.sql` | Removed full-table `GRANT SELECT` on profiles; only column-level grant remains |
| **AS-03** | Missing index on `referrals.referrer_id` | `supabase/schema.sql` | Added `idx_referrals_referrer` |
| **AS-04** | No `updated_at` auto-update triggers | `supabase/schema.sql` | Added `set_updated_at()` trigger function + triggers on 7 tables |
| **AS-05** | `exercise_results` missing `updated_at` + FK | `supabase/schema.sql` | Added `updated_at` column, trigger, and FK to `progress(user_id, level)` |
| **AS-06** | Google OAuth popup watchdog race | `src/contexts/AuthContext.jsx` | Added early-return guard in watchdog interval |

---

## ⚙️ FEATURE LOGIC & EDGE-CASE BUGS — FIXED

| ID | Issue | Files Changed | Summary |
|----|-------|---------------|---------|
| **FL-01** | `completeTask` revise logic assumption | `src/hooks/useProgress.js` | Added `isScored`/`isPerfect`/`isFailed` guards; unscored tasks never enter revise queue |
| **FL-02** | `handleGameScore` hardcoded `weekId=1` | `src/contexts/DashboardContext.jsx` | Now derives `firstWeekId` from `levelData?.weeks[0]?.id` |
| **FL-03** | Week-unlock race in `handleCompleteTask` | `src/hooks/useProgress.js`, `src/contexts/DashboardContext.jsx` | Moved week-completion check into `completeTask` (where `progressRef` is current); added `weekTasks` + `onWeekComplete` callback |
| **FL-04** | `unlockWeek` called with `weekId + 1` (off-by-one) | `src/contexts/DashboardContext.jsx` | `onWeekComplete` now finds next actual week from `visibleWeeks` |
| **FL-05** | Back navigation `isProcessingBack` guard too short | `src/contexts/DashboardContext.jsx` | Replaced boolean with `processingBackCount` counter ref |
| **FL-06** | `LessonPlayer` not keyed on task ID | `src/components/DashboardShell.jsx` | Added `key={selectedTask.id}` to `LessonPlayer` |
| **FL-09** | Task components missing score validation | `src/hooks/useProgress.js` | Added `isValidResult` guard; invalid results treated as unscored full credit + warning |

---

## 📊 SCHEMA & MIGRATION ALIGNMENT — FIXED

| ID | Issue | Files Changed | Summary |
|----|-------|---------------|---------|
| **SM-03** | `exercise_results` missing FK to `progress` | `supabase/schema.sql` | Added FK `(user_id, level) → progress(user_id, level)` |
| **SM-01** | `handle_new_user` in 4 places (partial) | `supabase/fix-rls.sql` | Canonical version in `fix-rls.sql` marked as authoritative; other files retain but documented |

---

## 🛡️ ERROR HANDLING & BOUNDARY CHECKS — FIXED

| ID | Issue | Files Changed | Summary |
|----|-------|---------------|---------|
| **EH-01** | Missing ErrorBoundary on auth pages | `src/pages/{Login,Signup,ForgotPassword,ResetPassword,VerifyEmail}Page.jsx` | Wrapped all auth page content in `<ErrorBoundary>` |
| **EH-06** | Curriculum load — no retry backoff | `src/contexts/DashboardContext.jsx` | Added `loadAttempts` state + exponential backoff (max 3 attempts) |
| **EH-06** | LessonPlayer key fix (FL-06) | `src/components/DashboardShell.jsx` | Added `key={selectedTask.id}` |

---

## ⚡ PERFORMANCE & CODE QUALITY — FIXED

| ID | Issue | Files Changed | Summary |
|----|-------|---------------|---------|
| **PQ-02** | `snapshotsEqual` uses `JSON.stringify` | `src/hooks/useProgress.js` | Replaced with shallow field-by-field comparison |
| **PQ-04** | `detectLanguage` regex on every char | `src/utils/edgeSpeech.js` | Added `langCache` Map (max 1000 entries) |

---

## 📦 NEW FILES CREATED

| File | Purpose |
|------|---------|
| `supabase/migrations/20260904_tts_rate_limit_persistent.sql` | Persistent TTS rate limiting (replaces in-memory Maps) |
| `supabase/migrations/20260904_fix_game_weekly_xp.sql` | Historical game XP repair (from earlier fix) |
| `QA_AUDIT_REPORT.md` | Full QA audit report |
| `FIXES_APPLIED.md` | This file |

---

## ⚠️ REMAINING KNOWN ISSUES (Not Fixed in This Pass)

| ID | Issue | Reason |
|----|-------|--------|
| **AS-07** | Password policy too weak | Requires new dependency (`zxcvbn` or similar); out of scope |
| **SM-01** | `handle_new_user` in 4 files | Consolidation requires careful migration coordination; canonical version documented |
| **SM-02** | `notification_preferences` default duplication | Documented; all three locations must stay identical |
| **SM-04** | `community_upvotes` unique constraint order | Both `(user_id, post_id)` and `(post_id, user_id)` functionally equivalent |
| **SM-05** | Migration 20260819 re-defines tables | Would require migration squash; low risk |
| **EH-07** | Lazy view chunk-load error handling | Global ErrorBoundary catches; UX improvement deferred |
| **PQ-01** | DashboardContext mega-memo (50+ deps) | Requires context splitting or Zustand; architectural change |

---

## 🎯 VERIFICATION

```bash
npm run lint   # ✅ PASS (0 errors, 0 warnings)
npm test       # ✅ PASS (12 test files, 63 tests)
npm run build  # ✅ PASS (1.45s, chunks unchanged)
```

---

## 📝 NOTES FOR NEXT SESSION

1. **Schema changes require Supabase migration**: Run the new migration files (`20260904_tts_rate_limit_persistent.sql`, `20260904_fix_game_weekly_xp.sql`) in Supabase SQL Editor.
2. **Environment variables**: Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set; app now throws on missing config.
3. **TTS rate limiting**: Requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel environment for the serverless function.
4. **CSP trusted-types**: Test in production; may need adjustment for third-party scripts.
5. **Future**: Consider consolidating `handle_new_user` into single migration; split DashboardContext for performance.