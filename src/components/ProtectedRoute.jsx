import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#18181B' }}>
      <div className="flex flex-col items-center gap-4 scale-in">
        <div className="text-5xl animate-float">🇩🇪</div>
        <div className="w-10 h-10 border-3 border-zinc-700 rounded-full animate-spin" style={{ borderTopColor: '#A3E635' }} />
        <p className="text-zinc-400 text-sm font-medium">Loading DeutschBuddy...</p>
      </div>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
