import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

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
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-zinc-950">
        <div className="max-w-md w-full text-center p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="text-6xl mb-6" aria-hidden="true">📧</div>
          <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Check your email</h1>
          <p className="text-zinc-400 mb-6 text-sm">We sent a password reset link to <strong className="text-zinc-200">{email}</strong>.</p>
          <Link to="/login" className="inline-block px-6 py-3 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-400/20 text-sm">Back to Sign In</Link>
        </div>
        <div className="mt-8"><Footer /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-zinc-950">
      <div className="max-w-md w-full">
        <div className="mb-6"><Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">&larr; Back to sign in</Link></div>
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Reset your password</h1>
          <p className="text-zinc-400 mb-6 text-sm">Enter your email and we'll send you a reset link.</p>
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400" role="alert">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-zinc-400 mb-1.5">Email</label>
              <input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="name@example.com" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2">
              {loading ? (<><Spinner /> Sending...</>) : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8"><Footer /></div>
    </div>
  );
}
