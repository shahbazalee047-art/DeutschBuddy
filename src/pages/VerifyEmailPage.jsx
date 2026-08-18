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
    <div className="min-h-dvh bg-bg-base flex overflow-y-auto">
      <div className="m-auto w-full max-w-md px-6 py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BuddyAvatar state="happy" size={96} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">DeutschBuddy</p>
          <h1 className="text-[26px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Gleich geschafft! 📬
          </h1>
          <p className="text-text-muted text-sm">
            Almost there. We just need to verify your email.
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <IconMail className="w-5 h-5 text-gold" />
            </div>
            <p className="text-sm text-text-body leading-relaxed pt-1">
              We sent a confirmation link to{' '}
              <strong className="text-text-dark break-all">{email}</strong>. Open it to activate
              your account, then come back and sign in.
            </p>
          </div>

          <div className="rounded-xl bg-bg-secondary border border-border p-3.5 mb-5 text-[13px] text-text-muted leading-relaxed">
            No email yet? Check your spam or junk folder, and allow a minute. Some providers are
            slower than others.
          </div>

          {resendError && (
            <div role="alert" className="bg-error/10 border border-error/20 p-3 mb-5 text-sm text-error font-medium rounded-lg">
              {resendError}
            </div>
          )}

          <button
            type="button"
            onClick={handleResend}
            disabled={!email || resending || cooldown > 0}
            className="w-full p-4 rounded-xl bg-gold text-bg-primary font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <IconRefresh className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
            {cooldown > 0 ? `Resend available in ${cooldown}s` : resending ? 'Sending...' : 'Resend email'}
          </button>

          <Link
            to="/login"
            className="block w-full mt-3 p-3.5 rounded-xl bg-bg-primary border border-border text-text-body font-semibold text-center hover:border-gold/50 hover:bg-bg-secondary transition-all"
          >
            I've verified my email. Continue to sign in
          </Link>

          <p className="text-center mt-6 text-sm text-text-muted">
            Typed the wrong address?{' '}
            <Link to="/signup" className="font-semibold text-gold hover:underline">Sign up again</Link>
          </p>
        </div>
      </div>
    </div>
  );
}