import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  IconUser, IconBell, IconLock, IconMoon, IconSun, IconLogOut,
  IconArrowLeft, IconEye, IconEyeOff
} from './Icons';

const DEFAULT_NOTIFICATIONS = {
  email_notifications: true,
  push_notifications: true,
  study_reminders: true,
  achievement_alerts: true,
  tips_and_facts: true,
  community_updates: false,
};

function Toggle({ checked, onChange, label, desc }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="pr-4">
        <p className="text-sm font-semibold text-text-body">{label}</p>
        {desc && <p className="text-[12px] text-text-muted mt-0.5">{desc}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${checked ? 'bg-gold justify-end' : 'bg-bg-secondary justify-start'}`}
        style={{ borderRadius: '100px' }}
      >
        <div className="w-5 h-5 bg-white rounded-full shadow transition-transform" style={{ borderRadius: '50%' }} />
      </button>
    </div>
  );
}

export default function SettingsPage({ profile, user, onSignOut }) {
  const { toggleTheme, isDark } = useTheme();
  const { refreshProfile } = useAuth();
  const [activeSection, setActiveSection] = useState('main');

  // Profile Information state
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  // Notifications state
  const [notifPrefs, setNotifPrefs] = useState(DEFAULT_NOTIFICATIONS);
  const [notifLoading, setNotifLoading] = useState(true);
  const [savingNotif, setSavingNotif] = useState(false);

  // Privacy & Security state
  const [privacyUnlocked, setPrivacyUnlocked] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [privacyError, setPrivacyError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    setFullName(profile?.full_name || '');
  }, [profile?.full_name]);

  useEffect(() => {
    async function loadPrefs() {
      if (!user?.id) {
        setNotifLoading(false);
        return;
      }
      setNotifLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('notification_preferences')
          .eq('id', user.id)
          .single();
        if (error) throw error;
        const prefs = data?.notification_preferences || {};
        setNotifPrefs({ ...DEFAULT_NOTIFICATIONS, ...prefs });
      } catch (err) {
        console.error('Failed to load notification preferences:', err);
        const local = localStorage.getItem('db_notification_preferences');
        setNotifPrefs(local ? { ...DEFAULT_NOTIFICATIONS, ...JSON.parse(local) } : DEFAULT_NOTIFICATIONS);
      } finally {
        setNotifLoading(false);
      }
    }
    loadPrefs();
  }, [user?.id]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user?.id) return;
    setSavingProfile(true);
    setProfileMessage('');
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName.trim(), updated_at: new Date().toISOString() })
        .eq('id', user.id);
      if (error) throw error;
      await refreshProfile();
      setProfileMessage('Profile updated successfully.');
      setTimeout(() => setProfileMessage(''), 3000);
    } catch (err) {
      setProfileMessage(err.message || 'Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleNotifChange = useCallback(async (key, value) => {
    const next = { ...notifPrefs, [key]: value };
    setNotifPrefs(next);
    localStorage.setItem('db_notification_preferences', JSON.stringify(next));

    if (!user?.id) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ notification_preferences: next, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      if (error) throw error;
      await refreshProfile();
    } catch (err) {
      console.error('Failed to save notification preferences:', err);
    }
  }, [notifPrefs, user, refreshProfile]);

  const handleSaveNotifications = async () => {
    if (!user?.id) return;
    setSavingNotif(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ notification_preferences: notifPrefs, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      if (error) throw error;
      await refreshProfile();
    } catch (err) {
      console.error('Failed to save notification preferences:', err);
    } finally {
      setSavingNotif(false);
    }
  };

  const handleVerifyPrivacy = async (e) => {
    e.preventDefault();
    if (!user?.email) return;
    setVerifying(true);
    setPrivacyError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      if (error) throw error;
      setPrivacyUnlocked(true);
      setCurrentPassword('');
    } catch (err) {
      setPrivacyError(err.message || 'Incorrect password. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    if (newPassword.length < 6) {
      setPasswordMessage('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage('Passwords do not match.');
      return;
    }
    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordMessage('Password updated successfully.');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordMessage(''), 3000);
    } catch (err) {
      setPasswordMessage(err.message || 'Failed to update password.');
    } finally {
      setChangingPassword(false);
    }
  };

  const settingItems = [
    { icon: IconUser, label: 'Profile Information', desc: 'Name, email, and personal details', section: 'profile' },
    { icon: IconBell, label: 'Notifications', desc: 'Manage your notification preferences', section: 'notifications' },
    { icon: IconLock, label: 'Privacy & Security', desc: 'Password and account security', section: 'privacy' },
  ];

  if (activeSection === 'profile') {
    return (
      <div className="fade-in max-w-2xl mx-auto space-y-5">
        <button onClick={() => setActiveSection('main')} className="btn-text flex items-center gap-2 mb-4">
          <IconArrowLeft className="w-4 h-4" /> Back to Settings
        </button>
        <span className="eyebrow">Profile</span>
        <h1 className="text-3xl font-bold text-text-dark mb-5 editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Your <i>Information</i></h1>

        <form onSubmit={handleSaveProfile} className="paper-card p-6 space-y-5">
          {profileMessage && (
            <div className={`p-3 text-sm border-l-4 ${profileMessage.includes('success') ? 'bg-success/10 text-success border-success' : 'bg-error/10 text-error border-error'}`}>
              {profileMessage}
            </div>
          )}

          <div className="flex items-center gap-4 pb-5 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-text-on-dark text-2xl font-bold shrink-0" style={{ borderRadius: '50%' }}>
              {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="text-lg font-bold text-text-dark">{profile?.full_name || 'Learner'}</p>
              <p className="text-sm text-text-muted">{user?.email}</p>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full paper-input"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Email Address</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full paper-input opacity-60 cursor-not-allowed"
            />
            <p className="text-[11px] text-text-muted mt-1">Email cannot be changed here.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Member Since</label>
              <p className="text-sm text-text-body">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}</p>
            </div>
            <div>
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Current Level</label>
              <p className="text-sm text-text-body">{profile?.selected_pacing ? `${profile.selected_pacing === 'fast' ? 'A1 Fast Track' : 'Standard'} Pace` : '—'}</p>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" disabled={savingProfile} className="btn-primary">
              {savingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (activeSection === 'notifications') {
    return (
      <div className="fade-in max-w-2xl mx-auto space-y-5">
        <button onClick={() => setActiveSection('main')} className="btn-text flex items-center gap-2 mb-4">
          <IconArrowLeft className="w-4 h-4" /> Back to Settings
        </button>
        <span className="eyebrow">Notifications</span>
        <h1 className="text-3xl font-bold text-text-dark mb-5 editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Manage <i>Notifications</i></h1>

        <div className="paper-card p-6 space-y-1">
          {notifLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <Toggle
                label="Email Notifications"
                desc="Receive account and progress updates via email."
                checked={notifPrefs.email_notifications}
                onChange={v => handleNotifChange('email_notifications', v)}
              />
              <Toggle
                label="Push Notifications"
                desc="Receive push reminders on your device."
                checked={notifPrefs.push_notifications}
                onChange={v => handleNotifChange('push_notifications', v)}
              />
              <div className="h-px bg-border my-2" />
              <Toggle
                label="Study Reminders"
                desc="Reminders to keep your streak alive."
                checked={notifPrefs.study_reminders}
                onChange={v => handleNotifChange('study_reminders', v)}
              />
              <Toggle
                label="Achievement Alerts"
                desc="Get notified when you unlock badges or hit milestones."
                checked={notifPrefs.achievement_alerts}
                onChange={v => handleNotifChange('achievement_alerts', v)}
              />
              <Toggle
                label="Tips & Facts"
                desc="Daily German tips and cultural facts."
                checked={notifPrefs.tips_and_facts}
                onChange={v => handleNotifChange('tips_and_facts', v)}
              />
              <Toggle
                label="Community Updates"
                desc="Notifications about replies and upvotes on your posts."
                checked={notifPrefs.community_updates}
                onChange={v => handleNotifChange('community_updates', v)}
              />
            </>
          )}

          <div className="pt-4">
            <button onClick={handleSaveNotifications} disabled={savingNotif || notifLoading} className="btn-primary">
              {savingNotif ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'privacy') {
    return (
      <div className="fade-in max-w-2xl mx-auto space-y-5">
        <button onClick={() => setActiveSection('main')} className="btn-text flex items-center gap-2 mb-4">
          <IconArrowLeft className="w-4 h-4" /> Back to Settings
        </button>
        <span className="eyebrow">Security</span>
        <h1 className="text-3xl font-bold text-text-dark mb-5 editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Privacy <i>&amp; Security</i></h1>

        {!privacyUnlocked ? (
          <div className="paper-card p-6">
            <p className="text-text-body mb-4">For your security, please confirm your password to access this section.</p>
            {privacyError && (
              <div className="bg-error/10 border-l-4 border-error p-3 mb-4 text-sm text-error">{privacyError}</div>
            )}
            <form onSubmit={handleVerifyPrivacy} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full paper-input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold"
                >
                  {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                </button>
              </div>
              <button type="submit" disabled={verifying} className="btn-primary">
                {verifying ? 'Verifying...' : 'Continue'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="paper-card p-6 space-y-4">
              <h3 className="text-lg font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Account Security</h3>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
                <div>
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1 block">Email</label>
                  <p className="text-sm text-text-body break-words">{user?.email}</p>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1 block">Last Sign In</label>
                  <p className="text-sm text-text-body">{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : '—'}</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
                {passwordMessage && (
                  <div className={`p-3 text-sm border-l-4 ${passwordMessage.includes('success') ? 'bg-success/10 text-success border-success' : 'bg-error/10 text-error border-error'}`}>
                    {passwordMessage}
                  </div>
                )}
                <div>
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 block">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full paper-input"
                    minLength={6}
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full paper-input"
                    required
                  />
                </div>
                <button type="submit" disabled={changingPassword} className="btn-primary">
                  {changingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fade-in max-w-2xl mx-auto space-y-5">
      <button onClick={() => window.history.back()} className="btn-text flex items-center gap-2 mb-2">
        <IconArrowLeft className="w-4 h-4" /> Back
      </button>

      <span className="eyebrow">Preferences</span>
      <h1 className="text-3xl font-bold text-text-dark mb-5 editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.5px' }}>Your <i>Settings</i></h1>

      <div className="paper-card p-5 space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-text-on-dark text-xl font-bold ring-2 ring-gold/40 shrink-0" style={{ borderRadius: '50%' }}>
            {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-text-dark truncate">{profile?.full_name || 'Learner'}</p>
            <p className="text-sm text-text-muted truncate">{user?.email}</p>
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
          <div className={`w-12 h-7 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${isDark ? 'bg-gold justify-end' : 'bg-bg-secondary border border-border justify-start'}`}
            style={{ borderRadius: '100px' }}
          >
            <div className={`w-5 h-5 rounded-full shadow transition-colors ${isDark ? 'bg-gold' : 'bg-text-muted'}`} style={{ borderRadius: '50%' }} />
          </div>
        </div>

        {settingItems.map((item, i) => (
          <div key={i} onClick={() => setActiveSection(item.section)}
            className="flex items-center justify-between py-3 px-4 hover:bg-bg-secondary transition cursor-pointer"
          >
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
        className="w-full paper-card p-4 flex items-center justify-center gap-2 text-error hover:bg-error/5 transition active:scale-[0.99]"
      >
        <IconLogOut className="w-5 h-5" />
        <span className="font-semibold">Sign Out</span>
      </button>
    </div>
  );
}
