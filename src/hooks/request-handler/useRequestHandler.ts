import type { APIError, APIStatus } from ".";
import { useState } from "react";
import { UseMutateFunction } from "react-query";

/**
 * Custom hook to handle API requests using React Query's mutate function.
 * It manages the API request's loading, success, and error states.
 * Optional success and error callbacks can be provided for additional actions.
 *
 * @param mutateFunction - The React Query mutate function for performing the API request.
 * @param onSuccessCallback - Optional callback function for successful API calls.
 * @param onErrorCallback - Optional callback function for failed API calls.
 * @returns A tuple containing the API status and a function to trigger the API call.
 *          The API status includes loading, error, and success states.
 *          The function to trigger the API call accepts variables of type TVariables.
 */
export function useRequestHandler<TData, TError, TVariables, TContext>(
  mutateFunction: UseMutateFunction<TData, TError, TVariables, TContext>,
  onSuccessCallback?: (data: TData) => void,
  onErrorCallback?: (error: TError) => void
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
    setStatus({
      loading: true,
      error: {
        message: "",
        errorCode: "",
      },
      success: false,
    });

    mutateFunction(variables, {
      onSuccess: (data: TData) => {
        setStatus((prevState) => ({
          ...prevState,
          loading: false,
          success: true,
        }));
        if (onSuccessCallback) {
          onSuccessCallback(data);
        }
      },
      onError: (error: TError) => {
        const apiError: APIError = {
          message: (error as APIError).message,
          errorCode: (error as APIError).errorCode,
        };
        setStatus((prevState) => ({
          ...prevState,
          loading: false,
          error: apiError,
          success: false,
        }));
        if (onErrorCallback) {
          onErrorCallback(error);
        }
      },
    });
  };

  return [status, callApi];
}
