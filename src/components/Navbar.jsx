import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <header className="sticky top-0 z-50 border-b border-[#E8DFD4] bg-[#FAF5ED]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-xl bg-white border border-[#E8DFD4] flex items-center justify-center text-[#4a5568] hover:text-[#1a1a2e] transition shadow-sm">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <button onClick={() => { setMobileMenuOpen(false); onViewChange('dashboard'); window.scrollTo(0, 0); }}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 active:scale-95 transition-all duration-200 shrink-0">
            <span className="text-xl">🇩🇪</span>
            <span className="text-base md:text-lg font-extrabold text-[#1a1a2e]" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
            <span className="text-base md:text-lg font-extrabold" style={{ fontFamily: 'Poppins, sans-serif', color: '#8B6914' }}>Buddy</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => onViewChange(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeView === link.id ? 'bg-[#8B6914] text-white shadow-md' : 'text-[#6b7280] hover:text-[#1a1a2e] hover:bg-white'
                }`}>
                <span>{link.icon}</span>{link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex gap-1 p-1 bg-white rounded-xl border border-[#E8DFD4] shadow-sm">
              <button onClick={() => onLevelChange('A1')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeLevel === 'A1' ? 'bg-[#5B8C7A] text-white shadow-sm' : 'text-[#9ca3af] hover:text-[#4a5568]'}`}>A1</button>
              <button onClick={() => onLevelChange('A2')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeLevel === 'A2' ? 'bg-[#C4956A] text-white shadow-sm' : 'text-[#9ca3af] hover:text-[#4a5568]'}`}>A2</button>
            </div>

            <button onClick={onQuickTool}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E8DFD4] rounded-xl text-xs font-medium text-[#5B8C7A] hover:bg-[#F5EFE6] transition shadow-sm">
              🔍 <span className="hidden lg:inline">Verbs</span>
            </button>

            <div className="flex items-center gap-1 bg-[#8B6914]/10 border border-[#8B6914]/20 rounded-xl px-2.5 py-1.5">
              <span className="text-sm">⚡</span>
              <span className="text-sm font-bold tabular-nums" style={{ color: '#8B6914' }}>{xp}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-[#C4956A]/10 border border-[#C4956A]/20 rounded-xl px-2.5 py-1.5">
              <span className="text-sm">{streak > 0 ? '🔥' : '💤'}</span>
              <span className="text-sm font-bold tabular-nums" style={{ color: '#C4956A' }}>{streak}</span>
            </div>

            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold hover:shadow-md transition"
                style={{ background: '#8B6914', color: 'white' }}>
                {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E8DFD4] rounded-2xl shadow-xl overflow-hidden z-50 slide-up">
                  <div className="px-4 py-3 border-b border-[#E8DFD4]">
                    <p className="text-sm font-semibold text-[#1a1a2e] truncate">{profile?.full_name || 'Learner'}</p>
                    <p className="text-xs text-[#9ca3af] truncate">{user?.email}</p>
                  </div>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-sm text-[#C4956A] hover:bg-[#C4956A]/5 transition">Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD4] bg-[#FAF5ED]">
          <div className="px-4 py-3 space-y-1">
            <div className="flex gap-1 p-1 bg-white rounded-xl mb-3 border border-[#E8DFD4]">
              <button onClick={() => { onLevelChange('A1'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeLevel === 'A1' ? 'bg-[#5B8C7A] text-white' : 'text-[#9ca3af]'}`}>A1 Beginner</button>
              <button onClick={() => { onLevelChange('A2'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeLevel === 'A2' ? 'bg-[#C4956A] text-white' : 'text-[#9ca3af]'}`}>A2 Elementary</button>
            </div>
            {navLinks.map(link => (
              <button key={link.id} onClick={() => { onViewChange(link.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeView === link.id ? 'bg-[#8B6914] text-white' : 'text-[#6b7280] hover:bg-white hover:text-[#1a1a2e]'
                }`}><span>{link.icon}</span>{link.label}</button>
            ))}
            <button onClick={() => { onQuickTool(); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[#5B8C7A] hover:bg-white transition">
              <span>🔍</span>Verb Lookup</button>
          </div>
        </div>
      )}
    </header>
  );
}
