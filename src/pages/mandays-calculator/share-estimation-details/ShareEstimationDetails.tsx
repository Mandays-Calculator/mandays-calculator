import { type ReactElement } from "react";
import { Grid, Box } from "@mui/material";
import { useUserAuth } from "~/hooks/user";

import { EstimationDetails } from "../estimation-details";
import { Footer } from "~/components";
import { StyledFooterContainer, StyledHeader, StyledText } from "./styles";
import { useGetEstimationLinkDetails } from "~/queries/mandays-est-tool/mandaysEstimationTool";
import { useParams } from "react-router-dom";
import ErrorPage from "~/pages/common/error-page";

const ShareEstimationDetails = (): ReactElement => {
  const auth = useUserAuth();
  const { estimationId } = useParams();
  const linkDetails = useGetEstimationLinkDetails(estimationId as string);
  const isAuthenticated = auth.state.isAuthenticated;
  const isExpired = false;
  return (
    <>
      {isExpired ? (
        <>
          <ErrorPage type="not-found" />
        </>
      ) : (
        <>
          {isAuthenticated ? (
            <EstimationDetails isExposed={false} />
          ) : (
            <>
              <Box px={5} pt={5}>
                <StyledHeader px={2}>
                  <StyledText>Project ABC</StyledText>
                  <StyledText>Enrollment</StyledText>
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
              <StyledFooterContainer>
                <Footer />
              </StyledFooterContainer>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ShareEstimationDetails;
