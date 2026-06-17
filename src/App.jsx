import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useProgress } from './hooks/useProgress';
import a1Data from './data/a1Data';
import a1FastTrackData from './data/a1FastTrackData';
import a2Data from './data/a2Data';
import Navbar from './components/Navbar';
import RightPanel from './components/RightPanel';
import WeeklyModule from './components/WeeklyModule';
import DailyTasks from './components/DailyTasks';
import TaskRenderer from './components/TaskRenderer';
import ProgressDashboard from './components/ProgressDashboard';
import BadgeGallery from './components/BadgeGallery';
import ResourceLibrary from './components/ResourceLibrary';
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #020617 100%)' }}>
        <div className="flex flex-col items-center gap-4 scale-in">
          <div className="text-5xl animate-float">🇩🇪</div>
          <div className="w-10 h-10 border-3 border-slate-600 border-t-lime-400 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading DeutschBuddy...</p>
        </div>
      </div>
    );
  }

  const isFullWidth = activeView === 'progress' || activeView === 'badges' || activeView === 'resources';

  function renderMainContent() {
    if (activeView === 'progress') return <ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} />;
    if (activeView === 'badges') return <BadgeGallery badges={progress.badges || []} />;
    if (activeView === 'resources') {
      const allResources = levelData.weeks.flatMap(w => w.resources || []);
      return <ResourceLibrary resources={[...new Map(allResources.map(r => [r.name, r])).values()]} />;
    }
    if (selectedTask) {
      return (
        <div className="fade-in">
          <button onClick={() => setSelectedTask(null)} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 mb-4 transition">
            <span>&larr;</span> Back to Day {selectedDay.day}
          </button>
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full uppercase tracking-wider">{selectedTask.type}</span>
              <span className="text-xs font-bold text-lime-400">+{selectedTask.xp} XP</span>
            </div>
            <h2 className="text-lg font-bold text-slate-100 mb-1">{selectedTask.title}</h2>
            <p className="text-sm text-slate-300 mb-5">{selectedTask.description}</p>
            <TaskRenderer task={selectedTask} onComplete={handleCompleteTask} />
          </div>
        </div>
      );
    }
    if (selectedDay && currentWeek) return <DailyTasks week={currentWeek} day={selectedDay.day} completedTasks={progress.completedTasks} onSelectTask={handleSelectTask} onBack={handleBackToWeek} />;
    return (
      <div className="space-y-3">
        {visibleWeeks.map(week => (
          <WeeklyModule key={week.id} week={week} completedTasks={progress.completedTasks} onSelectDay={handleSelectDay} selectedDay={selectedDay} isUnlocked={unlockedWeeks.includes(week.id)} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #020617 100%)' }}>
      {showQuickTool && <QuickGermanTool onClose={() => setShowQuickTool(false)} />}
      <DayCompleteCelebration show={showCelebration} xpEarned={todayXP} />
      <Navbar activeView={activeView} onViewChange={(v) => { setActiveView(v); setSelectedDay(null); setSelectedTask(null); }} activeLevel={activeLevel} onLevelChange={(l) => { setActiveLevel(l); setSelectedDay(null); setSelectedTask(null); setActiveView('dashboard'); }} xp={progress.xp} streak={progress.streak} onQuickTool={() => setShowQuickTool(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeView === 'dashboard' && !selectedDay && !selectedTask && (
          <>
            <div className="mb-5 slide-up text-center max-lg:space-y-3">
              <h1 className="text-xl font-bold text-slate-100">Hallo, {profile?.full_name?.split(' ')[0] || 'Learner'}! 👋</h1>
              <p className="text-sm text-slate-300">Ready to continue learning?</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                {activeLevel === 'A1' && <TrackToggle mode={trackMode} onToggle={handleToggleTrackMode} />}
                {activeLevel === 'A2' && <span className="text-xs text-slate-400 font-medium px-3 py-1.5 bg-slate-800 border border-slate-700/50 rounded-xl">A2: Fixed 8-week track</span>}
              </div>
            </div>

            {nextDay && (
              <button onClick={() => handleSelectDay(nextDay.weekId, nextDay.day)}
                className="w-full mb-5 bg-slate-800 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4 text-left hover:border-lime-400/50 transition-all group">
                <div className="w-12 h-12 bg-lime-400 rounded-xl flex items-center justify-center text-slate-900 text-lg font-bold animate-pulse-lime">▶</div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-lime-400 uppercase tracking-wider">Continue where you left off</div>
                  <div className="text-sm font-semibold text-slate-200">Week {nextDay.weekId}, Day {nextDay.day}</div>
                </div>
                <span className="text-slate-500 group-hover:text-lime-400 transition text-lg">→</span>
              </button>
            )}

            <div className={`rounded-2xl p-5 mb-5 text-white border-l-4 ${
              activeLevel === 'A1' ? 'bg-slate-800 border-lime-400' : 'bg-slate-800 border-purple-400'
            }`}>
              <h2 className="text-lg font-bold">{levelData.title}</h2>
              <p className="text-slate-300 text-sm mt-0.5">{levelData.description}</p>
            </div>
          </>
        )}

        {isFullWidth ? renderMainContent() : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">{renderMainContent()}</div>
            <div className="lg:col-span-1"><RightPanel progress={progress} streak={progress.streak} /></div>
          </div>
        )}
      </main>

      <Footer />
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
