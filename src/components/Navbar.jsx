import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ activeView, onViewChange, activeLevel, onLevelChange, xp, streak, onQuickTool }) {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  const navLinks = [
    { id: 'dashboard', label: 'Daily Track', icon: '📚' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'badges', label: 'Badges', icon: '🏆' },
    { id: 'resources', label: 'Resources', icon: '🔗' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/40" style={{ background: 'rgba(15, 20, 32, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Logo + Brand */}
          <div className="flex items-center justify-center gap-2 flex-1 lg:flex-none">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20 flex-shrink-0">
              🇩🇪
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-base md:text-xl font-extrabold text-slate-100 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
              <span className="text-base md:text-xl font-extrabold text-blue-400 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
            </div>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => onViewChange(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeView === link.id
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <span className="text-sm">{link.icon}</span>
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Level toggle - glowing segment controller */}
            <div className="hidden sm:flex gap-1 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <button
                onClick={() => onLevelChange('A1')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                  activeLevel === 'A1'
                    ? 'bg-blue-600 text-white glow-blue'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                A1
              </button>
              <button
                onClick={() => onLevelChange('A2')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                  activeLevel === 'A2'
                    ? 'bg-rose-600 text-white glow-rose'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                A2
              </button>
            </div>

            {/* Quick tool */}
            <button
              onClick={onQuickTool}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition"
              title="Quick Verb Lookup"
            >
              🔍 <span className="hidden lg:inline">Verb Lookup</span>
            </button>

            {/* XP */}
            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-xl px-2.5 py-1.5">
              <span className="text-sm">⚡</span>
              <span className="text-sm font-bold text-amber-400 tabular-nums">{xp}</span>
            </div>

            {/* Streak */}
            <div className="hidden sm:flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 rounded-xl px-2.5 py-1.5">
              <span className="text-sm">{streak > 0 ? '🔥' : '💤'}</span>
              <span className="text-sm font-bold text-orange-400 tabular-nums">{streak}</span>
            </div>

            {/* User */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-sm font-bold hover:from-blue-400 hover:to-blue-500 transition shadow-lg shadow-blue-500/20"
              >
                {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 glass-card shadow-2xl z-50 slide-up">
                  <div className="px-4 py-3 border-b border-slate-700/50">
                    <p className="text-sm font-semibold text-slate-200 truncate">{profile?.full_name || 'Learner'}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-700/40" style={{ background: 'rgba(15, 20, 32, 0.95)', backdropFilter: 'blur(20px)' }}>
          <div className="px-4 py-3 space-y-1">
            <div className="flex gap-1 p-1 bg-slate-800/50 rounded-xl mb-3 border border-slate-700/50">
              <button onClick={() => { onLevelChange('A1'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeLevel === 'A1' ? 'bg-blue-600 text-white glow-blue' : 'text-slate-500'}`}>
                A1 Beginner
              </button>
              <button onClick={() => { onLevelChange('A2'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeLevel === 'A2' ? 'bg-rose-600 text-white glow-rose' : 'text-slate-500'}`}>
                A2 Elementary
              </button>
            </div>

            {navLinks.map(link => (
              <button key={link.id} onClick={() => { onViewChange(link.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeView === link.id ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800/50'
                }`}>
                <span className="text-lg">{link.icon}</span>{link.label}
              </button>
            ))}

            <button onClick={() => { onQuickTool(); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800/50 transition">
              <span className="text-lg">🔍</span>Verb Lookup
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
