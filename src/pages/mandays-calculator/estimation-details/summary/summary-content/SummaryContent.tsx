import type { ReactElement } from "react";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { Table } from "~/components";
import { estimationDetailsData } from "~/pages/mandays-calculator/utils/tableData";
import { SummaryListColumns } from "~/pages/mandays-calculator/utils/columns";
import Details from "../details";

const SummaryContent = (): ReactElement => {
  const { t } = useTranslation();

  const summaryColumn = useMemo(() => SummaryListColumns({ t }), []);
  return (
    <Stack direction="column" gap={2}>
      <Details />
      <Table
        columns={summaryColumn}
        data={estimationDetailsData}
        name="mandays-calculator"
      />
      <Grid container>
        <Grid item xs={8.1}></Grid>
        <Grid item xs={3.9}>
          <Stack direction={"row"} gap={2}>
            <Typography>Grand Total:</Typography>
            <Typography fontWeight={"bold"}>50</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8.1}></Grid>
        <Grid item xs={3.9}>
          <Stack direction={"row"} gap={2}>
            <Typography># of days to do OT</Typography>
            <Typography fontWeight={"bold"}>50</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SummaryContent;
