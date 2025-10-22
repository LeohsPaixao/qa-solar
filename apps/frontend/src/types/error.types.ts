export interface ErrorProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

export interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}