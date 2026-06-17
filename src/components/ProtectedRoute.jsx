import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (<div className="min-h-screen flex items-center justify-center" style={{ background: 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #020617 100%)' }}><div className="flex flex-col items-center gap-4 scale-in"><div className="text-5xl animate-float">🇩🇪</div><div className="w-10 h-10 border-3 border-slate-600 rounded-full animate-spin" style={{ borderTopColor: '#FFCC00' }} /><p className="text-slate-400 text-sm font-medium">Loading DeutschBuddy...</p></div></div>);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
