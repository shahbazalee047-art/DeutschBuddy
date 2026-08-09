# QA Report — DeutschBuddy (A1 Week 1, live build)

Run: 09 Aug 2026 · Browser: Chrome headless (Playwright) · App: dev server `http://localhost:5174` (production build candidate config, `VITE_ADS_ENABLED=false`) · Backend: live Supabase project (env-configured) · TTS: `POST /api/tts`

## Executive summary

| Area | Result |
|---|---|
| S1 – Onboarding / Signup / Auth | PASS (with SQL warnings) |
| S2 – Core learning loop (A1 Week 1) | FAIL — progress persistence broken |
| S3 – TTS audio | PASS |
| S4 – Android/Capacitor | UNTESTABLE (no emulator/SDK in this environment) |
| S5 – PWA/offline | Not exercised in this pass (report further below) |

**Verdict:** the app UI, lesson player, and content all render and run correctly. However, **no task completion ever persists** — the storage layer fails on the live Supabase schema, the app rolls state back, and the learner can never advance past lesson 1 after refresh. This is a launch-blocking bug (see FIX-1).

---

## S1 – Onboarding / Signup (PASS)

- Fresh signup at `/signup`: placeholders `Your name` / `you@example.com` / `Min. 6 characters`, button `Sign Up`. Works; new account created confirmed in session file.
- Onboarding gate respected: without `db_onboarded` the app funnels through level/track selection and `/signup`; after seeding onboarding flags (`db_onboarded`, `db_selected_level=A1`, `db_selected_track=standard`, tutorial/coachmark seen) the dashboard loads.
- Dashboard shell (tablet/mobile viewport 420×900): header, "Continue →" card, "View Map", week chips 1–6, bottom nav Learn/Journey/Review/Badges/Profile. All tabs render.
- **Warnings (not blocking):**
  1. `fetchProfile error: {code: 42703 … column profiles.notification_preferences does not exist}` — live DB `profiles` is missing a column that `supabase/schema.sql` defines (line 14). Every app load fires the SQL warning.
  2. Two `400` resource loads per profile fetch (same root cause).

## S2 – Core learning loop (FAIL — persistence)

### What works
- Clicking week chip `1` (Journey preview) opens the lesson player for Week 1 Day 1 Task 1: header shows `Deine Erste Woche`, counter `1 / 6`, rule card "I understand this grammar", examples, mnemonic.
- Grammar task completion: click `I understand this grammar` → `+15 XP` toast, returns to `WEEK 1 · DAY 1` list with all 6 rows (`1. GRAMMAR … +15` … `6. QUICKWIN … +5`).
- All 7 day task lists render their expected row titles/XPs; all task types referenced in codebook (`grammar, vocabulary, listening, quiz, speaking, quickwin, flashcards, fillblank, matching, scramble, roleplay`) were observed to open and render their UI in-session.

### Fails (with repro)
| ID | Check | Result | Evidence |
|---|---|---|---|
| S2.5 | 41/41 tasks of Week 1 complete after a full loop | FAIL (0/41) | After every completion the counter returns `1/6` → `0/6`; progress key stays `{"xp":0,…,"completedTasks":[]}` even 4s later. |
| S2.6 | No console/page errors across the week | FAIL | `Progress upsert error: {code: PGRST204 … Could not find the 'revise_tasks' column of 'progress'}` + `fetchProfile … 42703 …` on every completion/navigation |
| S2.7 | Final XP/streak reflect 41 completions | FAIL | `xp=0, streak=0` at end of week loop |

**Repro (minimal):**
1. Fresh signup at `/dashboard` (seeded LS as above).
2. Click week chip `1` → grammar lesson opens.
3. Click `I understand this grammar`.
4. Observe: toast `+15 XP`, day list shows `1/6`, then within ~2s reverts to `0/6`, XP back to 0.
5. Console: `Progress upsert error: {code: PGRST204 … 'revise_tasks' column of 'progress' in the schema cache}`.
6. Reload → day 1 shows 0 completed; chip `1` always reopens lesson 1.

