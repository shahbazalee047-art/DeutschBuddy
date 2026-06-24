import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IconCheck } from '../components/Icons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = 'Please enter a valid email';
    if (!password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      await signIn(email, password);
      try {
        if (localStorage.getItem('db_selected_level')) {
          localStorage.setItem('db_onboarded', 'true');
        }
      } catch { /* ignore */ }
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrors({ form: err.message });
    } finally { setLoading(false); }
  }

  const valueItems = [
    '16-week guided curriculum from A1 to A2',
    'Audio-backed speaking, listening, and writing practice',
    'Realistic Goethe-style mock exams with progress tracking',
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-bg-primary">
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden" style={{ background: '#1C1A19' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 -translate-y-1/3 translate-x-1/4" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 flex items-center justify-center text-2xl font-bold" style={{ background: 'var(--gold)', color: '#1C1A19', boxShadow: '0 4px 20px rgba(232,183,61,0.25)' }}>DB</div>
            <div>
              <span className="text-2xl font-extrabold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F0EAE0' }}>Deutsch</span>
              <span className="text-2xl font-extrabold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#E8B73D' }}>Buddy</span>
            </div>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[2px] mb-4" style={{ color: '#E8B73D' }}>Structured German Mastery</div>
          <h1 className="text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F0EAE0' }}>
            Master German with<br />
            <span style={{ color: '#E8B73D', fontStyle: 'italic' }}>structured precision</span>
          </h1>
          <ul className="space-y-4">
            {valueItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: '#B8B2AC' }}>
                <span className="mt-0.5 w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(232,183,61,0.20)', color: '#E8B73D' }}><IconCheck className="w-3 h-3" /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative text-[13px]" style={{ color: 'rgba(240,234,224,0.40)', fontFamily: "'DM Sans', sans-serif" }}>
          Designed for Goethe exam success
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 flex items-center justify-center text-xl font-bold" style={{ background: 'var(--gold)', color: '#1C1A19' }}>DB</div>
            <div>
              <span className="text-xl font-extrabold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F0EAE0' }}>Deutsch</span>
              <span className="text-xl font-extrabold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#E8B73D' }}>Buddy</span>
            </div>
          </div>

          <h2 className="text-[var(--text-h1)] font-bold mb-2 text-center lg:text-left" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F0EAE0' }}>Welcome back</h2>
          <p className="text-center lg:text-left mb-8" style={{ color: '#B8B2AC' }}>Continue your German learning journey</p>

          <div className="p-8 shadow-sm" style={{ background: '#2E2A26', border: '1px solid #3A3530' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#B8B2AC' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="paper-input w-full" style={{ height: '52px' }} />
                {errors.email && <p className="mt-1.5 text-[12px]" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: '#C9453F' }}>{errors.email}</p>}
              </div>
              <div>
                <label className="block mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#B8B2AC' }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" className="paper-input w-full" style={{ height: '52px' }} />
                {errors.password && <p className="mt-1.5 text-[12px]" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: '#C9453F' }}>{errors.password}</p>}
              </div>

              {errors.form && <p className="text-[12px]" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: '#C9453F' }}>{errors.form}</p>}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" style={{ accentColor: '#E8B73D' }} />
                  <span className="text-[13px]" style={{ color: '#B8B2AC' }}>Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-[13px] font-medium transition" style={{ color: '#E8B73D' }}>Forgot password?</Link>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Signing in...' : 'Sign In'}</button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-[14px]" style={{ color: '#B8B2AC' }}>Don't have an account? </span>
              <Link to="/signup" className="text-[14px] font-semibold transition" style={{ color: '#E8B73D' }}>Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}