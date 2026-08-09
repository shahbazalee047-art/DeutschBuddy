import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardShell from './components/DashboardShell';
import LoadingSpinner from './components/LoadingSpinner';
import UpdateToast from './components/UpdateToast';

const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));

function PageLoader() {
  return <LoadingSpinner message="Loading DeutschBuddy..." />;
}

function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardProvider>
        <DashboardShell />
      </DashboardProvider>
    </ProtectedRoute>
  );
}

function LandingRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <PageLoader />;
  // Preserve ?ref= so invite links survive the landing -> onboarding redirect.
  if (!user) return <Navigate to={{ pathname: '/onboarding', search: location.search }} replace />;
  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <UpdateToast />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LandingRoute />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
