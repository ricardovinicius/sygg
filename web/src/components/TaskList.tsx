import { Trash2, Edit2, Clock } from 'lucide-react';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-8 bg-base-200 rounded-box border border-base-300">
        <h3 className="text-xl font-bold mb-2">No Goals Yet</h3>
        <p className="text-base-content/70">Create your first recurring goal to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <div key={task.id} className="card bg-base-100 shadow-md border border-base-200 hover:border-primary/50 transition-colors group">
          <div className="card-body p-5 flex flex-row items-start justify-between">
            <div className="flex items-start gap-4">
              <div 
                className="w-4 h-4 mt-1.5 rounded-full shadow-sm"
                style={{ backgroundColor: task.colorHex || '#40c463' }}
              />
              <div>
                <h3 className="card-title text-lg">{task.title}</h3>
                {task.description && <p className="text-sm text-base-content/70 mt-1">{task.description}</p>}
                
                <div className="flex items-center gap-2 mt-3 text-xs font-semibold text-base-content/60 bg-base-200 w-fit px-2 py-1 rounded-md">
                  <Clock size={14} />
                  <span className="capitalize">
                    {task.interval === 'custom_days' ? 'Custom Days' : task.interval}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEdit(task)}
                className="btn btn-ghost btn-sm btn-square text-base-content/70 hover:text-primary"
                aria-label="Edit Task"
                title="Edit Task"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => onDelete(task.id)}
                className="btn btn-ghost btn-sm btn-square text-error/70 hover:bg-error/10 hover:text-error"
                aria-label="Delete Task"
                title="Delete Task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
