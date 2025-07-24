import { create } from 'zustand';
import type { NotificationData } from '../components/NotificationDialog';

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

export interface RegisterData {
  firstName: string;
  lastName: string;
  phone: string;
  curp: string;
  rfc: string;
  email: string;
  password: string;
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
  // Notification state
  notification: NotificationData | null;
  showNotification: boolean;
  // User CRUD actions
  addUser: (user: Omit<User, 'id'>) => void;
  removeUser: (id: number) => void;
  updateUser: (id: number, updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  confirmEmail: (email: string) => Promise<void>;
  logout: () => void;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
  // Notification actions
  showSuccessNotification: (title: string, message: string, buttonText?: string) => void;
  showErrorNotification: (title: string, message: string, details?: Record<string, string>, buttonText?: string) => void;
  hideNotification: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
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
  // Notification state
  notification: null,
  showNotification: false,
  // User CRUD actions
  addUser: (user) => {
    set((state) => ({
      users: [...state.users, { ...user, id: Date.now() }],
    }));
    // Show success notification
    get().showSuccessNotification(
      'Usuario agregado',
      `El usuario ${user.name} ha sido agregado exitosamente`
    );
  },
  removeUser: (id) => {
    const user = get().users.find(u => u.id === id);
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
    // Show success notification
    if (user) {
      get().showSuccessNotification(
        'Usuario eliminado',
        `El usuario ${user.name} ha sido eliminado exitosamente`
      );
    }
  },
  updateUser: (id, updates) => {
    const user = get().users.find(u => u.id === id);
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      ),
    }));
    // Show success notification
    if (user) {
      get().showSuccessNotification(
        'Usuario actualizado',
        `El usuario ${updates.name || user.name} ha sido actualizado exitosamente`
      );
    }
  },
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
      // Show success notification
      get().showSuccessNotification(
        'Inicio de sesión exitoso',
        `¡Bienvenido de vuelta!`
      );
    } else {
      set({
        authLoading: false,
        authError: 'Credenciales incorrectas. Intenta con admin@booksmart.com / password',
      });
      // Show error notification
      get().showErrorNotification(
        'Error de autenticación',
        'Credenciales incorrectas. Intenta con admin@booksmart.com / password'
      );
    }
  },
  register: async (data: RegisterData) => {
    console.log('🏪 Store: register called with data:', data);
    set({ authLoading: true, authError: null });
    
    // Simulate API call
    console.log('⏳ Store: Simulating API call...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if email already exists (simple validation)
    const existingUser = get().users.find(user => user.email === data.email);
    if (existingUser) {
      console.log('❌ Store: Email already exists');
      set({
        authLoading: false,
        authError: 'Este correo electrónico ya está registrado',
      });
      // Show error notification
      get().showErrorNotification(
        'Error en el registro',
        'Este correo electrónico ya está registrado',
        { email: 'Ya existe una cuenta con este correo' }
      );
      throw new Error('Este correo electrónico ya está registrado');
    }
    
    // Create new user but DON'T authenticate yet
    // User needs to confirm email first
    const newUser = {
      id: Date.now(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      age: 25, // Default age for demo
    };
    
    console.log('✅ Store: User created successfully:', newUser);
    
    // Add to users list but keep user NOT authenticated
    set((state) => ({
      users: [...state.users, newUser],
      authLoading: false,
      authError: null,
      // Don't set isAuthenticated: true here
      // User will be authenticated after email confirmation
    }));
    
    // Show success notification
    get().showSuccessNotification(
      'Registro exitoso',
      'Tu cuenta ha sido creada. Revisa tu correo para confirmar tu email.',
      'Continuar'
    );
    
    console.log('✅ Store: Registration completed successfully');
    // Success - will trigger navigation to email confirmation
  },
  confirmEmail: async (email: string) => {
    set({ authLoading: true, authError: null });
    
    // Simulate API call for email confirmation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email and authenticate them
    const user = get().users.find(u => u.email === email);
    if (user) {
      set({
        isAuthenticated: true,
        currentUser: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        authLoading: false,
        authError: null,
      });
      // Show success notification
      get().showSuccessNotification(
        'Email confirmado',
        `¡Bienvenido ${user.name}! Tu cuenta ha sido activada exitosamente.`
      );
    } else {
      set({
        authLoading: false,
        authError: 'Usuario no encontrado',
      });
      // Show error notification
      get().showErrorNotification(
        'Error de confirmación',
        'No se pudo confirmar el email. Usuario no encontrado.'
      );
      throw new Error('Usuario no encontrado');
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
  // Notification actions
  showSuccessNotification: (title: string, message: string, buttonText = 'Aceptar') =>
    set({
      notification: {
        type: 'success',
        title,
        message,
        buttonText,
      },
      showNotification: true,
    }),
  showErrorNotification: (title: string, message: string, details?: Record<string, string>, buttonText = 'Aceptar') =>
    set({
      notification: {
        type: 'error',
        title,
        message,
        details,
        buttonText,
      },
      showNotification: true,
    }),
  hideNotification: () =>
    set({
      notification: null,
      showNotification: false,
    }),
}));
