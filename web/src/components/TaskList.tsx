import { Trash2, Edit2, Clock, CheckCircle, Circle } from 'lucide-react';
import type { Task } from '../types';
import { getLocalYMD } from '../utils';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TaskList({ tasks, onEdit, onDelete, onToggleComplete }: TaskListProps) {
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
      {tasks.map((task) => {
        const today = getLocalYMD();
        const isCompletedToday = (task.completions || []).includes(today);
        
        return (
          <div key={task.id} className={`card shadow-md border transition-colors group ${isCompletedToday ? 'bg-base-200/50 border-base-300' : 'bg-base-100 border-base-200 hover:border-primary/50'}`}>
            <div className="card-body p-5 flex flex-row items-center justify-between">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className={`mt-1 btn btn-circle btn-sm flex-shrink-0 ${isCompletedToday ? 'btn-success text-white border-none' : 'btn-outline border-base-300 hover:btn-primary'}`}
                  aria-label={isCompletedToday ? 'Mark as uncompleted' : 'Mark as completed'}
                >
                  {isCompletedToday ? <CheckCircle size={20} /> : <Circle size={20} className="text-base-content/30" />}
                </button>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-3 h-3 rounded-full shadow-sm ${isCompletedToday ? 'opacity-50' : ''}`}
                      style={{ backgroundColor: task.colorHex || '#40c463' }}
                    />
                    <h3 className={`card-title text-lg ${isCompletedToday ? 'line-through text-base-content/50' : ''}`}>
                      {task.title}
                    </h3>
                  </div>
                  {task.description && <p className={`text-sm mt-1 ${isCompletedToday ? 'text-base-content/40 line-through' : 'text-base-content/70'}`}>{task.description}</p>}
                  
                  <div className={`flex items-center gap-2 mt-3 text-xs font-semibold w-fit px-2 py-1 rounded-md ${isCompletedToday ? 'text-base-content/40 bg-base-300/50' : 'text-base-content/60 bg-base-200'}`}>
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
        );
      })}
    </div>
  );
}
