import { useTheme } from '../contexts/ThemeContext';
import { IconUser, IconBell, IconLock, IconMoon, IconSun, IconLogOut } from './Icons';

export default function SettingsPage({ profile, user, onSignOut }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="fade-in max-w-2xl mx-auto space-y-5">
      <span className="eyebrow">Preferences</span>
      <h1 className="text-3xl font-bold text-text-dark mb-5 editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.5px' }}>Your <i>Settings</i></h1>

      <div className="paper-card p-5 space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-text-on-dark text-xl font-bold ring-2 ring-gold/40">
            {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="text-lg font-bold text-text-dark">{profile?.full_name || 'Learner'}</p>
            <p className="text-sm text-text-muted">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 px-4 hover:bg-bg-secondary transition cursor-pointer" onClick={toggleTheme}>
          <div className="flex items-center gap-3">
            {isDark ? <IconMoon className="w-5 h-5 text-text-muted" /> : <IconSun className="w-5 h-5 text-text-muted" />}
            <div>
              <p className="text-sm font-semibold text-text-body">Dark Mode</p>
              <p className="text-[12px] text-text-muted">{isDark ? 'On' : 'Off'}</p>
            </div>
          </div>
          <div className={`w-12 h-7 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${isDark ? 'bg-gold/40 border border-gold/50 justify-end' : 'bg-bg-secondary border border-border justify-start'}`}>
            <div className={`w-5 h-5 rounded-full shadow transition-colors ${isDark ? 'bg-gold' : 'bg-text-muted'}`} />
          </div>
        </div>

        {[
          { icon: IconUser, label: 'Profile Information', desc: 'Name, email, and personal details' },
          { icon: IconBell, label: 'Notifications', desc: 'Manage your notification preferences' },
          { icon: IconLock, label: 'Privacy & Security', desc: 'Password and account security' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-3 px-4 hover:bg-bg-secondary transition cursor-pointer">
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-text-muted" />
              <div>
                <p className="text-sm font-semibold text-text-body">{item.label}</p>
                <p className="text-[12px] text-text-muted">{item.desc}</p>
              </div>
            </div>
            <span className="text-text-body text-base font-bold">→</span>
          </div>
        ))}
      </div>

      <button onClick={onSignOut}
        className="w-full paper-card p-4 flex items-center justify-center gap-2 text-error hover:bg-error/5 transition active:scale-[0.99]">
        <IconLogOut className="w-5 h-5" />
        <span className="font-semibold">Sign Out</span>
      </button>
    </div>
  );
}
