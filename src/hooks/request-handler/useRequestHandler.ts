import { useState } from "react";
import type { APIStatus, APIError } from "./types";
import { UseMutateFunction } from "react-query";

export function useRequestHandler<TData, TError, TVariables, TContext>(
  mutateFunction: UseMutateFunction<TData, TError, TVariables, TContext>
): [APIStatus, (variables: TVariables) => void] {
  const [status, setStatus] = useState<APIStatus>({
    loading: false,
    error: {
      message: "",
      errorCode: "",
    },
    success: false,
  });

  const callApi = (variables: TVariables) => {
    setStatus({ ...status, loading: true });
    mutateFunction(variables, {
      onSuccess: (_: TData) => {
        setStatus({
          ...status,
          loading: false,
          success: true,
          error: {
            message: "",
            errorCode: "",
          },
        });
      },
      onError: (error: TError) => {
        const apiError: APIError = {
          message: (error as APIError).message || "Unknown error",
          errorCode: (error as APIError).errorCode || "API_ERROR",
        };
        setStatus({
          ...status,
          loading: false,
          error: apiError,
          success: false,
        });
      },
    });
  };

  return [status, callApi];
}
