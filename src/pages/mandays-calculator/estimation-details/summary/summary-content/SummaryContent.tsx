import type { ReactElement } from "react";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { Table } from "~/components";
import { SummaryListColumns } from "~/pages/mandays-calculator/utils/columns";
import Details from "../details";
import { useLocation } from "react-router-dom";
import { useFormikContext } from "formik";
import { MandaysForm } from "../..";

const SummaryContent = ({
  type,
}: {
  type: "review" | "view";
}): ReactElement => {
  const { t } = useTranslation();
  const location = useLocation();
  const form = useFormikContext<MandaysForm>();
  const formState = type === "review" ? location.state : form.values;
  const summaryColumn = useMemo(
    () => SummaryListColumns({ t, formValues: formState }),
    [],
  );

  return (
    <Stack direction="column" gap={2}>
      <Details type={type} />
      <Table
        columns={summaryColumn}
        data={formState.phases[0].functionalities}
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
