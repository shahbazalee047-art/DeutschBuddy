import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IconCheck } from '../components/Icons';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updatePassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

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
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-bg-dark">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20" style={{ background: 'rgba(232,163,61,0.1)' }}><IconCheck className="w-8 h-8 text-gold" /></div>
          <h1 className="text-3xl font-bold text-text-on-dark mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Password updated!</h1>
          <p className="text-text-on-dark-muted">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-dark">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gold flex items-center justify-center text-2xl text-text-on-dark shadow-lg shadow-gold/20">DB</div>
            <div>
              <span className="text-2xl font-extrabold text-text-on-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Deutsch</span>
              <span className="text-2xl font-extrabold text-gold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Buddy</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-text-on-dark mb-2 text-center" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.5px' }}>Set new password</h1>
          <p className="text-text-on-dark-muted text-center mb-8" style={{ fontSize: '16px' }}>Enter your new password below</p>

          <div className="p-8 border border-border bg-bg-white">
            {error && <div className="bg-error/10 border border-error/20 p-3 mb-5 text-sm text-error font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[13px] font-semibold text-text-body mb-1.5 block">New Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="Min. 6 characters" className="paper-input w-full" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Updating...' : 'Update Password'}</button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-[14px] font-semibold text-gold hover:text-gold-light transition">← Back to login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
