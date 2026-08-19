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
    <div className="min-h-dvh bg-bg-base flex overflow-y-auto">
      <div className="m-auto w-full max-w-md px-6 py-8">
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
                aria-invalid={!!errors.fullName}
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
                aria-invalid={!!errors.email}
                className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
              {errors.email && <p className="mt-1.5 text-[12px] text-error" role="alert">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="signup-password">Password</label>
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

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="signup-confirm">Confirm Password</label>
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
