<div align="center">

# 🇩🇪 DeutschBuddy

### **Your Premium German Learning Companion**

*Master A1 & A2 German with gamified, interactive lessons, spaced repetition, and a sleek dark-mode interface.*

---

[![Live Demo](https://img.shields.io/badge/Live_Demo-deutsch--buddy--murex.vercel.app-blue?style=for-the-badge&logo=vercel)](https://deutsch-buddy-murex.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## ✨ What is DeutschBuddy?

DeutschBuddy is a **full-stack, gamified language learning platform** built to help students master German at CEFR levels **A1 (Beginner)** and **A2 (Elementary)**. It features a structured, module-based curriculum (A1: 10 modules / 20 days, A2: 8 modules / 56 days), interactive exercises, spaced repetition flashcards, real-time progress tracking, and a premium dark-mode cyberglow UI.

Whether you're a complete beginner or brushing up on grammar, DeutschBuddy provides a structured, engaging, and visually stunning learning experience.

---

## 🎯 Key Features

### 📚 Structured Curriculum
- **A1 (Beginner)**: 10 modules / 20 days — a life-first week (meeting people), the alphabet, numbers 0–12 / 13–19 / 20–100, family, colors, days & months, hobbies & professions, and a pronunciation deep-dive
- **A2 (Elementary)**: 8 modules / 56 days covering Perfekt tense, Präteritum, complex sentences, dative prepositions, workplace vocabulary, travel, weather, health, and a mock exam
- **A1 Fast Track**: 6-week compressed option (24 days) that merges review days

### 🎮 Gamification Engine
- **XP System**: Earn experience points for every completed task
- **Streak Tracker**: Daily streak counter to keep you motivated
- **15 Achievement Badges**: Including Grammar Guru, Vocab Voyager, Night Owl, Early Bird, and Perfect Score
- **Progress Dashboard**: Visual charts showing weekly completion percentages

### 🧠 Interactive Learning Tools
- **Flashcard System**: Spaced repetition with audio pronunciation (SpeakerButton)
- **Verb Conjugation Lookup**: Quick-access tool showing Präsens, Präteritum, and Perfekt for 20+ common verbs
- **Fill-in-the-Blank**: Grammar drills with instant feedback
- **Matching Games**: German-English vocabulary matching
- **Word Scramble**: Unscramble German words for spelling practice
- **Listening Tasks**: Audio comprehension with quiz questions
- **Speaking Prompts**: Oral practice with step-by-step guidance
- **Writing Exercises**: Guided writing with tips and examples

### 🎨 Premium Dark-Mode UI
- Cyberglow ambient background with aurora gradients
- Glassmorphism cards with frosted blur effects
- Glowing level switchers (blue for A1, crimson for A2)
- Responsive two-column layout on desktop, single-column on mobile
- Smooth animations and micro-interactions

### 🔐 Authentication & Persistence
- **Supabase Auth**: Email/password authentication with session management
- **Cloud Sync**: All progress, XP, streaks, and badges sync to Supabase
- **Row Level Security**: Users can only access their own data
- **Progressive Web App**: Installable on mobile and desktop with offline support

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4 |
| **Backend** | Supabase (Auth, PostgreSQL, RLS) |
| **State Management** | React Context + Hooks |
| **Routing** | React Router v7 |
| **PWA** | Service Worker, Web App Manifest |
| **Deployment** | Vercel (auto-deploy from GitHub) |
| **Icons** | Hand-rolled inline SVGs (`src/components/Icons.jsx`) |

---

## 📂 Project Structure

```
DeutschBuddy/
├── public/
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                      # Service worker (CACHE_VERSION bump flow)
│   ├── buddy-icon-192.png         # App icon (192x192)
│   ├── buddy-icon-512.png         # App icon (512x512)
│   └── buddy/                     # Mascot variants (generated via scripts/process-buddy.mjs)
├── src/
│   ├── components/
│   │   ├── DashboardShell.jsx     # Post-login shell (view switcher + overlays)
│   │   ├── MainContent.jsx        # Internal view dispatcher
│   │   ├── TaskRenderer.jsx       # Task-type dispatcher (14 types)
│   │   ├── lesson/
│   │   │   └── LessonPlayer.jsx   # Full-screen lesson session player
│   │   ├── buddy/                 # BuddyAvatar, speech bubbles, empty states
│   │   ├── Navbar.jsx             # Top navigation with level switchers
│   │   ├── MobileSidebar.jsx      # Mobile drawer
│   │   ├── BottomNav.jsx          # Mobile bottom navigation
│   │   ├── QuickGermanTool.jsx    # Verb conjugation lookup (inline + modal)
│   │   ├── BadgeGallery.jsx       # Badge collection with 15 achievements
│   │   ├── ConfettiEffect.jsx     # Celebration animations
│   │   ├── Footer.jsx             # Site footer
│   │   ├── JourneyMap.jsx         # Visual learning path
│   │   ├── WeeklyModule.jsx       # Module card with day stepping stones
│   │   ├── DailyTasks.jsx         # Task list with gradient icons
│   │   ├── Vocabulary.jsx         # Noun gender color-coded lists
│   │   ├── Flashcards.jsx         # Flip-card flashcard system
│   │   ├── Quiz.jsx               # Multiple choice quizzes
│   │   ├── FillBlank.jsx          # Fill-in-the-blank exercises
│   │   ├── Matching.jsx           # German-English matching game
│   │   ├── Scramble.jsx           # Word unscramble game
│   │   ├── Grammar.jsx            # Grammar lessons with examples
│   │   ├── Speaking.jsx           # Speaking practice prompts
│   │   ├── Writing.jsx            # Writing exercises
│   │   ├── ListeningTask.jsx      # Audio comprehension tasks
│   │   ├── ProgressDashboard.jsx  # Stats and progress charts
│   │   ├── SpeakerButton.jsx      # Audio pronunciation button
│   │   ├── SpeedBlitz.jsx         # Timed vocabulary arcade
│   │   ├── GenderDungeon.jsx      # Der/Die/Das falling-bar game
│   │   ├── PictureMatch.jsx       # Emoji picture matching game
│   │   ├── StreakGuardian.jsx     # Streak recovery quiz
│   │   ├── ReviewDeck.jsx         # Spaced-repetition review session
│   │   ├── CommunitySection.jsx   # Q&A forum
│   │   ├── ResourceLibrary.jsx    # External resources
│   │   ├── ProfilePage.jsx        # User profile & settings
│   │   ├── SettingsPage.jsx       # App settings
│   │   ├── NotificationPanel.jsx  # Slide-in notifications
│   │   ├── GamePanel.jsx          # Games launcher
│   │   ├── Coachmark.jsx          # Spotlight tooltip
│   │   ├── WelcomeTutorial.jsx    # First-run Buddy tour
│   │   ├── UpdateToast.jsx        # PWA update prompt
│   │   ├── XpToast.jsx            # XP celebration toast
│   │   ├── ConfettiEffect.jsx
│   │   ├── Certificate.jsx
│   │   ├── ContinueCard.jsx
│   │   ├── RightPanel.jsx         # Verb lookup + stats + tips sidebar
│   │   ├── BannerAd.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── TaskErrorBoundary.jsx
│   │   ├── Icons.jsx              # Hand-rolled inline SVGs
│   │   └── ...
│   ├── contexts/
│   │   ├── AuthContext.jsx        # Supabase auth provider (Google OAuth, recovery)
│   │   ├── DashboardContext.jsx   # Post-login app state core (~400 lines)
│   │   └── ThemeContext.jsx       # Light/dark theme provider
│   ├── hooks/
│   │   ├── useProgress.js         # Progress engine + Supabase sync (idempotent)
│   │   ├── useSpacedRepetition.js # SM-2 flashcard deck state
│   │   └── useSpeech.js           # TTS orchestration (Edge TTS + Web Speech fallback)
│   ├── pages/
│   │   ├── LoginPage.jsx          # Split-screen login
│   │   ├── SignupPage.jsx         # Split-screen signup
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── ResetPasswordPage.jsx
│   │   ├── VerifyEmailPage.jsx    # Email verification / resend
│   │   └── OnboardingPage.jsx     # 6-step pre-signup flow
│   ├── data/
│   │   ├── a1SpoonfedModules.js   # A1 curriculum (10 modules / 20 days)
│   │   ├── a1FastTrackData.js     # A1 fast track (6 weeks / 24 days)
│   │   ├── a2Data.js              # A2 curriculum (8 modules / 56 days)
│   │   ├── genderWords.js         # GenderDungeon nouns (217)
│   │   ├── pictureWords.js        # PictureMatch cards (205)
│   │   └── speedBlitzWords.js     # SpeedBlitz words (149 per level)
│   ├── utils/
│   │   ├── progress.js            # Progress helpers
│   │   ├── edgeSpeech.js          # Edge TTS client
│   │   ├── speech.js              # Web Speech fallback
│   │   ├── srs.js                 # Spaced-repetition math (SM-2)
│   │   ├── topicTitle.js          # DE/EN topic title splitting
│   │   ├── vocabExtractor.js      # Curriculum → flashcard items
│   │   ├── date.js                # Local-timezone calendar helpers
│   │   ├── analytics.js           # Event tracking
│   │   ├── badges.js              # Badge catalog
│   │   ├── referral.js            # Referral code helpers
│   │   ├── authErrors.js          # Friendly auth error messages
│   │   └── userStorage.js         # Per-user localStorage scoping
│   ├── services/
│   │   ├── ads.js                 # AdMob/AdSense abstraction (no-op when unconfigured)
│   │   └── referralService.js     # Referral sync (never blocks auth)
│   ├── lib/
│   │   └── supabase.js            # Supabase client (placeholder-safe)
│   ├── App.jsx                    # Router (auth/onboarding only)
│   ├── main.jsx                   # Entry point + ErrorBoundary
│   └── index.css                  # Tailwind v4 @theme + design system
├── api/
│   └── tts.js                     # Vercel serverless Edge TTS endpoint
├── supabase/
│   ├── schema.sql                 # Database schema (canonical)
│   ├── fix-rls.sql                # RLS policy repairs
│   ├── community-schema.sql       # Community tables + triggers
│   ├── referral-schema.sql        # Referral tables + RPCs
│   └── migrations/                # One-off SQL migrations
├── vercel.json                    # SPA rewrites + /api isolation
├── capacitor.config.json          # Android shell (webDir: dist)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- A Supabase project (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/shahbazalee047-art/DeutschBuddy.git
cd DeutschBuddy

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase URL and anon key

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

1. Go to your Supabase dashboard → SQL Editor
2. For a new project, run `supabase/schema.sql` once. It creates the complete
   current schema, including community tables, referral support, RLS, grants,
   and the signup trigger.
3. For an existing project, run the migrations in filename order:
   `supabase/migrations/20260809_reconcile_live_schema.sql`,
   `20260810_referral_schema_live.sql`,
   `20260812_auth_google_profiles.sql`, then
   `20260819_referral_security_alignment.sql`.
4. Run `supabase/fix-rls.sql` after either path if permissions or stale
   PostgREST schema metadata need repair. It is safe to re-run.

`supabase/community-schema.sql` and `supabase/referral-schema.sql` are kept as
legacy compatibility scripts; they are not required after `schema.sql` or the
migrations above.

### Deployment

```bash
# Build for production
npm run build

# The dist/ folder is ready for deployment
# Vercel auto-deploys from the main branch
```

---

## 🎓 Curriculum Overview

### A1 — Beginner (10 Modules / 20 Days standard · 6 Weeks fast track)

| Module | Topic | Key Grammar |
|--------|-------|-------------|
| 1 | Meeting People | Greetings, formal/informal address |
| 2 | The Alphabet | Pronunciation and spelling |
| 3 | Numbers 0–12 | Counting and phone numbers |
| 4 | Numbers 13–19 | Teen numbers and prices |
| 5 | Numbers 20–100 | Larger numbers and dates |
| 6 | My Family | Family vocabulary and possessives |
| 7 | Colors | Adjectives and descriptions |
| 8 | Days & Months | Calendars and time expressions |
| 9 | Hobbies & Professions | Everyday activities and jobs |
| 10 | Pronunciation Deep-Dive | German sounds and speaking confidence |

### A2 — Elementary (8 Modules / 56 Days)

| Module | Topic | Key Grammar |
|--------|-------|-------------|
| 1 | Perfekt Tense with haben/sein | Past participle formation |
| 2 | Präteritum Basics | Regular/irregular past tense |
| 3 | Family & Social Life | Expanded modal verbs |
| 4 | Food & Dining Out | Comparative/superlative |
| 5 | Work & Professions | Dative prepositions |
| 6 | Travel & Transportation | Complex sentences |
| 7 | Weather, Health, Opinions | weil clauses, expressing opinions |
| 8 | **Mock Exam** | Full Goethe-style assessment |

---

## 🎨 Design System

### Color Palette
- **Canvas**: `#0F1420` (deep navy)
- **Card Surface**: `#1A2338` (glassmorphism)
- **A1 Primary**: `#2563eb` (electric blue)
- **A2 Primary**: `#e11d48` (crimson)
- **Accent**: `#FFCC00` (German gold)
- **Noun Gender Coding**: Blue (der), Rose (die), Emerald (das)

### Typography
- **Headings**: Poppins (bold, extrabold)
- **Body**: Inter (regular, medium, semibold)

---

## 📱 PWA Features

- **Installable**: Add to home screen on mobile and desktop
- **Offline Support**: Service worker caches app shell
- **Standalone Mode**: Runs without browser chrome
- **Theme Color**: `#2563eb` matches the app's primary blue

---

## 🔗 External Resources

DeutschBuddy integrates with these curated German learning resources:

- 📺 [Nicos Weg (DW)](https://learngerman.dw.com/en/overview) — Structured video lessons
- 🎬 [Easy German](https://www.youtube.com/@EasyGerman) — Street interview listening practice
- 📖 [Verbformen](https://www.verbformen.de/) — Verb conjugation reference
- 🏛️ [Goethe-Institut](https://goethe.de) — Official exam materials
- 🎧 [Slow German](https://slowgerman.com) — Podcast for A2 listening

---

## 📊 Database Schema

### Tables
- **profiles**: User name, email, joined date, pacing preference, referral metadata
- **progress**: XP, streak, completed tasks, revise tasks, badges, unlocked weeks, weekly XP (per user per level)
- **exercise_results**: Task completion logs with scores
- **exam_scores**: Mock exam results (Lesen, Hören, Schreiben, Sprechen)
- **community_posts/comments/upvotes**: Authenticated learner community
- **referrals**: Idempotent referral reward records (server-managed)

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only read/write their own account data; community content is intentionally shared
- Auto-profile creation via database trigger on signup

---

## 🛠️ Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📄 License

This project is private. All rights reserved by Shahbaz Ali.

---

<div align="center">

**Built with ❤️ by Shahbaz Ali**

*DeutschBuddy — Master German, one lesson at a time.*

</div>
