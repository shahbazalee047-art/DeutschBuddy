import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BuddyAvatar } from '../components/buddy';
import {
  IconArrowRight, IconArrowLeft, IconCheck, IconSparkles, IconBookOpen, IconMap,
  IconGraduation, IconChat, IconClock, IconTrophy,
} from '../components/Icons';
import { stashReferralCode, isValidReferralCode } from '../utils/referral';
import { trackOnboardingCompleted } from '../utils/analytics';

// Pre-signup onboarding — a quick 6-step "tell us about you" flow. Deliberately
// NOT a placement quiz: learners self-report their comfort level and we route
// them to the right track and level. The rich app overview happens AFTER signup
// via the WelcomeTutorial (see DashboardShell).
//
// Steps:
//   1. intro   — Buddy frames the life-first promise ("you speak today")
//   2. prior   — self-report prior knowledge (routes to level + track)
//   3. goal    — why they are learning (stored for later exam-prep content)
//   4. time    — daily goal in minutes (db_daily_goal)
//   5. win     — an instant first win (tiny inline matching)
//   6. route   — summary + handoff: writes db_* keys and deep-links to Lesson 1
//
// The final handoff writes db_onboarded + a db_pending_lesson key that
// DashboardShell consumes on mount so the learner lands straight in Day 1
// Lesson 1 instead of the dashboard.

const PRIOR_PATHS = [
  {
    id: 'new',
    icon: IconSparkles,
    title: 'I\'m completely new',
    desc: 'Never spoken German — start from the very first hello.',
    level: 'A1', track: 'standard',
  },
  {
    id: 'some',
    icon: IconMap,
    title: 'I know a few phrases',
    desc: 'Hallo, danke, Tschüss — but no real sentences yet.',
    level: 'A1', track: 'standard',
  },
  {
    id: 'quite-a-bit',
    icon: IconBookOpen,
    title: 'I\'ve studied before',
    desc: 'Some grammar or vocabulary, and I want faster pace.',
    level: 'A1', track: 'fast',
  },
  {
    id: 'a1-done',
    icon: IconGraduation,
    title: 'I\'ve finished A1',
    desc: 'Past tenses and real conversations are next.',
    level: 'A2', track: 'standard',
  },
];

const GOAL_OPTIONS = [
  { id: 'exam', icon: IconGraduation, title: 'Pass an exam', desc: 'Goethe, TestDaF, or a course test' },
  { id: 'travel', icon: IconMap, title: 'Live or travel', desc: 'Everyday life in a German-speaking country' },
  { id: 'people', icon: IconChat, title: 'Talk to people', desc: 'Family, friends, or work colleagues' },
  { id: 'fun', icon: IconSparkles, title: 'Just for fun', desc: 'Culture, music, books — no pressure' },
];

const TIME_OPTIONS = [
  { id: 5, title: '5 minutes', desc: 'One quick win a day' },
  { id: 15, title: '15 minutes', desc: 'A few tasks a day' },
  { id: 30, title: '30 minutes', desc: 'A full lesson a day' },
];

const WIN_PAIRS = [
  { de: 'Hallo', en: 'Hello' },
  { de: 'Danke', en: 'Thanks' },
  { de: 'Tschüss', en: 'Bye' },
];

const STEPS = ['intro', 'prior', 'goal', 'time', 'win', 'route'];

const FIRST_TASK = {
  A1: { standard: { weekId: 1, day: 1, taskId: 'a1m1d1t1' }, fast: { weekId: 1, day: 1, taskId: 'ftw1d1t1' } },
  A2: { standard: { weekId: 1, day: 1, taskId: 'a2w1d1t1' }, fast: { weekId: 1, day: 1, taskId: 'a2w1d1t1' } },
};

