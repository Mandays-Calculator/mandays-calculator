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

import Details from "../details";
import {
  ResourceData,
  getExistingODC,
  networkDays,
  getAllHolidays,
  getTotalResourcesCount,
  getMultipliedEstimations,
} from "../utils/mapper";

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
  const summaryColumn = useMemo(
    () => SummaryListColumns({ t, formValues: formState }),
    [formState],
  );

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

  const calculateTotalManHours = (): number => {
    const checkKeys = ["summary", "resources", "legends", "phases"];
    if (checkKeys.every((item) => formState.hasOwnProperty(item))) {
      const resources = getTotalResourcesCount(
        formState.resources,
        "numberOfResources",
      );

      const resourcesLeaves = getTotalResourcesCount(
        formState.resources,
        "annualLeaves",
      );

      const workingDays = networkDays(
        formState.summary.startDate,
        formState.summary.endDate,
        getAllHolidays(existingODC),
      );

      const calculatedValues = getMultipliedEstimations(formState).map(
        (item: { manHours: number; careerStep: number }) => {
          const utilizationValue =
            item.manHours *
              workingDays *
              (formState.summary.utilizationRate / 100) -
            resourcesLeaves[item.careerStep];
          return isFinite(utilizationValue) ? utilizationValue : 0;
        },
      );

      console.log(resources, "RESOURCES");
      return calculatedValues
        ? calculatedValues.reduce((a: number, b: number) => a + b)
        : 0;
    }

    return 0;
  };

  const roundOffValue = (number: number) => number.toFixed(2);
  const totalManHours = useMemo(() => calculateTotalManHours(), [formState]);

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
            <Typography># of days</Typography>
            <Typography fontWeight={"bold"}>
              {roundOffValue(totalManHours / 8)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SummaryContent;