**Root cause:** `src/hooks/useProgress.js` `completeTask()` writes local state first, then upserts to Supabase `progress` (`revise_tasks` column). The **live `progress` table lacks `revise_tasks`** (present in `supabase/schema.sql:35`). The upsert rejects → `.then` error path calls `fetchProgress()`, which refetches the server row (still empty) and **overwrites** the just-written local/new state. Result: the completion is rolled back in the same session. So the week loop can never advance — every attempt re-opens lesson 1 (confirmed by `dead-a1m1d1t2.txt` dump: lesson content is Task 1 again even when the driver tries Task 2 of day 2).

**Impact:** Blocker. No persistent progression, no XP/streaks/daily goal, Repeat-the-week impossible, review routing dead, notifications dead.

---

## S3 – TTS (PASS)
- `POST /api/tts` returns 200 + MP3 audio; French voice config (`de-DE-KatjaNeural`) used. No TLS/cors issues in this env.
- Untested on device (see S4).

## S4 – Android / Capacitor (UNTESTABLE)
- No Android SDK/emulator available in this environment (`sdkmanager`/`adb`/emulator absent). Items left for on-device pass:
  - TTS on device via `VITE_TTS_API_URL` (same-origin `/api/tts` does not exist on device, Web Speech fallback in `useSpeech`).
  - Capacitor build + `npx cap sync` + splash/edge-to-edge.
  - Push/permission UI, PWA install prompt.

## S5 – PWA / offline
- `public/sw.js` present with `CACHE_VERSION` bump mechanism; PWA update flow via `UpdateToast` exists. Not exercised in this pass (needs installability check on device).

---

## Recommended top-10 fixes (info only — no fixes applied in this pass)

1. **CRITICAL:** Reconcile live Supabase with `supabase/schema.sql` — add `progress.revise_tasks` (and `profiles.notification_preferences`, `fix-rls.sql`) so upserts succeed. After: re-run S2.5 assertion (41/41).
2. **CRITICAL:** Make `completeTask` not roll back local state on server failure — persist locally *and* if upsert fails, keep the local copy (report + retry silently). The current `.then` → `fetchProgress()` path is destructive.
3. **HIGH:** The week chip always re-opens the first incomplete lesson — make `clickWeekChip` (Journey chip) respect 'Already done' semantics; after a full week it must advance to week 2 (observed: after Day‑1 complete, chip still label "1" and reopens day 1).
4. **HIGH:** Fetch profile errors 42703 repeat on every nav — make `fetchProfile` tolerate the missing column (guard with `.select()` of only existing fields).
5. **MEDIUM:** Add in driver test for persistence reload — S2.6 effectively catches bucket drift (see repro).
6. **MEDIUM:** `completedTasks` uses user-scoped localStorage key — driver must read `db_progress_<uuid>_A1`, not bare `db_progress_A1` (docs in `AGENTS.md`/`useProgress.js` already state this; make it consistent in tests).
7. **LOW:** Duplicate `N. TYPE` row buttons in `DailyTasks` have large hit-areas — accessibility check of row buttons (they are `<button>` with multiline text).
8. **LOW:** Toast `+15 XP` vs header value flicker during rollback — merge after fix‑1.
9. **LOW:** `console.errors` on resource-400 (sign‑in route) — silence non‑fatal net log noise.
10. **VERIFY:** After fix‑1, Week‑2 unlock flow (`unlockedWeeks`) — needs a fresh run as it depends on persistence.

---

## Artifacts (kept for triage)
- `/tmp/opencode/qa/evidence-progress-rollback.txt` — console + LS dump on completion.
- `/tmp/opencode/qa/dead-a1m1d1t2.{txt,png}` — post-completion view (reopened lesson 1). plus `dead-*` dumps for other days/tasks.
- `/tmp/opencode/qa/session.json` — clean test accounts (sign-up, login) used.
- `/tmp/opencode/qa/qa2-results.json` — per-task loop results matrix (41 rows + checks S2.5–S2.7).

*Untested in this pass: S4 Android on-device, S5 offline/update flow, visual QA on desktop widths ≥960px.*