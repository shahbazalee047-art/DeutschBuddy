import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BuddyAvatar } from '../components/buddy';
import { IconCheck } from '../components/Icons';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updatePassword, signOut, user, recovery } = useAuth();
  const navigate = useNavigate();

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
      setTimeout(() => navigate('/login', { replace: true }), 2000);
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

  return (
    <div className="min-h-dvh bg-bg-base flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
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
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="reset-password">New Password</label>
              <input
                id="reset-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="reset-confirm">Confirm Password</label>
              <input
                id="reset-confirm"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Repeat your password"
                className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>
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
