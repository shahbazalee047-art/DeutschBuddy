import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try { await signUp(email, password, fullName); setSuccess(true); }
    catch (err) { setError(err.message || 'Failed to create account.'); }
    finally { setLoading(false); }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'linear-gradient(to top right, #131A2E, #111827, #1A1A32)' }}>
        <div className="max-w-md w-full text-center glass-card p-8">
          <div className="text-6xl mb-6" aria-hidden="true">📬</div>
          <h1 className="text-2xl font-bold text-slate-100 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Check your email</h1>
          <p className="text-slate-400 mb-6 text-sm">We sent a confirmation link to <strong className="text-slate-200">{email}</strong>. Please verify to continue.</p>
          <Link to="/login" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition text-sm shadow-lg shadow-blue-500/20">Go to Sign In</Link>
        </div>
        <div className="mt-8"><Footer /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(to top right, #131A2E, #111827, #1A1A32)' }}>
      <div className="flex-1 flex">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(37, 99, 235, 0.1), transparent), radial-gradient(ellipse 50% 40% at 70% 60%, rgba(225, 29, 72, 0.06), transparent)' }} aria-hidden="true" />
          <div className="absolute top-20 right-20 text-[100px] font-black text-white/[0.03]" aria-hidden="true">🇩🇪</div>

          <div className="relative z-10 px-16 max-w-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm" aria-hidden="true">🇩🇪</div>
              <div>
                <span className="text-3xl font-extrabold text-slate-100 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
                <span className="text-3xl font-extrabold text-blue-400 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-100 mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Start your journey.<br /><span className="text-slate-400">It's free.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              Join thousands of learners mastering German from A1 to A2 with interactive exercises, gamification, and structured weekly plans.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.03] border border-slate-700/40 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                <div className="text-xl font-bold text-slate-100">Gamified</div>
                <div className="text-xs text-slate-300 mt-0.5">XP, streaks, badges</div>
              </div>
              <div className="bg-white/[0.03] border border-slate-700/40 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                <div className="text-xl font-bold text-slate-100">Flexible</div>
                <div className="text-xs text-slate-300 mt-0.5">Your pace</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white/[0.01] backdrop-blur-lg border-l border-white/[0.05]">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-lg backdrop-blur-sm" aria-hidden="true">🇩🇪</div>
                <span className="text-2xl font-extrabold text-slate-100" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
                <span className="text-2xl font-extrabold text-blue-400" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Create your account</h1>
            <p className="text-slate-400 mb-8 text-sm">Start learning German today</p>
            {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400" role="alert">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                <input id="signup-name" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500/80 transition text-sm"
                  placeholder="Max Mustermann" />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                <input id="signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500/80 transition text-sm"
                  placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                <input id="signup-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500/80 transition text-sm"
                  placeholder="At least 6 characters" />
              </div>
              <div>
                <label htmlFor="signup-confirm" className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
                <input id="signup-confirm" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500/80 transition text-sm"
                  placeholder="Re-enter your password" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-slate-300">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
