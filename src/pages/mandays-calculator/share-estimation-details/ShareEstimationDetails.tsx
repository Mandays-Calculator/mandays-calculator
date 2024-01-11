import type { ReactElement } from "react";
import { Grid } from "@mui/material";
import { useUserAuth } from "~/hooks/user";

import { EstimationDetails } from "../estimation-details";

const ShareEstimationDetails = (): ReactElement => {
  const auth = useUserAuth();

  const isAuthenticated = auth.state.isAuthenticated;

  return (
    <>
      {isAuthenticated ? (
        <EstimationDetails isExposed={false} />
      ) : (
        <Grid container justifyContent={"center"} p={3}>
          <Grid item xs={10}>
            <EstimationDetails isExposed={true} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ShareEstimationDetails;
