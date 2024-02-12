import type { ReactElement } from "react";
import type { MandaysForm } from "../..";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useFormikContext } from "formik";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useUserAuth } from "~/hooks/user";
import { useCommonOption } from "~/queries/common/options";
import { Table } from "~/components";

import { SummaryListColumns } from "~/pages/mandays-calculator/utils/columns";

import { calculateTotalManHours, roundOffValue } from "../../utils/calculate";

import Details from "../details";
import {
  ResourceData,
  getExistingODC,
  getTotalResourcesCount,
} from "../utils/mapper";

roundOffValue;

const SummaryContent = ({
  type,
}: {
  type: "review" | "view";
}): ReactElement => {
  const { t } = useTranslation();
  const location = useLocation();
  const form = useFormikContext<MandaysForm>();
  const formState = type === "review" ? location.state : form.values;
  const user = useUserAuth();

  const functions =
    formState?.phases && formState?.phases[0]?.functionalities
      ? formState?.phases[0]?.functionalities
      : [];

  const teamOptions = useCommonOption("team", {
    projectId: user.state.selectedProject?.value,
  });

  const odcList = useCommonOption("odc", {}, true);

  const existingODC = getExistingODC(
    odcList || [],
    formState.resources as unknown as ResourceData,
  );

  const resources = getTotalResourcesCount(
    formState.resources,
    "numberOfResources",
  );

  // const resourcesLeaves = getTotalResourcesCount(
  //   formState.resources,
  //   "annualLeaves",
  // );

  const summaryColumn = useMemo(
    () =>
      SummaryListColumns({ t, formValues: formState, odcList: existingODC }),
    [formState, existingODC, odcList],
  );

  const totalManHours = useMemo(
    () => calculateTotalManHours(formState, existingODC, resources),
    [formState],
  );
  return (
    <Stack direction="column" gap={2}>
      <Details
        existingODC={existingODC}
        teamOptions={teamOptions}
        formState={formState}
      />
      <Table
        columns={summaryColumn}
        data={functions}
        name="mandays-calculator"
      />
      <Grid container>
        <Grid item xs={8.1}></Grid>
        <Grid item xs={3.9}>
          <Stack direction={"row"} gap={2}>
            <Typography>Grand Total:</Typography>
            <Typography fontWeight={"bold"}>
              {roundOffValue(totalManHours)} hrs
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8.1}></Grid>
        <Grid item xs={3.9}>
          <Stack direction={"row"} gap={2}>
            <Typography># of days:</Typography>
            <Typography fontWeight={"bold"}>
              {roundOffValue(totalManHours / 8, "days")}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SummaryContent;
