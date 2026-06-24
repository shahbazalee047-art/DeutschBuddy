import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IconBookOpen } from './Icons';

function isOnboarded() {
  try { return localStorage.getItem('db_onboarded') === 'true'; } catch { return true; }
}

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-4 scale-in">
        <IconBookOpen className="w-12 h-12 text-gold animate-float" />
        <div className="w-10 h-10 border-3 border-bg-dark-mid rounded-full animate-spin border-t-gold" />
        <p className="text-text-muted text-sm font-medium">Loading DeutschBuddy...</p>
      </div>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (!isOnboarded()) return <Navigate to="/onboarding" replace />;
  return children;
}
