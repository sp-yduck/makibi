import { create } from 'zustand';
import type { Objective } from '../types/okr';

const today = new Date().toISOString().split('T')[0];

const sampleObjectives: Objective[] = [
  {
    id: '1',
    title: 'Increase Market Share',
    description: 'Expand our presence in key markets and grow our customer base significantly in Q2 2024',
    startDate: '2024-04-01',
    dueDate: '2024-06-30',
    progress: 45,
    keyResults: [
      {
        id: 'kr1-1',
        title: 'Acquire new enterprise customers',
        target: 50,
        current: 20,
        progress: 40,
        unit: 'customers',
        startDate: '2024-04-01',
        dueDate: '2024-06-30'
      },
      {
        id: 'kr1-2',
        title: 'Increase revenue from existing customers',
        target: 1000000,
        current: 500000,
        progress: 50,
        unit: 'dollars',
        startDate: '2024-04-01',
        dueDate: '2024-06-30'
      }
    ]
  },
  {
    id: '2',
    title: 'Improve Customer Satisfaction',
    description: 'Enhance overall customer experience and reduce churn rate',
    startDate: '2024-01-01',
    dueDate: '2024-12-31',
    progress: 75,
    keyResults: [
      {
        id: 'kr2-1',
        title: 'Increase NPS score',
        target: 85,
        current: 65,
        progress: 76,
        unit: 'points',
        startDate: '2024-01-01',
        dueDate: '2024-12-31'
      },
      {
        id: 'kr2-2',
        title: 'Reduce customer support response time',
        target: 2,
        current: 1.4,
        progress: 70,
        unit: 'hours',
        startDate: '2024-01-01',
        dueDate: '2024-12-31'
      }
    ]
  }
];

interface OKRState {
  objectives: Objective[];
  addObjective: (objective: Objective) => void;
  updateObjective: (objective: Objective) => void;
  deleteObjective: (id: string) => void;
}

export const useOKRStore = create<OKRState>((set) => ({
  objectives: sampleObjectives,
  addObjective: (objective) =>
    set((state) => ({ objectives: [...state.objectives, objective] })),
  updateObjective: (objective) =>
    set((state) => ({
      objectives: state.objectives.map((obj) =>
        obj.id === objective.id ? objective : obj
      ),
    })),
  deleteObjective: (id) =>
    set((state) => ({
      objectives: state.objectives.filter((obj) => obj.id !== id),
    })),
}));