import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { IconBolt, IconFire, IconCheck, IconGraduation, IconArrowLeft } from './Icons';

export default function ProfilePage({ activeLevel = 'A1' }) {
  const { user, profile } = useAuth();
  const [progress, setProgress] = useState({ xp: 0, streak: 0, completedTasks: [], badges: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!user || !activeLevel) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('progress')
        .select('xp, streak, completed_tasks, badges')
        .eq('user_id', user.id)
        .eq('level', activeLevel)
        .single();

      if (cancelled) return;

      if (error && error.code !== 'PGRST116') {
        console.error('ProfilePage progress load error:', error);
      }

      if (data) {
        setProgress({
          xp: data.xp || 0,
          streak: data.streak || 0,
          completedTasks: data.completed_tasks || [],
          badges: data.badges || [],
        });
      } else {
        // Fall back to locally cached progress for the current user and level
        try {
          const localData = JSON.parse(localStorage.getItem(`db_progress_${user.id}_${activeLevel}`) || '{}');
          setProgress({
            xp: localData.xp || 0,
            streak: localData.streak || 0,
            completedTasks: localData.completedTasks || [],
            badges: localData.badges || [],
          });
        } catch {
          setProgress({ xp: 0, streak: 0, completedTasks: [], badges: [] });
        }
      }
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [user, activeLevel]);

  if (loading) {
    return (
      <div className="fade-in max-w-2xl mx-auto space-y-5">
        <span className="eyebrow">Profile</span>
        <h1 className="text-3xl font-bold text-text-dark mb-5 editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Your <i>Profile</i></h1>
        <div className="paper-card p-8 text-center">
          <p className="text-text-muted">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in max-w-2xl mx-auto space-y-5">
      <button onClick={() => window.history.back()} className="btn-text flex items-center gap-2 mb-2">
        <IconArrowLeft className="w-4 h-4" /> Back
      </button>

      <span className="eyebrow">Profile</span>
      <h1 className="text-3xl font-bold text-text-dark mb-5 editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Your <i>Profile</i></h1>

      {/* Profile Header */}
      <div className="paper-card overflow-hidden">
        <div className="h-28" style={{ background: 'var(--gold)' }} />
        <div className="px-6 pb-6 -mt-14">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center text-3xl font-bold text-text-on-dark border-4 border-bg-white shadow-lg shrink-0" style={{ borderRadius: '50%' }}>
              {profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0 pb-1">
              <h2 className="text-xl font-bold text-text-dark leading-tight truncate" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{profile?.full_name || 'Learner'}</h2>
              <p className="text-[12px] text-text-muted truncate">{user?.email}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border border-gold/20 text-gold bg-gold/10">
              <IconGraduation className="w-3.5 h-3.5" /> {activeLevel || 'A1'} Learner
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: IconBolt, value: progress.xp, label: 'XP', color: 'var(--gold)' },
          { icon: IconFire, value: progress.streak, label: 'Streak', color: 'var(--gold-light)' },
          { icon: IconCheck, value: progress.completedTasks.length, label: 'Tasks', color: 'var(--success)' },
        ].map((stat, i) => (
          <div key={i} className="paper-card p-4 text-center">
            <div className="flex justify-center mb-1"><stat.icon className="w-5 h-5" style={{ color: stat.color }} /></div>
            <div className="text-xl font-bold tabular-nums" style={{ color: stat.color, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{stat.value}</div>
            <div className="text-[10px] text-text-muted font-medium uppercase mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
