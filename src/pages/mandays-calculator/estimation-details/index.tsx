import type { ReactElement } from "react";
import { Title } from "~/components";
import { PageContainer } from "~/components";
import { Typography, Grid, Stack } from "@mui/material";

import { CustomTab } from "~/components";
import { CustomButton } from "~/components/form/button";

import Summary from "./summary";
import { useNavigate } from "react-router-dom";

const EstimationDetails = (): ReactElement => {
  const navigate = useNavigate();

  const goBack = (): void => {
    navigate(-1);
  };
  return (
    <>
      <Title title={"Current Estimations"} />
      <PageContainer>
        <Grid
          container
          justifyContent="space-between"
        >
          <Grid item>
            <Typography sx={{ fontSize: "1.1rem", mb: "25px" }}>Sprint 1</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Grid
              container
              justifyContent={"right"}
            >
              <Grid
                item
                xs={5}
              >
                <CustomButton>Export</CustomButton>
              </Grid>
              <Grid
                item
                xs={5}
              >
                <CustomButton>Share</CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CustomTab
          tabs={[
            {
              label: "Summary",
              content: <Summary />,
            },
            {
              label: "Resources",
              content: <h1>Resources here</h1>,
            },
            {
              label: "Legend",
              content: <h1>Legend here</h1>,
            },
            {
              label: "Tasks",
              content: <h1>Tasks here</h1>,
            },
          ]}
        />
        <Stack
          display="flex"
          justifyContent={"flex-end"}
          flexDirection={"row"}
          gap={2}
        >
          <CustomButton onClick={goBack}>BACK</CustomButton>
        </Stack>
      </PageContainer>
    </>
  );
};

export default EstimationDetails;
