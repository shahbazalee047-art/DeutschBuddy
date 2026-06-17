import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

function Spinner() { return (<svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>); }

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
    e.preventDefault(); setError('');
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try { await signUp(email, password, fullName); setSuccess(true); }
    catch (err) { setError(err.message || 'Failed to create account.'); }
    finally { setLoading(false); }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #020617 100%)' }}>
        <div className="max-w-md w-full text-center p-8 bg-slate-800 border border-slate-700/50 rounded-2xl">
          <div className="text-6xl mb-6" aria-hidden="true">📬</div>
          <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Check your email</h1>
          <p className="text-slate-400 mb-6 text-sm">We sent a confirmation link to <strong className="text-slate-200">{email}</strong>. Please verify to continue.</p>
          <Link to="/login" className="inline-block px-6 py-3 bg-lime-400 hover:bg-lime-300 text-slate-900 font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-lime-400/25 text-sm">Go to Sign In</Link>
        </div>
        <div className="mt-8"><Footer /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #020617 100%)' }}>
      <div className="flex-1 flex">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0" aria-hidden="true"><div className="absolute inset-0 bg-gradient-to-br from-lime-400/[0.04] via-transparent to-purple-400/[0.03]" /></div>
          <div className="absolute top-20 right-20 text-[100px] font-black text-slate-800/50 select-none" aria-hidden="true">🇩🇪</div>
          <div className="relative z-10 px-16 max-w-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-lime-400/10 border border-lime-400/20 rounded-2xl flex items-center justify-center text-2xl" aria-hidden="true">🇩🇪</div>
              <div><span className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span><span className="text-3xl font-extrabold text-lime-400 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span></div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Start your journey.<br /><span className="text-slate-400">It's free.</span></h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-10">Join thousands of learners mastering German from A1 to A2 with interactive exercises, gamification, and structured weekly plans.</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl px-4 py-4 text-center"><div className="text-xl font-bold text-white">Gamified</div><div className="text-xs text-slate-400 mt-0.5">XP, streaks, badges</div></div>
              <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl px-4 py-4 text-center"><div className="text-xl font-bold text-white">Flexible</div><div className="text-xs text-slate-400 mt-0.5">Your pace</div></div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8"><div className="flex items-center gap-2"><div className="w-10 h-10 bg-lime-400/10 border border-lime-400/20 rounded-xl flex items-center justify-center text-lg" aria-hidden="true">🇩🇪</div><span className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span><span className="text-2xl font-extrabold text-lime-400" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span></div></div>
            <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Create your account</h2>
            <p className="text-slate-400 mb-8 text-sm">Start learning German today</p>
            {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400" role="alert">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div><label htmlFor="signup-name" className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label><input id="signup-name" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-sm" placeholder="Max Mustermann" /></div>
              <div><label htmlFor="signup-email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label><input id="signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-sm" placeholder="name@example.com" /></div>
              <div><label htmlFor="signup-password" className="block text-sm font-medium text-slate-300 mb-1.5">Password</label><input id="signup-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-sm" placeholder="••••••••" /></div>
              <div><label htmlFor="signup-confirm" className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label><input id="signup-confirm" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-sm" placeholder="••••••••" /></div>
              <button type="submit" disabled={loading} className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-slate-900 font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-lime-400/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2">
                {loading ? (<><Spinner /> Creating account...</>) : 'Create Account'}
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-slate-400">Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">Sign in</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
