export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
  objectiveId?: string;
  keyResultId?: string;
  createdAt: string;
}