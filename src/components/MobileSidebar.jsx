import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'progress', label: 'Progress', icon: '📊' },
  { id: 'badges', label: 'Badges', icon: '🏆' },
  { id: 'community', label: 'Community', icon: '💬' },
  { id: 'resources', label: 'Resources', icon: '📚' },
];

export default function MobileSidebar({ isOpen, onClose, activeView, onViewChange, activeLevel, onLevelChange, xp }) {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    try { await signOut(); } catch {}
    navigate('/login');
  }

  function handleNav(id) {
    onViewChange(id);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[85vw] shadow-2xl slide-in overflow-y-auto" onClick={e => e.stopPropagation()}
        style={{ background: '#18181B', borderLeft: '1px solid rgba(63, 63, 70, 0.3)' }}>
        <div className="p-4 border-b border-zinc-700/50">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" onClick={() => { onViewChange('dashboard'); onClose(); }}
              className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-lime-500 to-cyan-500 rounded-xl flex items-center justify-center text-zinc-900 text-sm font-bold">
                <span>🇩🇪</span>
              </div>
              <span className="text-base font-extrabold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif' }}>DeutschBuddy</span>
            </Link>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center text-zinc-400">✕</button>
          </div>

          {user && (
            <button onClick={() => { onViewChange('profile'); onClose(); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/60 transition active:scale-[0.98]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-zinc-900 border-2 border-zinc-700 flex-shrink-0">
                {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[13px] font-semibold text-zinc-200 truncate">{profile?.full_name || 'Learner'}</p>
                <p className="text-[11px] text-zinc-500 truncate">{user?.email || ''}</p>
              </div>
              <span className="text-zinc-600">→</span>
            </button>
          )}
        </div>

        <div className="px-3 pt-3">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Navigation</p>
          {sections.map(section => (
            <button key={section.id} onClick={() => handleNav(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] mb-0.5 ${
                activeView === section.id
                  ? 'text-zinc-900 bg-lime-500 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}>
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        <div className="px-3 pt-4 mt-2 border-t border-zinc-700/50">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Level</p>
          <div className="flex gap-2 px-3">
            {['A1', 'A2'].map(lvl => (
              <button key={lvl} onClick={() => { onLevelChange(lvl); onClose(); }}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all active:scale-95 ${
                  activeLevel === lvl
                    ? lvl === 'A1' ? 'bg-lime-500 text-zinc-900' : 'bg-cyan-500 text-zinc-900'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-zinc-200'
                }`}>
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="px-3 pt-4 mt-2 border-t border-zinc-700/50">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Account</p>
          <div className="px-3 space-y-1">
            <button onClick={() => { onViewChange('progress'); onClose(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition">
              <span>⚙️</span><span>Settings</span>
            </button>
            <button onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-error hover:bg-error/10 transition">
              <span>🚪</span><span>Sign Out</span>
            </button>
          </div>
        </div>

        {xp !== undefined && (
          <div className="px-3 pt-4 mt-2 border-t border-zinc-700/50 pb-6">
            <div className="mx-3 px-4 py-3 rounded-xl flex items-center gap-2 bg-lime-500/10 border border-lime-500/20">
              <span className="text-lg">⚡</span>
              <span className="text-sm font-bold text-lime-400">{xp} XP</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
