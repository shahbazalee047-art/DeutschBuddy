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
  activeView, selectedDay, selectedTask, currentWeek,
  progress, levelData, visibleWeeks, unlockedWeeks,
  profile, user, onSignOut,
  onSelectDay, onSelectTask, onCompleteTask, onBackToWeek
}) {
  if (activeView === 'community') return <div className="view-enter"><CommunitySection user={user} /></div>;
  if (activeView === 'profile') return <div className="view-enter"><ProfilePage /></div>;
  if (activeView === 'settings') return <div className="view-enter"><SettingsPage profile={profile} user={user} onSignOut={onSignOut} /></div>;
  if (activeView === 'progress') return <div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} /></div>;
  if (activeView === 'progress-statistics') return <div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="statistics" /></div>;
  if (activeView === 'progress-skills') return <div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="skills" /></div>;
  if (activeView === 'progress-calendar') return <div className="view-enter"><ProgressDashboard progress={progress} levelData={levelData} visibleWeeks={visibleWeeks} mode="calendar" /></div>;
  if (activeView === 'badges') return <div className="view-enter"><BadgeGallery badges={progress.badges || []} /></div>;
  if (activeView === 'resources') {
    const unique = [...new Map(levelData.weeks.flatMap(w => w.resources || []).map(r => [r.name, r])).values()];
    return <div className="view-enter"><ResourceLibrary resources={unique} /></div>;
  }
  if (selectedTask) {
    return (
      <div className="view-enter">
        <button onClick={() => onSelectTask(null)} className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-lime-400 mb-4 transition">
          <span>&larr;</span> Back to Day {selectedDay.day}
        </button>
        <div className="paper-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold text-lime-600 bg-lime-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider border border-lime-500/20">{selectedTask.type}</span>
            <span className="text-xs font-bold text-cyan-400">+{selectedTask.xp} XP</span>
          </div>
          <h2 className="text-lg font-bold text-zinc-100 mb-1">{selectedTask.title}</h2>
          <p className="text-sm text-zinc-400 mb-5">{selectedTask.description}</p>
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