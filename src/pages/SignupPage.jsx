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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6F0] px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#FFF8E1] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">📬</div>
          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Check your email</h1>
          <p className="text-[#8A8A9A] mb-8" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            We've sent a confirmation link to <strong className="text-[#1A1A2E]">{email}</strong>. Please verify to continue.
          </p>
          <Link to="/login" className="btn-primary inline-block px-8">Go to Sign In</Link>
        </div>
        <div className="mt-8"><Footer /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-[#B8860B] to-[#D4A843] rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-[#B8860B]/20">🇩🇪</div>
            <div>
              <span className="text-2xl font-extrabold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Deutsch</span>
              <span className="text-2xl font-extrabold text-[#B8860B]" style={{ fontFamily: 'Poppins, sans-serif' }}>Buddy</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>Create your account</h1>
          <p className="text-[#8A8A9A] mb-8" style={{ fontSize: '16px', lineHeight: '1.5' }}>Start learning German today</p>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-[#F44336]">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-[#8A8A9A] mb-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Full Name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="paper-input w-full" placeholder="Max Mustermann" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#8A8A9A] mb-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="paper-input w-full" placeholder="name@example.com" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#8A8A9A] mb-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="paper-input w-full" placeholder="At least 6 characters" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#8A8A9A] mb-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="paper-input w-full" placeholder="Re-enter your password" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (<><Spinner /> Creating account...</>) : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#8A8A9A]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2D8B7A] hover:text-[#248F6D] font-semibold transition">Sign in</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
