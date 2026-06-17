import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ activeView, onViewChange, activeLevel, onLevelChange, xp, streak, onQuickTool }) {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function handleSignOut() { await signOut(); navigate('/login'); }

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: '📚' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'badges', label: 'Badges', icon: '🏆' },
    { id: 'resources', label: 'Resources', icon: '🔗' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-slate-100 transition">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <Link to="/dashboard" className="flex items-center gap-2 select-none cursor-pointer hover:opacity-90 active:scale-95 transition-all">
            <span className="text-xl">🇩🇪</span>
            <span className="text-base md:text-lg font-extrabold text-slate-100" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
            <span className="text-base md:text-lg font-extrabold text-lime-400" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => onViewChange(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeView === link.id ? 'bg-lime-400 text-slate-900' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}>
                <span>{link.icon}</span>{link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700/50">
              <button onClick={() => onLevelChange('A1')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeLevel === 'A1' ? 'bg-lime-400 text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}>A1</button>
              <button onClick={() => onLevelChange('A2')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeLevel === 'A2' ? 'bg-purple-400 text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}>A2</button>
            </div>

            <button onClick={onQuickTool}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700/50 rounded-xl text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:bg-slate-700 transition">
              🔍 <span className="hidden lg:inline">Verbs</span>
            </button>

            <div className="flex items-center gap-1 bg-lime-400/10 border border-lime-400/20 rounded-xl px-2.5 py-1.5">
              <span className="text-sm">⚡</span>
              <span className="text-sm font-bold text-lime-400 tabular-nums">{xp}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 rounded-xl px-2.5 py-1.5">
              <span className="text-sm">{streak > 0 ? '🔥' : '💤'}</span>
              <span className="text-sm font-bold text-orange-400 tabular-nums">{streak}</span>
            </div>

            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 rounded-xl bg-lime-400 text-slate-900 flex items-center justify-center text-sm font-bold hover:bg-lime-300 transition">
                {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-slate-800 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden z-50 slide-up">
                  <div className="px-4 py-3 border-b border-slate-700/50">
                    <p className="text-sm font-semibold text-slate-200 truncate">{profile?.full_name || 'Learner'}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition">Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            <div className="flex gap-1 p-1 bg-slate-800 rounded-xl mb-3 border border-slate-700/50">
              <button onClick={() => { onLevelChange('A1'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeLevel === 'A1' ? 'bg-lime-400 text-slate-900' : 'text-slate-400'}`}>A1 Beginner</button>
              <button onClick={() => { onLevelChange('A2'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeLevel === 'A2' ? 'bg-purple-400 text-slate-900' : 'text-slate-400'}`}>A2 Elementary</button>
            </div>
            {navLinks.map(link => (
              <button key={link.id} onClick={() => { onViewChange(link.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeView === link.id ? 'bg-lime-400 text-slate-900' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}><span>{link.icon}</span>{link.label}</button>
            ))}
            <button onClick={() => { onQuickTool(); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-cyan-400 hover:bg-slate-800 transition">
              <span>🔍</span>Verb Lookup</button>
          </div>
        </div>
      )}
    </header>
  );
}
