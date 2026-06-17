import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useProgress } from './hooks/useProgress';
import a1Data from './data/a1Data';
import a1FastTrackData from './data/a1FastTrackData';
import a2Data from './data/a2Data';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import RightPanel from './components/RightPanel';
import WeeklyModule from './components/WeeklyModule';
import DailyTasks from './components/DailyTasks';
import TaskRenderer from './components/TaskRenderer';
import ProgressDashboard from './components/ProgressDashboard';
import BadgeGallery from './components/BadgeGallery';
import ResourceLibrary from './components/ResourceLibrary';
import CommunitySection from './components/CommunitySection';
import NotificationPanel from './components/NotificationPanel';
import ProfilePage from './components/ProfilePage';
import TrackToggle from './components/TrackToggle';
import QuickGermanTool from './components/QuickGermanTool';
import ProtectedRoute from './components/ProtectedRoute';
import { DayCompleteCelebration } from './components/ConfettiEffect';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function Dashboard() {
  const { profile } = useAuth();
  const [activeLevel, setActiveLevel] = useState('A1');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [showCelebration, setShowCelebration] = useState(false);
  const [todayXP, setTodayXP] = useState(0);
  const [showQuickTool, setShowQuickTool] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { progress, loading, completeTask, unlockWeek, setTrackMode } = useProgress(activeLevel);
  const [trackMode, setLocalTrackMode] = useState(() => profile?.selected_pacing || 'standard');

  function handleToggleTrackMode(mode) { setLocalTrackMode(mode); setTrackMode(mode); }

  const levelData = activeLevel === 'A1' && trackMode === 'fast' ? a1FastTrackData : (activeLevel === 'A1' ? a1Data : a2Data);
  const unlockedWeeks = progress.unlockedWeeks || [1];
  const visibleWeeks = levelData.weeks;

  const handleSelectDay = (weekId, day) => { setSelectedDay({ weekId, day }); setSelectedTask(null); setActiveView('dashboard'); };
  const handleSelectTask = (task) => setSelectedTask(task);

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

  // Fix: Prevent back button from exiting to login
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/dashboard') {
        // Already on dashboard, don't navigate away
        if (selectedDay || selectedTask) {
          handleBackToWeek();
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedDay, selectedTask]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #131A2E, #0B0F19)' }}>
        <div className="flex flex-col items-center gap-4 scale-in">
          <div className="text-5xl animate-float">🇩🇪</div>
          <div className="w-10 h-10 border-3 border-slate-600 rounded-full animate-spin" style={{ borderTopColor: '#B8860B' }} />
          <p className="text-slate-400 text-sm font-medium">Loading DeutschBuddy...</p>
        </div>
      </div>
    );
  }

  function renderMainContent() {
    if (activeView === 'community') return <CommunitySection />;
    if (activeView === 'profile') return <ProfilePage />;
    if (activeView === 'progress') return <ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} />;
    if (activeView === 'badges') return <BadgeGallery badges={progress.badges || []} />;
    if (activeView === 'resources') return <ResourceLibrary resources={levelData.weeks.flatMap(w => w.resources || [])} />;
    if (selectedTask) {
      return (
        <div className="fade-in">
          <button onClick={() => setSelectedTask(null)} className="flex items-center gap-1.5 text-sm text-[#8A8A9A] hover:text-[#1A1A2E] mb-4 transition">
            <span>&larr;</span> Back to Day {selectedDay.day}
          </button>
          <div className="paper-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-[#2D8B7A] bg-[#E0F2F1] px-2.5 py-1 rounded-full uppercase tracking-wider">{selectedTask.type}</span>
              <span className="text-xs font-bold text-[#B8860B]">+{selectedTask.xp} XP</span>
            </div>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-1">{selectedTask.title}</h2>
            <p className="text-sm text-[#8A8A9A] mb-5">{selectedTask.description}</p>
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #131A2E, #0B0F19)' }}>
      {showQuickTool && <QuickGermanTool onClose={() => setShowQuickTool(false)} />}
      {showNotifications && <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} onNavigate={(view) => { setActiveView(view); setShowNotifications(false); }} />}
      <DayCompleteCelebration show={showCelebration} xpEarned={todayXP} />

      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <Navbar activeView={activeView} onViewChange={(v) => { setActiveView(v); setSelectedDay(null); setSelectedTask(null); }} activeLevel={activeLevel} onLevelChange={(l) => { setActiveLevel(l); setSelectedDay(null); setSelectedTask(null); setActiveView('dashboard'); }} xp={progress.xp} streak={progress.streak} onQuickTool={() => setShowQuickTool(true)} onNotifications={() => setShowNotifications(true)} />
      </div>

      {/* Mobile Header (compact) */}
      <div className="lg:hidden sticky top-0 z-40" style={{ background: 'rgba(15, 20, 32, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(51, 65, 85, 0.3)' }}>
        <div className="flex items-center justify-between h-14 px-4">
          <button onClick={() => { setActiveView('dashboard'); setSelectedDay(null); setSelectedTask(null); }}
            className="flex items-center gap-2 cursor-pointer active:scale-95 transition-all select-none">
            <div className="w-8 h-8 bg-gradient-to-br from-[#B8860B] to-[#D4A843] rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-[#B8860B]/20">🇩🇪</div>
            <span className="text-base font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
            <span className="text-base font-extrabold text-[#B8860B]" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotifications(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#B8860B] hover:bg-[#B8860B]/10 transition relative">
              🔔<span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F44336]" />
            </button>
            <button onClick={() => setActiveView('profile')}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B8860B] to-[#D4A843] flex items-center justify-center text-white text-xs font-bold border border-white/10">
              {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeView === 'dashboard' && !selectedDay && !selectedTask && (
          <>
            <div className="mb-6 slide-up text-center lg:text-left">
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>
                Hallo, {profile?.full_name?.split(' ')[0] || 'Learner'}! 👋
              </h1>
              <p className="text-slate-400 mt-1" style={{ fontSize: '16px', lineHeight: '1.5' }}>Ready to continue learning?</p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              {activeLevel === 'A1' && <TrackToggle mode={trackMode} onToggle={handleToggleTrackMode} />}
              {activeLevel === 'A2' && <span className="text-xs font-semibold px-4 py-2 rounded-full bg-[#FFF8E1] text-[#B8860B] border border-[#B8860B]/20">A2: Fixed 8-week track</span>}
            </div>

            {nextDay && (
              <button onClick={() => handleSelectDay(nextDay.weekId, nextDay.day)}
                className="w-full mb-6 glass-card p-5 flex items-center gap-4 text-left hover:border-[#B8860B]/30 transition-all group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)', boxShadow: '0 4px 12px rgba(184, 134, 11, 0.3)' }}>▶</div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-[#B8860B] uppercase tracking-widest">Continue where you left off</div>
                  <div className="text-sm font-semibold text-slate-200 mt-1">Week {nextDay.weekId}, Day {nextDay.day}</div>
                </div>
                <span className="text-slate-500 group-hover:text-[#B8860B] transition text-lg">→</span>
              </button>
            )}

            <div className="glass-card p-5 mb-6" style={{ borderLeft: `4px solid ${activeLevel === 'A1' ? '#4CAF50' : '#2196F3'}`, paddingLeft: '20px' }}>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{levelData.title}</h2>
              <p className="text-sm text-slate-400 mt-1" style={{ lineHeight: '1.5' }}>{levelData.description}</p>
            </div>
          </>
        )}

        {/* Desktop: Two-column layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">{renderMainContent()}</div>
          <div className="lg:col-span-1"><RightPanel progress={progress} streak={progress.streak} /></div>
        </div>

        {/* Mobile: Single column with sidebar below */}
        <div className="lg:hidden">
          {renderMainContent()}
          {!selectedTask && !selectedDay && activeView === 'dashboard' && (
            <div className="mt-6 space-y-4">
              <RightPanel progress={progress} streak={progress.streak} />
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden pb-16">
        <BottomNav activeView={activeView} onViewChange={(v) => { setActiveView(v); setSelectedDay(null); setSelectedTask(null); }} />
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
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
