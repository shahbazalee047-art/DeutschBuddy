import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signUp(email, password, fullName);
      navigate('/login');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
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

          <h1 className="text-3xl font-bold text-zinc-100 mb-2 text-center" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>Create your account</h1>
          <p className="text-zinc-500 text-center mb-8" style={{ fontSize: '16px' }}>Start your German learning journey</p>

          <div className="rounded-2xl p-8 border border-zinc-700" style={{ background: '#20202A' }}>
            {error && <div className="bg-error/10 border border-error/20 rounded-xl p-3 mb-5 text-sm text-error font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[13px] font-semibold text-zinc-300 mb-1.5 block">Full Name</label>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="Your name" className="paper-input w-full" />
              </div>
              <div>
                <label className="text-[13px] font-semibold text-zinc-300 mb-1.5 block">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="paper-input w-full" />
              </div>
              <div>
                <label className="text-[13px] font-semibold text-zinc-300 mb-1.5 block">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="Min. 6 characters" className="paper-input w-full" />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Creating account...' : 'Sign Up'}</button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-[14px] text-zinc-500">Already have an account? </span>
              <Link to="/login" className="text-[14px] font-semibold text-lime-400 hover:text-lime-300 transition">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
