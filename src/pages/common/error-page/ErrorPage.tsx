import type { ReactElement, ReactNode } from "react";

import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LocalizationKey from "~/i18n/key";

import PageNotFound from "~/assets/img/page_not_found.png";
import SomethingWentWrong from "~/assets/img/something_wrong.png";

import { CustomButton } from "~/components/form/button";
import { StyledChildContainer, StyledContainer } from ".";

interface ErrorPageProps {
  type: "something-went-wrong" | "not-found";
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
    if (type === "not-found") {
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
    }

    if (type === "something-went-wrong") {
      return (
        <>
          <Typography variant="h5" fontWeight="bold">
            {t(common.somethingWentWrongDesc)}
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
