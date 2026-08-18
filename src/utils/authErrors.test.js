import { describe, it, expect } from 'vitest';
import { mapAuthError, friendlyAuthError } from './authErrors';

describe('mapAuthError', () => {
  it('maps invalid credentials to a friendly message', () => {
    expect(mapAuthError({ code: 'invalid_credentials' })).toBe('Invalid email or password.');
  });

  it('maps unconfirmed sign-ins without leaking supabase internals', () => {
    expect(mapAuthError({ code: 'email_not_confirmed' })).toBe('Please verify your email before signing in.');
    expect(mapAuthError({ message: 'Email not confirmed' })).toBe('Please verify your email before signing in.');
  });

  it('explains that an already-confirmed email can log in', () => {
    expect(mapAuthError({ code: 'user_already_confirmed' })).toBe('This email is already verified. You can sign in now.');
  });

  it('handles the auth email rate limit, not just the generic one', () => {
    expect(mapAuthError({ code: 'over_email_send_rate_limit' })).toBe(
      'We just sent you an email. Please wait a minute before requesting another one.'
    );
    expect(mapAuthError({ message: 'For security purposes, you can only request this once every 60 seconds' })).toBe(
      'We just sent you an email. Please wait a minute before requesting another one.'
    );
    expect(mapAuthError({ code: 'over_request_rate_limit' })).toBe('Too many attempts. Please wait a moment and try again.');
  });

  it('maps resend/user-not-found and provider cases', () => {
    expect(mapAuthError({ code: 'user_not_found' })).toBe('No account is linked to this email. Please sign up first.');
    expect(mapAuthError({ code: 'popup_closed_by_user' })).toBe('Google sign-in was cancelled.');
    expect(mapAuthError({ code: 'provider_disabled' })).toBe('Google sign-in is not available yet. Please use email instead.');
  });

  it('keeps codes on friendlyAuthError so callers can branch', () => {
    const err = friendlyAuthError({ code: 'email_not_confirmed', message: 'Email not confirmed' });
    expect(err.message).toBe('Please verify your email before signing in.');
    expect(err.code).toBe('email_not_confirmed');
  });

  it('falls back without leaking raw messages', () => {
    expect(mapAuthError({ code: 'pgrst316', message: 'relation "secret_table" does not exist' })).toBe(
      'Something went wrong. Please try again.'
    );
    expect(mapAuthError(null)).toBe('Something went wrong. Please try again.');
  });
});