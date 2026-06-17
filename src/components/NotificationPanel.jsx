import { useState } from 'react';

const sampleNotifications = [
  { id: 1, type: 'reminder', icon: '⏰', title: 'Time to study!', message: 'You haven\'t studied today. Keep your streak alive!', time: '2 hours ago', read: false, color: '#FF9800' },
  { id: 2, type: 'achievement', icon: '🏆', title: 'Badge Unlocked: First Steps!', message: 'Congratulations! You\'ve completed your first lesson.', time: '1 day ago', read: true, color: '#B8860B' },
  { id: 3, type: 'pending', icon: '📋', title: '3 lessons pending', message: 'Week 1, Day 4-6 are waiting for you', time: '5 hours ago', read: false, color: '#2196F3' },
  { id: 4, type: 'continue', icon: '▶️', title: 'Pick up where you left off', message: 'Week 2, Day 3: Personal Pronouns', time: '1 hour ago', read: false, color: '#4CAF50' },
  { id: 5, type: 'weekly', icon: '📊', title: 'Weekly Progress Summary', message: 'You earned 150 XP this week! 🔥 5-day streak', time: '1 day ago', read: true, color: '#9C27B0' },
];

export default function NotificationPanel({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl slide-in overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-[#E8E0D4]">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Notifications</h3>
            {unreadCount > 0 && <span className="text-[10px] font-bold bg-[#F44336] text-white px-2 py-0.5 rounded-full">{unreadCount}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={markAllRead} className="text-[12px] text-[#2D8B7A] font-semibold hover:text-[#248F6D] transition">Mark all as read</button>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-[#F5F5F5] hover:bg-[#E8E0D4] flex items-center justify-center text-[#8A8A9A] transition">✕</button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {notifications.map(n => (
            <div key={n.id} className={`p-4 border-b border-[#E8E0D4] transition-all hover:bg-[#FAF6F0] ${
              !n.read ? 'bg-[#FAF6F0]' : ''
            }`} style={!n.read ? { borderLeft: `4px solid ${n.color}` } : {}}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${n.color}10` }}>
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[13px] font-semibold text-[#1A1A2E] truncate">{n.title}</h4>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-[#2196F3] flex-shrink-0" />}
                  </div>
                  <p className="text-[12px] text-[#8A8A9A] mt-0.5">{n.message}</p>
                  <p className="text-[11px] text-[#C0C0C0] mt-1">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
