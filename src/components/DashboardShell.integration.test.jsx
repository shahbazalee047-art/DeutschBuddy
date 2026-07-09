import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardProvider } from '../contexts/DashboardContext';
import DashboardShell from './DashboardShell';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

vi.mock('../contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => <>{children}</>,
  useAuth: () => ({
    user: { id: 'u1', email: 'test@example.com' },
    profile: { full_name: 'Test Learner', selected_pacing: 'standard' },
    signOut: vi.fn(),
  }),
}));

vi.mock('../hooks/useProgress', () => ({
  useProgress: () => ({
    progress: {
      xp: 0,
      streak: 0,
      completedTasks: [],
      badges: [],
      unlockedWeeks: [1],
      todayXP: 0,
    },
    loading: false,
    completeTask: vi.fn(),
    unlockWeek: vi.fn(),
    setTrackMode: vi.fn(),
    recoverStreak: vi.fn(),
  }),
}));

beforeEach(() => {
  global.localStorage = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };
  global.window.matchMedia = vi.fn(() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
});

describe('DashboardShell Start Lesson flow', () => {
  it('opens a lesson when the Home Start Lesson button is clicked', async () => {
    render(
      <DashboardProvider>
        <DashboardShell />
      </DashboardProvider>
    );

    // Wait for the HomePage to render the Start Lesson button
    const startBtn = await screen.findByRole('button', { name: /start lesson/i }, { timeout: 5000 });
    expect(startBtn).toBeInTheDocument();

    fireEvent.click(startBtn);

    // After clicking, the user should land on the day / lessons page
    await waitFor(() => {
      expect(screen.queryAllByRole('button', { name: /back to week 1/i }).length).toBeGreaterThanOrEqual(1);
      expect(screen.queryAllByText(/Your First German Sentences/i).length).toBeGreaterThanOrEqual(1);
    }, { timeout: 5000 });
  });

  it('opens lesson content directly when a week circle is clicked', async () => {
    render(
      <DashboardProvider>
        <DashboardShell />
      </DashboardProvider>
    );

    // Wait for HomePage and the week-1 circle to render
    const weekOneCircle = await screen.findByRole('button', { name: /^Week 1:/i }, { timeout: 5000 });
    expect(weekOneCircle).not.toBeDisabled();

    fireEvent.click(weekOneCircle);

    // The circle should jump straight into the LessonPlayer (lesson content),
    // identifiable by its "Exit lesson" button — not the DailyTasks list.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /exit lesson/i })).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
