import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { profile, user, signOut } = useAuth();

  // Simple stats from localStorage or default
  const xp = parseInt(localStorage.getItem('db_xp') || '0');
  const streak = parseInt(localStorage.getItem('db_streak') || '0');
  const completedCount = (JSON.parse(localStorage.getItem('db_completedTasks') || '[]')).length;
  const badgeCount = (JSON.parse(localStorage.getItem('db_badges') || '[]')).length;

  return (
    <div className="fade-in space-y-5">
      <div className="glass-card overflow-hidden">
        <div className="h-32 rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }} />
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B8860B] to-[#D4A843] flex items-center justify-center text-3xl font-bold text-white border-4 border-[#1A2744] shadow-lg mb-3">
            {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{profile?.full_name || 'Learner'}</h2>
          <p className="text-[13px] text-slate-400">{user?.email}</p>
          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[11px] font-bold bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/20">🎓 A1 Learner</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: '⚡', value: xp, label: 'XP', color: '#B8860B' },
          { icon: '🔥', value: streak, label: 'Streak', color: '#FF9800' },
          { icon: '✅', value: completedCount, label: 'Tasks', color: '#4CAF50' },
          { icon: '🏆', value: badgeCount, label: 'Badges', color: '#2196F3' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-3 text-center">
            <div className="text-xl">{s.icon}</div>
            <div className="text-lg font-bold tabular-nums" style={{ color: s.color, fontFamily: 'Poppins, sans-serif' }}>{s.value}</div>
            <div className="text-[10px] text-slate-400 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Settings</h3>
        <div className="space-y-1">
          {[
            { icon: '👤', label: 'Edit Profile' },
            { icon: '🔔', label: 'Notifications' },
            { icon: '🎯', label: 'Learning Goals' },
            { icon: '🔊', label: 'Sound Effects' },
            { icon: '🌙', label: 'Theme' },
            { icon: '❓', label: 'Help & Support' },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[14px] text-slate-400 hover:bg-slate-800/50 transition text-left">
              <div className="flex items-center gap-3"><span className="text-lg">{item.icon}</span>{item.label}</div>
              <span className="text-[12px] text-slate-600">›</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={signOut} className="w-full py-3 text-[14px] font-semibold text-[#F44336] hover:text-[#D32F2F] transition glass-card border-[#F44336]/20">
        Sign Out
      </button>
    </div>
  );
}
