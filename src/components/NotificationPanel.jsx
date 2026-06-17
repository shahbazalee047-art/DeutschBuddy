import { useState } from 'react';

const sampleNotifications = [
  { id: 1, type: 'reminder', icon: '⏰', title: 'Time to study!', message: 'You haven\'t studied today. Keep your streak alive!', time: '2 hours ago', read: false, color: '#FF9800', action: 'dashboard' },
  { id: 2, type: 'achievement', icon: '🏆', title: 'Badge Unlocked: First Steps!', message: 'Congratulations! You\'ve completed your first lesson.', time: '1 day ago', read: true, color: '#B8860B', action: 'badges' },
  { id: 3, type: 'pending', icon: '📋', title: '3 lessons pending', message: 'Week 1, Day 4-6 are waiting for you', time: '5 hours ago', read: false, color: '#2196F3', action: 'progress' },
  { id: 4, type: 'continue', icon: '▶️', title: 'Pick up where you left off', message: 'Week 2, Day 3: Personal Pronouns', time: '1 hour ago', read: false, color: '#4CAF50', action: 'dashboard' },
  { id: 5, type: 'weekly', icon: '📊', title: 'Weekly Progress Summary', message: 'You earned 150 XP this week! 🔥 5-day streak', time: '1 day ago', read: true, color: '#9C27B0', action: 'progress' },
];

export default function NotificationPanel({ isOpen, onClose, onNavigate }) {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function handleNotificationClick(notification) {
    // Mark as read
    setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
    // Navigate to the action
    if (notification.action && onNavigate) {
      onNavigate(notification.action);
    }
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-md h-full shadow-2xl slide-in overflow-hidden" onClick={e => e.stopPropagation()}
        style={{ background: '#131A2E', borderLeft: '1px solid rgba(51, 65, 85, 0.3)' }}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Notifications</h3>
            {unreadCount > 0 && <span className="text-[10px] font-bold bg-[#F44336] text-white px-2 py-0.5 rounded-full">{unreadCount}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={markAllRead} className="text-[12px] text-[#2D8B7A] font-semibold hover:text-[#4ECBA0] transition">Mark all as read</button>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 flex items-center justify-center text-slate-400 transition text-sm">✕</button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {notifications.map(n => (
            <button key={n.id} onClick={() => handleNotificationClick(n)}
              className={`w-full text-left p-4 border-b border-slate-700/30 transition-all hover:bg-slate-800/50 ${
                !n.read ? 'bg-slate-800/30' : ''
              }`} style={!n.read ? { borderLeft: `4px solid ${n.color}` } : {}}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${n.color}15` }}>{n.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[13px] font-semibold text-slate-200 truncate">{n.title}</h4>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                  </div>
                  <p className="text-[12px] text-slate-400 mt-0.5">{n.message}</p>
                  <p className="text-[11px] text-slate-600 mt-1">{n.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
