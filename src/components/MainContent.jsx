import { memo, lazy, Suspense } from 'react';
import WeeklyModule from './WeeklyModule';
import DailyTasks from './DailyTasks';

const TaskRenderer = lazy(() => import('./TaskRenderer'));
const ProgressDashboard = lazy(() => import('./ProgressDashboard'));
const BadgeGallery = lazy(() => import('./BadgeGallery'));
const CommunitySection = lazy(() => import('./CommunitySection'));
const ResourceLibrary = lazy(() => import('./ResourceLibrary'));
const ProfilePage = lazy(() => import('./ProfilePage'));
const SettingsPage = lazy(() => import('./SettingsPage'));

function ViewLoader() {
  return <div className="flex min-h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" role="status" aria-label="Loading" /></div>;
}

const MainContent = memo(function MainContent({
  activeView, activeLevel, selectedDay, selectedTask, currentWeek,
  progress, levelData, visibleWeeks, unlockedWeeks,
  profile, user, onSignOut,
  onSelectDay, onSelectTask, onCompleteTask, onBackToWeek,
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
    const unique = [...new Map(weeks.flatMap(week => week.resources || []).map(resource => [resource.name, resource])).values()];
    return <Suspense fallback={<ViewLoader />}><div className="view-enter"><ResourceLibrary resources={unique} /></div></Suspense>;
  }

  if (selectedTask) {
    if (!selectedTask.type || !selectedTask.content) {
      return <div className="view-enter py-12 text-center"><p className="mb-4 text-text-muted">This task could not be loaded.</p><button type="button" onClick={() => onSelectTask(null)} className="btn-primary px-6">Go back</button></div>;
    }
    return (
      <div className="exercise-content view-enter">
        <button type="button" onClick={() => onSelectTask(null)} className="btn-text mb-5 inline-flex items-center gap-2"><span aria-hidden="true">←</span> Back to Day {selectedDay?.day}</button>
        <section className="db-surface-list mb-5 p-5 sm:p-6" aria-labelledby="task-title">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center border border-primary/30 bg-primary-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">{selectedTask.type}</span>
            <span className="text-xs font-bold text-text-muted">+{selectedTask.xp} XP</span>
          </div>
          <h2 id="task-title" className="text-3xl font-bold text-text-dark">{selectedTask.title}</h2>
          <p className="mt-1 text-sm text-text-muted">{selectedTask.description}</p>
        </section>
        <Suspense fallback={<ViewLoader />}><TaskRenderer task={selectedTask} onComplete={onCompleteTask} /></Suspense>
      </div>
    );
  }

  if (selectedDay && currentWeek) return <div className="view-enter"><DailyTasks week={currentWeek} day={selectedDay.day} completedTasks={progress.completedTasks} onSelectTask={onSelectTask} onBack={onBackToWeek} activeLevel={activeLevel} /></div>;

  return (
    <div className="space-y-4">
      {visibleWeeks.map(week => <WeeklyModule key={week.id} week={week} completedTasks={progress.completedTasks} onSelectDay={onSelectDay} selectedDay={selectedDay} isUnlocked={unlockedWeeks.includes(week.id)} activeLevel={activeLevel} />)}
    </div>
  );
});

export default MainContent;
