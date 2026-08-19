import { useState, useMemo, useCallback, useEffect } from 'react';
import { IconClock, IconTrophy, IconChart, IconArrowRight, IconClipboard, IconFire, IconSparkles, IconLightbulb, IconFlag } from './Icons';
import { getUserValue, setUserValue } from '../utils/userStorage';

const dailyTips = [
  { tip: 'German compound nouns take the gender of the last word. "der Hand-schuh" is masculine.', tag: 'Grammar' },
  { tip: 'The word "doch" has no English equivalent — it means a firm "yes" to a negative question.', tag: 'Vocabulary' },
  { tip: 'In German, all months are masculine: der Januar, der Februar, der März...', tag: 'Grammar' },
  { tip: '"Entschuldigung" means both "sorry" and "excuse me".', tag: 'Culture' },
  { tip: 'German separable prefixes (ab-, an-, auf-, aus-, ein-) split in main clauses.', tag: 'Grammar' },
  { tip: 'The verb "lassen" can mean both "to let" and "to have something done".', tag: 'Grammar' },
  { tip: 'German has 3 genders: der, die, das. Always learn nouns with their article!', tag: 'Vocabulary' },
  { tip: 'Word order in German: verb is always the second element in a main clause.', tag: 'Grammar' },
  { tip: '"Bitte" means please, you\'re welcome, and pardon — context is everything.', tag: 'Vocabulary' },
  { tip: 'German numbers: 21 is einundzwanzig (one-and-twenty), not twenty-one.', tag: 'Vocabulary' },
];

const facts = [
  'Bread is sacred in Germany. There are over 3,200 officially registered types of bread.',
  'The longest German word is "Rechtsschutzversicherungsgesellschaften" with 39 letters.',
  'Berlin has more bridges than Venice, about 1,700 bridges.',
  'Germans invented the printing press, the car, aspirin, and the Christmas tree tradition.',
  'The word "Kindergarten" comes from German and means "children\'s garden".',
  'Germany has over 1,500 types of beer and 1,300 breweries.',
  'The first printed book (Gutenberg Bible) was printed in German-speaking Mainz.',
  'German is the most widely spoken native language in the European Union.',
  '"Donaudampfschifffahrtsgesellschaftskapitän" is a real German word for a Danube steamship captain.',
  'There is a German word for the fear of losing your phone: "Handyphobie".',
];

function getDailyIndex(array) {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dayOfYear % array.length;
}

const staticNotifications = [
  { id: 1, type: 'reminder', icon: IconClock, title: 'Time to study!', message: 'You haven\'t studied today. Keep your streak alive!', time: '2 hours ago', color: 'var(--db-accent)', action: { type: 'view', target: 'dashboard' } },
  { id: 2, type: 'achievement', icon: IconTrophy, title: 'Badge Unlocked: First Steps!', message: 'Congratulations! You\'ve completed your first lesson.', time: '1 day ago', color: 'var(--db-success)', action: { type: 'view', target: 'badges' } },
  { id: 5, type: 'weekly', icon: IconChart, title: 'Weekly Progress Summary', message: 'You earned 150 XP this week! Keep it up!', time: '1 day ago', color: 'var(--db-primary)', action: { type: 'view', target: 'progress' } },
];

function loadReadIds(userId) {
  const value = getUserValue(userId, 'notif_read', []);
  return new Set(Array.isArray(value) ? value : []);
}

function saveReadIds(userId, set) {
  setUserValue(userId, 'notif_read', [...set]);
}

