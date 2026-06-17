import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => { if (!searchParams.get('code')) setError('Invalid or expired reset link.'); }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try { await updatePassword(password); setSuccess(true); setTimeout(() => navigate('/dashboard'), 3000); }
    catch (err) { setError(err.message || 'Failed to update password.'); }
    finally { setLoading(false); }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'linear-gradient(to top right, #131A2E, #111827, #1A1A32)' }}>
        <div className="max-w-md w-full text-center glass-card p-8">
          <div className="text-6xl mb-6" aria-hidden="true">✅</div>
          <h1 className="text-2xl font-bold text-slate-100 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Password updated</h1>
          <p className="text-slate-400 text-sm">Redirecting you to the dashboard...</p>
        </div>
        <div className="mt-8"><Footer /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'linear-gradient(to top right, #131A2E, #111827, #1A1A32)' }}>
      <div className="max-w-md w-full">
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold text-slate-100 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Set new password</h1>
          <p className="text-slate-400 mb-6 text-sm">Choose a strong new password.</p>
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400" role="alert">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-slate-300 mb-1.5">New Password</label>
              <input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-4 py-3 bg-slate-950/40 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500/80 transition text-sm"
                placeholder="At least 6 characters" />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
              <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                className="w-full px-4 py-3 bg-slate-950/40 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500/80 transition text-sm"
                placeholder="Re-enter your password" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8"><Footer /></div>
    </div>
  );
}
