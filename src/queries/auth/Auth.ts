import type { ForgotPasswordResponse } from "~/api/auth";

import { useMutation } from "react-query";

import { forgotPasswordApi } from "~/api/auth/Auth";

import { AxiosError } from "axios";

export const useForgotPasswordMutation = () => {
  return useMutation<ForgotPasswordResponse, AxiosError, string>(
    (usernameOrEmail: string) => forgotPasswordApi(usernameOrEmail)
  );
};
