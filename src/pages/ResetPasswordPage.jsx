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
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-success/25 bg-success-light">
            <IconCheck className="h-7 w-7 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-text-dark mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Password updated!</h1>
          <p className="text-text-muted">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const linkExpired = error.includes('expired') || error.includes('request a new one');

  return (
    <div className="db-page min-h-dvh flex overflow-y-auto">
      <div className="m-auto w-full max-w-md px-6 py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BuddyAvatar state="happy" size={88} />
          </div>
          <p className="db-section-label mb-2">DeutschBuddy</p>
          <h1 className="text-[26px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Set a new password
          </h1>
          <p className="text-text-muted text-sm">
            Choose a new password for your DeutschBuddy account.
          </p>
        </div>

        <div className="auth-form-card">
          {error && (
            <div role="alert" className="mb-5 border border-error/20 bg-error/10 p-3 text-sm font-medium text-error">
              {error}
              {linkExpired && (
                <Link to="/forgot-password" className="mt-2 block font-semibold text-primary hover:underline">
                  Request a new link
                </Link>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="reset-password">New Password</label>
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
                  className="w-full border border-border bg-bg-primary px-4 py-3 pr-11 text-text-body placeholder:text-text-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-text-muted transition-colors hover:text-primary"
                >
                  {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="reset-confirm">Confirm Password</label>
              <div className="relative">
                <input
                  id="reset-confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  className="w-full border border-border bg-bg-primary px-4 py-3 pr-11 text-text-body placeholder:text-text-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-text-muted transition-colors hover:text-primary"
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
              className="btn-primary w-full justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Updating password...' : 'Update Password'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            <Link to="/login" className="font-semibold text-primary hover:underline">← Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
