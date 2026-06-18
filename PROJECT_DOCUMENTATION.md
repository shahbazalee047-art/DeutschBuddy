# DeutschBuddy - Complete Project Documentation

> **Repository:** `shahbazalee047-art/DeutschBuddy`  
> **Live URL:** https://deutsch-buddy-murex.vercel.app  
> **Supabase Project:** `jqytrdjfojogyoxmknmg.supabase.co`  
> **Last Updated:** June 18, 2026  

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
│   ├── components/            # 30+ React components
│   ├── contexts/
│   │   └── AuthContext.jsx    # Supabase auth provider
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
│   │   └── a1FastTrackData.js # A1 fast track (6 weeks)
│   ├── utils/
│   │   ├── progress.js        # Progress helpers
│   │   └── speech.js          # Text-to-speech (German)
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx               # Entry point + ErrorBoundary
│   └── index.css              # Tailwind v4 + custom classes
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
│   ├── LoginPage / SignupPage / etc.
│   └── ProtectedRoute → Dashboard
│       ├── Navbar (desktop) + Mobile Header
│       ├── BottomNav (mobile)
│       ├── QuickGermanTool (modal)
│       ├── NotificationPanel (slide-in)
│       ├── DayCompleteCelebration
│       ├── Main Content (2-col on desktop)
│       │   ├── WeeklyModule (week cards)
│       │   ├── DailyTasks (task list)
│       │   ├── TaskRenderer → 12+ task types
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

#### Phase 5: Electric Lime & Midnight Finalization (Commit: TBD)
- **Design System Overhaul**: Complete migration to Electric Lime & Midnight (`#18181B` bg, `#A3E635` lime, `#06B6D4` cyan)
- **Theme Migration**: Rewrote `index.css` with dark zinc/lime/cyan tokens; migrated all 20+ components, all auth pages, onboarding, error boundary, mascot, certificate
- **A2 Data Expansion**: Generated weeks 3–8 curriculum (grammar, vocab, quizzes, listening, speaking, roleplay, writing, review) via Python generator
- **Interactive Features**: Logo routing, profile badge routing, bottom nav badges isolation, notification panel navigation, history stack + Android back button, date-locked Tip of the Day, login-triggered Did You Know
- **Config Updates**: `index.html` theme-color → `#18181B`, `manifest.json` → `#18181B` / `#A3E635`
- **Build**: `npm run build` passes, 111 modules, ~2s build time

#### Bug Fixes (Commits: 7facdc2, d9810a6, ef5db95, d129b13)
- Mobile bottom navigation added
- Resource library populated with 12 fallback resources
- Desktop two-column layout fixed
- Brand logo as clickable Link
- Notification routing fixed
- Android back button handling
- Error boundary added
- useProgress localStorage fallback
- ProfilePage useProgress call removed
- Unused useNavigate removed from Dashboard

#### Theme Evolution
1. **Electric Lime & Midnight** → First attempt, reverted
2. **Slate Navy** → Reverted
3. **German Flag (Black/Red/Gold)** → Reverted
4. **Premium Beige** → Reverted
5. **Electric Lime & Midnight (final)** → Current. `#18181B` zinc bg, `#A3E635` lime accent, `#06B6D4` cyan secondary, `bg-zinc-900` cards

---

## 5. Design System

### Color Palette
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

### 14+ Task Types
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

### Interactive Features
- **SpeakerButton**: Text-to-speech using Web Speech API (`de-DE` voice)
- **QuickGermanTool**: Instant verb conjugation for 20+ common German verbs
- **DayCompleteCelebration**: Confetti animation on day completion
- **ConfettiEffect**: Particle system for celebrations

### Gamification
- **XP System**: Points earned per task
- **Streak Tracking**: Daily study streak
- **15 Badges**: From First Steps to XP Legend
- **Progress Bars**: Lime gradient fill with percentage
- **Day Circles**: Visual progress through weekly modules

---

## 7. Database Schema

### Tables (Supabase PostgreSQL)

```sql
-- User profiles (auto-created via trigger)
profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  full_name text,
  email text,
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

-- Exercise results
exercise_results (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles,
  level text,
  week_id integer,
  task_id text,
  task_type text,
  score integer,
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

### Row Level Security
- All tables have RLS enabled
- Users can only read/write their own data (`auth.uid() = id` or `auth.uid() = user_id`)
- Auto-profile creation via database trigger on signup

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
| Mobile missing sections | Added BottomNav component | 7facdc2 |
| Resources section empty | Added 12 fallback resources | 7facdc2 |
| Desktop layout broken | Two-column grid `lg:grid-cols-3` | 7facdc2 |
| `useState` crash in ResourceLibrary | Added missing import | 7facdc2 |
| Android back button exits to login | Added `popstate` event handler | 7731157 |
| Notification items not routable | Added `onNavigate` callback | 7731157 |
| `useNavigate` undefined in Dashboard | Removed unused import | ef5db95 |
| ProfilePage crashes useProgress | Removed hook, read from localStorage | d129b13 |
| A2 weeks 3-8 data broken | Extracted to `makeWeeks3to8()` helper | Earlier |
| Logo not clickable | Changed button to `<Link to="/dashboard">` | Earlier |
| Premium Beige theme remnants | Migrated to Electric Lime & Midnight across all components | Phase 5 |
| Old PWA manifest colors | Updated to `#18181B` / `#A3E635` | Phase 5 |
| A2 weeks 3-8 empty | Generated full curriculum via Python script | Phase 5 |

