import type { APIError } from "../request-handler";

import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";

import { ERROR_CODES } from "~/utils/constants";

export function useErrorHandler(error: APIError) {
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
