export interface APIError {
  message: string;
  errorCode: string;
  code?: string;
}

export interface APIStatus {
  loading: boolean;
  error: APIError;
  success: boolean;
}
