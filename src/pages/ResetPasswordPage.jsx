import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BuddyAvatar } from '../components/buddy';
import { IconCheck, IconEye, IconEyeOff } from '../components/Icons';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updatePassword, signOut, user, recovery } = useAuth();
  const navigate = useNavigate();
  const redirectTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(redirectTimerRef.current), []);

  // A recovery session (opened from the email reset link) must land on the
  // reset form. A normal signed-in session should not see this page.
  useEffect(() => {
    if (user && !recovery) navigate('/dashboard', { replace: true });
  }, [user, recovery, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await updatePassword(password);
      // End the recovery session so the user isn't left half-signed-in.
      try { await signOut(); } catch { /* ignore */ }
      setSuccess(true);
      clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = setTimeout(() => navigate('/login', { replace: true }), 2000);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  if (success) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-bg-base">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-4">
            <BuddyAvatar state="celebrate" size={88} />
          </div>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 border border-gold/20 bg-gold/10">
            <IconCheck className="w-7 h-7 text-gold" />
          </div>
          <h1 className="text-3xl font-bold text-text-dark mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Password updated!</h1>
          <p className="text-text-muted">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const linkExpired = error.includes('expired') || error.includes('request a new one');

  return (
    <div className="min-h-dvh bg-bg-base flex overflow-y-auto">
      <div className="m-auto w-full max-w-md px-6 py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BuddyAvatar state="happy" size={88} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">DeutschBuddy</p>
          <h1 className="text-[26px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Set a new password
          </h1>
          <p className="text-text-muted text-sm">
            Choose a new password for your DeutschBuddy account.
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
          {error && (
            <div role="alert" className="bg-error/10 border border-error/20 p-3 mb-5 text-sm text-error font-medium rounded-lg">
              {error}
              {linkExpired && (
                <Link to="/forgot-password" className="block mt-2 font-semibold text-gold hover:underline">
                  Request a new link
                </Link>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="reset-password">New Password</label>
              <div className="relative">
                <input
                  id="reset-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  aria-invalid={!!error}
                  className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 pr-11 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-gold transition-colors"
                >
                  {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="reset-confirm">Confirm Password</label>
              <div className="relative">
                <input
                  id="reset-confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 pr-11 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-gold transition-colors"
                >
                  {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error === 'Passwords do not match.' && <p className="text-[12px] text-error -mt-2" role="alert">{error}</p>}
            {error === 'Password must be at least 8 characters.' && <p className="text-[12px] text-error -mt-2" role="alert">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 rounded-xl bg-gold text-bg-primary font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating password...' : 'Update Password'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            <Link to="/login" className="font-semibold text-gold hover:underline">← Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}