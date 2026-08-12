import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BuddyAvatar } from '../components/buddy';
import { GoogleIcon, IconCheck } from '../components/Icons';
import { applyPendingReferral } from '../services/referralService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const verifyEmail = location.state?.verifyEmail;

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = 'Please enter a valid email address';
    if (!password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const data = await signIn(email, password);
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
    } finally { setLoading(false); }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setErrors({});
    try {
      await signInWithGoogle();
    } catch (err) {
      setErrors({ form: err.message });
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-bg-base flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
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
          {verifyEmail && (
            <div role="status" className="bg-gold/10 border border-gold/30 p-3 mb-5 text-sm text-gold font-medium rounded-lg">
              Account created! Please verify your email before signing in.
            </div>
          )}
          {errors.form && (
            <div role="alert" className="bg-error/10 border border-error/20 p-3 mb-5 text-sm text-error font-medium rounded-lg">
              {errors.form}
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
                className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
              {errors.email && <p className="mt-1.5 text-[12px] text-error" role="alert">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
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
