export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export interface UserFormData {
  name: string;
  email: string;
  age: number;
}

export interface RouteParams {
  id?: string;
}
