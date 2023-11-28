export interface APIError {
  message: string;
  errorCode: string;
}

export interface APIStatus {
  loading: boolean;
  error: APIError;
  success: boolean;
}
