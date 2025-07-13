import { create } from 'zustand';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface AppState {
  users: User[];
  loading: boolean;
  error: string | null;
  // Auth state
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  authLoading: boolean;
  authError: string | null;
  // User CRUD actions
  addUser: (user: Omit<User, 'id'>) => void;
  removeUser: (id: number) => void;
  updateUser: (id: number, updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  users: [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', age: 30 },
    { id: 2, name: 'María García', email: 'maria@example.com', age: 25 },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', age: 35 },
  ],
  loading: false,
  error: null,
  // Auth state
  isAuthenticated: false,
  currentUser: null,
  authLoading: false,
  authError: null,
  // User CRUD actions
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
  // Auth actions
  login: async (email: string, password: string) => {
    set({ authLoading: true, authError: null });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple demo authentication
    if (email === 'admin@booksmart.com' && password === 'password') {
      set({
        isAuthenticated: true,
        currentUser: {
          id: 1,
          name: 'Administrador',
          email: email,
        },
        authLoading: false,
        authError: null,
      });
    } else {
      set({
        authLoading: false,
        authError: 'Credenciales incorrectas. Intenta con admin@booksmart.com / password',
      });
    }
  },
  logout: () => 
    set({
      isAuthenticated: false,
      currentUser: null,
      authError: null,
    }),
  setAuthLoading: (authLoading) => set({ authLoading }),
  setAuthError: (authError) => set({ authError }),
}));