### Remaining Known Issues
- Notification items could be more dynamically routable
- Community section uses static mock data (not from database)
- `BottomNav` has `safe-area-bottom` class but CSS not defined in Tailwind v4

### Important Notes for New Sessions
- **Node.js**: Must load via nvm: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"`
- **Tailwind v4**: Uses `@import "tailwindcss"` (not v3 syntax). Custom tokens in `@theme {}` block inside `index.css`
- **Theme**: Electric Lime & Midnight — `#18181B` zinc bg, `#A3E635` lime accent, `#06B6D4` cyan secondary
- **No social auth**: Email/password only (Google/GitHub removed)
- **No demo mode**: Removed entirely
- **Footer**: "Made with ❤️ by Shahbaz Ali" (native heart emoji)
- **No em/en dashes** in UI text
- **A1 fast track**: Separate data file `a1FastTrackData.js` (6 weeks)
- **A2 fixed**: 8-week track, no fast option
- **Supabase RLS**: Must be applied via SQL Editor in Supabase dashboard
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
│   │   ├── CommunitySection.jsx    # Community posts
│   │   ├── ConfettiEffect.jsx      # Celebration animations
│   │   ├── DailyTasks.jsx          # Day task list
│   │   ├── ErrorBoundary.jsx       # Error catcher
│   │   ├── FillBlank.jsx           # Fill-in-the-blank
│   │   ├── Flashcards.jsx          # Flashcard system
│   │   ├── Footer.jsx              # Site footer
│   │   ├── Fun.jsx                 # Fun facts/jokes
│   │   ├── Grammar.jsx             # Grammar lessons
│   │   ├── JourneyMap.jsx          # Learning path map
│   │   ├── ListeningTask.jsx       # Audio comprehension
│   │   ├── Matching.jsx            # Matching game
│   │   ├── Navbar.jsx              # Top navigation
│   │   ├── NotificationPanel.jsx   # Notifications slide-in
│   │   ├── ProgressDashboard.jsx   # Stats & charts
│   │   ├── ProfilePage.jsx         # User profile
│   │   ├── ProtectedRoute.jsx      # Auth guard
│   │   ├── QuickGermanTool.jsx     # Verb lookup modal
│   │   ├── QuickWin.jsx            # Quick daily wins
│   │   ├── Quiz.jsx                # Multiple choice
│   │   ├── ResourceLibrary.jsx     # External resources
│   │   ├── Review.jsx              # Week review
│   │   ├── RightPanel.jsx          # Sidebar widgets
│   │   ├── Roleplay.jsx            # Scenario practice
│   │   ├── Scramble.jsx            # Word scramble
│   │   ├── SpeakerButton.jsx       # Text-to-speech
│   │   ├── Speaking.jsx            # Speaking practice
│   │   ├── TaskRenderer.jsx        # Task type router
│   │   ├── TrackToggle.jsx         # Standard/Fast toggle
│   │   ├── Vocabulary.jsx          # Word lists
│   │   ├── WeeklyModule.jsx        # Week cards
│   │   └── Writing.jsx             # Writing exercises
│   ├── contexts/
│   │   └── AuthContext.jsx         # Supabase auth provider
│   ├── hooks/
│   │   └── useProgress.js          # Progress + localStorage + Supabase sync
│   ├── lib/
│   │   └── supabase.js             # Supabase client
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── ResetPasswordPage.jsx
│   │   └── OnboardingPage.jsx
│   ├── data/
│   │   ├── a1Data.js               # A1 curriculum (8 weeks, full content Week 1-2)
│   │   ├── a2Data.js               # A2 curriculum (8 weeks, fully populated)
│   │   └── a1FastTrackData.js      # A1 fast track (6 weeks)
│   ├── utils/
│   │   ├── progress.js             # Progress helpers
│   │   └── speech.js               # Text-to-speech
│   ├── App.jsx                     # Main app with routing
│   ├── main.jsx                    # Entry point + ErrorBoundary
│   └── index.css                   # Tailwind v4 + custom classes
├── supabase/
│   ├── schema.sql
│   └── fix-rls.sql
├── vercel.json
├── .env
└── package.json
```

---

*This document was generated to preserve complete project context for AI handoff. It covers architecture, session history, design decisions, known issues, and deployment configuration.*
