// Maps Supabase auth errors into clean, user-friendly messages.
// Never surface raw Supabase/Postgres errors, codes, or stack traces to users.

export function mapAuthError(error) {
  if (!error) return 'Something went wrong. Please try again.';

  const code = error.code || '';
  const message = (error.message || '').toLowerCase();

  if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
    return 'Invalid email or password.';
  }
  if (code === 'user_already_exists' || message.includes('already registered') || message.includes('already been registered')) {
    return 'This email is already registered. Try signing in instead.';
  }
  if (code === 'email_not_confirmed' || message.includes('email not confirmed') || message.includes('verify your email')) {
    return 'Please verify your email before signing in.';
  }
  if (code === 'weak_password' || message.includes('password should be at least') || message.includes('weak password')) {
    return 'Password must be at least 8 characters.';
  }
  if (message.includes('auth session missing') || message.includes('no valid session') || message.includes('session was not found')) {
    return 'Your password reset link has expired. Please request a new one.';
  }
  if (code === 'over_request_rate_limit' || message.includes('request rate limit')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (code === 'popup_closed_by_user' || message.includes('popup closed') || message.includes('cancelled')) {
    return 'Google sign-in was cancelled.';
  }
  if (code === 'provider_disabled' || message.includes('provider is not enabled') || message.includes('not enabled')) {
    return 'Google sign-in is not available yet. Please use email instead.';
  }
  if (message.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }
  if (message.includes('network') || message.includes('fetch') || message.includes('failed to connect')) {
    return 'Network error. Please check your connection and try again.';
  }
  if (message.includes('same email') && message.includes('provider')) {
    return 'This email is linked to another sign-in method. Please sign in with that method instead.';
  }
  return 'Something went wrong. Please try again.';
}
