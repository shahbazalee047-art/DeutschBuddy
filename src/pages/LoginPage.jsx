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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
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
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-[#B8860B] to-[#D4A843] rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-[#B8860B]/20">🇩🇪</div>
            <div>
              <span className="text-2xl font-extrabold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
              <span className="text-2xl font-extrabold text-[#B8860B]" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>Welcome!</h1>
          <p className="text-[#8A8A9A] mb-8" style={{ fontSize: '16px', lineHeight: '1.5' }}>Sign in to continue your German journey</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-[#F44336]">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-[#8A8A9A] mb-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="paper-input w-full" placeholder="name@example.com" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#8A8A9A] mb-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="paper-input w-full pr-12" placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A9A] hover:text-[#4A4A5A] transition">
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[#4A4A5A] cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#E8E0D4] accent-[#B8860B]" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-[#2D8B7A] hover:text-[#248F6D] font-semibold transition">Forgot password?</Link>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (<><Spinner /> Signing in...</>) : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#8A8A9A]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#2D8B7A] hover:text-[#248F6D] font-semibold transition">Sign up free</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
