import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';
function Spinner() { return (<svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>); }
export default function SignupPage() {
  const [fullName, setFullName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [confirmPassword, setConfirmPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  async function handleSubmit(e) { e.preventDefault(); setError(''); if (password !== confirmPassword) { setError('Passwords do not match.'); return; } if (password.length < 6) { setError('Password must be at least 6 characters.'); return; } setLoading(true); try { await signUp(email, password, fullName); setSuccess(true); } catch (err) { setError(err.message || 'Failed.'); } finally { setLoading(false); } }

  if (success) return (<div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#FAF5ED]"><div className="max-w-md w-full text-center p-8 bg-white border border-[#E8DFD4] rounded-2xl shadow-sm"><div className="text-6xl mb-6">📬</div><h1 className="text-2xl font-bold text-[#1a1a2e] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Check your email</h1><p className="text-[#6b7280] mb-6 text-sm">We sent a confirmation link to <strong className="text-[#1a1a2e]">{email}</strong>. Please verify to continue.</p><Link to="/login" className="inline-block px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] text-sm" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Go to Sign In</Link></div><div className="mt-8"><Footer /></div></div>);

  return (
    <div className="min-h-screen flex bg-[#FAF5ED]">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8DFD4 0%, #F5EFE6 50%, #FAF5ED 100%)' }}>
        <div className="absolute top-20 right-20 text-[100px] font-black select-none" style={{ color: 'rgba(139,105,20,0.06)' }}>🇩🇪</div>
        <div className="relative z-10 px-16 max-w-lg">
          <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 bg-white/60 border border-white/80 rounded-2xl flex items-center justify-center text-2xl shadow-sm">🇩🇪</div><div><span className="text-3xl font-extrabold text-[#1a1a2e] tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span><span className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif', color: '#8B6914' }}>Buddy</span></div></div>
          <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Start your journey.<br /><span className="text-[#6b7280]">It's free.</span></h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-10">Join thousands of learners mastering German from A1 to A2 with interactive exercises, gamification, and structured weekly plans.</p>
          <div className="grid grid-cols-2 gap-3"><div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl px-4 py-4 text-center shadow-sm"><div className="text-xl font-bold text-[#1a1a2e]">Gamified</div><div className="text-xs text-[#6b7280] mt-0.5">XP, streaks, badges</div></div><div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl px-4 py-4 text-center shadow-sm"><div className="text-xl font-bold text-[#1a1a2e]">Flexible</div><div className="text-xs text-[#6b7280] mt-0.5">Your pace</div></div></div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#FAF5ED]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><div className="flex items-center gap-2"><div className="w-10 h-10 bg-[#F5EFE6] border border-[#E8DFD4] rounded-xl flex items-center justify-center text-lg shadow-sm">🇩🇪</div><span className="text-2xl font-extrabold text-[#1a1a2e]" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span><span className="text-2xl font-extrabold" style={{ fontFamily: 'Poppins, sans-serif', color: '#8B6914' }}>Buddy</span></div></div>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Create your account</h2>
          <p className="text-[#9ca3af] mb-8 text-sm">Start learning German today</p>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><label className="block text-sm font-medium text-[#4a5568] mb-1.5">Full Name</label><input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full px-4 py-3 paper-input text-[#1a1a2e] placeholder-[#9ca3af] text-sm" placeholder="Max Mustermann" /></div>
            <div><label className="block text-sm font-medium text-[#4a5568] mb-1.5">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 paper-input text-[#1a1a2e] placeholder-[#9ca3af] text-sm" placeholder="name@example.com" /></div>
            <div><label className="block text-sm font-medium text-[#4a5568] mb-1.5">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 paper-input text-[#1a1a2e] placeholder-[#9ca3af] text-sm" placeholder="••••••••" /></div>
            <div><label className="block text-sm font-medium text-[#4a5568] mb-1.5">Confirm Password</label><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-4 py-3 paper-input text-[#1a1a2e] placeholder-[#9ca3af] text-sm" placeholder="••••••••" /></div>
            <button type="submit" disabled={loading} className="w-full py-3.5 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)', boxShadow: '0 4px 15px rgba(139,105,20,0.25)' }}>{loading ? (<><Spinner /> Creating account...</>) : 'Create Account'}</button>
          </form>
          <p className="mt-8 text-center text-sm text-[#9ca3af]">Already have an account? <Link to="/login" className="text-[#5B8C7A] hover:text-[#4a7a6a] font-semibold transition">Sign in</Link></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
