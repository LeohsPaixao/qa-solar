// Tipos para configuração de requisições
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
}

// Tipos para resposta de erro da API
export interface ApiErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Tipos para configuração de interceptadores
export interface InterceptorConfig<T = unknown> {
  onFulfilled?: (value: T) => T | Promise<T>;
  onRejected?: (error: unknown) => unknown | Promise<unknown>;
}
