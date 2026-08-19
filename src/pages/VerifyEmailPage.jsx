import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BuddyAvatar } from '../components/buddy';
import { IconMail, IconRefresh } from '../components/Icons';

// Shown right after signup when the Supabase project requires email
// confirmation. Replaces the old "passive banner on the login page" dead-end:
// gives the learner the email used, a resend button (with a cooldown, because
// Supabase rate-limits auth emails) and a clear path once verified. The email
// travels in the URL (?email=) so the page survives refresh/deep links.
export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const email = searchParams.get('email') || location.state?.email || '';

  const { resendVerificationEmail } = useAuth();
  const [resending, setResending] = useState(false);
  const [resendError, setResendError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  async function handleResend() {
    if (!email || resending || cooldown > 0) return;
    setResending(true);
    setResendError('');
    try {
      await resendVerificationEmail(email);
      setCooldown(60);
      timerRef.current = setInterval(() => {
        setCooldown(c => {
          if (c <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } catch (err) {
      setResendError(err.message);
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="db-page min-h-dvh flex overflow-y-auto">
      <div className="m-auto w-full max-w-md px-6 py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BuddyAvatar state="happy" size={96} />
          </div>
          <p className="db-section-label mb-2">DeutschBuddy</p>
          <h1 className="text-[26px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Gleich geschafft! 📬
          </h1>
          <p className="text-text-muted text-sm">
            Almost there. We just need to verify your email.
          </p>
        </div>

        <div className="auth-form-card">
          <div className="flex items-start gap-3 mb-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/25 bg-accent-light">
              <IconMail className="h-5 w-5 text-accent" />
            </div>
            <p className="text-sm text-text-body leading-relaxed pt-1">
              We sent a confirmation link to{' '}
              <strong className="text-text-dark break-all">{email}</strong>. Open it to activate
              your account, then come back and sign in.
            </p>
          </div>

          <div className="mb-5 border border-border bg-bg-secondary p-3.5 text-[13px] leading-relaxed text-text-muted">
            No email yet? Check your spam or junk folder, and allow a minute. Some providers are
            slower than others.
          </div>

          {resendError && (
            <div role="alert" className="mb-5 border border-error/20 bg-error/10 p-3 text-sm font-medium text-error">
              {resendError}
            </div>
          )}

          <button
            type="button"
            onClick={handleResend}
            disabled={!email || resending || cooldown > 0}
            className="btn-primary w-full justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IconRefresh className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
            {cooldown > 0 ? `Resend available in ${cooldown}s` : resending ? 'Sending...' : 'Resend email'}
          </button>

          <Link
            to="/login"
            className="btn-secondary mt-3 block w-full text-center"
          >
            I've verified my email. Continue to sign in
          </Link>

          <p className="text-center mt-6 text-sm text-text-muted">
            Typed the wrong address?{' '}
            <Link to="/signup" className="font-semibold text-primary hover:underline">Sign up again</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
