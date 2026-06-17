import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (<div className="min-h-screen flex items-center justify-center bg-[#FAF5ED]"><div className="flex flex-col items-center gap-4 scale-in"><div className="text-5xl animate-float">🇩🇪</div><div className="w-10 h-10 border-3 border-[#E8DFD4] rounded-full animate-spin" style={{ borderTopColor: '#8B6914' }} /><p className="text-[#9ca3af] text-sm font-medium">Loading DeutschBuddy...</p></div></div>);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
