import type { APIStatus, APIError } from "./types";
import { useState } from "react";
import { UseMutateFunction } from "react-query";

/**
 * Custom hook to handle API requests using React Query's mutate function.
 * It manages the API request's loading, success, and error states.
 *
 * @param mutateFunction - The React Query mutate function for performing the API request.
 * @returns A tuple containing the API status and a function to trigger the API call.
 *          The API status includes loading, error, and success states.
 *          The function to trigger the API call accepts variables of type TVariables.
 */
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
    setTimeout(() => {
      setStatus({ ...status, loading: true });
    }, 300);
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
          message: (error as APIError).message,
          errorCode: (error as APIError).errorCode,
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
