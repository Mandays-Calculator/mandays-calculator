import type { AuthAPIResponse } from "~/api/auth";

import { useMutation } from "react-query";

import { forgotPasswordApi, resetPasswordApi } from "~/api/auth/Auth";

import { AxiosError } from "axios";

export const useForgotPasswordMutation = () => {
  return useMutation<AuthAPIResponse, AxiosError, string>(
    (usernameOrEmail: string) => forgotPasswordApi(usernameOrEmail)
  );
};

export const useResetPasswordMutation = () => {
  return useMutation<
    AuthAPIResponse,
    AxiosError,
    { code: string; newPassword: string }
  >((params: { code: string; newPassword: string }) =>
    resetPasswordApi({
      authorizationCode: params.code,
      newPassword: params.newPassword,
    })
  );
};
