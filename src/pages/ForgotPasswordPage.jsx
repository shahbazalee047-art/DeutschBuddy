import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BuddyAvatar } from '../components/buddy';
import { IconMail, IconRefresh } from '../components/Icons';

const RESEND_COOLDOWN = 60;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { resetPassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown(c => (c > 0 ? c - 1 : c));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  async function resendLink(e) {
    if (e?.preventDefault) e.preventDefault();
    if (cooldown > 0) return;
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  async function handleSubmit(e) {
    if (e?.preventDefault) e.preventDefault();
    setError('');
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (cooldown > 0) return;
    setLoading(true);
    try {
      await resetPassword(trimmedEmail);
      setSuccess(true);
      setCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  if (success) {
    return (
      <div className="db-page min-h-dvh flex overflow-y-auto">
        <div className="m-auto w-full max-w-md px-6 py-8 text-center">
          <div className="flex justify-center mb-4">
            <BuddyAvatar state="happy" size={88} />
          </div>
          <div className="mb-5 flex h-14 w-14 items-center justify-center border border-accent/25 bg-accent-soft mx-auto">
            <IconMail className="h-7 w-7 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-text-dark mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Check your email</h1>
          <p className="text-text-muted mb-3 leading-relaxed" style={{ fontSize: '16px' }}>
            We've sent a password reset link to <strong className="text-text-dark">{email.trim()}</strong>
          </p>
          <p className="text-[13px] text-text-muted mb-6 leading-relaxed">
            No email in a minute or two? Check spam or junk, then try again.
          </p>
          {error && (
            <div role="alert" className="max-w-xs mx-auto bg-error/10 border border-error/20 p-3 mb-4 text-sm text-error font-medium rounded-lg">
              {error}
            </div>
          )}
          <button
            type="button"
            onClick={resendLink}
            disabled={loading || cooldown > 0}
            className="btn-primary mx-auto mb-3 flex w-full max-w-xs items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IconRefresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {cooldown > 0 ? `Resend available in ${cooldown}s` : loading ? 'Sending...' : 'Resend the link'}
          </button>
          <Link to="/login" className="font-semibold text-primary transition hover:text-primary-dark">Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="db-page min-h-dvh flex overflow-y-auto">
      <div className="m-auto w-full max-w-md px-6 py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BuddyAvatar state="thinking" size={88} />
          </div>
          <p className="db-section-label mb-2">DeutschBuddy</p>
          <h1 className="text-[26px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Reset your password
          </h1>
          <p className="text-text-muted text-sm">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        <div className="auth-form-card">
          {error && (
            <div role="alert" className="mb-5 border border-error/20 bg-error/10 p-3 text-sm font-medium text-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="forgot-email">Email</label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!error}
                className="w-full border border-border bg-bg-primary px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {error === 'Please enter a valid email address.' && <p className="auth-error" role="alert">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading || cooldown > 0}
              className="btn-primary w-full justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Sending reset email...' : 'Send Reset Link'}
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
