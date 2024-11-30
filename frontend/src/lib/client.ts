// import { useAuth } from './auth';
import { User } from '../types/api';

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
        }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export const api = {
    users: {
        me: () => fetchApi<User>('/users/me', { method: 'GET' }),
    }
}