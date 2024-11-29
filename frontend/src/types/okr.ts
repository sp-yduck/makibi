export interface Objective {
  id: string;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  keyResults: KeyResult[];
  progress: number;
}

export interface KeyResult {
  id: string;
  title: string;
  target: number;
  current: number;
  progress: number;
  unit: string;
  startDate: string;
  dueDate: string;
}