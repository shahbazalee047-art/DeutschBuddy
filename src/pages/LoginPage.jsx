import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BuddyAvatar } from '../components/buddy';
import { GoogleIcon, IconCheck, IconEye, IconEyeOff } from '../components/Icons';
import { applyPendingReferral } from '../services/referralService';
import { scopeLocalStateForUser } from '../utils/userStorage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  // Set when the server reports the account is unverified AND the user asked
  // for a new confirmation email — the resend button then swaps to a 60s
  // "check spam" message instead of allowing instant spam-clicking.
  const [resendState, setResendState] = useState({ sent: false, cooldown: 0, error: '' });
  const { signIn, signInWithGoogle, resendVerificationEmail, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const verifyEmail = location.state?.verifyEmail;

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendState(s => s.cooldown > 0 ? { ...s, cooldown: s.cooldown - 1 } : s);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  async function handleResend() {
    const target = email.trim() || verifyEmail || '';
    if (!target || resendState.cooldown > 0) return;
    setResendState(s => ({ ...s, sent: false, error: '' }));
    try {
      await resendVerificationEmail(target);
      setResendState({ sent: true, cooldown: 60, error: '' });
    } catch (err) {
      setResendState(s => ({ ...s, sent: false, error: err.message }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const nextErrors = {};
    if (!trimmedEmail) nextErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) nextErrors.email = 'Please enter a valid email address';
    if (!password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setResendState({ sent: false, cooldown: 0, error: '' });
    try {
      const data = await signIn(trimmedEmail, password);
      // Applies any stashed invite (email-confirmation path: the profile and
      // referral_code were created server-side at signup, and the referral is
      // credited now). No-op for existing users.
      const uid = data?.user?.id || data?.session?.user?.id;
      if (uid) {
        scopeLocalStateForUser(uid);
        applyPendingReferral(uid).catch(() => { /* referral is best-effort */ });
      }
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrors({ form: err.message });
      // Unverified accounts are the #1 sign-in dead-end: offer a one-tap
      // "Resend email" so the learner never has to hunt settings.
      if (err.code === 'email_not_confirmed') {
        setResendState(s => ({ ...s, error: '' }));
      }
    } finally { setLoading(false); }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setErrors({});
    try {
      await signInWithGoogle({
        onPopupClosed: () => setGoogleLoading(false),
      });
      // Success ends via the auth state change (storage event from the popup),
      // which navigates away. No further state to update here.
    } catch (err) {
      setErrors({ form: err.message });
      setGoogleLoading(false);
    }
  }

  const alreadyResent = resendState.sent || verifyEmail;
  const resendVisible = alreadyResent || errors.form?.includes('verify your email');

  return (
    <div className="auth-layout">
      <aside className="auth-brand-panel">
        <div>
          <p className="db-wordmark text-[0.72rem] text-bg-cream">DeutschBuddy</p>
          <div className="mt-12 max-w-md">
            <div className="mb-6 flex items-center gap-4">
              <BuddyAvatar state="happy" size={84} />
              <p className="text-sm font-semibold tracking-wide text-bg-cream/70">Willkommen zurück.</p>
            </div>
            <h1 className="text-5xl font-bold leading-[0.95] sm:text-6xl">
              Build a German habit that lasts.
            </h1>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-bg-cream/70">
              Short, focused practice for real conversations — with a clear path from your first hello to confident German.
            </p>
            <ul className="auth-value-list mt-10 space-y-4 text-sm text-bg-cream/80">
              <li className="flex items-start gap-3"><IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> A guided curriculum that keeps the next step clear</li>
              <li className="flex items-start gap-3"><IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" /> Vocabulary, grammar, listening, and speaking in one place</li>
              <li className="flex items-start gap-3"><IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> Progress you can feel without the visual noise</li>
            </ul>
          </div>
        </div>
        <p className="text-xs tracking-wide text-bg-cream/50">Learn a little. Come back tomorrow. Say more.</p>
      </aside>

      <main className="auth-form-panel">
        <div className="auth-form-card">
          <div className="mb-8">
            <p className="db-section-label">Sign in</p>
            <h2 className="mt-3 text-4xl font-bold text-text-dark">Continue your journey</h2>
            <p className="mt-2 text-sm text-text-muted">Your next focused session is waiting.</p>
          </div>

          {(alreadyResent || (resendState.sent && !resendState.error)) && (
            <div role="status" className="mb-5 border border-accent/25 bg-accent-light p-3 text-sm font-medium text-primary">
              {resendState.sent
                ? `Verification email sent! Check ${email.trim() || verifyEmail} (including spam), then sign in.`
                : `Account created with ${verifyEmail}! Please verify your email before signing in.`}
              {!resendState.sent && (
                <button type="button" onClick={handleResend} className="mt-2 block font-semibold text-primary hover:underline">
                  Didn't get it? Resend the email
                </button>
              )}
              {resendState.sent && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendState.cooldown > 0}
                  className="mt-2 block font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resendState.cooldown > 0
                    ? `Send again in ${resendState.cooldown}s`
                    : 'Send again'}
                </button>
              )}
            </div>
          )}
          {resendState.error && (
            <div role="alert" className="mb-5 border border-error/20 bg-error/10 p-3 text-sm font-medium text-error">
              {resendState.error}
            </div>
          )}
          {errors.form && (
            <div role="alert" className="mb-5 border border-error/20 bg-error/10 p-3 text-sm font-medium text-error">
              {errors.form}
              {resendVisible && errors.form?.includes('verify your email') && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendState.cooldown > 0}
                  className="mt-2 block font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resendState.cooldown > 0
                    ? `Resend available in ${resendState.cooldown}s`
                    : 'Resend verification email'}
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                className="w-full border border-border bg-bg-primary px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.email && <p className="auth-error" role="alert">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="login-password">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
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
              {errors.password && <p className="auth-error" role="alert">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 accent-primary" />
                <span className="text-[13px] text-text-muted">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[13px] font-medium text-primary hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn-primary w-full justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3" aria-hidden="true">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[11px] uppercase tracking-[1.5px] text-text-muted">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading || googleLoading}
            className="btn-secondary flex w-full items-center justify-center gap-2.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GoogleIcon size={20} />
            {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
          </button>

          <p className="mt-6 text-center text-sm text-text-muted">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary hover:underline">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
