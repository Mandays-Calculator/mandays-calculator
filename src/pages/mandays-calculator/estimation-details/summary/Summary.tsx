import type { ReactElement } from "react";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Details from "./details";
import { estimationDetailsData } from "~/pages/mandays-calculator/utils/tableData";

import { Table } from "~/components";

const Summary = (): ReactElement => {
  const { columns, data }: any = estimationDetailsData;
  return (
    <Stack
      direction="column"
      gap={2}
    >
      <Details />
      <Table
        columns={columns}
        data={data}
        name="mandays-calculator"
      />
      <Grid container>
        <Grid
          item
          xs={8.1}
        ></Grid>
        <Grid
          item
          xs={3.9}
        >
          <Stack
            direction={"row"}
            gap={2}
          >
            <Typography>Grand Total:</Typography>
            <Typography fontWeight={"bold"}>50</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={8.1}
        ></Grid>
        <Grid
          item
          xs={3.9}
        >
          <Stack
            direction={"row"}
            gap={2}
          >
            <Typography># of days to do OT</Typography>
            <Typography fontWeight={"bold"}>50</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Summary;
