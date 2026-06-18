import { IconUser, IconBell, IconLock, IconLogOut } from './Icons';

export default function SettingsPage({ profile, user, onSignOut }) {
  return (
    <div className="fade-in max-w-2xl mx-auto space-y-5">
      <h1 className="text-3xl font-bold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>Settings</h1>

      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-zinc-700/30">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-lime-500 to-cyan-500 flex items-center justify-center text-zinc-900 text-xl font-bold ring-2 ring-lime-400/40">
            {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="text-lg font-bold text-zinc-100">{profile?.full_name || 'Learner'}</p>
            <p className="text-sm text-zinc-500">{user?.email}</p>
          </div>
        </div>

        {[
          { icon: IconUser, label: 'Profile Information', desc: 'Name, email, and personal details' },
          { icon: IconBell, label: 'Notifications', desc: 'Manage your notification preferences' },
          { icon: IconLock, label: 'Privacy & Security', desc: 'Password and account security' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-zinc-800/50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-zinc-400" />
              <div>
                <p className="text-sm font-semibold text-zinc-200">{item.label}</p>
                <p className="text-[12px] text-zinc-500">{item.desc}</p>
              </div>
            </div>
            <span className="text-zinc-600 text-sm">→</span>
          </div>
        ))}
      </div>

      <button onClick={onSignOut}
        className="w-full glass-card p-4 flex items-center justify-center gap-2 text-error hover:bg-error/5 transition active:scale-[0.99]">
        <IconLogOut className="w-5 h-5" />
        <span className="font-semibold">Sign Out</span>
      </button>
    </div>
  );
}