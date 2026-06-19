# DeutschBuddy - Complete Project Documentation

> **Repository:** `shahbazalee047-art/DeutschBuddy`
> **Live URL:** https://deutsch-buddy-murex.vercel.app
> **Supabase Project:** `jqytrdjfojogyoxmknmg.supabase.co`
> **Last Updated:** June 20, 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture & Structure](#3-architecture--structure)
4. [Session History](#4-session-history)
5. [Design System](#5-design-system)
6. [Features & Components](#6-features--components)
7. [Database Schema](#7-database-schema)
8. [Deployment & Configuration](#8-deployment--configuration)
9. [Known Issues & Fixes](#9-known-issues--fixes)
10. [File Structure](#10-file-structure)

---

## 1. Project Overview

**DeutschBuddy** is a premium, gamified React web application that helps students self-study German to CEFR levels A1 (Beginner) and A2 (Elementary).

### Core Concept
- Two independent tabs: **A1 Beginner** and **A2 Elementary**
- Each tab has an **8-week structured curriculum** with daily tasks
- A1 offers a **Fast Track** option (4-6 weeks compressed)
- Gamification: XP points, streaks, badges, progress tracking
- Interactive exercises: vocabulary, grammar, quizzes, flashcards, matching, fill-in-the-blank, word scramble, speaking, writing, listening, roleplay
- Premium "Quick German Tool" for instant verb conjugation lookup
- Community section for Q&A and discussion
- Notification system for reminders and achievements
- Profile with stats and settings
- Dark/Light theme toggle via ThemeContext

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19.2.6 |
| **Build Tool** | Vite 8.0.12 |
| **Styling** | Tailwind CSS v4 (`@import "tailwindcss"` + `@tailwindcss/vite`) |
| **Routing** | React Router v7 |
| **Backend** | Supabase (Auth + PostgreSQL + RLS) |
| **State** | React Context + Hooks |
| **Fonts** | Inter (body) + Poppins (headings) via Google Fonts |
| **PWA** | Service worker + Web App Manifest |
| **Deployment** | Vercel (auto-deploy from GitHub) |

### Key Dependencies
```json
{
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "react-router-dom": "^7.17.0",
  "@supabase/supabase-js": "^2.x",
  "tailwindcss": "^4.3.1",
  "@tailwindcss/vite": "^4.3.1",
  "vite": "^8.0.12"
}
```

---

## 3. Architecture & Structure

### Project Root
```
german-learning/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   ├── icon-192.png           # PWA icon 192x192
│   └── icon-512.png           # PWA icon 512x512
├── src/
│   ├── components/            # 45+ React components
│   ├── contexts/
│   │   ├── AuthContext.jsx    # Supabase auth provider
│   │   └── ThemeContext.jsx   # Light/dark theme provider
│   ├── hooks/
│   │   └── useProgress.js     # Progress state + Supabase sync
│   ├── lib/
│   │   └── supabase.js        # Supabase client init
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── ResetPasswordPage.jsx
│   │   └── OnboardingPage.jsx
│   ├── data/
│   │   ├── a1Data.js          # A1 curriculum (8 weeks)
│   │   ├── a2Data.js          # A2 curriculum (8 weeks)
│   │   ├── a1FastTrackData.js # A1 fast track (6 weeks)
│   │   ├── genderWords.js     # GenderDungeon noun data (218 nouns)
│   │   ├── pictureWords.js    # PictureMatch game data (200 words)
│   │   └── speedBlitzWords.js # SpeedBlitz game data (150+ words per level)
│   ├── utils/
│   │   ├── progress.js        # Progress helpers
│   │   └── speech.js          # Text-to-speech (German)
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx               # Entry point + ErrorBoundary
│   └── index.css             # Tailwind v4 + custom classes
├── supabase/
│   ├── schema.sql             # Database schema
│   └── fix-rls.sql            # RLS policy fixes
├── vercel.json                # SPA routing config
├── .env                       # Supabase credentials
└── package.json
```

### Routing
- `/login` → Login page
- `/signup` → Signup page
- `/forgot-password` → Password reset request
- `/reset-password` → Password reset form
- `/dashboard` → Main app (protected)
- `*` → Redirects to `/dashboard`

### Component Hierarchy
```
App
├── AuthProvider (Supabase session)
├── ThemeProvider (light/dark mode)
│   ├── LoginPage / SignupPage / etc.
│   └── ProtectedRoute → Dashboard
│       ├── Navbar (desktop) + MobileHeader
│       ├── BottomNav (mobile)
│       ├── QuickGermanTool (modal)
│       ├── NotificationPanel (slide-in)
│       ├── DayCompleteCelebration
│       ├── MainContent (2-col on desktop)
│       │   ├── WeeklyModule (week cards)
│       │   ├── DailyTasks (task list)
│       │   ├── TaskRenderer → 15+ task types
│       │   ├── ProgressDashboard
│       │   ├── BadgeGallery
│       │   ├── CommunitySection
│       │   ├── ResourceLibrary
│       │   └── ProfilePage
│       └── RightPanel (sidebar)
│           ├── InlineVerbLookup
│           ├── Stats Card
│           ├── Tip of the Day
│           └── Did You Know?
```

---

## 4. Session History

### Session Timeline (chronological)

#### Phase 0: Initial Build (Previous Sessions)
- Scaffolded Vite + React 19 project
- Installed dependencies: react, react-dom, react-icons, lucide-react, react-router-dom
- Created basic A1/A2 curriculum data files
- Built initial components: WeeklyModule, DailyTasks, Vocabulary, Quiz, Flashcards, etc.
- Connected Supabase for auth and progress tracking
- Added PWA support (manifest, service worker, icons)
- Multiple theme iterations (Electric Lime, Slate Navy, German Flag, Premium Beige) all reverted

#### Phase 1 MVP (Commit: a00780e)
- **Original Premium Warm Theme**: `#FAF6F0` cream background, `#B8860B` dark gold accent
- **CSS Classes**: `.paper-card`, `.paper-input`, `.btn-primary`, `.btn-secondary`, `.progress-bar`, `.day-circle`
- **Auth Pages**: Login, Signup, Forgot/Reset Password with paper-card styling
- **Dashboard**: Greeting, track toggle, continue card, weekly modules, day circles
- **Right Panel**: Verb lookup, stats, tip of the day, did you know
- **15 Task Components**: Vocabulary, Quiz, FillBlank, Matching, Flashcards, Speaking, Writing, Grammar, Fun, QuickWin, ListeningTask, Scramble, Review, Roleplay, SpeakerButton

#### Phase 2 (Commit: 348d850)
- **Onboarding**: 3-slide welcome flow + level selection
- **Notifications**: Panel with 5 notification types
- **Community**: Post cards with categories, upvotes, comments
- **Profile**: User stats, settings, sign out
- **Navbar**: Notification bell, community link, profile dropdown

#### Phase 3 (Commit: ffdbceb)
- **Progress Dashboard**: Activity calendar, skill breakdown, learning stats
- **Badge Gallery**: Stats summary, detail modal, 15 badges
- **Verb Lookup**: Verb of the day, recent searches, quick select

#### Phase 4 (Commit: cb29e4f)
- **Profile Page**: Full profile with avatar, stats, settings
- **PWA Manifest**: Updated theme colors

#### Phase 5: Electric Lime & Midnight Finalization (Commit: e68a5ca)
- **Design System Overhaul**: Complete migration to Electric Lime & Midnight (`#18181B` bg, `#A3E635` lime, `#06B6D4` cyan)
- **Theme Migration**: Rewrote `index.css` with dark zinc/lime/cyan tokens; migrated all 20+ components, all auth pages, onboarding, error boundary, mascot, certificate
- **A2 Data Expansion**: Generated weeks 3–8 curriculum (grammar, vocab, quizzes, listening, speaking, roleplay, writing, review) via Python generator
- **Interactive Features**: Logo routing, profile badge routing, bottom nav badges isolation, notification panel navigation, history stack + Android back button, date-locked Tip of the Day, login-triggered Did You Know
- **Config Updates**: `index.html` theme-color → `#18181B`, `manifest.json` → `#18181B` / `#A3E635`
- **Build**: `npm run build` passes, 111 modules, ~2s build time

#### Phase 6: SpeedBlitz & UI Polish (Commit: efa9f21)
- **SpeedBlitz Game**: Add timed vocabulary game with A1/A2 word banks (150 words each)
- **Inter Font**: Replaced DM Sans with Inter for better readability
- **XP Toast**: Animated toast notification on task completion
- **Skeleton Loading**: Added Skeleton components for loading states
- **BottomNav Upgrade**: Gradient active state with indicator dot
- **WeeklyModule Upgrade**: Thicker progress bar, day-dot timeline
- **RightPanel Upgrade**: SVG milestone ring chart
- **Animations**: Streak fire animation, bell ring animation, slide transitions

#### Phase 7: GenderDungeon, PictureMatch, StreakGuardian (Commit: e40ad45)
- **GenderDungeon Game**: Der Die Das falling-bar game with 218 nouns, 3 lives system
- **PictureMatch Game**: Emoji-based picture cards (200 cards, A1/A2 levels)
- **StreakGuardian**: 3-question quiz to recover streak after 3+ idle days
- **recoverStreak**: Added to useProgress hook for streak recovery
- **Tip Consolidation**: Moved Tip of the Day and Did You Know to NotificationPanel
- **MobileSidebar Cleanup**: Removed tip/fact sections, reduced scrolling

#### Phase 8: TrackToggle & Per-Button Gradients (Commit: 1c0d0c8, 427aa91, d945e22)
- **TrackToggle Polish**: Per-button gradient overlay with opacity cross-fade
- **Mobile Header**: Profile menu uses handleViewChange for consistent navigation
- **Desktop Layout Fix**: Two-column grid structure

#### Phase 9: Light/Dark Theme Overhaul (Commit: 7b928d2)
- **ThemeContext**: Full light/dark mode theming with CSS variables
- **Theme Toggle**: Settings page and navbar theme switcher
- **CSS Variables**: Consistent theming across all components

#### Phase 10: Auth & Progress Reliability (Commit: 48313a6)
- **AuthContext Refactor**: Migrated to `useCallback`/`useRef` pattern with `mountedRef` to prevent state updates after unmount, `profileFetchedRef` for deduplication, and `refreshProfile` for manual refresh. Error handling with `PGRST116` tolerance.
- **useProgress Refactor**: Replaced direct dependencies with `useRef` snapshots to avoid stale closures. Added `Set`-based deduplication of `completedTasks`. Added `exercise_results` insert on task completion. Added `localStorage` fallback for offline resilience. Added `recoverStreak` function. Error handling with auto-refetch on upsert failure.
- **SQL Enhancements**: Added `idx_progress_user_level` composite index. Comprehensive RLS policies for `DELETE` and `UPDATE` on all tables. Recreated `handle_new_user()` trigger to auto-create both A1 and A2 progress rows on signup with `ON CONFLICT DO NOTHING` safety.

#### Bug Fixes (Various Commits)
- Mobile missing sections → Added BottomNav component
- Resources section empty → Added fallback resources
- Desktop layout broken → Two-column grid
- Android back button exits to login → Added `popstate` event handler
- Notification items not routable → Added `onNavigate` callback
- ProfilePage crashes useProgress → Removed hook, read from context
- A2 weeks 3-8 data broken → Extracted to `makeWeeks3to8()` helper

---

## 5. Design System

### Color Palette (Dark Mode - Default)
| Token | Value | Usage |
|-------|-------|-------|
| Primary BG | `#18181B` | Page background (zinc-900 ultra-dark) |
| Card BG | `#1E1E24` | .glass-card surface |
| Card Alt | `#20202A` | Alternate card surface |
| Accent Primary | `#A3E635` | Electric Lime (buttons, XP, active states, progress) |
| Accent Secondary | `#06B6D4` | Cyan (gradients, secondary buttons, links) |
| Success | `#22C55E` | Green (completed tasks) |
| Warning | `#F59E0B` | Amber (streaks, warnings) |
| Error | `#EF4444` | Red (errors) |
| Info | `#3B82F6` | Blue (notifications) |
| Border | `#27272A` | zinc-800 (subtle borders) |
| Primary Text | `#F4F4F5` | zinc-100 (headings) |
| Body Text | `#A1A1AA` | zinc-400 (body) |
| Muted Text | `#71717A` | zinc-500 (muted) |

### Color Palette (Light Mode)
| Token | Value |
|-------|-------|
| Primary BG | `#FAFAFA` |
| Card BG | `#FFFFFF` |
| Text Primary | `#18181B` |
| Text Secondary | `#52525B` |
| Border | `#E4E4E7` |

### Typography
- **Headings**: Poppins (bold, extrabold)
- **Body**: Inter (regular, medium, semibold)

### Spacing
- 8px grid system
- Card padding: 20-24px
- Border radius: 12-20px
- Component gaps: 8-16px

### CSS Classes
- `.glass-card` — Dark zinc card with subtle border (`bg-zinc-900/60 border border-zinc-800/50`)
- `.paper-card` — Ultra-dark surface card (`bg-[#1E1E24]`)
- `.paper-input` — Dark input field with lime focus ring
- `.btn-primary` — Lime gradient button (`from-lime-500 to-lime-600`)
- `.btn-secondary` — Zinc button with cyan border
- `.btn-text` — No background, cyan text
- `.progress-bar` / `.progress-bar-fill` — Lime gradient progress indicators
- `.day-circle` / `.day-circle-completed` / `.day-circle-current` — Dark day circles with lime glow

---

## 6. Features & Components

### 17+ Task Types
| Type | Component | Description |
|------|-----------|-------------|
| vocabulary | Vocabulary.jsx | Word lists with gender colors, audio |
| grammar | Grammar.jsx | Rule explanation + examples |
| quiz | Quiz.jsx | Multiple choice questions |
| flashcards | Flashcards.jsx | Flip-card review system |
| matching | Matching.jsx | German-English matching game |
| fillblank | FillBlank.jsx | Fill-in-the-blank exercises |
| scramble | Scramble.jsx | Word unscramble game |
| speaking | Speaking.jsx | Oral practice prompts |
| writing | Writing.jsx | Writing exercises |
| listening | ListeningTask.jsx | Audio comprehension |
| review | Review.jsx | Week review quizzes |
| roleplay | Roleplay.jsx | Scenario practice |
| fun | Fun.jsx | Jokes, facts, memes |
| quickwin | QuickWin.jsx | Quick daily wins |
| speedblitz | SpeedBlitz.jsx | Timed vocabulary challenge |
| genderdungeon | GenderDungeon.jsx | Der Die Das falling-bar game |
| picturematch | PictureMatch.jsx | Emoji picture matching |

### Interactive Features
- **SpeakerButton**: Text-to-speech using Web Speech API (`de-DE` voice)
- **QuickGermanTool**: Instant verb conjugation for 20+ common German verbs
- **DayCompleteCelebration**: Confetti animation on day completion
- **ConfettiEffect**: Particle system for celebrations
- **StreakGuardian**: 3-question quiz to recover broken streaks
- **XpToast**: Animated XP notification on task completion

### Gamification
- **XP System**: Points earned per task
- **Streak Tracking**: Daily study streak with fire animation
- **StreakGuardian**: Recover streak after 3+ idle days
- **15 Badges**: From First Steps to XP Legend
- **Progress Bars**: Lime gradient fill with percentage
- **Day Circles**: Visual progress through weekly modules

### Games
- **SpeedBlitz**: Timed vocabulary matching (150+ words per level)
- **GenderDungeon**: Der/Die/Das falling-bar game with 3 lives (218 nouns)
- **PictureMatch**: Emoji-based picture matching game (200 cards)

---

## 7. Database Schema

### Tables (Supabase PostgreSQL)

```sql
-- User profiles (auto-created via trigger)
profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  full_name text,
  email text,
  avatar_url text,
  selected_pacing text DEFAULT 'standard',
  created_at timestamptz,
  updated_at timestamptz
)

-- Progress per user per level
progress (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles,
  level text CHECK (level IN ('A1', 'A2')),
  xp integer DEFAULT 0,
  streak integer DEFAULT 0,
  last_study_date date,
  completed_tasks text[] DEFAULT '{}',
  badges jsonb DEFAULT '[]',
  unlocked_weeks integer[] DEFAULT '{1}',
  weekly_xp jsonb DEFAULT '{}'
)

-- Exercise results (with FK to progress for referential integrity)
exercise_results (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles,
  level text,
  week_id integer,
  day_number integer,
  task_id text,
  task_type text,
  score integer,
  max_score integer,
  completed boolean
)

-- Mock exam scores
exam_scores (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles,
  level text,
  exam_type text,
  lesen_score integer,
  hoeren_score integer,
  schreiben_score integer,
  sprechen_score integer,
  total_score integer
)
```

### Indexes
- `idx_progress_user_level` on `progress(user_id, level)` — optimizes per-user/per-level progress queries

### Row Level Security
- All tables have RLS enabled
- Users can only read/write/update/delete their own data (`auth.uid() = id` or `auth.uid() = user_id`)
- Auto-profile creation via database trigger on signup (also auto-creates A1 + A2 progress rows)

### Trigger: handle_new_user()
Automatically creates profile and progress rows on signup:
```sql
INSERT INTO public.profiles (id, full_name, email) VALUES (new.id, ...)
INSERT INTO public.progress (user_id, level) VALUES (new.id, 'A1') ON CONFLICT DO NOTHING
INSERT INTO public.progress (user_id, level) VALUES (new.id, 'A2') ON CONFLICT DO NOTHING
```

---

## 8. Deployment & Configuration

### Environment Variables
```
VITE_SUPABASE_URL=https://jqytrdjfojogyoxmknmg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### Vercel Config (`vercel.json`)
```json
{
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```

### PWA Manifest
- `start_url`: `/login`
- `display`: `standalone`
- `background_color`: `#18181B`
- `theme_color`: `#A3E635`
- Icons: 192x192 and 512x512 PNG

### Service Worker
- Network-first caching strategy
- Caches app shell and navigation routes
- Auto-updates on new deployments
- Version-based cache invalidation

### Supabase Setup
1. Run `supabase/schema.sql` in SQL Editor
2. If RLS errors occur, run `supabase/fix-rls.sql`
3. Set "Site URL" in Authentication → URL Configuration to `https://deutsch-buddy-murex.vercel.app`
4. Add redirect URL: `https://deutsch-buddy-murex.vercel.app/**`

---

## 9. Known Issues & Fixes

### Fixed Issues
| Issue | Fix | Commit |
|-------|-----|--------|
| Mobile missing sections | Added BottomNav component | Various |
| Resources section empty | Added fallback resources | Various |
| Desktop layout broken | Two-column grid `lg:grid-cols-3` | Various |
| Android back button exits to login | Added `popstate` event handler | Various |
| Notification items not routable | Added `onNavigate` callback | Various |
| ProfilePage crashes useProgress | Uses context instead of local hook | Various |
| A2 weeks 3-8 empty | Generated full curriculum via Python script | Phase 5 |
| Premium Beige theme remnants | Migrated to Electric Lime & Midnight | Phase 5 |
| 669 kB main chunk warning | Code splitting via React.lazy | Phase 5 |
| SpeedBlitz game | Timed vocabulary challenge | efa9f21 |
| XP toast notification | Animated toast on task completion | efa9f21 |
| Skeleton loading | Loading state components | efa9f21 |
| GenderDungeon game | Der Die Das falling-bar game | e40ad45 |
| PictureMatch game | Emoji picture matching | e40ad45 |
| StreakGuardian | Streak recovery quiz | e40ad45 |
| TrackToggle gradient overlay | Per-button gradient with cross-fade | 1c0d0c8 |
| Light/dark theme | ThemeContext with CSS variables | 7b928d2 |
| AuthContext stale closures | useCallback/useRef pattern | 48313a6 |
| useProgress stale closures | Ref-based state snapshots | 48313a6 |
| useProgress localStorage fallback | Offline progress persistence | 48313a6 |
| useProgress recoverStreak | Streak recovery function | 48313a6 |
| useProgress exercise_results | Task tracking in database | 48313a6 |
| RLS missing DELETE/UPDATE | Comprehensive CRUD policies | 48313a6 |
| New users missing A2 progress | handle_new_user() creates both rows | 48313a6 |

### Remaining Known Issues
- Notification items could be more dynamically routable
- Community section uses static mock data (not from database)

### Important Notes for New Sessions
- **Node.js**: Must load via nvm: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"`
- **Tailwind v4**: Uses `@import "tailwindcss"` (not v3 syntax). Custom tokens in `@theme {}` block inside `index.css`
- **Theme**: Electric Lime & Midnight dark mode (default), Light mode available via toggle
- **Code splitting**: Curriculum data (a1Data, a2Data, a1FastTrackData) loaded dynamically via `import()` based on active level; heavy view components use `React.lazy()`
- **No social auth**: Email/password only (Google/GitHub removed)
- **No demo mode**: Removed entirely
- **Footer**: "Made with ❤️ by Shahbaz Ali" (native heart emoji)
- **No em/en dashes** in UI text
- **A1 fast track**: Separate data file `a1FastTrackData.js` (6 weeks)
- **A2 fixed**: 8-week track, no fast option
- **Supabase RLS**: Must be applied via SQL Editor. `fix-rls.sql` includes DELETE/UPDATE policies and auto-create trigger.
- **AuthContext**: Uses `useCallback` + `useRef` pattern with `mountedRef` and `profileFetchedRef` to prevent stale closures.
- **useProgress**: Uses refs (`userRef`, `levelRef`, `progressRef`) for async operations. Includes localStorage fallback for offline resilience. `recoverStreak()` available for streak recovery.
- **Vercel**: Auto-deploys from GitHub push to `main` branch
- **PWA**: Installable, offline-capable, standalone mode

---

## 10. File Structure

```
german-learning/
├── public/
│   ├── manifest.json
│   ├── sw.js
│   ├── icon-192.png
│   └── icon-512.png
├── src/
│   ├── components/
│   │   ├── BadgeGallery.jsx        # Badge grid + detail modal
│   │   ├── BottomNav.jsx           # Mobile bottom navigation
│   │   ├── Certificate.jsx         # Completion certificate
│   │   ├── CommunitySection.jsx    # Community posts
│   │   ├── ConfettiEffect.jsx      # Celebration animations
│   │   ├── DailyTasks.jsx          # Day task list
│   │   ├── ErrorBoundary.jsx       # Error catcher
│   │   ├── FillBlank.jsx           # Fill-in-the-blank
│   │   ├── Flashcards.jsx          # Flashcard system
│   │   ├── Footer.jsx              # Site footer
│   │   ├── Fun.jsx                 # Fun facts/jokes
│   │   ├── GenderDungeon.jsx       # Der Die Das game
│   │   ├── Grammar.jsx             # Grammar lessons
│   │   ├── Icons.jsx                # SVG icon components
│   │   ├── JourneyMap.jsx           # Learning path map
│   │   ├── ListeningTask.jsx        # Audio comprehension
│   │   ├── MainContent.jsx          # Main content area
│   │   ├── Mascot.jsx               # App mascot
│   │   ├── Matching.jsx             # Matching game
│   │   ├── MobileSidebar.jsx        # Mobile sidebar
│   │   ├── Navbar.jsx               # Top navigation
│   │   ├── NotificationPanel.jsx    # Notifications slide-in
│   │   ├── PictureMatch.jsx         # Picture matching game
│   │   ├── ProfilePage.jsx          # User profile
│   │   ├── ProgressDashboard.jsx     # Stats & charts
│   │   ├── ProtectedRoute.jsx       # Auth guard
│   │   ├── QuickGermanTool.jsx      # Verb lookup modal
│   │   ├── QuickWin.jsx             # Quick daily wins
│   │   ├── Quiz.jsx                 # Multiple choice
│   │   ├── ResourceLibrary.jsx      # External resources
│   │   ├── Review.jsx               # Week review
│   │   ├── RightPanel.jsx           # Sidebar widgets
│   │   ├── Roleplay.jsx             # Scenario practice
│   │   ├── Scramble.jsx             # Word scramble
│   │   ├── SettingsPage.jsx         # Settings page
│   │   ├── Skeleton.jsx             # Loading skeletons
│   │   ├── SpeakerButton.jsx        # Text-to-speech
│   │   ├── Speaking.jsx             # Speaking practice
│   │   ├── SpeedBlitz.jsx           # Timed vocabulary game
│   │   ├── StreakGuardian.jsx       # Streak recovery quiz
│   │   ├── TaskRenderer.jsx          # Task type router
│   │   ├── TrackToggle.jsx          # Standard/Fast toggle
│   │   ├── Vocabulary.jsx           # Word lists
│   │   ├── WeeklyModule.jsx          # Week cards
│   │   ├── Writing.jsx              # Writing exercises
│   │   └── XpToast.jsx              # XP notification toast
│   ├── contexts/
│   │   ├── AuthContext.jsx          # Supabase auth provider
│   │   └── ThemeContext.jsx         # Light/dark theme provider
│   ├── hooks/
│   │   └── useProgress.js           # Progress + localStorage + Supabase sync
│   ├── lib/
│   │   └── supabase.js              # Supabase client
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── ResetPasswordPage.jsx
│   │   └── OnboardingPage.jsx
│   ├── data/
│   │   ├── a1Data.js                # A1 curriculum (8 weeks, ~900 lines)
│   │   ├── a2Data.js                # A2 curriculum (8 weeks)
│   │   ├── a1FastTrackData.js       # A1 fast track (6 weeks)
│   │   ├── genderWords.js           # GenderDungeon (218 nouns)
│   │   ├── pictureWords.js          # PictureMatch (200 words)
│   │   └── speedBlitzWords.js       # SpeedBlitz (150+ words per level)
│   ├── utils/
│   │   ├── progress.js             # Progress helpers
│   │   └── speech.js                # Text-to-speech
│   ├── App.jsx                      # Main app with routing + React.lazy
│   ├── main.jsx                     # Entry point + ErrorBoundary
│   └── index.css                    # Tailwind v4 + CSS variables + animations
├── supabase/
│   ├── schema.sql                   # Database schema with indexes
│   └── fix-rls.sql                  # Comprehensive RLS policies
├── vercel.json
├── .env
└── package.json
```

---

*This document was generated to preserve complete project context for AI handoff. It covers architecture, session history, design decisions, known issues, and deployment configuration.*