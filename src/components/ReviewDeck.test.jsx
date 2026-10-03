import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ReviewDeck from './ReviewDeck';

const levelData = {
  weeks: [{
    id: 1,
    days: [{
      day: 1,
      tasks: [{
        id: 'vocab-task',
        content: {
          items: [
            { german: 'eins', english: 'one' },
            { german: 'zwei', english: 'two' },
            { german: 'drei', english: 'three' },
          ],
        },
      }],
    }],
  }],
};

describe('ReviewDeck', () => {
  it('shows the next remaining card after a rating instead of skipping it', async () => {
    render(<ReviewDeck levelData={levelData} level="A1" userId="review-user" />);

    await screen.findByText('eins');
    fireEvent.click(screen.getByRole('button', { name: 'Show Answer' }));
    fireEvent.click(screen.getByRole('button', { name: 'Good' }));

    await waitFor(() => expect(screen.getByText('zwei')).toBeInTheDocument());
    expect(screen.queryByText('drei')).not.toBeInTheDocument();
  });
});
