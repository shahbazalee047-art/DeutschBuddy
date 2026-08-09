# AGENTS.md

DeutschBuddy: a gamified German-learning PWA (React 19 + Vite 8 + Tailwind 4 + Supabase + Capacitor). Plain JS/JSX — **no TypeScript**. npm only.

## Commands

- `npm run dev` — Vite dev server. Serves the TTS endpoint itself (see TTS below).
- `npm test` — vitest run (jsdom). Single test: `npx vitest run src/utils/topicTitle.test.js`
- `npm run lint` — eslint (flat config, `eslint.config.js`). No formatter/prettier is configured; semicolon style is intentionally mixed.
- `npm run build` — `ANALYZE=true npm run build` additionally writes `dist/stats.json` (bundle report).
- Verify order after changes: `npm run lint && npm test`.

Test quirks: `src/test/setup.js` mocks `localStorage` and swallows act() warnings; `src/components/DashboardShell.integration.test.jsx` is slow (~4s) and exercises the full shell — don't run it in a loop. Tests are colocated as `*.test.js(x)`.

## TTS (most likely to be mis-guessed)

Pronunciation is Edge TTS via `POST /api/tts` (`src/utils/edgeSpeech.js`, voice `de-DE-KatjaNeural` by default).

- **Dev:** the endpoint is a Vite middleware plugin defined in `vite.config.js` (`ttsApiPlugin`) — no server needed.
- **Prod:** Vercel serverless function `api/tts.js` (only the `api/` dir is server-side; `vercel.json` rewrites everything else to `index.html`).
- **Capacitor/Android:** same-origin `/api/tts` doesn't exist on device — `VITE_TTS_API_URL` must point at the deployed backend. There is a Web Speech API fallback in the hook (`src/hooks/useSpeech.js`).

## Architecture

- React Router only covers auth/onboarding (`src/App.jsx`). After login the whole app is `DashboardShell` + `DashboardContext` with internal `activeView`/`selectedDay`/`selectedTask` state (`src/components/DashboardShell.jsx`) — **new screens are views/components, not routes**.
- Curriculum lives in `src/data/` as plain JS modules: `a1SpoonfedModules.js` (10 modules), `a1FastTrackData.js`, `a2Data.js`. Task shape: `{ id: 'a1m1d1t1', type, xp, content }` where the id encodes module/day/task and **is the progress key** — ids must be unique and stable. Task `type` values are dispatched in `src/components/TaskRenderer.jsx` (grammar, vocabulary, quiz, listening, flashcards, matching, fillblank, scramble, speaking, writing, review, roleplay, fun, quickwin); add a new type there.
- Per-level word lists: `genderWords.js`, `pictureWords.js`, `speedBlitzWords.js`.
- Progress: `src/hooks/useProgress.js` — localStorage key `db_progress_${userId}_${level}` always written, synced to Supabase `progress` table (upsert on `user_id,level`). App works signed-out with localStorage only. RLS limits rows to own `user_id`; schema in `supabase/schema.sql` (+ `fix-rls.sql`, `community-schema.sql`).
- Missing `.env` vars → Supabase client uses placeholder values and auth silently doesn't work (`src/lib/supabase.js` warns only).

## Styling

Tailwind CSS 4 CSS-first config: `@theme` tokens in `src/index.css` referencing `--db-*` CSS variables (dark "Warm Editorial Luxury" design system; details in `ux_refactor_instruction.txt`). **No `tailwind.config` file.**

## Gotchas

- `public/sw.js` has a `CACHE_VERSION` constant — bump it when changing any asset/HTML so the PWA update flow (`UpdateToast`) picks up changes.
- Buddy mascot images in `public/buddy/*.webp` are generated from `Buddy.png` via `node scripts/process-buddy.mjs` (sharp). Raw sources live in `public/buddy/raw/` (gitignored). Icon sizes (192/512) must be exact — a past commit fixed mislabeled sizes.
- Android: `capacitor.config.json` (webDir `dist`); after a build run `npx cap sync`. `android/app/src/main/assets/public` is eslint-ignored.
- `src/data/*.bak`, `*_header.js`, `*_footer.js` are gitignored generator artifacts — don't commit them.
- Commit messages follow conventional style (`feat:`/`fix:`/`perf:`); feature branches not required.
- `PROJECT_DOCUMENTATION.md` is the long-form architecture/session-history doc — often stale vs. code (e.g., README's structure lists a non-existent `a1Data.js`); trust the code.
