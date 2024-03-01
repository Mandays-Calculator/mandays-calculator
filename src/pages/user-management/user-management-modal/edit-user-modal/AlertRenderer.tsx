import type { ReactElement } from "react";
import type { UseQueryResult } from "react-query";
import type { GetUserByIdResponse } from "~/api/user-management";
import type { APIStatus } from "~/hooks/request-handler";
import { useTranslation } from "react-i18next";
import { Alert } from "~/components";
import LocalizationKey from "~/i18n/key";

interface AlertRenderProps {
  selectedUser: UseQueryResult<GetUserByIdResponse, Error>;
  status: APIStatus;
  isEditError: boolean;
  isEditSuccess: boolean;
}

const AlertRenderer = (props: AlertRenderProps): ReactElement => {
  const { selectedUser, status, isEditError, isEditSuccess } = props;
  const { t } = useTranslation();
  const { common, userManagement } = LocalizationKey;
  return (
    <>
      {selectedUser.isError && (
        <Alert
          open={selectedUser.error.message !== ""}
          message={
            selectedUser.error.message || t(common.errorMessage.genericError)
          }
          type={"error"}
          duration={3000}
        />
      )}
      {!status.loading && (
        <>
          <Alert
            open={isEditError}
            message={t(common.errorMessage.genericErrorSubmit)}
            type={"error"}
          />
          <Alert
            open={isEditSuccess}
            message={t(userManagement.successMessage.updateUser)}
            type={"success"}
          />
        </>
      )}
    </>
  );
};

export default AlertRenderer;
