import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

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
    try { await signIn(email, password); navigate('/dashboard'); }
    catch (err) { setError(err.message || 'Failed to sign in.'); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(to top right, #131A2E, #111827, #1A1A32)' }}>
      <div className="flex-1 flex">
        {/* Left: Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(37, 99, 235, 0.1), transparent), radial-gradient(ellipse 50% 40% at 70% 60%, rgba(225, 29, 72, 0.06), transparent)' }} />
          <div className="absolute top-16 left-16 text-[100px] font-black text-white/[0.03]">A1</div>
          <div className="absolute bottom-16 right-16 text-[100px] font-black text-white/[0.03]">A2</div>

          <div className="relative z-10 px-16 max-w-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">🇩🇪</div>
              <div>
                <span className="text-3xl font-extrabold text-slate-100 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
                <span className="text-3xl font-extrabold text-blue-400 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-slate-100 mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Learn German.<br />
              <span className="text-blue-400 text-glow-blue">Your way.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-10">
              A gamified, interactive course from A1 to A2. Track your progress, earn XP, and master German with daily practice.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '8', label: 'Weeks per level' },
                { value: '200+', label: 'Exercises' },
                { value: '4', label: 'Skill areas' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/[0.03] border border-slate-700/40 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-slate-200">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form (low-opacity glass) */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white/[0.01] backdrop-blur-lg border-l border-white/[0.05]">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-lg backdrop-blur-sm">🇩🇪</div>
                <span className="text-2xl font-extrabold text-slate-100" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
                <span className="text-2xl font-extrabold text-blue-400" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-100 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome!</h2>
            <p className="text-slate-500 mb-8 text-sm">Sign in to continue your German journey</p>

            {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-700/80 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500/80 transition text-sm"
                  placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-700/80 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500/80 transition text-sm"
                  placeholder="Your password" />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-500">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-950/40 text-blue-500 focus:ring-blue-500/50" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 font-medium">Forgot password?</Link>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold">Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
