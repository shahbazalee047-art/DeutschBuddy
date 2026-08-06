import { lazy, Suspense, useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import MobileSidebar from './MobileSidebar';
import MainContent from './MainContent';
const HomePage = lazy(() => import('../pages/HomePage'));
const JourneyPage = lazy(() => import('../pages/JourneyPage'));
const ReviewDeck = lazy(() => import('../components/ReviewDeck'));
const LessonPlayer = lazy(() => import('../components/lesson/LessonPlayer'));
const WelcomeTutorial = lazy(() => import('./WelcomeTutorial'));
const Coachmark = lazy(() => import('./Coachmark'));
import SkipLink from './SkipLink';
import XpToast from './XpToast';
import { CardSkeleton, ListSkeleton } from './Skeleton';
import { IconBell, IconUser, IconSettings, IconMenu, IconFire, IconRefresh } from './Icons';
import LoadingSpinner from './LoadingSpinner';

const QuickGermanTool = lazy(() => import('./QuickGermanTool'));
const RightPanel = lazy(() => import('./RightPanel'));
const NotificationPanel = lazy(() => import('./NotificationPanel'));
const StreakGuardian = lazy(() => import('./StreakGuardian'));
const SpeedBlitz = lazy(() => import('./SpeedBlitz'));
const GenderDungeon = lazy(() => import('./GenderDungeon'));
const PictureMatch = lazy(() => import('./PictureMatch'));
const GamePanel = lazy(() => import('./GamePanel'));
const DayCompleteCelebration = lazy(() => import('./ConfettiEffect'));
const Footer = lazy(() => import('./Footer'));

// Stable empty object so memoized nav components don't re-render when there are
// no badges to show (identity never changes).
const EMPTY_BADGES = {};

function LoadingScreen() {
  return <LoadingSpinner message="Buddy is fetching your lessons..." />;
}

export default function DashboardShell() {
  const dashboard = useDashboard();
  const {
    user, profile,
    activeLevel, activeView, selectedDay, selectedTask,
    showCelebration, todayXP, xpToast, setXpToast, setShowCelebration,
    showQuickTool, setShowQuickTool,
    showSidebarVerbLookup, setShowSidebarVerbLookup,
    showSpeedBlitz, setShowSpeedBlitz,
    showGenderDungeon, setShowGenderDungeon,
    showPictureMatch, setShowPictureMatch,
    showStreakGuardian, setShowStreakGuardian,
    showNotifications, setShowNotifications,
    showSidebar, setShowSidebar,
    showProfileMenu, setShowProfileMenu,
    setNotifVersion,
    progress, loading,
    levelData, dataLoading, loadError, setRetryKey, setLoadError,
    visibleWeeks, unlockedWeeks,
    currentWeek,
    handleSelectDay, handleSelectTask, handleStartLesson, handleCompleteTask, handleBackToWeek,
    handleViewChange, handleLevelChange, handleGameScore,
    handleSignOutFromApp,
    profileMenuRef,
    recoverStreak,
    hasUnreadNotifications,
    setSelectedDay, setSelectedTask, setActiveView,
  } = dashboard;

  // First-time tutorial: show once per device after the dashboard has loaded.
  const [showTutorial, setShowTutorial] = useState(false);
  const [showStartCoachmark, setShowStartCoachmark] = useState(false);
  useEffect(() => {
    if (dataLoading || loadError || !levelData) return;
    if (selectedTask) return; // don't interrupt a deep-link into a lesson
    try {
      if (localStorage.getItem('db_tutorial_seen_v1') !== '1') {
        setShowTutorial(true);
      }
    } catch { /* ignore */ }
  }, [dataLoading, loadError, levelData, selectedTask]);

  // When the tutorial closes, point the learner at the Start Lesson button —
  // but only if they haven't completed a task yet and haven't seen this hint.
  const handleTutorialClose = useCallback(() => {
    setShowTutorial(false);
    try {
      const coachmarkSeen = localStorage.getItem('db_coachmark_seen_v1') === '1';
      const hasCompletedTasks = (progress?.completedTasks?.length || 0) > 0;
      if (!coachmarkSeen && !hasCompletedTasks) {
        setShowStartCoachmark(true);
      }
    } catch { /* ignore */ }
  }, [progress]);

  function handleCoachmarkClose() {
    setShowStartCoachmark(false);
    try { localStorage.setItem('db_coachmark_seen_v1', '1'); } catch { /* ignore */ }
  }

  // If the learner enters a lesson while the tutorial or coachmark is open,
  // dismiss the overlays so they don't sit on top of the lesson content.
  useEffect(() => {
    if ((selectedTask || selectedDay) && (showTutorial || showStartCoachmark)) {
      setShowTutorial(false);
      setShowStartCoachmark(false);
      try {
        localStorage.setItem('db_tutorial_seen_v1', '1');
        localStorage.setItem('db_coachmark_seen_v1', '1');
      } catch { /* ignore */ }
    }
  }, [selectedTask, selectedDay, showTutorial, showStartCoachmark]);

  // Onboarding handoff: after onboarding writes db_pending_lesson, deep-link
  // straight into Day 1 Lesson 1 (instead of landing on the dashboard).
  const pendingLessonHandled = useRef(false);
  useEffect(() => {
    if (pendingLessonHandled.current) return;
    if (dataLoading || loadError || !levelData || !levelData.weeks) return;
    if (selectedTask || selectedDay) return;
    let pending = null;
    try {
      const raw = localStorage.getItem('db_pending_lesson');
      pending = raw ? JSON.parse(raw) : null;
    } catch { /* ignore */ }
    if (!pending || !pending.weekId || !pending.taskId) return;
    pendingLessonHandled.current = true;
    try { localStorage.removeItem('db_pending_lesson'); } catch { /* ignore */ }
    const week = levelData.weeks.find(w => w.id === pending.weekId);
    const day = week?.days?.find(d => d.day === pending.day);
    const task = day?.tasks?.find(t => t.id === pending.taskId);
    if (!week || !day || !task) return;
    handleStartLesson(week.id, day.day, task);
  }, [dataLoading, loadError, levelData, selectedTask, selectedDay, handleStartLesson]);

  const mainContentProps = useMemo(() => ({
    activeView, activeLevel, selectedDay, selectedTask, currentWeek,
    progress, levelData, visibleWeeks, unlockedWeeks,
    profile, user, onSignOut: handleSignOutFromApp,
    onSelectDay: handleSelectDay, onSelectTask: handleSelectTask,
    onCompleteTask: handleCompleteTask, onBackToWeek: handleBackToWeek
  }), [activeView, activeLevel, selectedDay, selectedTask, currentWeek, progress, levelData, visibleWeeks, unlockedWeeks, profile, user, handleSelectDay, handleSelectTask, handleCompleteTask, handleBackToWeek, handleSignOutFromApp]);

  // Stabilized handlers so memoized children (Navbar, BottomNav, MobileSidebar,
  // GamePanel, NotificationPanel) don't re-render on every DashboardShell render.
  // All close only over stable useState setters, so empty deps are correct.
  const handleOpenQuickTool = useCallback(() => setShowQuickTool(true), [setShowQuickTool]);
  const handleCloseQuickTool = useCallback(() => setShowQuickTool(false), [setShowQuickTool]);
  const handleOpenNotifications = useCallback(() => setShowNotifications(true), [setShowNotifications]);
  const handleCloseSidebar = useCallback(() => setShowSidebar(false), [setShowSidebar]);
  const handleOpenVerbLookup = useCallback(() => { setShowSidebar(false); setShowSidebarVerbLookup(true); }, [setShowSidebar, setShowSidebarVerbLookup]);
  const handleOpenSpeedBlitz = useCallback(() => { setShowSidebar(false); setShowSpeedBlitz(true); }, [setShowSidebar, setShowSpeedBlitz]);
  const handleOpenGenderDungeon = useCallback(() => { setShowSidebar(false); setShowGenderDungeon(true); }, [setShowSidebar, setShowGenderDungeon]);
  const handleOpenPictureMatch = useCallback(() => { setShowSidebar(false); setShowPictureMatch(true); }, [setShowSidebar, setShowPictureMatch]);
  const handleCloseSidebarVerbLookup = useCallback(() => { setShowSidebarVerbLookup(false); setShowSidebar(true); }, [setShowSidebarVerbLookup, setShowSidebar]);
  const handleCloseSpeedBlitz = useCallback(() => { setShowSpeedBlitz(false); setShowSidebar(true); }, [setShowSpeedBlitz, setShowSidebar]);
  const handleCloseGenderDungeon = useCallback(() => { setShowGenderDungeon(false); setShowSidebar(true); }, [setShowGenderDungeon, setShowSidebar]);
  const handleClosePictureMatch = useCallback(() => { setShowPictureMatch(false); setShowSidebar(true); }, [setShowPictureMatch, setShowSidebar]);
  const handleScoreSpeedBlitz = useCallback((score) => handleGameScore('speedblitz', score), [handleGameScore]);
  const handleScoreGenderDungeon = useCallback((score) => handleGameScore('genderdungeon', score), [handleGameScore]);
  const handleScorePictureMatch = useCallback((score) => handleGameScore('picturematch', score), [handleGameScore]);
  const handleCloseNotifications = useCallback(() => { setShowNotifications(false); setNotifVersion(v => v + 1); }, [setShowNotifications, setNotifVersion]);
  const handleCloseXpToast = useCallback(() => setXpToast(null), [setXpToast]);
  const handleCloseCelebration = useCallback(() => setShowCelebration(false), [setShowCelebration]);
  const handleStreakGuardianSuccess = useCallback(() => { recoverStreak(); setShowStreakGuardian(false); }, [recoverStreak, setShowStreakGuardian]);
  const handleStreakGuardianClose = useCallback(() => setShowStreakGuardian(false), [setShowStreakGuardian]);
  const handleNotificationNavigate = useCallback((action) => {
    if (typeof action === 'string') {
      handleViewChange(action);
    } else if (action.type === 'view') {
      handleViewChange(action.target);
    } else if (action.type === 'day') {
      handleSelectDay(action.weekId, action.day);
    } else if (action.type === 'task' && action.taskId && levelData) {
      handleSelectDay(action.weekId, action.day);
      const week = levelData.weeks?.find(w => w.id === action.weekId);
      const day = week?.days?.find(d => d.day === action.day);
      const task = day?.tasks?.find(t => t.id === action.taskId);
      if (task) {
        setTimeout(() => setSelectedTask(task), 0);
      }
    } else if (action.type === 'guardian') {
      setShowStreakGuardian(true);
    }
  }, [handleViewChange, handleSelectDay, levelData, setSelectedTask, setShowStreakGuardian]);

  // BottomNav badge — memoized so the object identity is stable unless the
  // revise count actually changes.
  const bottomNavBadges = useMemo(() => {
    const n = progress?.reviseTasks?.length || 0;
    return n ? { dashboard: n } : EMPTY_BADGES;
  }, [progress?.reviseTasks?.length]);

  if (loadError) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-4 bg-bg-base">
        <div className="db-card p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="text-7xl">🐶</div>
          </div>
          <h2 className="text-2xl font-bold text-text-dark mb-2">
            Oops, something went wrong
          </h2>
          <p className="text-sm text-text-muted mb-6">
            Buddy couldn&apos;t load your lessons. Let&apos;s try again.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => { setLoadError(false); setRetryKey(k => k + 1); }}
              className="db-btn db-btn-primary flex items-center justify-center gap-2"
            >
              <IconRefresh className="w-4 h-4" /> Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="db-btn db-btn-secondary flex items-center justify-center gap-2"
            >
              <IconRefresh className="w-4 h-4" /> Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || dataLoading || !levelData) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-dvh bg-bg-primary">
      <SkipLink targetId="main-content" />
      {showTutorial && (
        <Suspense fallback={null}>
          <WelcomeTutorial onClose={handleTutorialClose} />
        </Suspense>
      )}
      {showStartCoachmark && activeView === 'dashboard' && !selectedDay && !selectedTask && (
        <Suspense fallback={null}>
          <Coachmark
            targetSelector="[data-coachmark='start-lesson']"
            title="Start here"
            body="Tap this button to jump straight into your first German lesson. Buddy will guide you through it."
            cta="Got it"
            onClose={handleCoachmarkClose}
          />
        </Suspense>
      )}
      {xpToast && <XpToast xp={xpToast} onComplete={handleCloseXpToast} />}
      {showQuickTool && <Suspense fallback={null}><QuickGermanTool onClose={handleCloseQuickTool} /></Suspense>}
      {showSidebar && (
        <MobileSidebar
          isOpen={showSidebar}
          onClose={handleCloseSidebar}
          activeView={activeView}
          onViewChange={handleViewChange}
          activeLevel={activeLevel}
          onLevelChange={handleLevelChange}
          onVerbLookup={handleOpenVerbLookup}
          onOpenSpeedBlitz={handleOpenSpeedBlitz}
          onOpenGenderDungeon={handleOpenGenderDungeon}
          onOpenPictureMatch={handleOpenPictureMatch}
        />
      )}
      {showSidebarVerbLookup && <Suspense fallback={null}><QuickGermanTool onClose={handleCloseSidebarVerbLookup} /></Suspense>}
      {showSpeedBlitz && (
        <Suspense fallback={<LoadingScreen />}>
          <GamePanel title="Wortblitz" onClose={handleCloseSpeedBlitz}>
            <SpeedBlitz level={activeLevel} onScore={handleScoreSpeedBlitz} />
          </GamePanel>
        </Suspense>
      )}
      {showGenderDungeon && (
        <Suspense fallback={<LoadingScreen />}>
          <GamePanel title="Der Die Das Dungeon" onClose={handleCloseGenderDungeon}>
            <GenderDungeon onScore={handleScoreGenderDungeon} />
          </GamePanel>
        </Suspense>
      )}
      {showPictureMatch && (
        <Suspense fallback={<LoadingScreen />}>
          <GamePanel title="Bild Memory" onClose={handleClosePictureMatch}>
            <PictureMatch level={activeLevel} onScore={handleScorePictureMatch} />
          </GamePanel>
        </Suspense>
      )}
      {showNotifications && (
        <Suspense fallback={null}>
          <NotificationPanel
            isOpen={showNotifications}
            onClose={handleCloseNotifications}
            onNavigate={handleNotificationNavigate}
            progress={progress}
            visibleWeeks={visibleWeeks}
            unlockedWeeks={unlockedWeeks}
          />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <DayCompleteCelebration show={showCelebration} xpEarned={todayXP} onComplete={handleCloseCelebration} />
      </Suspense>
      {showStreakGuardian && (
        <Suspense fallback={null}>
          <StreakGuardian
            levelData={levelData}
            completedTasks={progress?.completedTasks || []}
            onSuccess={handleStreakGuardianSuccess}
            onClose={handleStreakGuardianClose}
          />
        </Suspense>
      )}

      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <Navbar
          activeView={activeView}
          onViewChange={handleViewChange}
          activeLevel={activeLevel}
          onLevelChange={handleLevelChange}
          xp={progress?.xp || 0}
          streak={progress?.streak || 0}
          onQuickTool={handleOpenQuickTool}
          onNotifications={handleOpenNotifications}
          hasUnreadNotifications={hasUnreadNotifications}
        />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-1 min-w-0">
            <button onClick={() => setShowSidebar(true)}
              className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-body hover:bg-bg-dark-mid transition flex-shrink-0">
              <IconMenu className="w-6 h-6" />
            </button>
            <Link to="/" onClick={() => { setActiveView('dashboard'); setSelectedDay(null); setSelectedTask(null); }}
              className="flex items-center gap-1 cursor-pointer active:scale-95 transition-all duration-150 select-none min-w-0">
              <span className="text-xl text-text-dark truncate" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Deutsch</span>
              <span className="text-xl text-gold italic truncate" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Buddy</span>
            </Link>
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <div className="flex items-center gap-1 px-2 py-1.5 bg-gold-pale border border-gold/20 min-w-0 justify-center">
              <IconFire className={`w-6 h-6 text-gold flex-shrink-0 ${progress?.streak >= 3 ? 'animate-streak-blaze' : progress?.streak > 0 ? '' : 'opacity-40'}`} />
              <span className={`text-sm font-bold tabular-nums truncate ${progress?.streak > 0 ? 'text-gold' : 'text-gold/50'}`}>{progress?.streak || 0}</span>
            </div>
            <button onClick={() => setShowNotifications(true)}
              className={`w-9 h-9 flex items-center justify-center text-text-muted hover:text-gold hover:bg-gold/10 transition relative flex-shrink-0 ${hasUnreadNotifications ? 'animate-bell-ring' : ''}`}>
              <IconBell className="w-6 h-6" />
              {hasUnreadNotifications && <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-error" />}
            </button>
            <div className="relative flex-shrink-0" ref={profileMenuRef}>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-text-on-dark text-[10px] font-bold ring-2 ring-gold/30 active:scale-90 transition-transform">
                {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 shadow-xl overflow-hidden z-50 slide-up border border-border bg-bg-white" onClick={e => e.stopPropagation()}>
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-text-dark truncate">{profile?.full_name || 'Learner'}</p>
                    <p className="text-[11px] text-text-muted truncate">{user?.email || ''}</p>
                  </div>
                  <button onClick={() => { handleViewChange('profile'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-text-body hover:bg-bg-secondary transition flex items-center gap-2"><IconUser className="w-4 h-4" /> Profile</button>
                  <button onClick={() => { handleViewChange('settings'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-text-body hover:bg-bg-secondary transition flex items-center gap-2"><IconSettings className="w-4 h-4" /> Settings</button>
                  <button onClick={handleSignOutFromApp}
                    className="w-full text-left px-4 py-2.5 text-sm text-error hover:bg-error/10 transition">Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main id="main-content" className="min-h-0 flex-1 overflow-y-auto" tabIndex={-1}>
        {selectedTask ? (
          <Suspense fallback={<LoadingScreen />}>
            <LessonPlayer
              task={selectedTask}
              tasks={currentWeek?.days?.find(d => d.day === selectedDay?.day)?.tasks || [selectedTask]}
              currentIndex={(currentWeek?.days?.find(d => d.day === selectedDay?.day)?.tasks || []).findIndex(t => t.id === selectedTask.id)}
              topicTitle={currentWeek?.title}
              onComplete={handleCompleteTask}
              onExit={() => { setSelectedTask(null); setSelectedDay(null); }}
            />
          </Suspense>
        ) : activeView === 'journey' ? (
          <Suspense fallback={<LoadingScreen />}><JourneyPage onStartLesson={() => setActiveView('dashboard')} /></Suspense>
        ) : activeView === 'review' ? (
          <Suspense fallback={<LoadingScreen />}><ReviewDeck levelData={levelData} /></Suspense>
        ) : activeView === 'dashboard' && !selectedDay ? (
          <Suspense fallback={<LoadingScreen />}><HomePage onViewJourney={() => setActiveView('journey')} /></Suspense>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-nav lg:pb-6">
            {/* Desktop: Two-column layout */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2"><Suspense fallback={<CardSkeleton />}><MainContent {...mainContentProps} /></Suspense></div>
              <div className="lg:col-span-1"><Suspense fallback={<CardSkeleton />}><RightPanel progress={progress} streak={progress.streak} onOpenSpeedBlitz={() => setShowSpeedBlitz(true)} onOpenGenderDungeon={() => setShowGenderDungeon(true)} onOpenPictureMatch={() => setShowPictureMatch(true)} /></Suspense></div>
            </div>

            {/* Mobile: Single column */}
            <div className="lg:hidden">
              <Suspense fallback={<ListSkeleton count={2} />}><MainContent {...mainContentProps} /></Suspense>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav
        activeView={activeView}
        onViewChange={handleViewChange}
        badges={bottomNavBadges}
      />

      {/* Desktop Footer */}
      <div className="hidden lg:block">
        <Suspense fallback={null}><Footer /></Suspense>
      </div>
    </div>
  );
}
