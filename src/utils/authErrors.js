// Maps Supabase auth errors into clean, user-friendly messages.
// Never surface raw Supabase/Postgres errors, codes, or stack traces to users.

// Wraps a Supabase auth error into a friendly Error that keeps the original
// error code on `err.code` so callers can branch on specific cases (e.g. the
// email-not-confirmed flow needs to offer a "Resend email" action).
export function friendlyAuthError(error) {
  if (!error) return new Error('Something went wrong. Please try again.');
  const err = new Error(mapAuthError(error));
  if (error.code) err.code = error.code;
  return err;
}

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
  if (code === 'email_confirmed' || code === 'user_already_confirmed' || message.includes('already confirmed')) {
    return 'This email is already verified. You can sign in now.';
  }
  if (code === 'weak_password' || message.includes('password should be at least') || message.includes('weak password')) {
    return 'Password must be at least 8 characters.';
  }
  if (message.includes('auth session missing') || message.includes('no valid session') || message.includes('session was not found')) {
    return 'Your password reset link has expired. Please request a new one.';
  }
  if (code === 'over_email_send_rate_limit' || code === 'too_many_emails' || message.includes('rate limit exceeded') || message.includes('only request this once every')) {
    return 'We just sent you an email. Please wait a minute before requesting another one.';
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
  if (code === 'email_address_invalid' || message.includes('invalid email') || message.includes('not a valid email')) {
    return 'Please enter a valid email address.';
  }
  // A resend for a signup that is already verified or was never created.
  if (code === 'user_not_found' || message.includes('no user found') || message.includes('user not found')) {
    return 'No account is linked to this email. Please sign up first.';
  }
  if (message.includes('network') || message.includes('fetch') || message.includes('failed to connect')) {
    return 'Network error. Please check your connection and try again.';
  }
  if (message.includes('same email') && message.includes('provider')) {
    return 'This email is linked to another sign-in method. Please sign in with that method instead.';
  }
  return 'Something went wrong. Please try again.';
}