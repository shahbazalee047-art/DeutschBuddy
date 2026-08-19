import { useState, useEffect, useRef, memo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconHome, IconChart, IconRefresh, IconMap, IconBell, IconSearch,
  IconUser, IconSettings, IconBook, IconTrophy, IconChevronDown,
} from './Icons';

const primaryLinks = [
  { id: 'dashboard', label: 'Home', icon: IconHome },
  { id: 'journey', label: 'Learn', icon: IconMap },
  { id: 'review', label: 'Practice', icon: IconRefresh },
  { id: 'progress', label: 'Progress', icon: IconChart },
];

function isProgressView(view) {
  return view === 'progress' || view === 'progress-statistics' || view === 'progress-skills' || view === 'progress-calendar';
}

const Navbar = memo(function Navbar({ activeView, onViewChange, activeLevel, onLevelChange, streak, onQuickTool, onNotifications, hasUnreadNotifications }) {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const menuRef = useRef(null);
  const moreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!menuOpen && !moreOpen) return undefined;
    function handleClick(event) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
      if (moreOpen && moreRef.current && !moreRef.current.contains(event.target)) setMoreOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen, moreOpen]);

  async function handleSignOut() {
    try {
      await signOut();
    } catch {
      return;
    }
    navigate('/login');
  }

  function selectView(view) {
    onViewChange(view);
    setMoreOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="db-nav sticky top-0 z-50">
      <div className="db-content-width">
        <div className="flex min-h-16 items-center gap-6">
          <Link
            to="/"
            onClick={() => selectView('dashboard')}
            className="db-wordmark shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Deutsch<em>Buddy</em>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary navigation">
            {primaryLinks.map(({ id, label, icon: Icon }) => {
              const active = id === 'progress' ? isProgressView(activeView) : activeView === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectView(id)}
                  aria-current={active ? 'page' : undefined}
                  className={`db-nav-link inline-flex items-center gap-2 px-4 ${active ? 'text-primary' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen(open => !open)}
                aria-expanded={moreOpen}
                className={`db-nav-link inline-flex items-center gap-2 px-4 ${['badges', 'community', 'resources'].includes(activeView) ? 'text-primary' : ''}`}
              >
                More <IconChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 border border-border bg-surface py-1 shadow-lg" role="menu">
                  <button type="button" onClick={() => selectView('badges')} className="flex min-h-11 w-full items-center gap-3 px-4 text-left text-sm text-text-body hover:bg-bg-secondary" role="menuitem"><IconTrophy className="h-4 w-4 text-primary" /> Badges</button>
                  <button type="button" onClick={() => selectView('community')} className="flex min-h-11 w-full items-center gap-3 px-4 text-left text-sm text-text-body hover:bg-bg-secondary" role="menuitem"><IconUser className="h-4 w-4 text-primary" /> Community</button>
                  <button type="button" onClick={() => selectView('resources')} className="flex min-h-11 w-full items-center gap-3 px-4 text-left text-sm text-text-body hover:bg-bg-secondary" role="menuitem"><IconBook className="h-4 w-4 text-primary" /> Resources</button>
                </div>
              )}
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center border border-border sm:flex" aria-label="Course level">
              {['A1', 'A2'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => onLevelChange(level)}
                  aria-pressed={activeLevel === level}
                  className={`min-h-10 min-w-11 border-l border-border px-3 text-xs font-bold transition-colors first:border-l-0 ${activeLevel === level ? 'bg-primary text-text-on-primary underline decoration-2 underline-offset-4' : 'bg-surface text-text-muted hover:bg-bg-secondary hover:text-primary'}`}
                >
                  {level}
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-2 px-2 text-sm text-text-muted md:flex" title="Current streak">
              <span className="font-display text-lg text-accent" aria-hidden="true">{streak}</span>
              <span className="text-xs font-semibold uppercase tracking-wide">day streak</span>
            </div>

            <button type="button" onClick={onQuickTool} className="flex h-10 w-10 items-center justify-center text-text-muted hover:bg-bg-secondary hover:text-primary" aria-label="Open verb lookup">
              <IconSearch className="h-5 w-5" />
            </button>
            <button type="button" onClick={onNotifications} className="relative flex h-10 w-10 items-center justify-center text-text-muted hover:bg-bg-secondary hover:text-primary" aria-label="Open notifications">
              <IconBell className="h-5 w-5" />
              {hasUnreadNotifications && <span className="absolute right-2 top-2 h-2 w-2 bg-error" aria-label="Unread notifications" />}
            </button>

            <div className="relative" ref={menuRef}>
              <button type="button" onClick={() => setMenuOpen(open => !open)} className="db-profile-avatar" aria-label="Open profile menu" aria-expanded={menuOpen}>
                {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 border border-border bg-surface py-2 shadow-lg" role="menu">
                  <div className="border-b border-border px-4 py-3">
                    <p className="truncate text-sm font-bold text-text-dark">{profile?.full_name || 'Learner'}</p>
                    <p className="truncate text-xs text-text-muted">{user?.email || ''}</p>
                  </div>
                  <button type="button" onClick={() => selectView('profile')} className="flex min-h-11 w-full items-center gap-3 px-4 text-left text-sm text-text-body hover:bg-bg-secondary" role="menuitem"><IconUser className="h-4 w-4 text-primary" /> Profile</button>
                  <button type="button" onClick={() => selectView('settings')} className="flex min-h-11 w-full items-center gap-3 px-4 text-left text-sm text-text-body hover:bg-bg-secondary" role="menuitem"><IconSettings className="h-4 w-4 text-primary" /> Settings</button>
                  <button type="button" onClick={handleSignOut} className="flex min-h-11 w-full items-center px-4 text-left text-sm text-error hover:bg-error-light" role="menuitem">Sign out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
