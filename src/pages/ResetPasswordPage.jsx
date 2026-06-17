import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';
function Spinner() { return (<svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>); }

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => { if (!searchParams.get('code')) setError('Invalid or expired reset link.'); }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try { await updatePassword(password); setSuccess(true); setTimeout(() => navigate('/dashboard'), 3000); }
    catch (err) { setError(err.message || 'Failed to update password.'); }
    finally { setLoading(false); }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6F0] px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✅</div>
          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Password updated</h1>
          <p className="text-[#8A8A9A] mb-8" style={{ fontSize: '16px', lineHeight: '1.5' }}>Redirecting you to the dashboard...</p>
        </div>
        <div className="mt-8"><Footer /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Set new password</h1>
          <p className="text-[#8A8A9A] mb-8" style={{ fontSize: '16px', lineHeight: '1.5' }}>Choose a strong new password.</p>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-[#F44336]">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-[#8A8A9A] mb-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>New Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="paper-input w-full" placeholder="At least 6 characters" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#8A8A9A] mb-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="paper-input w-full" placeholder="Re-enter your password" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (<><Spinner /> Updating...</>) : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
