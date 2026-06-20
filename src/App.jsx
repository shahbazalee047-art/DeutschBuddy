import { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useProgress } from './hooks/useProgress';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
const QuickGermanTool = lazy(() => import('./components/QuickGermanTool'));
const RightPanel = lazy(() => import('./components/RightPanel'));
import { CardSkeleton, ListSkeleton } from './components/Skeleton';
import XpToast from './components/XpToast';
import StreakGuardian from './components/StreakGuardian';

import MainContent from './components/MainContent';
import NotificationPanel from './components/NotificationPanel';
import MobileSidebar from './components/MobileSidebar';
import TrackToggle from './components/TrackToggle';
import ProtectedRoute from './components/ProtectedRoute';
import { IconBell, IconWave, IconUser, IconSettings, IconMenu, IconFire, IconWarning, IconRefresh, IconBookOpen } from './components/Icons';
import DayCompleteCelebration from './components/ConfettiEffect';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SpeedBlitz from './components/SpeedBlitz';
import GenderDungeon from './components/GenderDungeon';
import PictureMatch from './components/PictureMatch';
import GamePanel from './components/GamePanel';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-4 scale-in">
        <IconBookOpen className="w-12 h-12 text-gold animate-float" />
        <div className="w-10 h-10 border-3 border-bg-dark-mid border-t-gold rounded-full animate-spin" />
        <p className="text-text-muted text-sm font-medium">Loading DeutschBuddy...</p>
      </div>
    </div>
  );
}

