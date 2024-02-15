import type { ReactElement } from "react";
import type { ExistingODC, ResourceData } from "../types";
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

import {
  calculateTotalManHoursByOdc,
  calculateTotalManHoursPerPhase,
  calculateTotalResourcesOrLeaves,
  roundOffValue,
} from "../../utils/calculate";

import Details from "../details";
import { getExistingODC } from "../utils/mapper";

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

  const summaryColumn = useMemo(
    () => SummaryListColumns({ t, formValues: formState }),
    [formState, existingODC, odcList, type],
  );

  const totalManHours = useMemo((): number => {
    const checkKeys = ["summary", "resources", "legends", "phases"];
    if (checkKeys.every((item) => formState.hasOwnProperty(item))) {
      const value = calculateTotalManHoursPerPhase(formState);
      return value;
    }
    return 0;
  }, [formState, location, teamOptions, type]);

  const totalMandaysUtilization = useMemo(() => {
    const calculatedValues =
      existingODC.map((exODC: ExistingODC) =>
        roundOffValue(
          calculateTotalManHoursByOdc(
            formState,
            calculateTotalResourcesOrLeaves(formState, exODC.value),
            calculateTotalResourcesOrLeaves(
              formState,
              exODC.value,
              "annualLeaves",
            ),
            exODC.holidays.map((item: any) => item.date),
          ) / 8,
          "days",
        ),
      ) || [];
    return calculatedValues.length > 0
      ? calculatedValues.reduce(
          (a: number | string, b: number | string) => Number(a) + Number(b),
        )
      : 0;
  }, [existingODC, formState, totalManHours]);

  const OTDays = roundOffValue(
    totalManHours / 8 - Number(totalMandaysUtilization),
    "days",
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
              {roundOffValue(totalManHours / 8, "days")} days
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8.1}></Grid>
        <Grid item xs={3.9}>
          <Stack direction={"row"} gap={2}>
            <Typography># of OT days:</Typography>
            <Typography fontWeight={"bold"}>
              {Number(OTDays) > 0 ? Number(OTDays) : 0} days
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SummaryContent;
