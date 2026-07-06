import { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useProgress } from '../hooks/useProgress';

const DashboardContext = createContext(null);

function getUTCDateString(date = new Date()) {
  return date.toISOString().split('T')[0];
}

export function DashboardProvider({ children }) {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeLevel, setActiveLevel] = useState(() => {
    try { return localStorage.getItem('db_selected_level') || 'A1'; } catch { return 'A1'; }
  });
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
  const [trackMode, setLocalTrackMode] = useState(() => {
    try { return localStorage.getItem('db_selected_track') || profile?.selected_pacing || 'standard'; }
    catch { return profile?.selected_pacing || 'standard'; }
  });
  const [levelData, setLevelData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

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

  useEffect(() => {
    if (profile?.selected_pacing && profile.selected_pacing !== trackMode) {
      setLocalTrackMode(profile.selected_pacing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.selected_pacing]);

  const { progress, loading, completeTask, unlockWeek, setTrackMode, recoverStreak } = useProgress(activeLevel);

  const handleToggleTrackMode = useCallback((mode) => {
    setLocalTrackMode(mode);
    setTrackMode(mode);
  }, [setTrackMode]);

  // Load curriculum data
  useEffect(() => {
    let cancelled = false;
    setDataLoading(true);
    setLoadError(false);
    async function loadData() {
      try {
        let module;
        if (activeLevel === 'A1' && trackMode === 'fast') {
          module = await import('../data/a1FastTrackData.js');
        } else if (activeLevel === 'A1') {
          module = await import('../data/a1SpoonfedModules.js');
        } else {
          module = await import('../data/a2Data.js');
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
  const unlockedWeeks = useMemo(() =>
    (Array.isArray(progress?.unlockedWeeks) && progress.unlockedWeeks.length > 0) ? progress.unlockedWeeks : [1],
    [progress]
  );
  const currentWeek = levelData?.weeks.find(w => w.id === selectedDay?.weekId);

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

  const handleStartLesson = useCallback((weekId, day, task) => {
    setHistoryStack(prev => [...prev, { view: 'dashboard', day: null, task: null }]);
    setSelectedDay({ weekId, day });
    setSelectedTask(task);
    setActiveView('dashboard');
  }, []);

  const handleCompleteTask = useCallback((result) => {
    if (selectedTask) {
      const earnedXP = result && typeof result.score === 'number' && result.maxScore > 0
        ? Math.max(1, Math.round(selectedTask.xp * (result.score / result.maxScore)))
        : selectedTask.xp;
      completeTask(selectedTask.id, earnedXP, selectedDay.weekId, selectedDay.day);
      setTodayXP(prev => prev + earnedXP);
      setXpToast(earnedXP);
      const currentWeekData = levelData?.weeks.find(w => w.id === selectedDay.weekId);
      if (currentWeekData) {
        const allDone = currentWeekData.days.every(day =>
          day.tasks.every(t => progress.completedTasks.includes(t.id) || t.id === selectedTask.id)
        );
        if (allDone) {
          setShowCelebration(true);
          if (!unlockedWeeks.includes(selectedDay.weekId + 1)) {
            unlockWeek(selectedDay.weekId + 1);
          }
        }
      }
    }
    setSelectedTask(null);
  }, [selectedTask, selectedDay, completeTask, levelData, progress.completedTasks, unlockedWeeks, unlockWeek]);

  const handleBackToWeek = useCallback(() => {
    setSelectedDay(null);
    setSelectedTask(null);
  }, []);

  const handleGameScore = useCallback((game, score) => {
    const xp = Math.min(Math.max(Math.floor(score / 2), 0), 50);
    if (xp <= 0) return;
    const today = getUTCDateString();
    const taskId = `game-${game}-${today}`;
    completeTask(taskId, xp, 1, 1);
    setTodayXP(prev => prev + xp);
    setXpToast(xp);
  }, [completeTask]);

  const handleViewChange = useCallback((view) => {
    setHistoryStack(prev => [...prev, { view: activeView, day: selectedDay, task: selectedTask, level: activeLevel }]);
    setActiveView(view);
    setSelectedDay(null);
    setSelectedTask(null);
    if (showNotifications) setShowNotifications(false);
  }, [activeView, selectedDay, selectedTask, activeLevel, showNotifications]);

  const handleLevelChange = useCallback((level) => {
    try { localStorage.setItem('db_selected_level', level); } catch { /* ignore */ }
    setActiveLevel(level);
    setSelectedDay(null);
    setSelectedTask(null);
    setActiveView('dashboard');
  }, []);

  const handleBackNavigation = useCallback(() => {
    if (historyRef.current.length > 0) {
      const prev = historyRef.current[historyRef.current.length - 1];
      setHistoryStack(prevStack => prevStack.slice(0, -1));
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

  const handleSignOutFromApp = useCallback(async () => {
    try { await signOut(); } catch { /* ignore */ }
    navigate('/login');
  }, [signOut, navigate]);

  // Browser back navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (isProcessingBack.current) return;

      const closeAndReturn = (setter, returnToSidebar = false) => {
        isProcessingBack.current = true;
        setter(false);
        if (returnToSidebar) setShowSidebar(true);
        setTimeout(() => { isProcessingBack.current = false; }, 300);
      };

      if (showSidebarVerbLookupRef.current) { closeAndReturn(setShowSidebarVerbLookup, true); return; }
      if (showSpeedBlitzRef.current) { closeAndReturn(setShowSpeedBlitz, true); return; }
      if (showGenderDungeonRef.current) { closeAndReturn(setShowGenderDungeon, true); return; }
      if (showPictureMatchRef.current) { closeAndReturn(setShowPictureMatch, true); return; }
      if (showQuickToolRef.current) { closeAndReturn(setShowQuickTool); return; }

      if (event.state?.activeView) {
        isProcessingBack.current = true;
        setActiveView(event.state.activeView);
        setSelectedDay(event.state.selectedDay || null);
        setSelectedTask(event.state.selectedTask || null);
        if (event.state.activeLevel) setActiveLevel(event.state.activeLevel);
        setTimeout(() => { isProcessingBack.current = false; }, 300);
        return;
      }

      if (activeViewRef.current !== 'dashboard') {
        isProcessingBack.current = true;
        setActiveView('dashboard');
        setSelectedDay(null);
        setSelectedTask(null);
        setTimeout(() => { isProcessingBack.current = false; }, 300);
        return;
      }

      if (selectedTaskRef.current || selectedDayRef.current || historyRef.current.length > 0) {
        isProcessingBack.current = true;
        handleBackNavRef.current();
        setTimeout(() => { isProcessingBack.current = false; }, 300);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Push browser history state on view changes
  useEffect(() => {
    if (isProcessingBack.current) return;
    if (activeView === 'dashboard' && !selectedDay && !selectedTask) return;
    window.history.pushState(
      { activeView, selectedDay, selectedTask, activeLevel },
      '',
      window.location.pathname
    );
  }, [activeView, selectedDay, selectedTask, activeLevel]);

  // Capacitor back button
  useEffect(() => {
    let capacitorBackHandler = null;
    async function setupCapacitor() {
      try {
        const { App } = await import('@capacitor/core');
        if (App && typeof App.addListener === 'function') {
          capacitorBackHandler = await App.addListener('backButton', () => {
            if (isProcessingBack.current) return;

            const closeAndReturn = (setter, returnToSidebar = false) => {
              isProcessingBack.current = true;
              setter(false);
              if (returnToSidebar) setShowSidebar(true);
              setTimeout(() => { isProcessingBack.current = false; }, 300);
            };

            if (showSidebarVerbLookupRef.current) { closeAndReturn(setShowSidebarVerbLookup, true); return; }
            if (showSpeedBlitzRef.current) { closeAndReturn(setShowSpeedBlitz, true); return; }
            if (showGenderDungeonRef.current) { closeAndReturn(setShowGenderDungeon, true); return; }
            if (showPictureMatchRef.current) { closeAndReturn(setShowPictureMatch, true); return; }
            if (showQuickToolRef.current) { closeAndReturn(setShowQuickTool); return; }

            if (selectedTaskRef.current || selectedDayRef.current || historyRef.current.length > 0) {
              isProcessingBack.current = true;
              handleBackNavRef.current();
              setTimeout(() => { isProcessingBack.current = false; }, 300);
              return;
            }

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

  // Notifications unread state
  useEffect(() => {
    try {
      const readIds = new Set(JSON.parse(localStorage.getItem('db_notif_read') || '[]'));
      const knownIds = [1, 2, 5];
      const hasUnread = knownIds.some(id => !readIds.has(id));
      setTimeout(() => setHasUnreadNotifications(hasUnread), 0);
    } catch { setTimeout(() => setHasUnreadNotifications(false), 0); }
  }, [notifVersion]);

  // Close profile menu on outside click
  useEffect(() => {
    if (!showProfileMenu) return;
    function handleClick(e) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) setShowProfileMenu(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showProfileMenu]);

  const value = useMemo(() => ({
    user, profile, signOut: handleSignOutFromApp,
    activeLevel, setActiveLevel: handleLevelChange,
    selectedDay, setSelectedDay,
    selectedTask, setSelectedTask,
    activeView, setActiveView: handleViewChange,
    showCelebration, setShowCelebration,
    todayXP, setTodayXP,
    xpToast, setXpToast,
    showQuickTool, setShowQuickTool,
    showSidebarVerbLookup, setShowSidebarVerbLookup,
    showSpeedBlitz, setShowSpeedBlitz,
    showGenderDungeon, setShowGenderDungeon,
    showPictureMatch, setShowPictureMatch,
    showStreakGuardian, setShowStreakGuardian,
    showNotifications, setShowNotifications,
    showSidebar, setShowSidebar,
    showProfileMenu, setShowProfileMenu,
    notifVersion, setNotifVersion,
    historyStack, setHistoryStack,
    trackMode, setTrackMode: handleToggleTrackMode,
    levelData, setLevelData,
    dataLoading, setDataLoading,
    loadError, setLoadError,
    retryKey, setRetryKey,
    hasUnreadNotifications,
    profileMenuRef,
    progress, loading, completeTask, unlockWeek, recoverStreak,
    visibleWeeks, unlockedWeeks, currentWeek,
    handleSelectDay, handleSelectTask, handleStartLesson, handleCompleteTask, handleBackToWeek,
    handleGameScore, handleViewChange, handleLevelChange, handleBackNavigation,
  }), [
    user, profile, handleSignOutFromApp,
    activeLevel, handleLevelChange,
    selectedDay, selectedTask,
    activeView, handleViewChange,
    showCelebration, todayXP, xpToast,
    showQuickTool, showSidebarVerbLookup, showSpeedBlitz, showGenderDungeon, showPictureMatch,
    showStreakGuardian, showNotifications, showSidebar, showProfileMenu,
    notifVersion, historyStack,
    trackMode, handleToggleTrackMode,
    levelData, dataLoading, loadError, retryKey,
    hasUnreadNotifications,
    progress, loading, completeTask, unlockWeek, recoverStreak,
    visibleWeeks, unlockedWeeks, currentWeek,
    handleSelectDay, handleSelectTask, handleStartLesson, handleCompleteTask, handleBackToWeek,
    handleGameScore, handleBackNavigation,
  ]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}
