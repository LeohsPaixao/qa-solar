// Tipos para configuração de requisições
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

// Tipos para resposta de erro da API
export interface ApiErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Tipos para configuração de interceptadores
export interface InterceptorConfig {
  onFulfilled?: (value: any) => any | Promise<any>;
  onRejected?: (error: any) => any | Promise<any>;
}
