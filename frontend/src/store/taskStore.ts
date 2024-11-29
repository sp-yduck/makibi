import { create } from 'zustand';
import type { Task } from '../types/task';

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Research competitor pricing',
    description: 'Analyze pricing models of top 5 competitors',
    status: 'completed',
    dueDate: '2024-04-15',
    objectiveId: '1',
    keyResultId: 'kr1-2',
    createdAt: '2024-03-01',
  },
  {
    id: '2',
    title: 'Prepare customer feedback survey',
    description: 'Create and distribute NPS survey to current customers',
    status: 'in-progress',
    dueDate: '2024-04-30',
    objectiveId: '2',
    keyResultId: 'kr2-1',
    createdAt: '2024-03-15',
  },
];

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  getTasksByObjective: (objectiveId: string) => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: sampleTasks,
  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  getTasksByObjective: (objectiveId) =>
    get().tasks.filter((task) => task.objectiveId === objectiveId),
}));