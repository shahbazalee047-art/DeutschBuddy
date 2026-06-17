import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ activeView, onViewChange, activeLevel, onLevelChange, xp, streak, onQuickTool, onNotifications }) {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  async function handleSignOut() { await signOut(); navigate('/login'); }

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'badges', label: 'Badges', icon: '🏆' },
    { id: 'community', label: 'Community', icon: '💬' },
    { id: 'resources', label: 'Resources', icon: '📚' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-xl border-b border-[#E8E0D4] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - Clickable Link to Dashboard */}
          <Link to="/dashboard" onClick={() => onViewChange('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all duration-150 select-none">
            <div className="w-9 h-9 bg-gradient-to-br from-[#B8860B] to-[#D4A843] rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#B8860B]/20">🇩🇪</div>
            <span className="text-lg font-extrabold text-[#1A1A2E] hidden sm:block" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
            <span className="text-lg font-extrabold text-[#B8860B] hidden sm:block" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => onViewChange(link.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeView === link.id ? 'text-[#B8860B] bg-[#FFF8E1]' : 'text-[#8A8A9A] hover:text-[#1A1A2E] hover:bg-[#F5F5F5]'
                }`}>
                <span>{link.icon}</span>{link.label}
              </button>
            ))}
          </nav>

          {/* Right Side - Bell + Profile aligned */}
          <div className="flex items-center gap-2.5">
            {/* XP Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF8E1] border border-[#B8860B]/20">
              <span className="text-sm">⚡</span>
              <span className="text-sm font-bold text-[#B8860B] tabular-nums">{xp}</span>
            </div>

            {/* Bell + Profile side-by-side */}
            <div className="flex items-center gap-2">
              <button onClick={onNotifications}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-400 hover:text-[#B8860B] hover:bg-[#FFF8E1] transition relative">
                <span className="text-lg">🔔</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F44336]" />
              </button>

              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B8860B] to-[#D4A843] text-white flex items-center justify-center text-sm font-bold hover:shadow-lg hover:shadow-[#B8860B]/30 transition border-2 border-white/20">
                  {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E8E0D4] rounded-2xl shadow-xl overflow-hidden z-50 slide-up">
                    <div className="px-4 py-3 border-b border-[#E8E0D4]">
                      <p className="text-sm font-semibold text-[#1A1A2E] truncate">{profile?.full_name || 'Learner'}</p>
                      <p className="text-[11px] text-[#8A8A9A] truncate">{user?.email}</p>
                    </div>
                    <button onClick={() => { onViewChange('profile'); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#4A4A5A] hover:bg-[#FAF6F0] transition">👤 Profile</button>
                    <button onClick={() => { onViewChange('progress'); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#4A4A5A] hover:bg-[#FAF6F0] transition">⚙️ Settings</button>
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-sm text-[#F44336] hover:bg-red-50 transition">Sign Out</button>
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
