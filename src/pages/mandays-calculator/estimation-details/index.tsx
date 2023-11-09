import type { ReactElement } from "react";
import { Title } from "~/components";
import { PageContainer } from "~/components";
import { Typography, Grid } from "@mui/material";
import { estimationDetailsData } from "../utils/tableData";
import { Table, CustomTab } from "~/components";
import { CustomButton } from "~/components/form/button";

const EstimationDetails = (): ReactElement => {
  const { columns, data }: any = estimationDetailsData;
  return (
    <>
      <Title title={"Current Estimations"} />
      <PageContainer>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography sx={{ fontSize: "1.1rem", mb: "25px" }}>
              Sprint 1
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Grid container justifyContent={"right"}>
              <Grid item xs={5}>
                <CustomButton>Export</CustomButton>
              </Grid>
              <Grid item xs={5}>
                <CustomButton>Share</CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CustomTab
          tabs={[
            {
              label: "Summary",
              content: <h1>Summary here</h1>,
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
        <Table columns={columns} data={data} name="mandays-calculator" />
      </PageContainer>
    </>
  );
};

export default EstimationDetails;
