import { memo, lazy, Suspense } from 'react';
import WeeklyModule from './WeeklyModule';
import DailyTasks from './DailyTasks';
import ContinueCard from './ContinueCard';

const TaskRenderer = lazy(() => import('./TaskRenderer'));
const ProgressDashboard = lazy(() => import('./ProgressDashboard'));
const BadgeGallery = lazy(() => import('./BadgeGallery'));
const CommunitySection = lazy(() => import('./CommunitySection'));
const ResourceLibrary = lazy(() => import('./ResourceLibrary'));
const ProfilePage = lazy(() => import('./ProfilePage'));
const SettingsPage = lazy(() => import('./SettingsPage'));

function ViewLoader() {
  return <div className="min-h-[16rem] flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;
}

const MainContent = memo(function MainContent({
  activeView, activeLevel, selectedDay, selectedTask, currentWeek,
  progress, levelData, visibleWeeks, unlockedWeeks,
  profile, user, onSignOut,
  onSelectDay, onSelectTask, onCompleteTask, onBackToWeek
}) {
  if (activeView === 'community') return <Suspense fallback={<ViewLoader />}><div className="view-enter"><CommunitySection user={user} /></div></Suspense>;
  if (activeView === 'profile') return <Suspense fallback={<ViewLoader />}><div className="view-enter"><ProfilePage activeLevel={activeLevel} /></div></Suspense>;
  if (activeView === 'settings') return <Suspense fallback={<ViewLoader />}><div className="view-enter"><SettingsPage profile={profile} user={user} onSignOut={onSignOut} /></div></Suspense>;
  if (activeView === 'progress') return <Suspense fallback={<ViewLoader />}><div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} activeLevel={activeLevel} /></div></Suspense>;
  if (activeView === 'progress-statistics') return <Suspense fallback={<ViewLoader />}><div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="statistics" activeLevel={activeLevel} /></div></Suspense>;
  if (activeView === 'progress-skills') return <Suspense fallback={<ViewLoader />}><div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="skills" activeLevel={activeLevel} /></div></Suspense>;
  if (activeView === 'progress-calendar') return <Suspense fallback={<ViewLoader />}><div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="calendar" activeLevel={activeLevel} /></div></Suspense>;
  if (activeView === 'badges') return <Suspense fallback={<ViewLoader />}><div className="view-enter"><BadgeGallery badges={progress.badges || []} /></div></Suspense>;
  if (activeView === 'resources') {
    const weeks = levelData?.weeks || [];
    const unique = [...new Map(weeks.flatMap(w => w.resources || []).map(r => [r.name, r])).values()];
    return <Suspense fallback={<ViewLoader />}><div className="view-enter"><ResourceLibrary resources={unique} /></div></Suspense>;
  }
  if (selectedTask) {
    if (!selectedTask.type || !selectedTask.content) {
      return (
        <div className="view-enter text-center py-12">
          <p className="text-text-muted mb-4">This task could not be loaded.</p>
          <button onClick={() => onSelectTask(null)} className="btn-primary px-6">Go Back</button>
        </div>
      );
    }
    return (
      <div className="view-enter">
        <button onClick={() => onSelectTask(null)} className="btn-text mb-4">
          <span className="text-base font-bold">&larr;</span> Back to Day {selectedDay.day}
        </button>
        <div className="paper-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full uppercase tracking-wider border border-gold/20">{selectedTask.type}</span>
            <span className="text-xs font-bold text-gold">+{selectedTask.xp} XP</span>
          </div>
          <h2 className="text-lg font-bold text-text-dark mb-1 editorial-heading">{selectedTask.title}</h2>
          <p className="text-sm text-text-muted mb-5">{selectedTask.description}</p>
          <Suspense fallback={<ViewLoader />}><TaskRenderer task={selectedTask} onComplete={onCompleteTask} /></Suspense>
        </div>
      </div>
    );
  }
  if (selectedDay && currentWeek) {
    return <div className="view-enter"><DailyTasks week={currentWeek} day={selectedDay.day} completedTasks={progress.completedTasks} onSelectTask={onSelectTask} onBack={onBackToWeek} /></div>;
  }
  return (
    <div className="space-y-4">
      {activeView === 'dashboard' && !selectedDay && !selectedTask && (
        <ContinueCard progress={progress} activeLevel={activeLevel} levelData={levelData} onContinue={onSelectDay} />
      )}
      {visibleWeeks.map(week => (
        <WeeklyModule key={week.id} week={week} completedTasks={progress.completedTasks} onSelectDay={onSelectDay} selectedDay={selectedDay} isUnlocked={unlockedWeeks.includes(week.id)} />
      ))}
    </div>
  );
});

export default MainContent;
