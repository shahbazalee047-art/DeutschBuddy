import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BuddyAvatar } from '../components/buddy';
import { IconMail } from '../components/Icons';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  if (success) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-bg-base">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-4">
            <BuddyAvatar state="happy" size={88} />
          </div>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 border border-gold/20 bg-gold/10">
            <IconMail className="w-7 h-7 text-gold" />
          </div>
          <h1 className="text-3xl font-bold text-text-dark mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Check your email</h1>
          <p className="text-text-muted mb-6 leading-relaxed" style={{ fontSize: '16px' }}>
            We've sent a password reset link to <strong className="text-text-dark">{email}</strong>
          </p>
          <Link to="/login" className="text-gold hover:text-gold-light font-semibold transition">Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bg-base flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BuddyAvatar state="thinking" size={88} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">DeutschBuddy</p>
          <h1 className="text-[26px] font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Reset your password
          </h1>
          <p className="text-text-muted text-sm">
            Enter your email and we'll send you a reset link.
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
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-text-muted mb-1.5" htmlFor="forgot-email">Email</label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-body placeholder:text-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 rounded-xl bg-gold text-bg-primary font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending reset email...' : 'Send Reset Link'}
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
