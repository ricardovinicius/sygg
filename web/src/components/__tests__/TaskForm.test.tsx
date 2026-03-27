import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TaskForm } from '../TaskForm';

describe('TaskForm', () => {
  it('renders correctly when open', () => {
    render(<TaskForm isOpen={true} onClose={vi.fn()} onSave={vi.fn()} />);
    expect(screen.getByText('New Goal')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<TaskForm isOpen={false} onClose={vi.fn()} onSave={vi.fn()} />);
    expect(screen.queryByText('New Goal')).not.toBeInTheDocument();
  });

  it('calls onSave with form data on submit', async () => {
    const handleSave = vi.fn();
    render(<TaskForm isOpen={true} onClose={vi.fn()} onSave={handleSave} />);
    
    await userEvent.type(screen.getByLabelText(/Goal Title/i), 'Run 5km');
    await userEvent.click(screen.getByRole('button', { name: /Create Goal/i }));

    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Run 5km',
        interval: 'daily',
      })
    );
  });
});
