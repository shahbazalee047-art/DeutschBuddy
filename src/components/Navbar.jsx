import { useState, useEffect, useRef, memo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { IconHome, IconChart, IconTrophy, IconChat, IconBook, IconBell, IconSearch, IconBolt, IconUser, IconSettings, IconLogOut } from './Icons';

const Navbar = memo(function Navbar({ activeView, onViewChange, activeLevel, onLevelChange, xp, streak, onQuickTool, onNotifications, hasUnreadNotifications }) {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  async function handleSignOut() { await signOut(); navigate('/login'); }

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: IconHome },
    { id: 'progress', label: 'Progress', icon: IconChart },
    { id: 'badges', label: 'Badges', icon: IconTrophy },
    { id: 'community', label: 'Community', icon: IconChat },
    { id: 'resources', label: 'Resources', icon: IconBook },
  ];

  return (
    <header className="sticky top-0 z-50 bg-forest-900/95 backdrop-blur-xl border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16">
          {/* Mobile: centered logo */}
          <Link to="/" onClick={() => onViewChange('dashboard')}
            className="lg:hidden flex items-center justify-center flex-1 gap-3 cursor-pointer active:scale-95 transition-all duration-150 select-none">
            <span className="text-3xl leading-none">🇩🇪</span>
            <span className="text-2xl font-extrabold text-cream-100" style={{ fontFamily: 'DM Serif Display, serif' }}>Deutsch</span>
            <span className="text-2xl font-extrabold text-sage-400" style={{ fontFamily: 'DM Serif Display, serif' }}>Buddy</span>
          </Link>

          {/* Desktop: left logo, center nav, right icons */}
          <div className="hidden lg:flex lg:items-center lg:w-full">
            <Link to="/" onClick={() => onViewChange('dashboard')}
              className="flex items-center gap-2 cursor-pointer active:scale-95 transition-all duration-150 select-none">
              <span className="text-[2rem] leading-none">🇩🇪</span>
              <span className="text-3xl font-extrabold text-cream-100" style={{ fontFamily: 'DM Serif Display, serif' }}>Deutsch</span>
              <span className="text-3xl font-extrabold text-sage-400" style={{ fontFamily: 'DM Serif Display, serif' }}>Buddy</span>
            </Link>

            <nav className="flex-1 flex justify-center gap-1">
              {navLinks.map(link => (
                <button key={link.id} onClick={() => onViewChange(link.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeView === link.id ? 'text-forest-900 bg-sage-400 shadow-md shadow-sage-400/20' : 'text-cream-400 hover:text-cream-200 hover:bg-forest-800'
                  }`}>
                  <link.icon className="w-4 h-4" />{link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <div className="flex rounded-xl overflow-hidden border border-border">
                {['A1', 'A2'].map(lvl => (
                  <button key={lvl} onClick={() => onLevelChange(lvl)}
                    className={`px-3 py-1.5 text-[12px] font-bold transition-all ${
                      activeLevel === lvl
                        ? lvl === 'A1' ? 'bg-sage-400 text-forest-900' : 'bg-sky-400 text-forest-900'
                        : 'bg-forest-800 text-cream-400 hover:text-cream-200'
                    }`}>
                    {lvl}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button onClick={onNotifications}
                  className="flex items-center justify-center w-11 h-11 rounded-xl text-cream-400 hover:text-sage-400 hover:bg-sage-400/10 transition relative">
                  <IconBell className="w-6 h-6" />
                  {hasUnreadNotifications && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-error" />}
                </button>

                <button onClick={onQuickTool}
                  className="flex items-center justify-center w-10 h-10 rounded-xl text-cream-400 hover:text-sky-400 hover:bg-sky-400/10 transition">
                  <IconSearch className="w-5 h-5" />
                </button>

                <div className="relative" ref={menuRef}>
                  <button onClick={() => setMenuOpen(!menuOpen)}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-sage-400 to-amber-400 text-forest-900 flex items-center justify-center text-sm font-bold hover:shadow-lg hover:shadow-sage-400/30 transition ring-2 ring-sage-400/40 active:scale-90">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-xl overflow-hidden z-50 slide-up border border-border bg-card">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold text-cream-200 truncate">{profile?.full_name || 'Learner'}</p>
                        <p className="text-[11px] text-cream-500 truncate">{user?.email}</p>
                      </div>
                      <button onClick={() => { onViewChange('profile'); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-cream-300 hover:bg-forest-800 transition flex items-center gap-2"><IconUser className="w-4 h-4" /> Profile</button>
                      <button onClick={() => { onViewChange('settings'); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-cream-300 hover:bg-forest-800 transition flex items-center gap-2"><IconSettings className="w-4 h-4" /> Settings</button>
                      <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-sm text-error hover:bg-error/10 transition">Sign Out</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
