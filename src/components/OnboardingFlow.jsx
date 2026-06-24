import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Map, Target, Award, Loader2 } from 'lucide-react';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));

  const handleSignUp = async () => {
    if (!email.trim() || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signUp(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-amber-500' : 'bg-slate-800'}`} />
          ))}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-4xl font-bold tracking-tight">Willkommen.</h1>
            <p className="text-xl text-slate-400">Master German with structured precision.</p>
            <button onClick={nextStep} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
              Start Journey <ArrowRight size={20}/>
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold">Your Path</h2>
            <div className="grid gap-4">
              <div className="p-4 border-2 border-slate-800 rounded-xl flex items-center gap-4">
                <div className="bg-blue-500/20 text-blue-400 p-3 rounded-lg"><Map size={24}/></div>
                <div>
                  <h3 className="font-bold text-lg">A1 Beginner</h3>
                  <p className="text-slate-400">8 Weeks &bull; Foundations</p>
                </div>
              </div>
              <div className="p-4 border-2 border-slate-800 rounded-xl flex items-center gap-4 opacity-50">
                <div className="bg-red-500/20 text-red-400 p-3 rounded-lg"><Target size={24}/></div>
                <div>
                  <h3 className="font-bold text-lg">A2 Elementary</h3>
                  <p className="text-slate-400">8 Weeks &bull; Exam Ready</p>
                </div>
              </div>
            </div>
            <button onClick={nextStep} className="w-full bg-slate-100 hover:bg-white text-slate-950 font-bold py-4 rounded-xl transition-colors">
              Continue
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold">How it works</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-lg"><Award className="text-amber-500"/> Gamified progression</li>
              <li className="flex items-center gap-3 text-lg"><Target className="text-amber-500"/> Spaced repetition vocab</li>
              <li className="flex items-center gap-3 text-lg"><Map className="text-amber-500"/> Bite-sized daily tasks</li>
            </ul>
            <button onClick={nextStep} className="w-full bg-slate-100 hover:bg-white text-slate-950 font-bold py-4 rounded-xl transition-colors mt-8">
              Choose Level
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold">Save your progress</h2>
            <p className="text-slate-400">Sign in to access your XP and streaks.</p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-amber-500 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-amber-500 outline-none"
              />
              <button
                onClick={handleSignIn}
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-slate-950 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                Sign In
              </button>
              <div className="relative flex items-center justify-center">
                <div className="absolute w-full h-px bg-slate-800" />
                <span className="relative bg-slate-950 px-4 text-sm text-slate-500">or</span>
              </div>
              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 text-white font-bold py-4 rounded-xl transition-colors border border-slate-700"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                Create Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}