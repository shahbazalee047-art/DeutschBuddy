import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

function EyeIcon({ open }) {
  if (open) return (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>);
  return (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
}
function Spinner() { return (<svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>); }

export default function LoginPage() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [showPassword, setShowPassword] = useState(false); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  const { signIn } = useAuth(); const navigate = useNavigate();
  async function handleSubmit(e) { e.preventDefault(); setError(''); setLoading(true); try { await signIn(email, password); navigate('/dashboard'); } catch (err) { setError(err.message || 'Failed to sign in.'); } finally { setLoading(false); } }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #020617 100%)' }}>
      <div className="flex-1 flex">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0" aria-hidden="true"><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,204,0,0.03) 0%, transparent 50%, rgba(221,0,0,0.02) 100%)' }} /></div>
          <div className="absolute top-16 left-16 text-[100px] font-black select-none" aria-hidden="true" style={{ color: 'rgba(30,41,59,0.5)' }}>A1</div>
          <div className="absolute bottom-16 right-16 text-[100px] font-black select-none" aria-hidden="true" style={{ color: 'rgba(30,41,59,0.5)' }}>A2</div>
          <div className="relative z-10 px-16 max-w-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" aria-hidden="true" style={{ background: 'rgba(255,204,0,0.1)', border: '1px solid rgba(255,204,0,0.2)' }}>🇩🇪</div>
              <div><span className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span><span className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif', color: '#FFCC00' }}>Buddy</span></div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Learn German.<br /><span style={{ color: '#FFCC00' }}>Your way.</span></h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-10">A gamified, interactive course from A1 to A2. Track your progress, earn XP, and master German with daily practice.</p>
            <div className="grid grid-cols-3 gap-3">
              {[{ value: '8', label: 'Weeks per level' }, { value: '200+', label: 'Exercises' }, { value: '4', label: 'Skill areas' }].map((stat, i) => (
                <div key={i} className="bg-slate-800/80 border border-slate-700/50 rounded-2xl px-4 py-4 text-center"><div className="text-2xl font-bold text-white">{stat.value}</div><div className="text-xs text-slate-400 mt-0.5">{stat.label}</div></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8"><div className="flex items-center gap-2"><div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" aria-hidden="true" style={{ background: 'rgba(255,204,0,0.1)', border: '1px solid rgba(255,204,0,0.2)' }}>🇩🇪</div><span className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span><span className="text-2xl font-extrabold" style={{ fontFamily: 'Poppins, sans-serif', color: '#FFCC00' }}>Buddy</span></div></div>
            <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome!</h2>
            <p className="text-slate-400 mb-8 text-sm">Sign in to continue your German journey</p>
            {error && <div className="mb-4 p-3 rounded-xl text-sm text-red-400" style={{ background: 'rgba(221,0,0,0.1)', border: '1px solid rgba(221,0,0,0.2)' }} role="alert">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div><label htmlFor="login-email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label><input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all duration-200 text-sm" placeholder="name@example.com" /></div>
              <div><label htmlFor="login-password" className="block text-sm font-medium text-slate-300 mb-1.5">Password</label><div className="relative"><input id="login-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 pr-12 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all duration-200 text-sm" placeholder="••••••••" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition" aria-label={showPassword ? 'Hide password' : 'Show password'}><EyeIcon open={showPassword} /></button></div></div>
              <div className="flex items-center justify-between"><label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900/50 focus:ring-[#FFCC00]/50" style={{ accentColor: '#FFCC00' }} />Remember me</label><Link to="/forgot-password" className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors">Forgot password?</Link></div>
              <button type="submit" disabled={loading} className="w-full py-3.5 text-black font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2" style={{ background: '#FFCC00', boxShadow: '0 4px 15px rgba(255,204,0,0.3)' }}>{loading ? (<><Spinner /> Signing in...</>) : 'Sign In'}</button>
            </form>
            <p className="mt-8 text-center text-sm text-slate-400">Don't have an account? <Link to="/signup" className="text-red-400 hover:text-red-300 font-semibold transition-colors">Sign up free</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
