export interface User {
  firstName: string;
  email: string;
  lastName: string;
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterSuccessPayload {
  user: User;
  message: string;
}
export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
export interface StateInterface {
  loading: boolean;
  user: User | null;
  message: string;
  token: string;
  isLoggedIn: boolean;
}
