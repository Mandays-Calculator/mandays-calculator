import { type ReactElement, Suspense } from "react";
import LocalizationKey from "~/i18n/key";
import { useTranslation } from "react-i18next";
import { Grid, Box } from "@mui/material";
import { useUserAuth } from "~/hooks/user";

import { Alert, Footer, PageLoader } from "~/components";
import { StyledHeader, StyledText, ShareMandaysContainer } from "./styles";
import { useGetEstimationLinkDetails } from "~/queries/mandays-est-tool/mandaysEstimationTool";
import { Navigate, useParams } from "react-router-dom";
import ErrorPage from "~/pages/common/error-page";

import { EstimationDetails } from "../estimation-details";
import { validateEstimationExpiryLink } from "./utils";

const ShareEstimationDetails = (): ReactElement => {
  const { t } = useTranslation();
  const { common } = LocalizationKey;
  const auth = useUserAuth();
  const {
    estimationId = "",
    estimationCode = "",
    createdDate = 0,
    expirationInSec = 0,
  } = useParams();

  const linkDetails = useGetEstimationLinkDetails(estimationCode as string);
  const isAuthenticated = auth.state.isAuthenticated;
  const isExpired = !validateEstimationExpiryLink(
    Number(createdDate),
    Number(expirationInSec),
  );
  const headerData = {
    project: "Project ABC",
    team: "Enrollment",
  };

  return (
    <Suspense fallback={<PageLoader />}>
      {isExpired ? (
        <>
          <ErrorPage type="expired-link" />
        </>
      ) : (
        <>
          {isAuthenticated ? (
            <Navigate to={`/shared-mandays-estimation-tool/${estimationId}`} />
          ) : (
            <>
              <ShareMandaysContainer>
                <Box px={5} pt={5}>
                  <StyledHeader px={2}>
                    <StyledText>{headerData.project}</StyledText>
                    <StyledText>{headerData.team}</StyledText>
                  </StyledHeader>
                </Box>

                <Grid px={5} pb={5} pt={2}>
                  <Grid item xs={10}>
                    <EstimationDetails
                      isExposed={true}
                      linkDetails={linkDetails.data}
                    />
                  </Grid>
                </Grid>
              </ShareMandaysContainer>
              <Footer />
            </>
          )}
        </>
      )}
      {linkDetails.isError && (
        <Alert
          type="error"
          duration={3000}
          open={linkDetails.isError}
          message={t(common.errorMessage.genericError)}
        />
      )}
    </Suspense>
  );
};

export default ShareEstimationDetails;
