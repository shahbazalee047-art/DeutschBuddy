import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]">
      <div className="flex flex-col items-center gap-4 scale-in">
        <div className="text-5xl animate-float">🇩🇪</div>
        <div className="w-10 h-10 border-3 border-[#E8E0D4] rounded-full animate-spin" style={{ borderTopColor: '#B8860B' }} />
        <p className="text-[#8A8A9A] text-sm font-medium">Loading DeutschBuddy...</p>
      </div>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
