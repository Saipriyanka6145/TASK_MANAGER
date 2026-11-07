import { Task } from '../types/task';

const STORAGE_KEY = 'antd_task_manager_tasks_v1';

const DEFAULT_SAMPLE_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Review project specifications',
    description: 'Go through repository requirements and verify Ant Design component integration.',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Implement responsive layout',
    description: 'Ensure header, filter toolbar, and task cards look polished on mobile and desktop.',
    priority: 'medium',
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], // In 2 days
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'Write comprehensive documentation',
    description: 'Document architecture, features, and setup instructions in README.',
    priority: 'low',
    dueDate: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0], // In 4 days
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const loadTasksFromStorage = (): Task[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // First time loading: provide default sample tasks
      saveTasksToStorage(DEFAULT_SAMPLE_TASKS);
      return DEFAULT_SAMPLE_TASKS;
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Failed to load tasks from localStorage', err);
    return [];
  }
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks to localStorage', err);
  }
};