export default function NotificationPanel({ isOpen, onClose, onNavigate, progress, visibleWeeks, unlockedWeeks, userId }) {
  const [readIds, setReadIds] = useState(() => loadReadIds(userId));
  const [selectedDetail, setSelectedDetail] = useState(null);
  const dailyFact = facts[getDailyIndex(facts)];

  useEffect(() => {
    setReadIds(loadReadIds(userId));
    setSelectedDetail(null);
  }, [userId]);

  const markRead = useCallback((id) => {
    setReadIds(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      saveReadIds(userId, next);
      return next;
    });
  }, [userId]);

  const dynamicNotifications = useMemo(() => {
    const dynamic = [];
    const completed = progress?.completedTasks || [];
    const unlocked = unlockedWeeks || [1];

    const nextDay = (() => {
      if (!visibleWeeks) return null;
      for (const week of visibleWeeks) {
        if (!unlocked.includes(week.id)) continue;
        for (const day of week.days) {
          if (!day.tasks.every(t => completed.includes(t.id)))
            return { weekId: week.id, day: day.day, weekTitle: week.title };
        }
      }
      return null;
    })();

    if (nextDay) {
      const weekForDay = visibleWeeks?.find(w => w.id === nextDay.weekId);
      const dayObj = weekForDay?.days?.find(d => d.day === nextDay.day);
      const pendingTasks = (dayObj?.tasks || []).filter(t => !completed.includes(t.id));
      const nextTask = pendingTasks[0];
      dynamic.push({
        id: 'dyn-continue', type: 'continue', icon: IconArrowRight,
        title: `Continue: ${nextDay.weekTitle}`,
        message: nextTask
          ? `Week ${nextDay.weekId}, Day ${nextDay.day}: ${nextTask.title}`
          : `Week ${nextDay.weekId}, Day ${nextDay.day} is waiting for you`,
        time: 'Just now', color: 'var(--db-primary)',
        action: nextTask
          ? { type: 'task', weekId: nextDay.weekId, day: nextDay.day, taskId: nextTask.id }
          : { type: 'day', weekId: nextDay.weekId, day: nextDay.day },
      });
    }

    const weekIds = [...new Set(visibleWeeks?.map(w => w.id) || [])];
    const pendingDays = [];
    for (const weekId of weekIds) {
      const week = visibleWeeks?.find(w => w.id === weekId);
      if (!week || !unlocked.includes(weekId)) continue;
      for (const day of week.days) {
        const pending = day.tasks.filter(t => !completed.includes(t.id));
        if (pending.length > 0) pendingDays.push({ weekId, day: day.day, count: pending.length });
      }
    }
    if (pendingDays.length > 0) {
      const totalPending = pendingDays.reduce((s, d) => s + d.count, 0);
      dynamic.push({
        id: 'dyn-pending', type: 'pending', icon: IconClipboard,
        title: `${totalPending} ${totalPending === 1 ? 'task' : 'tasks'} remaining`,
        message: `Across ${pendingDays.length} ${pendingDays.length === 1 ? 'day' : 'days'}`,
        time: 'Just now', color: 'var(--db-accent)',
        action: { type: 'day', weekId: pendingDays[0].weekId, day: pendingDays[0].day },
      });
    }

    const streak = progress?.streak || 0;
    if (streak > 0 && streak % 5 === 0) {
      dynamic.push({
        id: 'dyn-streak', type: 'achievement', icon: IconFire,
        title: `${streak}-Day Streak!`,
        message: `You're on fire! Keep your ${streak}-day streak going.`,
        time: 'Just now', color: 'var(--db-accent)',
        action: { type: 'view', target: 'progress' },
      });
    }

    const lastStudyDate = progress?.lastStudyDate;
    if (lastStudyDate) {
      const today = new Date().toDateString();
      const last = new Date(lastStudyDate).toDateString();
      if (last !== today) {
        dynamic.push({
          id: 'dyn-reminder', type: 'reminder', icon: IconClock,
          title: 'Time to study!',
          message: 'You haven\'t studied today. Keep your streak alive!',
          time: 'Just now', color: 'var(--db-accent)',
          action: { type: 'view', target: 'dashboard' },
        });
      }

      const diff = Math.floor((new Date(today) - new Date(lastStudyDate)) / (1000 * 60 * 60 * 24));
      if (diff >= 3 && (progress?.streak || 0) > 0) {
        dynamic.push({
          id: 'dyn-guardian', type: 'reminder', icon: IconFire,
          title: 'Streak at risk!',
          message: `You haven't studied in ${diff} days. Answer 3 questions to save your ${progress.streak}-day streak.`,
          time: 'Just now', color: 'var(--db-accent)',
          action: { type: 'guardian' },
        });
      }
    }

    const tip = dailyTips[getDailyIndex(dailyTips)];
    dynamic.push({
      id: 'dyn-tip', type: 'tip', icon: IconLightbulb,
      title: `Tip of the Day — ${tip.tag}`,
      message: tip.tip,
      time: 'Just now', color: 'var(--db-accent)',
    });

    const fact = dailyFact;
    dynamic.push({
      id: 'dyn-fact', type: 'fact', icon: IconFlag,
      title: 'Did You Know?',
      message: fact,
      time: 'Just now', color: 'var(--db-primary)',
    });

    return dynamic;
  }, [progress, visibleWeeks, unlockedWeeks, dailyFact]);

  const allNotifications = useMemo(() => {
    const all = [...dynamicNotifications, ...staticNotifications];
    return all.map(n => ({ ...n, read: readIds.has(n.id) }));
  }, [dynamicNotifications, readIds]);

  const unreadCount = allNotifications.filter(n => !n.read).length;

  function handleMarkAllRead() {
    const next = new Set(allNotifications.map(n => n.id));
    setReadIds(next);
    saveReadIds(userId, next);
  }

  function handleNotificationClick(notification) {
    markRead(notification.id);
    if (notification.type === 'tip' || notification.type === 'fact') {
      setSelectedDetail(notification);
      return;
    }
    if (notification.action && onNavigate) {
      onNavigate(notification.action);
    }
    onClose();
  }

  function formatTime(dateStr) {
    if (dateStr === 'Just now') return 'Just now';
    return dateStr;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-primary-dark/55" />
      <div className="relative h-full w-full max-w-[calc(100vw-32px)] overflow-hidden border-l border-border bg-surface shadow-xl slide-in sm:max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Notifications</h3>
            {unreadCount > 0 && <span className="text-[10px] font-bold bg-error text-white px-2 py-0.5 rounded-full">{unreadCount}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleMarkAllRead} className="text-[12px] font-semibold text-primary transition hover:text-primary-dark">Mark all as read</button>
            <button onClick={onClose} className="flex h-10 w-10 items-center justify-center text-text-muted transition hover:bg-bg-secondary hover:text-text-dark text-sm focus-visible:ring-2 focus-visible:ring-primary">✕</button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-64px)] relative">
          {selectedDetail ? (
            <div className="absolute inset-0 z-10 bg-surface p-6 slide-in">
              <button onClick={() => setSelectedDetail(null)} className="btn-text flex items-center gap-2 mb-6">
                <span className="text-lg">←</span> Back to Notifications
              </button>
              <div className="w-14 h-14 flex items-center justify-center mb-4" style={{ background: `${selectedDetail.color}15` }}>
                {typeof selectedDetail.icon === 'function' ? <selectedDetail.icon className="w-7 h-7" style={{ color: selectedDetail.color }} /> : <span className="text-2xl">{selectedDetail.icon}</span>}
              </div>
              <h3 className="mb-3 text-2xl font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{selectedDetail.title}</h3>
              <p className="text-[15px] leading-relaxed text-text-body">{selectedDetail.message}</p>
              <p className="mt-6 text-[12px] text-text-muted">{formatTime(selectedDetail.time)}</p>
            </div>
          ) : (
            <>
              {allNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                  <IconSparkles className="mb-4 h-12 w-12 text-primary" />
                  <p className="text-sm font-medium text-text-dark">No notifications yet!</p>
                  <p className="mt-1 text-xs text-text-muted">Complete lessons to earn achievements.</p>
                </div>
              ) : (
                allNotifications.map(n => (
                  <button key={n.id} onClick={() => handleNotificationClick(n)}
                    className={`w-full border-b border-border p-4 text-left transition-all hover:bg-bg-secondary active:scale-[0.99] ${
                      !n.read ? 'bg-primary-light/50' : ''
                    }`} style={!n.read ? { borderLeft: `4px solid ${n.color}` } : {}}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                        style={{ background: `${n.color}15` }}>{typeof n.icon === 'function' ? <n.icon className="w-5 h-5" style={{ color: n.color }} /> : <span className="text-lg">{n.icon}</span>}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="truncate text-[13px] font-semibold text-text-dark">{n.title}</h4>
                          {!n.read && <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                        </div>
                        <p className="mt-0.5 text-[12px] text-text-muted">{n.message}</p>
                        <p className="mt-1 text-[11px] text-text-muted">{formatTime(n.time)}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
