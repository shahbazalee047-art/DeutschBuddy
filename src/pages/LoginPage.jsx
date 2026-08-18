import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BuddyAvatar } from '../components/buddy';
import { GoogleIcon, IconCheck, IconEye, IconEyeOff } from '../components/Icons';
import { applyPendingReferral } from '../services/referralService';

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
      try {
        if (localStorage.getItem('db_selected_level')) {
          localStorage.setItem('db_onboarded', 'true');
        }
      } catch { /* ignore */ }
      // Applies any stashed invite (email-confirmation path: the profile and
      // referral_code were created server-side at signup, and the referral is
      // credited now). No-op for existing users.
      const uid = data?.user?.id || data?.session?.user?.id;
      if (uid) {
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
    <div className="min-h-dvh bg-bg-base flex overflow-y-auto">
      <div className="m-auto w-full max-w-md px-6 py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BuddyAvatar state="happy" size={96} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">DeutschBuddy</p>
          <h1 className="text-[26px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Willkommen zurück! 🐾
          </h1>
          <p className="text-text-muted text-sm">
            Your German journey continues here.
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
          {(alreadyResent || (resendState.sent && !resendState.error)) && (
            <div role="status" className="bg-gold/10 border border-gold/30 p-3 mb-5 text-sm text-gold font-medium rounded-lg">
              {resendState.sent
                ? `Verification email sent! Check ${email.trim() || verifyEmail} (including spam), then sign in.`
                : `Account created with ${verifyEmail}! Please verify your email before signing in.`}
              {!resendState.sent && (
                <button type="button" onClick={handleResend} className="block mt-2 font-semibold text-gold hover:underline">
                  Didn't get it? Resend the email
                </button>
              )}
              {resendState.sent && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendState.cooldown > 0}
                  className="block mt-2 font-semibold text-gold hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {resendState.cooldown > 0
                    ? `Send again in ${resendState.cooldown}s`
                    : 'Send again'}
                </button>
              )}
            </div>
          )}
          {resendState.error && (
            <div role="alert" className="bg-error/10 border border-error/20 p-3 mb-5 text-sm text-error font-medium rounded-lg">
              {resendState.error}
            </div>
          )}
          {errors.form && (
            <div role="alert" className="bg-error/10 border border-error/20 p-3 mb-5 text-sm text-error font-medium rounded-lg">
              {errors.form}
              {resendVisible && errors.form?.includes('verify your email') && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendState.cooldown > 0}
                  className="block mt-2 font-semibold text-gold hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {resendState.cooldown > 0
                    ? `Resend available in ${resendState.cooldown}s`
                    : 'Resend verification email'}
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
              {errors.email && <p className="mt-1.5 text-[12px] text-error" role="alert">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="login-password">Password</label>
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
              {errors.password && <p className="mt-1.5 text-[12px] text-error" role="alert">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-gold" />
                <span className="text-[13px] text-text-muted">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[13px] font-medium text-gold hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full p-4 rounded-xl bg-gold text-bg-primary font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5" aria-hidden="true">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[11px] uppercase tracking-[1.5px] text-text-muted">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading || googleLoading}
            className="w-full p-3.5 rounded-xl bg-bg-primary border border-border text-text-body font-semibold flex items-center justify-center gap-2.5 hover:border-gold/50 hover:bg-bg-secondary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <GoogleIcon size={20} />
            {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
          </button>

          <p className="text-center mt-6 text-sm text-text-muted">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-gold hover:underline">Sign up</Link>
          </p>
        </div>

        <div className="hidden lg:block mt-6 text-center">
          <p className="text-[13px] text-text-muted/70 leading-relaxed">
            <IconCheck className="inline w-3.5 h-3.5 text-gold mr-1" />
            16-week guided curriculum · Audio practice · Goethe-style mock exams
          </p>
        </div>
      </div>
    </div>
  );
}