export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  phone?: string;
  gender?: 'Masculino' | 'Femenino';
  curp?: string;
  rfc?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  age: number;
  phone?: string;
  gender?: 'Masculino' | 'Femenino';
  curp?: string;
  rfc?: string;
}

// Interfaces adicionales para otros formularios que usan regex
export interface BookFormData {
  title: string;
  author: string;
  editorial: string;
  status: 'Disponible' | 'No disponible' | 'Prestado';
  location: string;
  row: number;
  column: string;
}

export interface LoanFormData {
  bookId: number;
  userId: number;
  loanDate: string;
  returnDate: string;
  status: 'Activo' | 'Entregado' | 'Atrasado' | 'Perdido';
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: 'Masculino' | 'Femenino';
  twoFaSecret?: string;
}

export interface RouteParams {
  id?: string;
}
