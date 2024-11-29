import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  bio: string;
  role: string;
  department: string;
  location: string;
  joinDate: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const dummyUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
  bio: 'Product Manager with 5+ years of experience in tech. Passionate about building great products and achieving ambitious goals.',
  role: 'Product Manager',
  department: 'Product',
  location: 'San Francisco, CA',
  joinDate: '2023-06-15'
};

export const useAuthStore = create<AuthState>((set) => ({
  user: dummyUser,
  isAuthenticated: true,
  login: () => set({ user: dummyUser, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateProfile: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));