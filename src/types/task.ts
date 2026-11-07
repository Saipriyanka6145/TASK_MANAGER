export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskFilter = 'all' | 'active' | 'completed';

export type PriorityFilter = 'all' | TaskPriority;

export type SortOption = 'dueDateAsc' | 'dueDateDesc' | 'priorityDesc' | 'createdDesc';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string; // YYYY-MM-DD
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
}

