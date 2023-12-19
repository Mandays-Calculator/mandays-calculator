import type { TFunction } from "i18next";
import type { APIError } from "../request-handler";

import LocalizationKey from "~/i18n/key";

import { ERROR_CODES } from "~/utils/constants";

/**
 * Custom hook to handle API errors and return localized error messages.
 * @param error The APIError object containing error details.
 * @returns A string with the localized error message.
 */
export function useErrorHandler(
  error: APIError,
  t: TFunction<"translation", undefined>
): string | "" {
  const { common } = LocalizationKey;

  function getErrorMessage(error: APIError): string | "" {
    switch (error.errorCode || error.code) {
      // only need to add common cases
      case ERROR_CODES.genericError:
        return error.message || t(common.errorMessage.genericError);
      case ERROR_CODES.networkError:
        return error.message;
      case "":
      case null:
      case undefined:
        return "";
      default:
        return error.message;
    }
  }

  return getErrorMessage(error);
}
