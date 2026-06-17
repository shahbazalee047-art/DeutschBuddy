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

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="flex-1 flex">
        {/* Left: Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] via-transparent to-sky-500/[0.03]" />
          </div>
          <div className="absolute top-16 left-16 text-[100px] font-black text-slate-800/50 select-none" aria-hidden="true">A1</div>
          <div className="absolute bottom-16 right-16 text-[100px] font-black text-slate-800/50 select-none" aria-hidden="true">A2</div>

          <div className="relative z-10 px-16 max-w-lg">
            {/* Brand Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-2xl" aria-hidden="true">🇩🇪</div>
              <div>
                <span className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
                <span className="text-3xl font-extrabold text-amber-400 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Learn German.<br />
              <span className="text-amber-400">Your way.</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-300 leading-relaxed mb-10">
              A gamified, interactive course from A1 to A2. Track your progress, earn XP, and master German with daily practice.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '8', label: 'Weeks per level' },
                { value: '200+', label: 'Exercises' },
                { value: '4', label: 'Skill areas' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-4 text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-lg" aria-hidden="true">🇩🇪</div>
                <span className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
                <span className="text-2xl font-extrabold text-amber-400" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome!</h2>
            <p className="text-slate-400 mb-8 text-sm">Sign in to continue your German journey</p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400" role="alert">
                {error}
              </div>
            )}

            {/* Social Login */}
            <button
              type="button"
              className="w-full py-3 bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-3 mb-4"
            >
              <GoogleIcon />
              Sign in with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-slate-700/50" />
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-slate-700/50" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-12 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800/50 text-amber-500 focus:ring-amber-400/50 focus:ring-offset-0" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-sm text-sky-400 hover:text-sky-300 font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
              >
                {loading ? (<><Spinner /> Signing in...</>) : 'Sign In'}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-slate-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors">Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
