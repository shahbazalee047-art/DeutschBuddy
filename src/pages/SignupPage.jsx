import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BuddyAvatar } from '../components/buddy';
import { GoogleIcon } from '../components/Icons';
import { stashReferralCode, isValidReferralCode } from '../utils/referral';
import { applyPendingReferral } from '../services/referralService';
import { trackSignupCompleted } from '../utils/analytics';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  // A direct /signup?ref=CODE (or a ref carried through onboarding, which
  // OnboardingPage already stashed) is parked in localStorage so it survives
  // the onboarding -> signup navigation and any redirect churn.
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (isValidReferralCode(ref)) stashReferralCode(ref);
  }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!fullName.trim()) nextErrors.fullName = 'Please enter your full name';
    if (!email.trim()) nextErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = 'Please enter a valid email address';
    if (!password) nextErrors.password = 'Password is required';
    else if (password.length < 8) nextErrors.password = 'Password must be at least 8 characters';
    if (!confirmPassword) nextErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const { data, error } = await signUp(email, password, fullName);
      if (error) throw error;
      // Carry the onboarding track choice (db_selected_track) into the new
      // profile, so the profile-sync in DashboardContext doesn't reset a
      // fast-track learner back to 'standard' after signup. Referral setup
      // (own code + referred_by) rides the same upsert.
      const signedInUser = data?.session?.user;
      let referralUsed = false;
      if (signedInUser) {
        const chosenTrack = (() => {
          try { return localStorage.getItem('db_selected_track'); } catch { return null; }
        })();
        const trackPayload = (chosenTrack === 'fast' || chosenTrack === 'standard')
          ? { selected_pacing: chosenTrack }
          : {};
        referralUsed = !!(await applyPendingReferral(signedInUser.id, trackPayload));
      }
      // Email confirmation may be enabled, in which case there is no session
      // yet — signup still succeeded, and the stashed referral is applied at
      // first login (LoginPage calls applyPendingReferral).
      trackSignupCompleted({ referralUsed });
      if (data?.session?.user) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/login', { replace: true, state: { verifyEmail: email } });
      }
    } catch (err) {
      setErrors({ form: err.message });
    } finally { setLoading(false); }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setErrors({});
    try {
      await signInWithGoogle();
      // The page is redirected to Google's consent screen — no further state
      // to update here. If the popup fails, catch below and re-enable.
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
            <BuddyAvatar state="waving" size={96} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">DeutschBuddy</p>
          <h1 className="text-[26px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Willkommen bei DeutschBuddy! 🇩🇪
          </h1>
          <p className="text-text-muted text-sm">
            Let's start your German learning journey.
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
          {errors.form && (
            <div role="alert" className="bg-error/10 border border-error/20 p-3 mb-5 text-sm text-error font-medium rounded-lg">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Your name"
                className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
              {errors.fullName && <p className="mt-1.5 text-[12px] text-error" role="alert">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
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
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
              {errors.password && <p className="mt-1.5 text-[12px] text-error" role="alert">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="signup-confirm">Confirm Password</label>
              <input
                id="signup-confirm"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Repeat your password"
                className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
              {errors.confirmPassword && <p className="mt-1.5 text-[12px] text-error" role="alert">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full p-4 rounded-xl bg-gold text-bg-primary font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
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
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-gold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
