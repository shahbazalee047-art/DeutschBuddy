import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const { resendMock } = vi.hoisted(() => ({ resendMock: vi.fn() }));

vi.mock('react-router-dom', () => ({
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  useLocation: () => ({ state: { email: 'test@example.com' } }),
  useSearchParams: () => [new URLSearchParams('email=test%40example.com'), vi.fn()],
}));

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ resendVerificationEmail: resendMock }),
}));

import VerifyEmailPage from './VerifyEmailPage';

describe('VerifyEmailPage', () => {
  beforeEach(() => {
    resendMock.mockReset();
    resendMock.mockResolvedValue(undefined);
    window.matchMedia = vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it('shows the email the confirmation was sent to', () => {
    render(<VerifyEmailPage />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Resend email' })).toBeInTheDocument();
    expect(screen.getByText(/I've verified my email/)).toBeInTheDocument();
  });

  it('resends and starts a 60s cooldown on the button', async () => {
    render(<VerifyEmailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Resend email' }));
    await waitFor(() => expect(resendMock).toHaveBeenCalledWith('test@example.com'));
    expect(screen.getByText('Resend available in 60s')).toBeInTheDocument();
  });

  it('surfaces a resend failure (e.g. free-tier rate limit) without crashing', async () => {
    resendMock.mockRejectedValueOnce(
      new Error('We just sent you an email. Please wait a minute before requesting another one.')
    );
    render(<VerifyEmailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Resend email' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Please wait a minute');
    // Button is usable again after the failure (no stuck loading state).
    expect(screen.getByRole('button', { name: 'Resend email' })).not.toBeDisabled();
  });
});