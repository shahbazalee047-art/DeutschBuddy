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

DeutschBuddy is a **full-stack, gamified language learning platform** built to help students master German at CEFR levels **A1 (Beginner)** and **A2 (Elementary)**. It features a structured 8-week curriculum, interactive exercises, spaced repetition flashcards, real-time progress tracking, and a premium dark-mode cyberglow UI.

Whether you're a complete beginner or brushing up on grammar, DeutschBuddy provides a structured, engaging, and visually stunning learning experience.

---

## 🎯 Key Features

### 📚 Structured Curriculum
- **A1 (Beginner)**: 8 weeks covering alphabet, greetings, numbers, verb conjugation, noun genders, daily routines, shopping, travel, modal verbs, and a mock Goethe-style exam
- **A2 (Elementary)**: 8 weeks covering Perfekt tense, Präteritum, complex sentences, dative prepositions, workplace vocabulary, travel, weather, health, and a mock exam
- **A1 Fast Track**: 4-6 week compressed option that merges review days

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
| **Icons** | Lucide React, React Icons |

---

## 📂 Project Structure

```
DeutschBuddy/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   ├── icon-192.png           # App icon (192x192)
│   └── icon-512.png           # App icon (512x512)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Top navigation with glowing level switchers
│   │   ├── RightPanel.jsx     # Verb lookup + stats + tips sidebar
│   │   ├── QuickGermanTool.jsx # Verb conjugation lookup (inline + modal)
│   │   ├── BadgeGallery.jsx   # Badge collection with 15 achievements
│   │   ├── ConfettiEffect.jsx # Celebration animations
│   │   ├── Footer.jsx         # Site footer
│   │   ├── JourneyMap.jsx     # Visual learning path
│   │   ├── WeeklyModule.jsx   # Week card with day stepping stones
│   │   ├── DailyTasks.jsx     # Task list with gradient icons
│   │   ├── TaskRenderer.jsx   # Dynamic task type router
│   │   ├── Vocabulary.jsx     # Noun gender color-coded lists
│   │   ├── Flashcards.jsx     # Flip-card flashcard system
│   │   ├── Quiz.jsx           # Multiple choice quizzes
│   │   ├── FillBlank.jsx      # Fill-in-the-blank exercises
│   │   ├── Matching.jsx       # German-English matching game
│   │   ├── Scramble.jsx       # Word unscramble game
│   │   ├── Grammar.jsx        # Grammar lessons with examples
│   │   ├── Speaking.jsx       # Speaking practice prompts
│   │   ├── Writing.jsx        # Writing exercises
│   │   ├── ListeningTask.jsx  # Audio comprehension tasks
│   │   ├── ProgressDashboard.jsx # Stats and progress charts
│   │   ├── TrackToggle.jsx    # Standard/Fast track switcher
│   │   ├── SpeakerButton.jsx  # Audio pronunciation button
│   │   ├── ProtectedRoute.jsx # Auth guard
│   │   └── ...
│   ├── contexts/
│   │   └── AuthContext.jsx    # Supabase auth provider
│   ├── hooks/
│   │   └── useProgress.js     # Progress state management
│   ├── pages/
│   │   ├── LoginPage.jsx      # Split-screen login
│   │   ├── SignupPage.jsx     # Split-screen signup
│   │   ├── ForgotPasswordPage.jsx
│   │   └── ResetPasswordPage.jsx
│   ├── data/
│   │   ├── a1Data.js          # A1 curriculum (8 weeks)
│   │   ├── a2Data.js          # A2 curriculum (8 weeks)
│   │   └── a1FastTrackData.js # A1 fast track (6 weeks)
│   ├── utils/
│   │   ├── progress.js        # Progress utility functions
│   │   └── speech.js          # Text-to-speech for pronunciation
│   ├── lib/
│   │   └── supabase.js        # Supabase client configuration
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles + glassmorphism
├── supabase/
│   ├── schema.sql             # Database schema
│   └── fix-rls.sql            # RLS policy fixes
├── vercel.json                # Vercel rewrites for SPA
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
2. Run the contents of `supabase/schema.sql`
3. If you encounter permission errors, run `supabase/fix-rls.sql`

### Deployment

```bash
# Build for production
npm run build

# The dist/ folder is ready for deployment
# Vercel auto-deploys from the main branch
```

---

## 🎓 Curriculum Overview

### A1 — Beginner (8 Weeks)

| Week | Topic | Key Grammar |
|------|-------|-------------|
| 1 | Alphabet, Greetings, Numbers 0-20 | Pronunciation, formal/informal |
| 2 | Personal Pronouns, Present Tense | Verb conjugation, articles (der/die/das) |
| 3 | Daily Routines, Food, Time | Separable verbs, telling time |
| 4 | Family, Friends, Possessives | Possessive pronouns, family vocab |
| 5 | Shopping, Dining, Polite Requests | Accusative case, restaurant language |
| 6 | Travel, Directions, Transportation | Dative case, map reading |
| 7 | Modal Verbs, Separable Verbs | können, möchten, müssen, separable prefixes |
| 8 | **Mock Exam** | Lesen, Hören, Schreiben, Sprechen |

### A2 — Elementary (8 Weeks)

| Week | Topic | Key Grammar |
|------|-------|-------------|
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
- **profiles**: User name, email, joined date, pacing preference
- **progress**: XP, streak, completed tasks, badges, unlocked weeks (per user per level)
- **exercise_results**: Task completion logs with scores
- **exam_scores**: Mock exam results (Lesen, Hören, Schreiben, Sprechen)

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only read/write their own data
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
