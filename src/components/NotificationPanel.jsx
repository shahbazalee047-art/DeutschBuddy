import { useState } from 'react';

const sampleNotifications = [
  { id: 1, type: 'reminder', icon: '⏰', title: 'Time to study!', message: 'You haven\'t studied today. Keep your streak alive!', time: '2 hours ago', read: false, color: '#F59E0B', action: 'dashboard' },
  { id: 2, type: 'achievement', icon: '🏆', title: 'Badge Unlocked: First Steps!', message: 'Congratulations! You\'ve completed your first lesson.', time: '1 day ago', read: true, color: '#A3E635', action: 'badges' },
  { id: 3, type: 'pending', icon: '📋', title: '3 lessons pending', message: 'Week 1, Day 4-6 are waiting for you', time: '5 hours ago', read: false, color: '#06B6D4', action: 'progress' },
  { id: 4, type: 'continue', icon: '▶️', title: 'Pick up where you left off', message: 'Week 2, Day 3: Personal Pronouns', time: '1 hour ago', read: false, color: '#22C55E', action: 'dashboard' },
  { id: 5, type: 'weekly', icon: '📊', title: 'Weekly Progress Summary', message: 'You earned 150 XP this week! 🔥 5-day streak', time: '1 day ago', read: true, color: '#06B6D4', action: 'progress' },
];

export default function NotificationPanel({ isOpen, onClose, onNavigate }) {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function handleNotificationClick(notification) {
    setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
    if (notification.action && onNavigate) {
      onNavigate(notification.action);
    }
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-md h-full shadow-2xl slide-in overflow-hidden" onClick={e => e.stopPropagation()}
        style={{ background: '#18181B', borderLeft: '1px solid rgba(63, 63, 70, 0.3)' }}>
        <div className="flex items-center justify-between p-4 border-b border-zinc-700/50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif' }}>Notifications</h3>
            {unreadCount > 0 && <span className="text-[10px] font-bold bg-error text-white px-2 py-0.5 rounded-full">{unreadCount}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={markAllRead} className="text-[12px] text-cyan-400 font-semibold hover:text-cyan-300 transition">Mark all as read</button>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 flex items-center justify-center text-zinc-400 transition text-sm">✕</button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-zinc-400 text-sm font-medium">No notifications yet!</p>
              <p className="text-zinc-600 text-xs mt-1">Complete lessons to earn achievements.</p>
            </div>
          ) : (
            notifications.map(n => (
              <button key={n.id} onClick={() => handleNotificationClick(n)}
                className={`w-full text-left p-4 border-b border-zinc-700/30 transition-all hover:bg-zinc-800/50 active:scale-[0.99] ${
                  !n.read ? 'bg-zinc-800/30' : ''
                }`} style={!n.read ? { borderLeft: `4px solid ${n.color}` } : {}}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${n.color}15` }}>{n.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[13px] font-semibold text-zinc-200 truncate">{n.title}</h4>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 animate-cyan-pulse" />}
                    </div>
                    <p className="text-[12px] text-zinc-400 mt-0.5">{n.message}</p>
                    <p className="text-[11px] text-zinc-600 mt-1">{n.time}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
