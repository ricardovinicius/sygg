import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Task, TaskInterval } from '../types';

const GREEN_PALETTE = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  initialData?: Task | null;
}

export function TaskForm({ isOpen, onClose, onSave, initialData }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [interval, setInterval] = useState<TaskInterval>(initialData?.interval || 'daily');
  const [customDays, setCustomDays] = useState<number[]>(initialData?.customDays || []);
  const [colorHex, setColorHex] = useState(initialData?.colorHex || GREEN_PALETTE[2]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title,
      description,
      interval,
      customDays: interval === 'custom_days' ? customDays : undefined,
      colorHex
    });
    onClose();
  };

  const toggleDay = (dayIndex: number) => {
    setCustomDays(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-base-100 rounded-box w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-base-200">
          <h2 className="text-xl font-bold">{initialData ? 'Edit Goal' : 'New Goal'}</h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="form-control">
            <label htmlFor="titleInput" className="label">
              <span className="label-text font-medium">Goal Title</span>
            </label>
            <input 
              id="titleInput"
              type="text" 
              placeholder="e.g. Read 10 pages" 
              className="input input-bordered w-full" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-control">
            <label htmlFor="descInput" className="label">
              <span className="label-text font-medium">Description (Optional)</span>
            </label>
            <textarea 
              id="descInput"
              placeholder="Detailed notes about your goal..."
              className="textarea textarea-bordered h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-control border-t border-base-200 pt-4 cursor-pointer">
            <label className="label">
              <span className="label-text font-medium text-lg mb-2">Frequency</span>
            </label>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="interval" 
                  className="radio radio-primary radio-sm" 
                  checked={interval === 'daily'}
                  onChange={() => setInterval('daily')}
                />
                <span className="label-text cursor-pointer">Daily</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="interval" 
                  className="radio radio-primary radio-sm" 
                  checked={interval === 'weekly'}
                  onChange={() => setInterval('weekly')}
                />
                <span className="label-text cursor-pointer">Weekly</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="interval" 
                  className="radio radio-primary radio-sm" 
                  checked={interval === 'custom_days'}
                  onChange={() => setInterval('custom_days')}
                />
                <span className="label-text cursor-pointer">Custom Days</span>
              </label>
            </div>

            {interval === 'custom_days' && (
              <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
                {DAYS_OF_WEEK.map((day, idx) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(idx)}
                    className={`btn btn-sm ${customDays.includes(idx) ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="form-control border-t border-base-200 pt-4">
            <label className="label">
              <span className="label-text font-medium text-lg mb-2">Graph Color</span>
            </label>
            <div className="flex gap-3">
              {GREEN_PALETTE.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setColorHex(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${colorHex === color ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-base-100' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                  title={color}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-base-200 justify-end mt-8">
            <button type="button" onClick={onClose} className="btn btn-ghost text-base-content/70">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-8" disabled={!title.trim()}>
              {initialData ? 'Save Changes' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
