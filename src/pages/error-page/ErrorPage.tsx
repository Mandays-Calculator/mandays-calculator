import type { ReactElement, ReactNode } from "react";

import { Typography, styled } from "@mui/material";

import PageNotFound from "~/assets/img/page_not_found.png";
import SomethingWentWrong from "~/assets/img/something_wrong.png";

import { CustomButton } from "~/components/form/button";
import { PageContainer } from "~/components/page-container";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled("div")(() => ({
  display: "flex",
  padding: "2rem",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  flex: "1 0 0",
  alignSelf: "stretch",
  height: "70vh",
}));

const StyledChildContainer = styled("div")(() => ({
  display: "flex",
  width: "27rem",
  paddingLeft: "0px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "1.375rem",
  textAlign: "center",
}));

interface ErrorPageProps {
  type: "something-went-wrong" | "not-found";
}

const ErrorPage = (props: ErrorPageProps): ReactElement => {
  const { type } = props;
  const navigate = useNavigate();

  const goBack = (): void => {
    navigate(-1);
  };

  const renderDetails = (): ReactNode => {
    if (type === "not-found") {
      return (
        <>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            PAGE NOT FOUND
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
          >
            The page you're looking for does not exist.
          </Typography>
          <CustomButton
            type="button"
            onClick={goBack}
          >
            GO BACK HOME
          </CustomButton>
        </>
      );
    }

    if (type === "something-went-wrong") {
      return (
        <>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            SOMETHING WENT WRONG
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
          >
            Please contact the administrator. You can send a report at this email sample@email.com
          </Typography>
          <CustomButton
            type="button"
            onClick={goBack}
          >
            GO BACK HOME
          </CustomButton>
        </>
      );
    }

    return null;
  };
  return (
    <PageContainer>
      <StyledContainer>
        <StyledChildContainer>{renderDetails()}</StyledChildContainer>
        <StyledChildContainer>
          <img
            src={type === "not-found" ? PageNotFound : SomethingWentWrong}
            alt="error"
            width={550}
            height={500}
          />
        </StyledChildContainer>
      </StyledContainer>
    </PageContainer>
  );
};

export default ErrorPage;