function AuthCheck({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-bg-primary">
        <div className="text-center">
          <IconBookOpen className="w-12 h-12 mx-auto mb-4 text-gold" />
          <p className="text-text-muted text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return children;
}

function DashboardContent() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeLevel, setActiveLevel] = useState('A1');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [showCelebration, setShowCelebration] = useState(false);
const [todayXP, setTodayXP] = useState(0);
  const [xpToast, setXpToast] = useState(null);
  const [showQuickTool, setShowQuickTool] = useState(false);
  const [showSidebarVerbLookup, setShowSidebarVerbLookup] = useState(false);
  const [showSpeedBlitz, setShowSpeedBlitz] = useState(false);
  const [showGenderDungeon, setShowGenderDungeon] = useState(false);
  const [showPictureMatch, setShowPictureMatch] = useState(false);
  const [showStreakGuardian, setShowStreakGuardian] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifVersion, setNotifVersion] = useState(0);
  const [historyStack, setHistoryStack] = useState([]);
  const [trackMode, setLocalTrackMode] = useState(() => profile?.selected_pacing || 'standard');
  const [levelData, setLevelData] = useState(null);

  useEffect(() => {
    if (profile?.selected_pacing && profile.selected_pacing !== trackMode) {
      setLocalTrackMode(profile.selected_pacing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- trackMode intentionally excluded: we sync FROM profile TO local state only
  }, [profile?.selected_pacing]);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const profileMenuRef = useRef(null);
  const isProcessingBack = useRef(false);
  const activeViewRef = useRef(activeView);
  const selectedTaskRef = useRef(selectedTask);
  const selectedDayRef = useRef(selectedDay);
  const handleBackNavRef = useRef(null);
  const showQuickToolRef = useRef(false);
  const showSidebarVerbLookupRef = useRef(false);
  const showSpeedBlitzRef = useRef(false);
  const showGenderDungeonRef = useRef(false);
  const showPictureMatchRef = useRef(false);
  const historyRef = useRef(historyStack);

  useEffect(() => { activeViewRef.current = activeView; }, [activeView]);
  useEffect(() => { selectedTaskRef.current = selectedTask; }, [selectedTask]);
  useEffect(() => { selectedDayRef.current = selectedDay; }, [selectedDay]);
  useEffect(() => { showQuickToolRef.current = showQuickTool; }, [showQuickTool]);
  useEffect(() => { showSidebarVerbLookupRef.current = showSidebarVerbLookup; }, [showSidebarVerbLookup]);
  useEffect(() => { showSpeedBlitzRef.current = showSpeedBlitz; }, [showSpeedBlitz]);
  useEffect(() => { showGenderDungeonRef.current = showGenderDungeon; }, [showGenderDungeon]);
  useEffect(() => { showPictureMatchRef.current = showPictureMatch; }, [showPictureMatch]);
  useEffect(() => { historyRef.current = historyStack; }, [historyStack]);

  // Push browser history state whenever the dashboard view or navigation state changes
  // so the phone back gesture navigates back through views instead of closing the app.
  useEffect(() => {
    if (isProcessingBack.current) return;
    if (activeView === 'dashboard' && !selectedDay && !selectedTask) return;
    window.history.pushState(
      { activeView, selectedDay, selectedTask, activeLevel },
      '',
      window.location.pathname
    );
  }, [activeView, selectedDay, selectedTask, activeLevel]);

  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  useEffect(() => {
    try {
      const readIds = new Set(JSON.parse(localStorage.getItem('db_notif_read') || '[]'));
      const knownIds = [1, 2, 5];
      const hasUnread = knownIds.some(id => !readIds.has(id));
      setTimeout(() => setHasUnreadNotifications(hasUnread), 0);
    } catch { setTimeout(() => setHasUnreadNotifications(false), 0); }
  }, [notifVersion]);

  useEffect(() => {
    if (!showProfileMenu) return;
    function handleClick(e) { if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) setShowProfileMenu(false); }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showProfileMenu]);

  const { progress, loading, completeTask, unlockWeek, setTrackMode, recoverStreak } = useProgress(activeLevel);

  const handleToggleTrackMode = useCallback((mode) => { setLocalTrackMode(mode); setTrackMode(mode); }, [setTrackMode]);

  useEffect(() => {
    let cancelled = false;
    setDataLoading(true);
    setLoadError(false);
    async function loadData() {
      try {
        let module;
        if (activeLevel === 'A1' && trackMode === 'fast') {
          module = await import('./data/a1FastTrackData.js');
        } else if (activeLevel === 'A1') {
          module = await import('./data/a1Data.js');
        } else {
          module = await import('./data/a2Data.js');
        }
        if (!cancelled) {
          setLevelData(module.default || module);
        }
      } catch (err) {
        console.error('Failed to load curriculum data:', err);
        if (!cancelled) { setLevelData(null); setLoadError(true); }
      } finally {
        if (!cancelled) setDataLoading(false);
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, [activeLevel, trackMode, retryKey]);

  const visibleWeeks = useMemo(() => levelData?.weeks || [], [levelData]);
  const unlockedWeeks = useMemo(() => progress && progress.unlockedWeeks ? progress.unlockedWeeks : [1], [progress]);

  const handleSelectDay = useCallback((weekId, day) => {
    setHistoryStack(prev => [...prev, { view: 'dashboard', day: null, task: null }]);
    setSelectedDay({ weekId, day });
    setSelectedTask(null);
    setActiveView('dashboard');
  }, []);

  const handleSelectTask = useCallback((task) => {
    setHistoryStack(prev => [...prev, { view: activeView, day: selectedDay, task: selectedTask }]);
    setSelectedTask(task);
  }, [activeView, selectedDay, selectedTask]);

  const handleCompleteTask = useCallback(() => {
    if (selectedTask) {
      completeTask(selectedTask.id, selectedTask.xp, selectedDay.weekId, selectedDay.day);
      setTodayXP(prev => prev + selectedTask.xp);
      setXpToast(selectedTask.xp);
      const currentWeek = levelData.weeks.find(w => w.id === selectedDay.weekId);
      if (currentWeek) {
        const allDone = currentWeek.days.every(day => day.tasks.every(t => progress.completedTasks.includes(t.id) || t.id === selectedTask.id));
        if (allDone) { setShowCelebration(true); if (!unlockedWeeks.includes(selectedDay.weekId + 1)) unlockWeek(selectedDay.weekId + 1); }
      }
    }
    setSelectedTask(null);
  }, [selectedTask, selectedDay, completeTask, levelData, progress.completedTasks, unlockedWeeks, unlockWeek]);

  const handleBackToWeek = useCallback(() => { setSelectedDay(null); setSelectedTask(null); }, []);
  const currentWeek = levelData?.weeks.find(w => w.id === selectedDay?.weekId);

  const handleViewChange = useCallback((view) => {
    setHistoryStack(prev => [...prev, { view: activeView, day: selectedDay, task: selectedTask, level: activeLevel }]);
    setActiveView(view);
    setSelectedDay(null);
    setSelectedTask(null);
    if (showNotifications) setShowNotifications(false);
  }, [activeView, selectedDay, selectedTask, activeLevel, showNotifications]);

  const handleLevelChange = useCallback((level) => {
    setActiveLevel(level);
    setSelectedDay(null);
    setSelectedTask(null);
    setActiveView('dashboard');
  }, []);

  const handleBackNavigation = useCallback(() => {
    if (historyRef.current.length > 0) {
      const prev = historyRef.current[historyRef.current.length - 1];
      setHistoryStack(prev => prev.slice(0, -1));
      setActiveView(prev.view || 'dashboard');
      setSelectedDay(prev.day || null);
      setSelectedTask(prev.task || null);
      if (prev.level) setActiveLevel(prev.level);
    } else if (selectedTask) {
      setSelectedTask(null);
    } else if (selectedDay) {
      setSelectedDay(null);
    }
  }, [selectedTask, selectedDay]);

  useEffect(() => { handleBackNavRef.current = handleBackNavigation; }, [handleBackNavigation]);

  const handleSignOutFromApp = useCallback(async () => { try { await signOut(); } catch { /* ignore */ } navigate('/login'); }, [signOut, navigate]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (isProcessingBack.current) return;

      // Close panels first
      if (showSidebarVerbLookupRef.current) {
        isProcessingBack.current = true;
        setShowSidebarVerbLookup(false);
        setShowSidebar(true);
        setTimeout(() => { isProcessingBack.current = false; }, 300);
        return;
      }
      if (showSpeedBlitzRef.current) {
        isProcessingBack.current = true;
        setShowSpeedBlitz(false);
        setShowSidebar(true);
        setTimeout(() => { isProcessingBack.current = false; }, 300);
        return;
      }
      if (showGenderDungeonRef.current) {
        isProcessingBack.current = true;
        setShowGenderDungeon(false);
        setShowSidebar(true);
        setTimeout(() => { isProcessingBack.current = false; }, 300);
        return;
      }
      if (showPictureMatchRef.current) {
        isProcessingBack.current = true;
        setShowPictureMatch(false);
        setShowSidebar(true);
        setTimeout(() => { isProcessingBack.current = false; }, 300);
        return;
      }
      if (showQuickToolRef.current) {
        isProcessingBack.current = true;
        setShowQuickTool(false);
        setTimeout(() => { isProcessingBack.current = false; }, 300);
        return;
      }

      // Restore previous dashboard view from history state
      if (event.state?.activeView) {
        isProcessingBack.current = true;
        setActiveView(event.state.activeView);
        setSelectedDay(event.state.selectedDay || null);
        setSelectedTask(event.state.selectedTask || null);
        if (event.state.activeLevel) setActiveLevel(event.state.activeLevel);
        setTimeout(() => { isProcessingBack.current = false; }, 300);
        return;
      }

      // If no state and we're not on dashboard, return to dashboard
      if (activeViewRef.current !== 'dashboard') {
        isProcessingBack.current = true;
        setActiveView('dashboard');
        setSelectedDay(null);
        setSelectedTask(null);
        setTimeout(() => { isProcessingBack.current = false; }, 300);
        return;
      }

      // Dashboard internal back navigation
      if (selectedTaskRef.current || selectedDayRef.current || historyRef.current.length > 0) {
        isProcessingBack.current = true;
        handleBackNavRef.current();
        setTimeout(() => { isProcessingBack.current = false; }, 300);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    let capacitorBackHandler = null;
    async function setupCapacitor() {
      try {
        const { App } = await import('@capacitor/core');
        if (App && typeof App.addListener === 'function') {
          capacitorBackHandler = await App.addListener('backButton', () => {
            if (isProcessingBack.current) return;

            if (showSidebarVerbLookupRef.current) {
              isProcessingBack.current = true;
              setShowSidebarVerbLookup(false);
              setShowSidebar(true);
              setTimeout(() => { isProcessingBack.current = false; }, 300);
              return;
            }
            if (showSpeedBlitzRef.current) {
              isProcessingBack.current = true;
              setShowSpeedBlitz(false);
              setShowSidebar(true);
              setTimeout(() => { isProcessingBack.current = false; }, 300);
              return;
            }
            if (showGenderDungeonRef.current) {
              isProcessingBack.current = true;
              setShowGenderDungeon(false);
              setShowSidebar(true);
              setTimeout(() => { isProcessingBack.current = false; }, 300);
              return;
            }
            if (showPictureMatchRef.current) {
              isProcessingBack.current = true;
              setShowPictureMatch(false);
              setShowSidebar(true);
              setTimeout(() => { isProcessingBack.current = false; }, 300);
              return;
            }
            if (showQuickToolRef.current) {
              isProcessingBack.current = true;
              setShowQuickTool(false);
              setTimeout(() => { isProcessingBack.current = false; }, 300);
              return;
            }

            // Internal dashboard task/day back navigation
            if (selectedTaskRef.current || selectedDayRef.current || historyRef.current.length > 0) {
              isProcessingBack.current = true;
              handleBackNavRef.current();
              setTimeout(() => { isProcessingBack.current = false; }, 300);
              return;
            }

            // Go back to dashboard from any other view
            if (activeViewRef.current !== 'dashboard') {
              isProcessingBack.current = true;
              setActiveView('dashboard');
              setSelectedDay(null);
              setSelectedTask(null);
              setTimeout(() => { isProcessingBack.current = false; }, 300);
            }
          });
        }
      } catch {
        // Capacitor not available in browser
      }
    }
    setupCapacitor();
    return () => {
      if (capacitorBackHandler && typeof capacitorBackHandler.remove === 'function') {
        capacitorBackHandler.remove();
      }
    };
  }, []);

  const mainContentProps = useMemo(() => ({
    activeView, activeLevel, selectedDay, selectedTask, currentWeek,
    progress, levelData, visibleWeeks, unlockedWeeks,
    profile, user, onSignOut: handleSignOutFromApp,
    onSelectDay: handleSelectDay, onSelectTask: handleSelectTask,
    onCompleteTask: handleCompleteTask, onBackToWeek: handleBackToWeek
  }), [activeView, activeLevel, selectedDay, selectedTask, currentWeek, progress, levelData, visibleWeeks, unlockedWeeks, profile, user, handleSelectDay, handleSelectTask, handleCompleteTask, handleBackToWeek, handleSignOutFromApp]);

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-bg-primary">
        <div className="paper-card p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-error/10">
            <IconWarning className="w-10 h-10 text-error" />
          </div>
          <h2 className="text-2xl font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Failed to Load Curriculum
          </h2>
          <p className="text-sm text-text-muted mb-6">
            We couldn&apos;t load the lesson data. Please check your connection and try again.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => { setLoadError(false); setRetryKey(k => k + 1); }}
              className="btn-primary flex items-center gap-2"
            >
              <IconRefresh className="w-4 h-4" /> Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary flex items-center gap-2"
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
    <div className="min-h-screen bg-bg-primary">
      {xpToast && <XpToast xp={xpToast} onComplete={() => setXpToast(null)} />}
      {showQuickTool && <Suspense fallback={null}><QuickGermanTool onClose={() => setShowQuickTool(false)} /></Suspense>}
      {showSidebar && <MobileSidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} activeView={activeView} onViewChange={handleViewChange} activeLevel={activeLevel} onLevelChange={handleLevelChange} onVerbLookup={() => { setShowSidebar(false); setShowSidebarVerbLookup(true); }} onOpenSpeedBlitz={() => { setShowSidebar(false); setShowSpeedBlitz(true); }} onOpenGenderDungeon={() => { setShowSidebar(false); setShowGenderDungeon(true); }} onOpenPictureMatch={() => { setShowSidebar(false); setShowPictureMatch(true); }} />}
      {showSidebarVerbLookup && <Suspense fallback={null}><QuickGermanTool onClose={() => { setShowSidebarVerbLookup(false); setShowSidebar(true); }} /></Suspense>}
      {showSpeedBlitz && <GamePanel title="Wortblitz" onClose={() => { setShowSpeedBlitz(false); setShowSidebar(true); }}><SpeedBlitz level={activeLevel} /></GamePanel>}
      {showGenderDungeon && <GamePanel title="Der Die Das Dungeon" onClose={() => { setShowGenderDungeon(false); setShowSidebar(true); }}><GenderDungeon /></GamePanel>}
      {showPictureMatch && <GamePanel title="Bild Memory" onClose={() => { setShowPictureMatch(false); setShowSidebar(true); }}><PictureMatch level={activeLevel} /></GamePanel>}
      {showNotifications && <NotificationPanel isOpen={showNotifications} onClose={() => { setShowNotifications(false); setNotifVersion(v => v + 1); }} onNavigate={(action) => {
        if (typeof action === 'string') {
          handleViewChange(action);
        } else if (action.type === 'view') {
          handleViewChange(action.target);
        } else if (action.type === 'day') {
          handleSelectDay(action.weekId, action.day);
        } else if (action.type === 'guardian') {
          setShowStreakGuardian(true);
        }
      }} progress={progress} visibleWeeks={visibleWeeks} unlockedWeeks={unlockedWeeks} />}
      <DayCompleteCelebration show={showCelebration} xpEarned={todayXP} onComplete={() => setShowCelebration(false)} />
      {showStreakGuardian && (
        <StreakGuardian
          levelData={levelData}
          completedTasks={progress?.completedTasks || []}
          onSuccess={() => { recoverStreak(); setShowStreakGuardian(false); }}
          onClose={() => setShowStreakGuardian(false)}
        />
      )}

      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <Navbar activeView={activeView} onViewChange={handleViewChange} activeLevel={activeLevel} onLevelChange={handleLevelChange} xp={progress?.xp || 0} streak={progress?.streak || 0} onQuickTool={() => setShowQuickTool(true)} onNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center justify-between h-16 px-2">
          <div className="flex items-center gap-1">
            <button onClick={() => setShowSidebar(true)}
              className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-body hover:bg-bg-dark-mid transition">
              <IconMenu className="w-6 h-6" />
            </button>
            <Link to="/" onClick={() => { setActiveView('dashboard'); setSelectedDay(null); setSelectedTask(null); }}
              className="flex items-center gap-1 cursor-pointer active:scale-95 transition-all duration-150 select-none">
              <span className="text-xl text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Deutsch</span>
              <span className="text-xl text-gold italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Buddy</span>
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 px-2 py-1.5 bg-gold-pale border border-gold/20 min-w-[48px] justify-center">
              <IconFire className={`w-6 h-6 text-gold ${progress?.streak >= 3 ? 'animate-streak-blaze' : progress?.streak > 0 ? '' : 'opacity-40'}`} />
              <span className={`text-sm font-bold tabular-nums ${progress?.streak > 0 ? 'text-gold' : 'text-gold/50'}`}>{progress?.streak || 0}</span>
            </div>
            <button onClick={() => setShowNotifications(true)}
              className={`w-9 h-9 flex items-center justify-center text-text-muted hover:text-gold hover:bg-gold/10 transition relative ${hasUnreadNotifications ? 'animate-bell-ring' : ''}`}>
              <IconBell className="w-6 h-6" />
              {hasUnreadNotifications && <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-error" />}
            </button>
            <div className="relative" ref={profileMenuRef}>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeView === 'dashboard' && !selectedDay && !selectedTask && (
          <>
            <div className="mb-6 slide-up text-center lg:text-left">
              <span className="eyebrow">Dashboard</span>
              <h1 className="text-3xl text-text-dark editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.3px' }}>
                Hallo, <i>{profile?.full_name?.split(' ')[0] || 'Learner'}</i>! <IconWave className="w-7 h-7 inline-block align-text-bottom text-gold animate-sage-glow" />
              </h1>
              <p className="text-text-muted mt-1" style={{ fontSize: '16px', lineHeight: '1.5' }}>Ready to continue learning?</p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              {activeLevel === 'A1' && <TrackToggle mode={trackMode} onToggle={handleToggleTrackMode} />}
              {activeLevel === 'A2' && <span className="text-xs font-semibold px-4 py-2 rounded-full bg-gold-pale text-gold border border-gold/20">A2: Fixed 8-week track</span>}
            </div>

            <div className="paper-card p-5 mb-6" style={{ borderLeft: `4px solid ${activeLevel === 'A1' ? 'var(--gold)' : 'var(--gold-light)'}`, paddingLeft: '20px' }}>
              <h2 className="text-xl text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{levelData.title}</h2>
              <p className="text-sm text-text-muted mt-1" style={{ lineHeight: '1.5' }}>{levelData.description}</p>
            </div>
          </>
        )}

        {/* Desktop: Two-column layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><Suspense fallback={<CardSkeleton />}><MainContent {...mainContentProps} /></Suspense></div>
          <div className="lg:col-span-1"><Suspense fallback={<CardSkeleton />}><RightPanel progress={progress} streak={progress.streak} activeLevel={activeLevel} /></Suspense></div>
        </div>

        {/* Mobile: Single column */}
        <div className="lg:hidden">
          <Suspense fallback={<ListSkeleton count={2} />}><MainContent {...mainContentProps} /></Suspense>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden pb-16">
        <BottomNav activeView={activeView} onViewChange={handleViewChange} />
      </div>

      {/* Desktop Footer */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <AuthCheck>
      <DashboardContent />
    </AuthCheck>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}