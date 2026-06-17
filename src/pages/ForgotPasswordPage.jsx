import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try { await resetPassword(email); setSent(true); }
    catch (err) { setError(err.message || 'Failed to send reset email.'); }
    finally { setLoading(false); }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'linear-gradient(to top right, #131A2E, #111827, #1A1A32)' }}>
        <div className="max-w-md w-full text-center glass-card p-8">
          <div className="text-6xl mb-6" aria-hidden="true">📧</div>
          <h1 className="text-2xl font-bold text-slate-100 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Check your email</h1>
          <p className="text-slate-400 mb-6 text-sm">We sent a password reset link to <strong className="text-slate-200">{email}</strong>.</p>
          <Link to="/login" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition text-sm shadow-lg shadow-blue-500/20">Back to Sign In</Link>
        </div>
        <div className="mt-8"><Footer /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'linear-gradient(to top right, #131A2E, #111827, #1A1A32)' }}>
      <div className="max-w-md w-full">
        <div className="mb-6"><Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium text-sm">&larr; Back to sign in</Link></div>
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold text-slate-100 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Reset your password</h1>
          <p className="text-slate-400 mb-6 text-sm">Enter your email and we'll send you a reset link.</p>
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400" role="alert">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 bg-slate-950/40 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500/80 transition text-sm"
                placeholder="you@example.com" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8"><Footer /></div>
    </div>
  );
}
