// import { useAuth } from './auth';
import { User } from '../types/api';
import { Objective } from '../types/okr';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // const { credentials } = useAuth.getState();

    // headers
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options?.headers,
    };
    // if (credentials) {
    //     headers['Authorization'] = `Bearer ${credentials.token}`;
    // }

    // fetch
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}${endpoint}`,
        {
            ...options,
            headers,
            credentials: "include",
        }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export const api = {
    users: {
        me: () => fetchApi<User>('/me', { method: 'GET' }),
    },

    objectives: {
        list: () : Objective[] => {
            return [
                {
                  id: "1",
                  title: "Increase Market Share",
                  description: "Expand market reach and grow customer base",
                  startDate: "2024-04-01",
                  dueDate: "2024-06-30",
                  progress: 45,
                  keyResults: [
                    {
                      id: "kr1-1",
                      title: "Acquire new enterprise customers",
                      target: 50,
                      current: 20,
                      progress: 40,
                      unit: "customers",
                      startDate: "2024-04-01",
                      dueDate: "2024-06-30",
                    },
                    {
                      id: "kr1-2",
                      title: "Increase revenue from existing customers",
                      target: 1000000,
                      current: 500000,
                      progress: 50,
                      unit: "dollars",
                      startDate: "2024-04-01",
                      dueDate: "2024-06-30",
                    },
                  ],
                },
                {
                  id: "2",
                  title: "Improve Customer Satisfaction",
                  description: "Enhance overall customer experience and reduce churn rate",
                  startDate: "2024-01-01",
                  dueDate: "2024-12-31",
                  progress: 75,
                  keyResults: [
                    {
                      id: "kr2-1",
                      title: "Increase NPS score",
                      target: 85,
                      current: 65,
                      progress: 76,
                      unit: "points",
                      startDate: "2024-01-01",
                      dueDate: "2024-12-31",
                    },
                    {
                      id: "kr2-2",
                      title: "Reduce customer support response time",
                      target: 2,
                      current: 1.4,
                      progress: 70,
                      unit: "hours",
                      startDate: "2024-01-01",
                      dueDate: "2024-12-31",
                    },
                  ],
                },
            ];
        },
        get: (id?: string) : Objective => {
           const objectives = api.objectives.list();
           return objectives.find((obj) => obj.id === id) as Objective;
        },
    },
}