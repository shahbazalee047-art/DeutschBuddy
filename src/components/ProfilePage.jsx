import { useAuth } from '../contexts/AuthContext';
import { IconBolt, IconFire, IconCheck, IconGraduation } from './Icons';

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const localData = JSON.parse(localStorage.getItem(`db_progress_${profile?.selected_pacing || 'A1'}`) || '{}');
  const xp = localData.xp || 0;

  return (
    <div className="fade-in max-w-2xl mx-auto space-y-5">
      {/* Profile Header */}
      <div className="glass-card overflow-hidden">
        <div className="h-28 rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #A3E635, #06B6D4)' }} />
        <div className="px-6 pb-6 -mt-14">
          <div className="flex items-end gap-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-lime-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-zinc-900 border-4 border-zinc-800 shadow-lg shrink-0">
              {profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0 pb-0.5">
              <h2 className="text-xl font-bold text-zinc-100 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>{profile?.full_name || 'Learner'}</h2>
              <p className="text-[12px] text-zinc-500 truncate">{user?.email}</p>
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[11px] font-bold border border-lime-500/20" style={{ background: 'rgba(163, 230, 53, 0.1)', color: '#A3E635' }}>
                <IconGraduation className="w-3.5 h-3.5" /> A1 Learner
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: IconBolt, value: xp, label: 'XP', color: '#A3E635' },
          { icon: IconFire, value: localData.streak || 0, label: 'Streak', color: '#F59E0B' },
          { icon: IconCheck, value: localData.completedTasks?.length || 0, label: 'Tasks', color: '#22C55E' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <div className="flex justify-center mb-1"><stat.icon className="w-5 h-5" style={{ color: stat.color }} /></div>
            <div className="text-xl font-bold tabular-nums" style={{ color: stat.color, fontFamily: 'Poppins, sans-serif' }}>{stat.value}</div>
            <div className="text-[10px] text-zinc-500 font-medium uppercase mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}