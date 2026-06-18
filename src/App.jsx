import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useProgress } from './hooks/useProgress';
import a1Data from './data/a1Data';
import a1FastTrackData from './data/a1FastTrackData';
import a2Data from './data/a2Data';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
const ProgressDashboard = lazy(() => import('./components/ProgressDashboard'));
const BadgeGallery = lazy(() => import('./components/BadgeGallery'));
const CommunitySection = lazy(() => import('./components/CommunitySection'));
const ResourceLibrary = lazy(() => import('./components/ResourceLibrary'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const QuickGermanTool = lazy(() => import('./components/QuickGermanTool'));
const RightPanel = lazy(() => import('./components/RightPanel'));

import WeeklyModule from './components/WeeklyModule';
import DailyTasks from './components/DailyTasks';
import TaskRenderer from './components/TaskRenderer';
import NotificationPanel from './components/NotificationPanel';
import MobileSidebar from './components/MobileSidebar';
import TrackToggle from './components/TrackToggle';
import ProtectedRoute from './components/ProtectedRoute';
import { IconBell, IconBolt, IconWave, IconUser, IconSettings, IconLogOut, IconMenu } from './components/Icons';
import { DayCompleteCelebration } from './components/ConfettiEffect';
import Footer from './components/Footer';
import SettingsPage from './components/SettingsPage';
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

  function handleToggleTrackMode(mode) { setLocalTrackMode(mode); setTrackMode(mode); }

  const levelData = activeLevel === 'A1' && trackMode === 'fast' ? a1FastTrackData : (activeLevel === 'A1' ? a1Data : a2Data);
  const unlockedWeeks = progress.unlockedWeeks || [1];
  const visibleWeeks = levelData.weeks;

  const handleSelectDay = (weekId, day) => {
    setHistoryStack(prev => [...prev, { view: 'dashboard', day: null, task: null }]);
    setSelectedDay({ weekId, day });
    setSelectedTask(null);
    setActiveView('dashboard');
  };
  const handleSelectTask = (task) => {
    setHistoryStack(prev => [...prev, { view: activeView, day: selectedDay, task: selectedTask }]);
    setSelectedTask(task);
  };

  const handleCompleteTask = () => {
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
  };

  const handleBackToWeek = () => { setSelectedDay(null); setSelectedTask(null); };
  const currentWeek = levelData.weeks.find(w => w.id === selectedDay?.weekId);

  const getNextIncompleteDay = () => {
    for (const week of visibleWeeks) {
      if (!unlockedWeeks.includes(week.id)) continue;
      for (const day of week.days) { if (!day.tasks.every(t => progress.completedTasks.includes(t.id))) return { weekId: week.id, day: day.day }; }
    }
    return null;
  };
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

  async function handleSignOutFromApp() { try { await signOut(); } catch {} navigate('/login'); }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#18181B' }}>
        <div className="flex flex-col items-center gap-4 scale-in">
          <div className="text-5xl animate-float">🇩🇪</div>
          <div className="w-10 h-10 border-3 border-zinc-700 rounded-full animate-spin" style={{ borderTopColor: '#A3E635' }} />
          <p className="text-zinc-400 text-sm font-medium">Loading DeutschBuddy...</p>
        </div>
      </div>
    );
  }

  function renderMainContent() {
    if (activeView === 'community') return <CommunitySection user={user} />;
    if (activeView === 'profile') return <ProfilePage />;
    if (activeView === 'settings') return <SettingsPage profile={profile} user={user} onSignOut={handleSignOutFromApp} />;
    if (activeView === 'progress') return <ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} />;
    if (activeView === 'progress-statistics') return <ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="statistics" />;
    if (activeView === 'progress-skills') return <ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="skills" />;
    if (activeView === 'progress-calendar') return <ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="calendar" />;
    if (activeView === 'badges') return <BadgeGallery badges={progress.badges || []} />;
    if (activeView === 'resources') return <ResourceLibrary resources={[...new Map(levelData.weeks.flatMap(w => w.resources || []).map(r => [r.name, r])).values()]} />;
    if (selectedTask) {
      return (
        <div className="fade-in">
          <button onClick={() => setSelectedTask(null)} className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-lime-400 mb-4 transition">
            <span>&larr;</span> Back to Day {selectedDay.day}
          </button>
          <div className="paper-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-lime-600 bg-lime-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider border border-lime-500/20">{selectedTask.type}</span>
              <span className="text-xs font-bold text-cyan-400">+{selectedTask.xp} XP</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-100 mb-1">{selectedTask.title}</h2>
            <p className="text-sm text-zinc-400 mb-5">{selectedTask.description}</p>
            <TaskRenderer task={selectedTask} onComplete={handleCompleteTask} />
          </div>
        </div>
      );
    }
    if (selectedDay && currentWeek) return <DailyTasks week={currentWeek} day={selectedDay.day} completedTasks={progress.completedTasks} onSelectTask={handleSelectTask} onBack={handleBackToWeek} />;

    return (
      <div className="space-y-4">
        {visibleWeeks.map(week => (
          <WeeklyModule key={week.id} week={week} completedTasks={progress.completedTasks} onSelectDay={handleSelectDay} selectedDay={selectedDay} isUnlocked={unlockedWeeks.includes(week.id)} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#18181B' }}>
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
      <div className="lg:hidden sticky top-0 z-40" style={{ background: 'rgba(24, 24, 27, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(63, 63, 70, 0.3)' }}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-14 px-3">
          <button onClick={() => setShowSidebar(true)}
            className="justify-self-start w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition">
            <IconMenu className="w-5 h-5" />
          </button>
          <Link to="/" onClick={() => { setActiveView('dashboard'); setSelectedDay(null); setSelectedTask(null); }}
            className="flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all duration-150 select-none">
            <span className="text-[1.6rem] leading-none">🇩🇪</span>
            <span className="text-xl font-extrabold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
            <span className="text-xl font-extrabold text-lime-400" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
          </Link>
          <div className="justify-self-end flex items-center gap-1.5">
            <button onClick={() => setShowNotifications(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-lime-400 hover:bg-lime-500/10 transition relative">
              <IconBell className="w-5 h-5" />
              {hasUnreadNotifications && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error" />}
            </button>
            <div className="relative" ref={profileMenuRef}>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-lime-500 to-cyan-500 flex items-center justify-center text-zinc-900 text-xs font-bold ring-2 ring-lime-400/40 active:scale-90 transition-transform">
                {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-xl overflow-hidden z-50 slide-up border border-zinc-700" style={{ background: '#20202A' }} onClick={e => e.stopPropagation()}>
                  <div className="px-4 py-3 border-b border-zinc-700">
                    <p className="text-sm font-semibold text-zinc-200 truncate">{profile?.full_name || 'Learner'}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{user?.email || ''}</p>
                  </div>
                  <button onClick={() => { setActiveView('profile'); setShowProfileMenu(false); setSelectedDay(null); setSelectedTask(null); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition flex items-center gap-2"><IconUser className="w-4 h-4" /> Profile</button>
                  <button onClick={() => { setActiveView('settings'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition flex items-center gap-2"><IconSettings className="w-4 h-4" /> Settings</button>
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
              <h1 className="text-3xl font-bold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>
                Hallo, {profile?.full_name?.split(' ')[0] || 'Learner'}! <IconWave className="w-7 h-7 inline-block align-text-bottom text-lime-400 animate-cyan-pulse" />
              </h1>
              <p className="text-zinc-500 mt-1" style={{ fontSize: '16px', lineHeight: '1.5' }}>Ready to continue learning?</p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              {activeLevel === 'A1' && <TrackToggle mode={trackMode} onToggle={handleToggleTrackMode} />}
              {activeLevel === 'A2' && <span className="text-xs font-semibold px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">A2: Fixed 8-week track</span>}
            </div>

            {nextDay && (
              <button onClick={() => handleSelectDay(nextDay.weekId, nextDay.day)}
                className="w-full mb-6 glass-card p-5 flex items-center gap-4 text-left hover:border-lime-500/30 transition-all group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #A3E635, #06B6D4)', boxShadow: '0 4px 12px rgba(163, 230, 53, 0.3)' }}>
                  <span>▶</span>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-lime-400 uppercase tracking-widest animate-cyan-pulse">Continue where you left off</div>
                  <div className="text-sm font-semibold text-zinc-300 mt-1">Week {nextDay.weekId}, Day {nextDay.day}</div>
                </div>
                <span className="text-zinc-600 group-hover:text-lime-400 transition text-lg">→</span>
              </button>
            )}

            <div className="glass-card p-5 mb-6" style={{ borderLeft: `4px solid ${activeLevel === 'A1' ? '#A3E635' : '#06B6D4'}`, paddingLeft: '20px' }}>
              <h2 className="text-xl font-bold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif' }}>{levelData.title}</h2>
              <p className="text-sm text-zinc-500 mt-1" style={{ lineHeight: '1.5' }}>{levelData.description}</p>
            </div>
          </>
        )}

        {/* Desktop: Two-column layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><Suspense fallback={<div className="text-zinc-500 text-sm">Loading...</div>}>{renderMainContent()}</Suspense></div>
          <div className="lg:col-span-1"><Suspense fallback={<div className="text-zinc-500 text-sm">Loading...</div>}><RightPanel progress={progress} streak={progress.streak} /></Suspense></div>
        </div>

        {/* Mobile: Single column */}
        <div className="lg:hidden">
          <Suspense fallback={<div className="text-zinc-500 text-sm">Loading...</div>}>{renderMainContent()}</Suspense>
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
