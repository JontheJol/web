import { create } from 'zustand';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface AppState {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: Omit<User, 'id'>) => void;
  removeUser: (id: number) => void;
  updateUser: (id: number, updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  users: [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', age: 30 },
    { id: 2, name: 'María García', email: 'maria@example.com', age: 25 },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', age: 35 },
  ],
  loading: false,
  error: null,
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, { ...user, id: Date.now() }],
    })),
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      ),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
