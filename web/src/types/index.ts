export type TaskInterval = 'daily' | 'weekly' | 'custom_days';

export interface Task {
  id: string;
  title: string;
  description: string;
  interval: TaskInterval;
  customDays?: number[]; // 0 for Sunday to 6 for Saturday
  colorHex?: string;
  createdAt: number;
}
