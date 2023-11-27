import type { APIError } from "../request-handler";

import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";

import { ERROR_CODES } from "~/utils/constants";

/**
 * Custom hook to handle API errors and return localized error messages.
 * @param error The APIError object containing error details.
 * @returns A string with the localized error message.
 */
export function useErrorHandler(error: APIError): string | "" {
  const { common } = LocalizationKey;
  const { t } = useTranslation();

  function getErrorMessage(error: APIError): string | "" {
    switch (error.errorCode) {
      // only need to add common cases
      case ERROR_CODES.genericError:
        return t(common.errorMessage.genericError);
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
