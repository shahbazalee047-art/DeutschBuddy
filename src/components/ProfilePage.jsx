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
        <div className="h-28 rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #7FB069, #6BA3BE)' }} />
        <div className="px-6 pb-6 -mt-14">
          <div className="flex items-end gap-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sage-400 to-sky-400 flex items-center justify-center text-3xl font-bold text-forest-900 border-4 border-card shadow-lg shrink-0">
              {profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0 pb-0.5">
              <h2 className="text-xl font-bold text-cream-100 leading-tight" style={{ fontFamily: 'DM Serif Display, serif' }}>{profile?.full_name || 'Learner'}</h2>
              <p className="text-[12px] text-cream-500 truncate">{user?.email}</p>
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[11px] font-bold border border-sage-400/20 text-sage-400 bg-sage-400/10">
                <IconGraduation className="w-3.5 h-3.5" /> A1 Learner
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: IconBolt, value: xp, label: 'XP', color: '#7FB069' },
          { icon: IconFire, value: localData.streak || 0, label: 'Streak', color: '#D4A574' },
          { icon: IconCheck, value: localData.completedTasks?.length || 0, label: 'Tasks', color: '#5CB85C' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <div className="flex justify-center mb-1"><stat.icon className="w-5 h-5" style={{ color: stat.color }} /></div>
            <div className="text-xl font-bold tabular-nums" style={{ color: stat.color, fontFamily: 'DM Serif Display, serif' }}>{stat.value}</div>
            <div className="text-[10px] text-cream-500 font-medium uppercase mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
