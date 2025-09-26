export interface User {
  id: number;
  full_name: string;
  social_name?: string;
  email: string;
  phone?: string;
  document?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserList {
  users: User[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  user?: User;
}

export interface RegisterData {
  full_name: string;
  social_name?: string;
  document: string;
  doc_type: DocType;
  phone?: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  message: string;
  user?: User;
}

export interface LogoutRequest {
  token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface UpdateUserData {
  full_name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  social_name?: string;
  phone?: string;
  document?: string;
}

export interface UpdateUserResponse {
  message: string;
  user: User;
}

export interface DeleteUserRequest {
  ids: number[];
}

export interface DeleteUserResponse {
  message: string;
  deleted_count: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface Props {
  user?: User;
}

export interface FormData {
  full_name: string;
  social_name?: string;
  document: string;
  doc_type: DocType;
  phone?: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface FormErrors {
  full_name?: string;
  document?: string;
  phone?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export interface FormDataProfile {
  full_name: string;
  phone?: string;
}

export interface FormErrorsProfile {
  full_name?: string;
  phone?: string;
}

export type DocType = 'cpf' | 'cnpj';

export type ValidatorFn = (value: string, formData: FormData) => string | undefined;
export type ValidatorFnProfile = (value: string, formData: FormDataProfile) => string | undefined;
export type ValidatorFnLogin = (value: string, formData: LoginFormData) => string | undefined;
