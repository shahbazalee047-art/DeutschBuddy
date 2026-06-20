import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) { setError(err.message); } finally { setLoading(false); }
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

          <h1 className="text-3xl font-bold text-text-on-dark mb-2 text-center" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.5px' }}>Welcome back!</h1>
          <p className="text-text-on-dark-muted text-center mb-8" style={{ fontSize: '16px' }}>Continue your German learning journey</p>

          <div className="p-8 border border-border bg-bg-white">
            {error && <div className="bg-error/10 border border-error/20 p-3 mb-5 text-sm text-error font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[13px] font-semibold text-text-body mb-1.5 block">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="paper-input w-full" />
              </div>
              <div>
                <label className="text-[13px] font-semibold text-text-body mb-1.5 block">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" className="paper-input w-full" />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-cream-500" style={{ accentColor: 'var(--gold)' }} />
                  <span className="text-[13px] text-text-muted">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-[13px] font-medium text-gold hover:text-gold-light transition">Forgot password?</Link>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Signing in...' : 'Sign In'}</button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-[14px] text-text-muted">Don't have an account? </span>
              <Link to="/signup" className="text-[14px] font-semibold text-gold hover:text-gold-light transition">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
