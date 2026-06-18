export default function ProfilePage() {
  const { user, profile, signOut } = useAuth();
  const localData = JSON.parse(localStorage.getItem(`db_progress_${profile?.selected_pacing || 'A1'}`) || '{}');
  const xp = localData.xp || 0;

  return (
    <div className="fade-in max-w-2xl mx-auto space-y-5">
      {/* Profile Header */}
      <div className="glass-card overflow-hidden">
        <div className="h-32 rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #A3E635, #06B6D4)' }} />
        <div className="px-6 pb-6 -mt-12">
          <div className="flex items-end gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-lime-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-zinc-900 border-4 border-zinc-800 shadow-lg mb-3">
              {profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 pb-1">
              <h2 className="text-xl font-bold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif' }}>{profile?.full_name || 'Learner'}</h2>
              <p className="text-[13px] text-zinc-500">{user?.email}</p>
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[11px] font-bold border border-lime-500/20" style={{ background: 'rgba(163, 230, 53, 0.1)', color: '#A3E635' }}>🎓 A1 Learner</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '⚡', value: xp, label: 'XP', color: '#A3E635' },
          { icon: '🔥', value: localData.streak || 0, label: 'Streak', color: '#F59E0B' },
          { icon: '✅', value: localData.completedTasks?.length || 0, label: 'Tasks', color: '#22C55E' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="text-xl font-bold tabular-nums" style={{ color: stat.color, fontFamily: 'Poppins, sans-serif' }}>{stat.value}</div>
            <div className="text-[10px] text-zinc-500 font-medium uppercase mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-zinc-200 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>⚙️ Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-zinc-700/50">
            <div>
              <p className="text-[14px] font-medium text-zinc-200">Email Notifications</p>
              <p className="text-[12px] text-zinc-500">Receive study reminders and updates</p>
            </div>
            <div className="w-12 h-7 rounded-full bg-lime-500/30 border border-lime-500/50 flex items-center px-0.5 justify-end cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-lime-400 shadow" />
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-zinc-700/50">
            <div>
              <p className="text-[14px] font-medium text-zinc-200">Sound Effects</p>
              <p className="text-[12px] text-zinc-500">Play sounds on task completion</p>
            </div>
            <div className="w-12 h-7 rounded-full bg-zinc-700 border border-zinc-600 flex items-center px-0.5 justify-start cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-zinc-400 shadow" />
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-[14px] font-medium text-zinc-200">Dark Mode</p>
              <p className="text-[12px] text-zinc-500">Always on for the premium experience</p>
            </div>
            <div className="w-12 h-7 rounded-full bg-lime-500/30 border border-lime-500/50 flex items-center px-0.5 justify-end cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-lime-400 shadow" />
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <button onClick={signOut} className="w-full py-3 rounded-xl text-sm font-semibold text-error bg-error/10 border border-error/20 hover:bg-error/20 transition active:scale-95">
        Sign Out
      </button>
    </div>
  );
}
