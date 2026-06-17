import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try { await resetPassword(email); setSuccess(true); }
    catch (err) { setError(err.message); } finally { setLoading(false); }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#18181B' }}>
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 border border-lime-500/20" style={{ background: 'rgba(163, 230, 53, 0.1)' }}>✉️</div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Check your email</h1>
          <p className="text-zinc-400 mb-6" style={{ fontSize: '16px', lineHeight: '1.6' }}>We've sent a password reset link to <strong className="text-zinc-200">{email}</strong></p>
          <Link to="/login" className="text-lime-400 hover:text-lime-300 font-semibold transition">Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#18181B' }}>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-lime-500/20">🇩🇪</div>
            <div>
              <span className="text-2xl font-extrabold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
              <span className="text-2xl font-extrabold text-lime-400" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-zinc-100 mb-2 text-center" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>Reset password</h1>
          <p className="text-zinc-500 text-center mb-8" style={{ fontSize: '16px' }}>Enter your email and we'll send you a reset link</p>

          <div className="rounded-2xl p-8 border border-zinc-700" style={{ background: '#20202A' }}>
            {error && <div className="bg-error/10 border border-error/20 rounded-xl p-3 mb-5 text-sm text-error font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[13px] font-semibold text-zinc-300 mb-1.5 block">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="paper-input w-full" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Sending...' : 'Send Reset Link'}</button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-[14px] font-semibold text-cyan-400 hover:text-cyan-300 transition">← Back to login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
