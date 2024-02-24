import type { ReactElement, ReactNode } from "react";

import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LocalizationKey from "~/i18n/key";

import PageNotFound from "~/assets/img/page_not_found.png";
import SomethingWentWrong from "~/assets/img/something_wrong.png";

import { CustomButton } from "~/components/form/button";
import { StyledChildContainer, StyledContainer } from ".";
import { Footer } from "~/components";

interface ErrorPageProps {
  type:
    | "something-went-wrong"
    | "not-found"
    | "permission-error"
    | "permission-denied"
    | "configuration-error"
    | "development-mode"
    | "expired-link";
}

const ErrorPage = (props: ErrorPageProps): ReactElement => {
  const { type } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            <CustomButton type="button" onClick={() => console.log("logout")}>
              {t(common.logout)}
            </CustomButton>
          </>
        );
      case "configuration-error":
        return (
          <>
            <Typography variant="h5" fontWeight="bold">
              {t(common.somethingWentWrongTitle)}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t(common.configurationErrorDesc)}
            </Typography>
          </>
        );
      case "development-mode":
        return (
          <>
            <Typography variant="h5" fontWeight="bold">
              {t(common.pageInProgressTitle)}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t(common.pageInProgressDesc)}
            </Typography>
          </>
        );
      case "expired-link":
        return (
          <>
            <Typography variant="h5" fontWeight="bold">
              Shared Link Expired!
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              Your link has expired. Try requesting from administrator again.
            </Typography>
            <CustomButton type="button" onClick={() => navigate("./login")}>
              {t(common.okayBtn)}
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
    <StyledContainer $type={type}>
      <StyledChildContainer>
        <img
          src={type === "not-found" ? PageNotFound : SomethingWentWrong}
          alt="error"
          width={330}
          height={280}
        />
      </StyledChildContainer>
      <StyledChildContainer>{renderDetails()}</StyledChildContainer>
      {type === "configuration-error" && <Footer />}
    </StyledContainer>
  );
};

export default ErrorPage;
