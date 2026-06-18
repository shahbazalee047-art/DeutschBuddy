import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IconCheck } from '../components/Icons';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updatePassword(password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-forest-900">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-sage-400/20" style={{ background: 'rgba(127, 176, 105, 0.1)' }}><IconCheck className="w-8 h-8 text-sage-400" /></div>
          <h1 className="text-3xl font-bold text-cream-100 mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Password updated!</h1>
          <p className="text-cream-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-forest-900">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-sage-400 to-amber-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-sage-400/20">🇩🇪</div>
            <div>
              <span className="text-2xl font-extrabold text-cream-100" style={{ fontFamily: 'DM Serif Display, serif' }}>Deutsch</span>
              <span className="text-2xl font-extrabold text-sage-400" style={{ fontFamily: 'DM Serif Display, serif' }}>Buddy</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-cream-100 mb-2 text-center" style={{ fontFamily: 'DM Serif Display, serif', letterSpacing: '-0.5px' }}>Set new password</h1>
          <p className="text-cream-500 text-center mb-8" style={{ fontSize: '16px' }}>Enter your new password below</p>

          <div className="rounded-2xl p-8 border border-border bg-card">
            {error && <div className="bg-error/10 border border-error/20 rounded-xl p-3 mb-5 text-sm text-error font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[13px] font-semibold text-cream-300 mb-1.5 block">New Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="Min. 6 characters" className="paper-input w-full" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Updating...' : 'Update Password'}</button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-[14px] font-semibold text-sky-400 hover:text-sky-300 transition">← Back to login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
