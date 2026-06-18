import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { IconHome, IconChart, IconTrophy, IconChat, IconBook, IconBell, IconSearch, IconBolt, IconUser, IconSettings, IconLogOut } from './Icons';

export default function Navbar({ activeView, onViewChange, activeLevel, onLevelChange, xp, streak, onQuickTool, onNotifications }) {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  async function handleSignOut() { await signOut(); navigate('/login'); }

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: IconHome },
    { id: 'progress', label: 'Progress', icon: IconChart },
    { id: 'badges', label: 'Badges', icon: IconTrophy },
    { id: 'community', label: 'Community', icon: IconChat },
    { id: 'resources', label: 'Resources', icon: IconBook },
  ];

  return (
    <header className="sticky top-0 z-50" style={{ background: 'rgba(24, 24, 27, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(63, 63, 70, 0.3)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Left spacer */}
          <div></div>

          {/* Center: Brand Logo */}
          <Link to="/" onClick={() => onViewChange('dashboard')}
            className="flex items-center justify-center gap-3 cursor-pointer active:scale-95 transition-all duration-150 select-none">
            <div className="w-11 h-11 bg-gradient-to-br from-lime-500 to-cyan-500 rounded-xl flex items-center justify-center text-zinc-900 text-lg font-bold shadow-lg shadow-lime-500/20 animate-lime-glow">
              <span className="text-lg leading-none">🇩🇪</span>
            </div>
            <span className="text-3xl font-extrabold text-zinc-100 hidden sm:block" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
            <span className="text-3xl font-extrabold text-lime-400 hidden sm:block" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center justify-end gap-2.5">
            {/* Level Switcher */}
            <div className="flex rounded-xl overflow-hidden border border-zinc-700">
              {['A1', 'A2'].map(lvl => (
                <button key={lvl} onClick={() => onLevelChange(lvl)}
                  className={`px-3 py-1.5 text-[12px] font-bold transition-all ${
                    activeLevel === lvl
                      ? lvl === 'A1' ? 'bg-lime-500 text-zinc-900' : 'bg-cyan-500 text-zinc-900'
                      : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}>
                  {lvl}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={onNotifications}
                className="flex items-center justify-center w-11 h-11 rounded-xl text-zinc-400 hover:text-lime-400 hover:bg-lime-500/10 transition relative">
                <IconBell className="w-6 h-6" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-error animate-cyan-pulse" />
              </button>

              <button onClick={onQuickTool}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition">
                <IconSearch className="w-5 h-5" />
              </button>

              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-lime-500 to-cyan-500 text-zinc-900 flex items-center justify-center text-sm font-bold hover:shadow-lg hover:shadow-lime-500/30 transition ring-2 ring-lime-400/40 active:scale-90">
                  {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-xl overflow-hidden z-50 slide-up border border-zinc-700" style={{ background: '#20202A' }}>
                    <div className="px-4 py-3 border-b border-zinc-700">
                      <p className="text-sm font-semibold text-zinc-200 truncate">{profile?.full_name || 'Learner'}</p>
                      <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
                    </div>
                    <button onClick={() => { onViewChange('profile'); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition flex items-center gap-2"><IconUser className="w-4 h-4" /> Profile</button>
                    <button onClick={() => { onViewChange('progress'); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition flex items-center gap-2"><IconSettings className="w-4 h-4" /> Settings</button>
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-sm text-error hover:bg-error/10 transition">Sign Out</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
