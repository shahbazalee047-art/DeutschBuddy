import { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useProgress } from './hooks/useProgress';
import a1Data from './data/a1Data';
import a1FastTrackData from './data/a1FastTrackData';
import a2Data from './data/a2Data';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
const QuickGermanTool = lazy(() => import('./components/QuickGermanTool'));
const RightPanel = lazy(() => import('./components/RightPanel'));

import MainContent from './components/MainContent';
import NotificationPanel from './components/NotificationPanel';
import MobileSidebar from './components/MobileSidebar';
import TrackToggle from './components/TrackToggle';
import ProtectedRoute from './components/ProtectedRoute';
import { IconBell, IconWave, IconUser, IconSettings, IconMenu } from './components/Icons';
import { DayCompleteCelebration } from './components/ConfettiEffect';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeLevel, setActiveLevel] = useState('A1');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [showCelebration, setShowCelebration] = useState(false);
  const [todayXP, setTodayXP] = useState(0);
  const [showQuickTool, setShowQuickTool] = useState(false);
  const [showSidebarVerbLookup, setShowSidebarVerbLookup] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifVersion, setNotifVersion] = useState(0);
  const profileMenuRef = useRef(null);

  const hasUnreadNotifications = useMemo(() => {
    try {
      const readIds = new Set(JSON.parse(localStorage.getItem('db_notif_read') || '[]'));
      const knownIds = [1, 2, 5];
      return knownIds.some(id => !readIds.has(id));
    } catch { return false; }
  }, [notifVersion]);

  useEffect(() => {
    if (!showProfileMenu) return;
    function handleClick(e) { if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) setShowProfileMenu(false); }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showProfileMenu]);
  const [historyStack, setHistoryStack] = useState([]);

  const { progress, loading, completeTask, unlockWeek, setTrackMode } = useProgress(activeLevel);
  const [trackMode, setLocalTrackMode] = useState(() => profile?.selected_pacing || 'standard');

  const historyRef = useRef(historyStack);
  historyRef.current = historyStack;

  const handleToggleTrackMode = useCallback((mode) => { setLocalTrackMode(mode); setTrackMode(mode); }, [setTrackMode]);

  const levelData = useMemo(() => 
    activeLevel === 'A1' && trackMode === 'fast' ? a1FastTrackData : (activeLevel === 'A1' ? a1Data : a2Data),
  [activeLevel, trackMode]);
  const unlockedWeeks = useMemo(() => progress.unlockedWeeks || [1], [progress.unlockedWeeks]);
  const visibleWeeks = levelData.weeks;

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
      completeTask(selectedTask.id, selectedTask.xp, selectedDay.weekId);
      setTodayXP(prev => prev + selectedTask.xp);
      const currentWeek = levelData.weeks.find(w => w.id === selectedDay.weekId);
      if (currentWeek) {
        const allDone = currentWeek.days.every(day => day.tasks.every(t => progress.completedTasks.includes(t.id) || t.id === selectedTask.id));
        if (allDone) { setShowCelebration(true); if (!unlockedWeeks.includes(selectedDay.weekId + 1)) unlockWeek(selectedDay.weekId + 1); }
      }
    }
    setSelectedTask(null);
  }, [selectedTask, selectedDay, completeTask, levelData, progress.completedTasks, unlockedWeeks, unlockWeek]);

  const handleBackToWeek = useCallback(() => { setSelectedDay(null); setSelectedTask(null); }, []);
  const currentWeek = levelData.weeks.find(w => w.id === selectedDay?.weekId);

  const getNextIncompleteDay = useCallback(() => {
    for (const week of visibleWeeks) {
      if (!unlockedWeeks.includes(week.id)) continue;
      for (const day of week.days) { if (!day.tasks.every(t => progress.completedTasks.includes(t.id))) return { weekId: week.id, day: day.day }; }
    }
    return null;
  }, [visibleWeeks, unlockedWeeks, progress.completedTasks]);
  const nextDay = getNextIncompleteDay();

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

  const handleSignOutFromApp = useCallback(async () => { try { await signOut(); } catch { /* ignore */ } navigate('/login'); }, [signOut, navigate]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/dashboard' || path === '/') {
        if (selectedTask || selectedDay || historyStack.length > 0) {
          handleBackNavigation();
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedDay, selectedTask, historyStack.length, handleBackNavigation]);

  useEffect(() => {
    let capacitorBackHandler = null;
    async function setupCapacitor() {
      try {
        const { App } = await import('@capacitor/core');
        if (App && typeof App.addListener === 'function') {
          capacitorBackHandler = await App.addListener('backButton', () => {
            if (selectedTask || selectedDay || historyRef.current.length > 0) {
              handleBackNavigation();
            } else if (activeView !== 'dashboard') {
              setActiveView('dashboard');
              setSelectedDay(null);
              setSelectedTask(null);
            } else if (App.exitApp && typeof App.exitApp === 'function') {
              App.exitApp();
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
  }, [selectedTask, selectedDay, activeView, historyStack.length, handleBackNavigation]);

  const mainContentProps = useMemo(() => ({
    activeView, selectedDay, selectedTask, currentWeek,
    progress, levelData, visibleWeeks, unlockedWeeks,
    profile, user, onSignOut: handleSignOutFromApp,
    onSelectDay: handleSelectDay, onSelectTask: handleSelectTask,
    onCompleteTask: handleCompleteTask, onBackToWeek: handleBackToWeek
  }), [activeView, selectedDay, selectedTask, currentWeek, progress, levelData, visibleWeeks, unlockedWeeks, profile, user, handleSelectDay, handleSelectTask, handleCompleteTask, handleBackToWeek, handleSignOutFromApp]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0D1A14' }}>
        <div className="flex flex-col items-center gap-4 scale-in">
          <div className="text-5xl animate-float">🇩🇪</div>
          <div className="w-10 h-10 border-3 rounded-full animate-spin" style={{ borderColor: '#1B3429', borderTopColor: '#7FB069' }} />
          <p className="text-cream-400 text-sm font-medium">Loading DeutschBuddy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0D1A14' }}>
      {showQuickTool && <Suspense fallback={null}><QuickGermanTool onClose={() => setShowQuickTool(false)} /></Suspense>}
      {showSidebar && <MobileSidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} activeView={activeView} onViewChange={handleViewChange} activeLevel={activeLevel} onLevelChange={handleLevelChange} xp={progress.xp} onVerbLookup={() => { setShowSidebar(false); setShowSidebarVerbLookup(true); }} />}
      {showSidebarVerbLookup && <Suspense fallback={null}><QuickGermanTool onClose={() => { setShowSidebarVerbLookup(false); setShowSidebar(true); }} /></Suspense>}
      {showNotifications && <NotificationPanel isOpen={showNotifications} onClose={() => { setShowNotifications(false); setNotifVersion(v => v + 1); }} onNavigate={(action) => {
        if (typeof action === 'string') {
          handleViewChange(action);
        } else if (action.type === 'view') {
          handleViewChange(action.target);
        } else if (action.type === 'day') {
          handleSelectDay(action.weekId, action.day);
        }
      }} progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} unlockedWeeks={unlockedWeeks} />}
      <DayCompleteCelebration show={showCelebration} xpEarned={todayXP} />

      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <Navbar activeView={activeView} onViewChange={handleViewChange} activeLevel={activeLevel} onLevelChange={handleLevelChange} xp={progress.xp} streak={progress.streak} onQuickTool={() => setShowQuickTool(true)} onNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40" style={{ background: 'rgba(13, 26, 20, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(36, 61, 47, 0.4)' }}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-14 px-3">
          <button onClick={() => setShowSidebar(true)}
            className="justify-self-start w-9 h-9 rounded-xl flex items-center justify-center text-cream-400 hover:text-cream-200 hover:bg-forest-800 transition">
            <IconMenu className="w-5 h-5" />
          </button>
          <Link to="/" onClick={() => { setActiveView('dashboard'); setSelectedDay(null); setSelectedTask(null); }}
            className="flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all duration-150 select-none">
            <span className="text-[1.6rem] leading-none">🇩🇪</span>
            <span className="text-xl text-cream-100" style={{ fontFamily: 'DM Serif Display, serif' }}>Deutsch</span>
            <span className="text-xl text-sage-400" style={{ fontFamily: 'DM Serif Display, serif' }}>Buddy</span>
          </Link>
          <div className="justify-self-end flex items-center gap-1.5">
            <button onClick={() => setShowNotifications(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-cream-400 hover:text-sage-400 hover:bg-sage-400/10 transition relative">
              <IconBell className="w-5 h-5" />
              {hasUnreadNotifications && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error" />}
            </button>
            <div className="relative" ref={profileMenuRef}>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-sage-400 to-amber-400 flex items-center justify-center text-forest-900 text-xs font-bold ring-2 ring-sage-400/30 active:scale-90 transition-transform">
                {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-xl overflow-hidden z-50 slide-up border border-border" style={{ background: '#192D22' }} onClick={e => e.stopPropagation()}>
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-cream-200 truncate">{profile?.full_name || 'Learner'}</p>
                    <p className="text-[11px] text-cream-500 truncate">{user?.email || ''}</p>
                  </div>
                  <button onClick={() => { setActiveView('profile'); setShowProfileMenu(false); setSelectedDay(null); setSelectedTask(null); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-cream-300 hover:bg-forest-800 transition flex items-center gap-2"><IconUser className="w-4 h-4" /> Profile</button>
                  <button onClick={() => { setActiveView('settings'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-cream-300 hover:bg-forest-800 transition flex items-center gap-2"><IconSettings className="w-4 h-4" /> Settings</button>
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
              <h1 className="text-3xl text-cream-100" style={{ fontFamily: 'DM Serif Display, serif', letterSpacing: '-0.3px' }}>
                Hallo, {profile?.full_name?.split(' ')[0] || 'Learner'}! <IconWave className="w-7 h-7 inline-block align-text-bottom text-sage-400 animate-sage-glow" />
              </h1>
              <p className="text-cream-500 mt-1" style={{ fontSize: '16px', lineHeight: '1.5' }}>Ready to continue learning?</p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              {activeLevel === 'A1' && <TrackToggle mode={trackMode} onToggle={handleToggleTrackMode} />}
              {activeLevel === 'A2' && <span className="text-xs font-semibold px-4 py-2 rounded-full bg-sky-400/10 text-sky-400 border border-sky-400/20">A2: Fixed 8-week track</span>}
            </div>

            {nextDay && (
              <button onClick={() => handleSelectDay(nextDay.weekId, nextDay.day)}
                className="w-full mb-6 glass-card p-5 flex items-center gap-4 text-left hover:border-sage-400/20 transition-all group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #7FB069, #D4A574)', boxShadow: '0 4px 12px rgba(127, 176, 105, 0.2)' }}>
                  <span>▶</span>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-sage-400 uppercase tracking-widest animate-sage-glow">Continue where you left off</div>
                  <div className="text-sm font-semibold text-cream-300 mt-1">Week {nextDay.weekId}, Day {nextDay.day}</div>
                </div>
                <span className="text-cream-500 group-hover:text-sage-400 transition text-lg">→</span>
              </button>
            )}

            <div className="glass-card p-5 mb-6" style={{ borderLeft: `4px solid ${activeLevel === 'A1' ? '#7FB069' : '#6BA3BE'}`, paddingLeft: '20px' }}>
              <h2 className="text-xl text-cream-100" style={{ fontFamily: 'DM Serif Display, serif' }}>{levelData.title}</h2>
              <p className="text-sm text-cream-500 mt-1" style={{ lineHeight: '1.5' }}>{levelData.description}</p>
            </div>
          </>
        )}

        {/* Desktop: Two-column layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><Suspense fallback={<div className="text-cream-500 text-sm">Loading...</div>}><MainContent {...mainContentProps} /></Suspense></div>
          <div className="lg:col-span-1"><Suspense fallback={<div className="text-cream-500 text-sm">Loading...</div>}><RightPanel progress={progress} streak={progress.streak} /></Suspense></div>
        </div>

        {/* Mobile: Single column */}
        <div className="lg:hidden">
          <Suspense fallback={<div className="text-cream-500 text-sm">Loading...</div>}><MainContent {...mainContentProps} /></Suspense>
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
