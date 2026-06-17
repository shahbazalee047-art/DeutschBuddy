import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';
function EyeIcon({ o }) {
  if (o) return (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>);
  return (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
}
function Spinner() { return (<svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>); }
export default function LoginPage() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [showPw, setShowPw] = useState(false); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  const { signIn } = useAuth(); const navigate = useNavigate();
  async function handleSubmit(e) { e.preventDefault(); setError(''); setLoading(true); try { await signIn(email, password); navigate('/dashboard'); } catch (err) { setError(err.message || 'Failed.'); } finally { setLoading(false); } }

  return (
    <div className="min-h-screen flex bg-[#FAF5ED]">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8DFD4 0%, #F5EFE6 50%, #FAF5ED 100%)' }}>
        <div className="absolute top-16 left-16 text-[100px] font-black select-none" style={{ color: 'rgba(139,105,20,0.06)' }}>A1</div>
        <div className="absolute bottom-16 right-16 text-[100px] font-black select-none" style={{ color: 'rgba(139,105,20,0.06)' }}>A2</div>
        <div className="relative z-10 px-16 max-w-lg">
          <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 bg-white/60 border border-white/80 rounded-2xl flex items-center justify-center text-2xl shadow-sm">🇩🇪</div><div><span className="text-3xl font-extrabold text-[#1a1a2e] tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span><span className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif', color: '#8B6914' }}>Buddy</span></div></div>
          <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Learn German.<br /><span style={{ color: '#8B6914' }}>Your way.</span></h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-10">A gamified, interactive course from A1 to A2. Track your progress, earn XP, and master German with daily practice.</p>
          <div className="grid grid-cols-3 gap-3">
            {[{ v: '8', l: 'Weeks per level' }, { v: '200+', l: 'Exercises' }, { v: '4', l: 'Skill areas' }].map((s, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl px-4 py-4 text-center shadow-sm"><div className="text-2xl font-bold text-[#1a1a2e]">{s.v}</div><div className="text-xs text-[#6b7280] mt-0.5">{s.l}</div></div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#FAF5ED]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><div className="flex items-center gap-2"><div className="w-10 h-10 bg-[#F5EFE6] border border-[#E8DFD4] rounded-xl flex items-center justify-center text-lg shadow-sm">🇩🇪</div><span className="text-2xl font-extrabold text-[#1a1a2e]" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span><span className="text-2xl font-extrabold" style={{ fontFamily: 'Poppins, sans-serif', color: '#8B6914' }}>Buddy</span></div></div>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome!</h2>
          <p className="text-[#9ca3af] mb-8 text-sm">Sign in to continue your German journey</p>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><label className="block text-sm font-medium text-[#4a5568] mb-1.5">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 paper-input text-[#1a1a2e] placeholder-[#9ca3af] text-sm" placeholder="name@example.com" /></div>
            <div><label className="block text-sm font-medium text-[#4a5568] mb-1.5">Password</label><div className="relative"><input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 pr-12 paper-input text-[#1a1a2e] placeholder-[#9ca3af] text-sm" placeholder="••••••••" /><button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9ca3af] hover:text-[#4a5568] transition" aria-label={showPw ? 'Hide' : 'Show'}><EyeIcon o={showPw} /></button></div></div>
            <div className="flex items-center justify-between"><label className="flex items-center gap-2 text-sm text-[#6b7280] cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-[#E8DFD4]" style={{ accentColor: '#8B6914' }} />Remember me</label><Link to="/forgot-password" className="text-sm text-[#5B8C7A] hover:text-[#4a7a6a] font-medium transition">Forgot password?</Link></div>
            <button type="submit" disabled={loading} className="w-full py-3.5 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)', boxShadow: '0 4px 15px rgba(139,105,20,0.25)' }}>{loading ? (<><Spinner /> Signing in...</>) : 'Sign In'}</button>
          </form>
          <p className="mt-8 text-center text-sm text-[#9ca3af]">Don't have an account? <Link to="/signup" className="text-[#5B8C7A] hover:text-[#4a7a6a] font-semibold transition">Sign up free</Link></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
