import { memo } from 'react';
import WeeklyModule from './WeeklyModule';
import DailyTasks from './DailyTasks';
import TaskRenderer from './TaskRenderer';
import ProgressDashboard from './ProgressDashboard';
import BadgeGallery from './BadgeGallery';
import CommunitySection from './CommunitySection';
import ResourceLibrary from './ResourceLibrary';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';

const MainContent = memo(function MainContent({
  activeView, activeLevel, selectedDay, selectedTask, currentWeek,
  progress, levelData, visibleWeeks, unlockedWeeks,
  profile, user, onSignOut,
  onSelectDay, onSelectTask, onCompleteTask, onBackToWeek
}) {
  if (activeView === 'community') return <div className="view-enter"><CommunitySection user={user} /></div>;
  if (activeView === 'profile') return <div className="view-enter"><ProfilePage activeLevel={activeLevel} /></div>;
  if (activeView === 'settings') return <div className="view-enter"><SettingsPage profile={profile} user={user} onSignOut={onSignOut} /></div>;
  if (activeView === 'progress') return <div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} /></div>;
  if (activeView === 'progress-statistics') return <div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="statistics" /></div>;
  if (activeView === 'progress-skills') return <div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="skills" /></div>;
  if (activeView === 'progress-calendar') return <div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="calendar" /></div>;
  if (activeView === 'badges') return <div className="view-enter"><BadgeGallery badges={progress.badges || []} /></div>;
  if (activeView === 'resources') {
    const weeks = levelData?.weeks || [];
    const unique = [...new Map(weeks.flatMap(w => w.resources || []).map(r => [r.name, r])).values()];
    return <div className="view-enter"><ResourceLibrary resources={unique} /></div>;
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
          <TaskRenderer task={selectedTask} onComplete={onCompleteTask} />
        </div>
      </div>
    );
  }
  if (selectedDay && currentWeek) {
    return <div className="view-enter"><DailyTasks week={currentWeek} day={selectedDay.day} completedTasks={progress.completedTasks} onSelectTask={onSelectTask} onBack={onBackToWeek} /></div>;
  }
  return (
    <div className="space-y-4">
      {visibleWeeks.map(week => (
        <WeeklyModule key={week.id} week={week} completedTasks={progress.completedTasks} onSelectDay={onSelectDay} selectedDay={selectedDay} isUnlocked={unlockedWeeks.includes(week.id)} />
      ))}
    </div>
  );
});

export default MainContent;
