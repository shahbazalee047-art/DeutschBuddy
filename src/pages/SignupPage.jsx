import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BuddyAvatar } from '../components/buddy';
import { GoogleIcon, IconEye, IconEyeOff } from '../components/Icons';
import { stashReferralCode, isValidReferralCode } from '../utils/referral';
import { applyPendingReferral } from '../services/referralService';
import { trackSignupCompleted } from '../utils/analytics';
import { getUserValue, scopeLocalStateForUser } from '../utils/userStorage';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    const trimmedEmail = email.trim();
    const nextErrors = {};
    if (!fullName.trim()) nextErrors.fullName = 'Please enter your full name';
    if (!trimmedEmail) nextErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) nextErrors.email = 'Please enter a valid email address';
    if (!password) nextErrors.password = 'Password is required';
    else if (password.length < 8) nextErrors.password = 'Password must be at least 8 characters';
    if (!confirmPassword) nextErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const { data, error } = await signUp(trimmedEmail, password, fullName);
      if (error) throw error;
      // Carry the onboarding track choice (db_selected_track) into the new
      // profile, so the profile-sync in DashboardContext doesn't reset a
      // fast-track learner back to 'standard' after signup. Referral setup
      // (own code + referred_by) rides the same upsert.
      const signedInUser = data?.session?.user;
      let referralUsed = false;
      if (signedInUser) {
        scopeLocalStateForUser(signedInUser.id);
        const chosenTrack = (() => {
          return getUserValue(signedInUser.id, 'selected_track', null);
        })();
        const trackPayload = (chosenTrack === 'fast' || chosenTrack === 'standard')
          ? { selected_pacing: chosenTrack }
          : {};
        // Referral credit is best-effort: a network/RLS failure after a
        // successful signup must NOT turn the signup into an error page (the
        // stashed code is re-applied at first login).
        try {
          referralUsed = !!(await applyPendingReferral(signedInUser.id, trackPayload));
        } catch {
          referralUsed = false;
        }
      }
      // Email confirmation may be enabled, in which case there is no session
      // yet — signup still succeeded, and the stashed referral is applied at
      // first login (LoginPage calls applyPendingReferral). The dedicated
      // verify page owns the resend path so the learner never dead-ends.
      trackSignupCompleted({ referralUsed });
      if (data?.session?.user) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate(`/verify-email?email=${encodeURIComponent(trimmedEmail)}`, { replace: true });
      }
    } catch (err) {
      setErrors({ form: err.message });
    } finally { setLoading(false); }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setErrors({});
    try {
      await signInWithGoogle({
        onPopupClosed: () => setGoogleLoading(false),
      });
    } catch (err) {
      setErrors({ form: err.message });
      setGoogleLoading(false);
    }
  }

  return (
    <div className="auth-layout">
      <aside className="auth-brand-panel">
        <div>
          <p className="db-wordmark text-[0.72rem] text-bg-cream">DeutschBuddy</p>
          <div className="mt-12 max-w-md">
            <div className="mb-6 flex items-center gap-4">
              <BuddyAvatar state="waving" size={84} />
              <p className="text-sm font-semibold tracking-wide text-bg-cream/70">Dein erster Schritt.</p>
            </div>
            <h1 className="text-5xl font-bold leading-[0.95] sm:text-6xl">
              Start with words you can use today.
            </h1>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-bg-cream/70">
              Tell us where you are starting, and DeutschBuddy will shape a calm, practical learning path around you.
            </p>
            <ul className="auth-value-list mt-10 space-y-4 text-sm text-bg-cream/80">
              <li className="flex items-start gap-3"><span className="mt-0.5 text-accent">01</span> A clear path for your level and pace</li>
              <li className="flex items-start gap-3"><span className="mt-0.5 text-success">02</span> Small sessions built for consistency</li>
              <li className="flex items-start gap-3"><span className="mt-0.5 text-accent">03</span> Practice that keeps real German in focus</li>
            </ul>
          </div>
        </div>
        <p className="text-xs tracking-wide text-bg-cream/50">A little German every day adds up.</p>
      </aside>

      <main className="auth-form-panel">
        <div className="auth-form-card">
          <div className="mb-8">
            <p className="db-section-label">Create account</p>
            <h2 className="mt-3 text-4xl font-bold text-text-dark">Make German part of your day</h2>
            <p className="mt-2 text-sm text-text-muted">Your guided path starts with a few details.</p>
          </div>

          {errors.form && (
            <div role="alert" className="mb-5 border border-error/20 bg-error/10 p-3 text-sm font-medium text-error">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={!!errors.fullName}
                className="w-full border border-border bg-bg-primary px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.fullName && <p className="auth-error" role="alert">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
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
              <label htmlFor="signup-password">Password</label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
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

            <div>
              <label htmlFor="signup-confirm">Confirm Password</label>
              <div className="relative">
                <input
                  id="signup-confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  aria-invalid={!!errors.confirmPassword}
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
              {errors.confirmPassword && <p className="auth-error" role="alert">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn-primary w-full justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create Account'}
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
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