function setLS(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch { /* ignore */ }
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [stepIdx, setStepIdx] = useState(0);
  const [choice, setChoice] = useState(null);     // { level, track } from step 2
  const [goal, setGoal] = useState(null);
  const [searchParams] = useSearchParams();

  // The entry route for signed-out users is this page, so invite links
  // (?ref=CODE) get stashed here — well before signup consumes them.
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (isValidReferralCode(ref)) stashReferralCode(ref);
  }, [searchParams]);

  // Instant-win mini matching state
  const [winSelected, setWinSelected] = useState(null); // de text of selected card
  const [winMatched, setWinMatched] = useState([]);     // de texts correctly matched
  const [winWrong, setWinWrong] = useState(null);
  const winWrongTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(winWrongTimerRef.current), []);

  const finish = () => {
    setLS('db_selected_level', choice.level);
    setLS('db_selected_track', choice.track);
    setLS('db_onboarded', 'true');
    setLS('db_learning_goal', goal);
    const first = FIRST_TASK[choice.level][choice.track];
    setLS('db_pending_lesson', JSON.stringify(first));
    trackOnboardingCompleted({ level: choice.level, track: choice.track, goal: goal || undefined });
    navigate('/signup');
  };

  const goNext = () => setStepIdx(i => Math.min(i + 1, STEPS.length - 1));
  const goBack = () => setStepIdx(i => Math.max(i - 1, 0));

  const handleWinTapEnglish = (en) => {
    if (!winSelected || winMatched.includes(winSelected)) return;
    const pair = WIN_PAIRS.find(p => p.de === winSelected);
    if (pair && pair.en === en) {
      setWinMatched(m => [...m, winSelected]);
      setWinSelected(null);
      setWinWrong(null);
    } else {
      setWinWrong(en);
      clearTimeout(winWrongTimerRef.current);
      winWrongTimerRef.current = setTimeout(() => setWinWrong(null), 600);
    }
  };

  const step = STEPS[stepIdx];
  const winDone = winMatched.length === WIN_PAIRS.length;
  const usedEnglish = WIN_PAIRS.filter(p => winMatched.includes(p.de)).map(p => p.en);

  return (
    <div className="min-h-dvh bg-bg-base flex overflow-y-auto">
      <div className="m-auto w-full max-w-md px-6 py-8">
        {/* Step progress dots */}
        <div className="flex items-center justify-center gap-1.5 mb-6" aria-hidden>
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === stepIdx ? 'w-7 bg-gold' : i < stepIdx ? 'w-1.5 bg-gold/40' : 'w-1.5 bg-border'}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <BuddyAvatar state="waving" size={104} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">DeutschBuddy</p>
              <h1 className="text-[28px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Speak German from day one
              </h1>
              <p className="text-text-muted text-sm mb-8 leading-relaxed">
                No grammar tables to start — just real sentences you can use today.
                Tell us a little about you and we'll build your first week.
              </p>
              <button
                onClick={goNext}
                className="w-full p-4 rounded-[var(--radius-card)] bg-gold text-bg-primary font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all"
              >
                Let's go <IconArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 'prior' && (
            <motion.div
              key="prior"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
            >
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold mb-1">Your starting point</p>
                <h2 className="text-2xl font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  How much German do you already know?
                </h2>
                <p className="text-text-muted text-sm mt-1">Pick whatever feels true — you can change it anytime.</p>
              </div>
              <div className="space-y-3">
                {PRIOR_PATHS.map(path => (
                  <button
                    key={path.id}
                    onClick={() => { setChoice({ level: path.level, track: path.track }); goNext(); }}
                    className={`w-full p-4 rounded-[var(--radius-card)] border text-left flex items-center gap-4 group transition-all active:scale-[0.99] ${choice?.level === path.level && choice?.track === path.track ? 'border-gold bg-gold/[0.07]' : 'border-border bg-surface hover:border-gold/40 hover:bg-bg-secondary'}`}
                  >
                    <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <path.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-text-dark">{path.title}</p>
                      <p className="text-[13px] text-text-muted leading-snug">{path.desc}</p>
                    </div>
                    <IconArrowRight className="w-4 h-4 text-text-muted group-hover:text-gold group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'goal' && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
            >
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold mb-1">Why are you here?</p>
                <h2 className="text-2xl font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  What's your German goal?
                </h2>
                <p className="text-text-muted text-sm mt-1">We'll shape the lessons around it.</p>
              </div>
              <div className="space-y-3">
                {GOAL_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setGoal(opt.id); goNext(); }}
                    className={`w-full p-4 rounded-[var(--radius-card)] border text-left flex items-center gap-4 transition-all active:scale-[0.99] ${goal === opt.id ? 'border-gold bg-gold/[0.07]' : 'border-border bg-surface hover:border-gold/40 hover:bg-bg-secondary'}`}
                  >
                    <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <opt.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-text-dark">{opt.title}</p>
                      <p className="text-[13px] text-text-muted leading-snug">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'time' && (
            <motion.div
              key="time"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
            >
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold mb-1">Your daily habit</p>
                <h2 className="text-2xl font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  How much time do you have each day?
                </h2>
                <p className="text-text-muted text-sm mt-1">A few focused minutes beat a long lazy session.</p>
              </div>
              <div className="space-y-3">
                {TIME_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setLS('db_daily_goal', String(opt.id)); goNext(); }}
                    className="w-full p-4 rounded-[var(--radius-card)] border border-border bg-surface text-left flex items-center gap-4 hover:border-gold/40 hover:bg-bg-secondary transition-all active:scale-[0.99] group"
                  >
                    <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <IconClock className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-text-dark">{opt.title}</p>
                      <p className="text-[13px] text-text-muted">{opt.desc}</p>
                    </div>
                    <IconArrowRight className="w-4 h-4 text-text-muted group-hover:text-gold group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'win' && (
            <motion.div
              key="win"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
            >
              {!winDone ? (
                <>
                  <div className="mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold mb-1">Instant win</p>
                    <h2 className="text-2xl font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      Your first words — already?
                    </h2>
                    <p className="text-text-muted text-sm mt-1">Tap a German word, then tap its English meaning. You know this one.</p>
                  </div>
                  <div className="space-y-2 mb-5">
                    {WIN_PAIRS.map(pair => {
                      const isMatched = winMatched.includes(pair.de);
                      return (
                        <button
                          key={pair.de}
                          onClick={() => { if (isMatched) return; setWinSelected(pair.de); setWinWrong(null); }}
                          disabled={isMatched}
                          className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all active:scale-[0.98] flex items-center justify-between
                            ${isMatched ? 'border-success bg-success/10 text-text-muted' :
                              winSelected === pair.de ? 'border-primary bg-primary/10' :
                              'border-border bg-surface hover:border-gold/40'}`}
                        >
                          <span>{pair.de}</span>
                          {isMatched && (
                            <span className="text-success font-medium text-sm flex items-center gap-1">
                              <IconCheck className="w-4 h-4" /> {pair.en}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {WIN_PAIRS.map(pair => {
                      const alreadyUsed = usedEnglish.includes(pair.en);
                      return (
                        <button
                          key={pair.en}
                          onClick={() => handleWinTapEnglish(pair.en)}
                          disabled={alreadyUsed}
                          className={`
                            px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all active:scale-95
                            ${winWrong === pair.en ? 'border-error bg-error/10 text-error animate-shake' :
                              alreadyUsed ? 'border-border bg-surface/60 opacity-50' :
                              winSelected ? 'border-border bg-surface hover:border-gold/60' :
                              'border-border bg-surface/60'}`}
                        >
                          {pair.en}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
                      <IconTrophy className="w-10 h-10 text-gold" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    You just learned 3 German words
                  </h2>
                  <p className="text-text-muted text-sm mb-8">
                    That's the DeutschBuddy way — a win before the lesson even starts.
                  </p>
                  <button
                    onClick={goNext}
                    className="w-full p-4 rounded-[var(--radius-card)] bg-gold text-bg-primary font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all"
                  >
                    Ready for day one <IconArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {step === 'route' && choice && goal && (
            <motion.div
              key="route"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
            >
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <BuddyAvatar state="happy" size={88} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">All set</p>
                <h2 className="text-[26px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Your plan is ready
                </h2>
                <p className="text-text-muted text-sm">Here's what we picked for you:</p>
              </div>

              <div className="rounded-[var(--radius-card)] border border-border bg-surface divide-y divide-border overflow-hidden mb-6">
                <div className="flex items-center justify-between p-4">
                  <span className="text-[13px] text-text-muted">Level</span>
                  <span className="font-bold text-text-dark">{choice.level}</span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-[13px] text-text-muted">Pace</span>
                  <span className="font-bold text-text-dark">{choice.track === 'fast' ? 'Fast Track' : 'Beginner'}</span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-[13px] text-text-muted">Goal</span>
                  <span className="font-bold text-text-dark">
                    {GOAL_OPTIONS.find(g => g.id === goal)?.title}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-[13px] text-text-muted">Starts with</span>
                  <span className="font-bold text-text-dark">
                    {choice.level === 'A2' ? 'A1 refresher + Perfekt' : choice.track === 'fast' ? 'Week 1: Alphabet & greetings' : 'Day 1: Meeting people'}
                  </span>
                </div>
              </div>

              <button
                onClick={finish}
                className="w-full p-4 rounded-[var(--radius-card)] bg-gold text-bg-primary font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all"
              >
                Start my account <IconArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {stepIdx > 0 && step !== 'intro' && !(step === 'win' && winDone) && step !== 'route' && (
          <button
            onClick={goBack}
            className="mt-5 mx-auto flex items-center gap-1 text-[12px] text-text-muted hover:text-gold transition-colors"
          >
            <IconArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}

        <p className="text-center text-[12px] text-text-muted mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="font-semibold text-primary hover:underline">Log in</button>
        </p>
      </div>
    </div>
  );
}