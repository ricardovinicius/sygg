import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TaskList } from '../TaskList';
import type { Task } from '../../types';

const mockTasks: Task[] = [
  { id: '1', title: 'Task 1', description: '', interval: 'daily', createdAt: 0 },
  { id: '2', title: 'Task 2', description: 'Desc', interval: 'weekly', createdAt: 0 },
];

describe('TaskList', () => {
  it('renders empty state when no tasks', () => {
    render(<TaskList tasks={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('No Goals Yet')).toBeInTheDocument();
  });

  it('renders tasks correctly', () => {
    render(<TaskList tasks={mockTasks} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked', async () => {
    const handleEdit = vi.fn();
    render(<TaskList tasks={mockTasks} onEdit={handleEdit} onDelete={vi.fn()} />);
    
    // Using index because there are multiple Edit buttons
    const editButtons = screen.getAllByRole('button', { name: /Edit Task/i });
    await userEvent.click(editButtons[0]);
    
    expect(handleEdit).toHaveBeenCalledWith(mockTasks[0]);
  });
});
