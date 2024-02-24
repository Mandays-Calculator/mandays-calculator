import type { ReactElement } from "react";
import type { TFunction } from "i18next";

import { Alert } from "~/components";

import LocalizationKey from "~/i18n/key";

interface AlertRendererProps {
  isErrorLoadingEstimations: boolean;
  successMessage: string;
  t: TFunction;
}

const AlertRenderer = ({
  isErrorLoadingEstimations,
  t,
  successMessage,
}: AlertRendererProps): ReactElement => {
  const { common } = LocalizationKey;
  return (
    <>
      {isErrorLoadingEstimations && (
        <Alert
          type="error"
          message={t(common.errorMessage.genericError)}
          open={isErrorLoadingEstimations}
          duration={3000}
        />
      )}
      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          open={successMessage !== ""}
        />
      )}
    </>
  );
};

export default AlertRenderer;
