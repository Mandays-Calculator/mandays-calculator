import type { ReactElement } from "react";
import { Grid } from "@mui/material";
import { useAuth } from "react-oidc-context";
import { EstimationDetails } from "../estimation-details";

const ShareEstimationDetails = (): ReactElement => {
  const auth = useAuth();

  const isAuthenticated = auth.isAuthenticated;
  return (
    <>
      {isAuthenticated ? (
        <EstimationDetails isShared={true} />
      ) : (
        <Grid container justifyContent={"center"} p={3}>
          <Grid item xs={10}>
            <EstimationDetails isShared={true} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ShareEstimationDetails;