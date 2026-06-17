import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

export default function ProfilePage() {
  const { profile, user } = useAuth();
  const [editing, setEditing] = useState(false);

  return (
    <div className="fade-in space-y-5">
      {/* Profile Header */}
      <div className="paper-card overflow-hidden">
        <div className="h-32 rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }} />
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B8860B] to-[#D4A843] flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-lg mb-3">
            {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>{profile?.full_name || 'Learner'}</h2>
          <p className="text-[13px] text-[#8A8A9A]">{user?.email}</p>
          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: '#FFF8E1', color: '#B8860B' }}>
            🎓 A1 Learner
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: '⚡', value: progress?.xp || 0, label: 'XP', color: '#B8860B' },
          { icon: '🔥', value: progress?.streak || 0, label: 'Streak', color: '#FF9800' },
          { icon: '✅', value: progress?.completedTasks?.length || 0, label: 'Tasks', color: '#4CAF50' },
          { icon: '🏆', value: progress?.badges?.length || 0, label: 'Badges', color: '#2196F3' },
        ].map((s, i) => (
          <div key={i} className="paper-card p-3 text-center">
            <div className="text-xl">{s.icon}</div>
            <div className="text-lg font-bold tabular-nums" style={{ color: s.color, fontFamily: 'Poppins, sans-serif' }}>{s.value}</div>
            <div className="text-[10px] text-[#8A8A9A] uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Settings Sections */}
      <div className="paper-card p-5">
        <h3 className="text-sm font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Settings</h3>
        <div className="space-y-1">
          {[
            { icon: '👤', label: 'Edit Profile' },
            { icon: '🔔', label: 'Notifications' },
            { icon: '🎯', label: 'Learning Goals' },
            { icon: '🔊', label: 'Sound Effects' },
            { icon: '🌙', label: 'Theme' },
            { icon: '❓', label: 'Help & Support' },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] text-[#4A4A5A] hover:bg-[#FAF6F0] transition text-left">
              <span className="text-lg">{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button onClick={handleSignOut} className="text-[14px] font-semibold text-[#F44336] hover:text-[#D32F2F] transition">
          Sign Out
        </button>
      </div>
    </div>
  );
}
