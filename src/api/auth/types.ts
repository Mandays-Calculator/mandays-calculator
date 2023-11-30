import { GenericErrorResponse } from "../types";

export interface AuthAPIResponse extends GenericErrorResponse {
  status: number;
}

export interface ResetPasswordParams {
  authorizationCode: string;
  newPassword: string;
}
