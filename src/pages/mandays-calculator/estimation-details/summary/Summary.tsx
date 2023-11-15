import type { ReactElement } from "react";

import { useTranslation } from "react-i18next";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Table } from "~/components";

import { estimationDetailsData } from "../../utils/tableData";
import { SummaryListColumns } from "../../utils/columns";
import Details from "./details";
import AddEstimation from "./add-estimation";

interface SummaryProps {
  mode: EstimationDetailsMode;
}

const Summary = (props: SummaryProps): ReactElement => {
  const { mode } = props;

  const { t } = useTranslation();
  const inputView = ["add", "edit"];
  const isInput = inputView.includes(mode);
  return isInput ? (
    <AddEstimation />
  ) : (
    <Stack
      direction="column"
      gap={2}
    >
      <Details />
      <Table
        columns={SummaryListColumns({ t })}
        data={estimationDetailsData}
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
