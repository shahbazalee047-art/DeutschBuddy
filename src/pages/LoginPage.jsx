import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <div className="flex-1 flex">
        {/* Left: Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/[0.03] via-transparent to-cyan-400/[0.03]" />
          </div>
          <div className="absolute top-16 left-16 text-[100px] font-black text-zinc-800/50 select-none" aria-hidden="true">A1</div>
          <div className="absolute bottom-16 right-16 text-[100px] font-black text-zinc-800/50 select-none" aria-hidden="true">A2</div>

          <div className="relative z-10 px-16 max-w-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-lime-400/10 border border-lime-400/20 rounded-2xl flex items-center justify-center text-2xl" aria-hidden="true">🇩🇪</div>
              <div>
                <span className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
                <span className="text-3xl font-extrabold text-lime-400 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Learn German.<br />
              <span className="text-lime-400">Your way.</span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed mb-10">
              A gamified, interactive course from A1 to A2. Track your progress, earn XP, and master German with daily practice.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '8', label: 'Weeks per level' },
                { value: '200+', label: 'Exercises' },
                { value: '4', label: 'Skill areas' },
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-lime-400/10 border border-lime-400/20 rounded-xl flex items-center justify-center text-lg" aria-hidden="true">🇩🇪</div>
                <span className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
                <span className="text-2xl font-extrabold text-lime-400" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome!</h2>
            <p className="text-zinc-400 mb-8 text-sm">Sign in to continue your German journey</p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-zinc-400 mb-1.5">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-zinc-400 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-12 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-zinc-500 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-lime-400 focus:ring-lime-400/50" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
              >
                {loading ? (<><Spinner /> Signing in...</>) : 'Sign In'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-zinc-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
