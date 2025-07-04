// Tipos para respostas da API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Tipos para configuração de toast compatíveis com vue3-toastify
export interface ToastConfig {
  autoClose?: number;
  toastId?: string;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  theme?: 'light' | 'dark' | 'colored';
}

// Tipos para configuração de queries
export interface QueryConfig {
  staleTime?: number;
  retry?: number;
  enabled?: boolean;
}

// Tipos para configuração de mutations
export interface MutationConfig {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: any, error: any) => void;
}
