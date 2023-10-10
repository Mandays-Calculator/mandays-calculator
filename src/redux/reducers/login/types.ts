export interface LoginState {
  loading?: boolean;
  token: string;
  isLoggedIn: boolean;
}

export interface LoginParamRequest {
  username: string;
  password: string;
}

export interface LoginParamResponse {
  username: string;
  token: string;
}
