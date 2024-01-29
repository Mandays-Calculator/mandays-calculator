import type { GenericErrorResponse } from "../types";
import type { Permission, User } from "../user";

export interface AuthAPIResponse extends GenericErrorResponse {
  status: number;
}

export interface ResetPasswordParams {
  authorizationCode: string;
  password: string;
}

export interface Token {
  accessToken: string;
  expiresInMs: number;
  refreshExpiresInMs: number;
  issuedAtInMs: number;
  refreshToken: string;
  tokenType: string;
  sessionState: string;
  scope: string;
}

export interface LoginResponse {
  token: Token;
  user: User;
  permissions: Permission[];
}
