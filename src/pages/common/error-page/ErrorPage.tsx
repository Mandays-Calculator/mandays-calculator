import type { ReactElement, ReactNode } from "react";

import { useAuth } from "react-oidc-context";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LocalizationKey from "~/i18n/key";
import { logout } from "~/utils/oidc-utils";

import PageNotFound from "~/assets/img/page_not_found.png";
import SomethingWentWrong from "~/assets/img/something_wrong.png";

import { CustomButton } from "~/components/form/button";
import { StyledChildContainer, StyledContainer } from ".";

interface ErrorPageProps {
  type:
    | "something-went-wrong"
    | "not-found"
    | "permission-error"
    | "permission-denied";
}

const ErrorPage = (props: ErrorPageProps): ReactElement => {
  const { type } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();

  const { common } = LocalizationKey;
  const goBack = (): void => {
    navigate(-1);
  };

  const renderDetails = (): ReactNode => {
    switch (type) {
      case "not-found":
        return (
          <>
            <Typography variant="h5" fontWeight="bold">
              {t(common.pageNotFoundTitle)}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t(common.pageNotFoundDesc)}
            </Typography>
            <CustomButton type="button" onClick={goBack}>
              {t(common.goBackHomeBtnLabel)}
            </CustomButton>
          </>
        );
      case "permission-denied":
        return (
          <>
            <Typography variant="h5" fontWeight="bold">
              {t(common.permissionDeniedTitle)}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t(common.permissionDeniedDesc)}
            </Typography>
            <CustomButton type="button" onClick={goBack}>
              {t(common.goBackHomeBtnLabel)}
            </CustomButton>
          </>
        );
      case "permission-error":
        return (
          <>
            <Typography variant="h5" fontWeight="bold">
              {t(common.permissionErrorTitle)}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t(common.permissionErrorDesc)}
            </Typography>
            <CustomButton type="button" onClick={() => logout(auth)}>
              {t(common.logout)}
            </CustomButton>
          </>
        );
      default:
        return (
          <>
            <Typography variant="h5" fontWeight="bold">
              {t(common.somethingWentWrongTitle)}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t(common.somethingWentWrongDesc)}
            </Typography>
            <CustomButton type="button" onClick={goBack}>
              {t(common.goBackHomeBtnLabel)}
            </CustomButton>
          </>
        );
    }
  };

  return (
    <StyledContainer>
      <StyledChildContainer>
        <img
          src={type === "not-found" ? PageNotFound : SomethingWentWrong}
          alt="error"
          width={330}
          height={280}
        />
      </StyledChildContainer>
      <StyledChildContainer>{renderDetails()}</StyledChildContainer>
    </StyledContainer>
  );
};

export default ErrorPage;
