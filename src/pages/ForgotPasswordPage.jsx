import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';
function Spinner() { return (<svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>); }

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try { await resetPassword(email); setSent(true); }
    catch (err) { setError(err.message || 'Failed to send reset email.'); }
    finally { setLoading(false); }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6F0] px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#FFF8E1] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">📧</div>
          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Check your email</h1>
          <p className="text-[#8A8A9A] mb-8" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            We've sent a password reset link to <strong className="text-[#1A1A2E]">{email}</strong>
          </p>
          <Link to="/login" className="btn-primary inline-block px-8">Back to Sign In</Link>
        </div>
        <div className="mt-8"><Footer /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/login" className="text-sm text-[#2D8B7A] hover:text-[#248F6D] font-semibold transition mb-8 inline-block">
            &larr; Back to sign in
          </Link>

          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Reset your password</h1>
          <p className="text-[#8A8A9A] mb-8" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Enter your email and we'll send you a reset link.
          </p>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-[#F44336]">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-[#8A8A9A] mb-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="paper-input w-full" placeholder="name@example.com" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (<><Spinner /> Sending...</>) : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
