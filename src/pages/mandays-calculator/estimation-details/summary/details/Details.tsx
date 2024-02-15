import type { ReactElement } from "react";
import type { CommonOption } from "~/queries/common/options";
import type { MandaysForm } from "../..";

import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Card, Select } from "~/components";
import { dateFormat } from "~/utils/date";

import {
  calculateTotalManHoursByOdc,
  calculateTotalResourcesOrLeaves,
  roundOffValue,
} from "../../utils/calculate";
import { ExistingODC, Holiday } from "../types";

interface Details {
  teamOptions: CommonOption;
  existingODC: ExistingODC[];
  formState: MandaysForm;
}

const Details = ({
  formState,
  existingODC,
  teamOptions,
}: Details): ReactElement => {
  const summaryData = {
    startDate: formState?.summary?.startDate,
    endDate: formState?.summary?.endDate,
    utilization: formState?.summary?.utilizationRate || "-",
    teamId: formState?.summary?.teamId || "-",
  };

  const { t } = useTranslation();
  const {
    mandaysCalculator: { summaryForm, summaryTableColumns },
  } = LocalizationKey;

  const renderResourceOrLeaves = (
    odcValue: string,
    type?: "numberOfResources" | "annualLeaves",
  ): number => calculateTotalResourcesOrLeaves(formState, odcValue, type);

  const renderTotalManHoursByODC = (existingODC: ExistingODC): number => {
    const holidaysPerODC: string[] = existingODC.holidays.map(
      (item: Holiday) => item.date,
    );

    const manHours = calculateTotalManHoursByOdc(
      formState,
      renderResourceOrLeaves(existingODC.value),
      renderResourceOrLeaves(existingODC.value, "annualLeaves"),
      holidaysPerODC as unknown as Holiday[],
    );

    return manHours / 8;
  };

  return (
    <Grid container spacing={2} justifyContent="">
      <Grid xs={6} item>
        <Card>
          <Stack direction="column" gap={2}>
            <Grid container>
              <Grid item xs={3}>
                <Typography fontWeight={"bold"}>
                  {t(summaryForm.startDate)}:
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography>
                  {dateFormat(summaryData.startDate, "yyyy/MM/DD")}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography fontWeight={"bold"}>
                  {t(summaryForm.endDate)}:
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography>
                  {dateFormat(summaryData.endDate, "yyyy/MM/DD")}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography fontWeight={"bold"}>
                  {t(summaryForm.utilization)}:
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography>{summaryData.utilization} %</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography fontWeight={"bold"}>
                  {t(summaryForm.team)}:
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Select
                  value={summaryData.teamId}
                  options={teamOptions}
                  name="team-label"
                  labelOnly
                />
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </Grid>
      <Grid xs={6} item>
        <Card>
          <Stack direction="column" gap={0.4}>
            <Grid container mb={1.5}>
              <Grid item xs={6}></Grid>
              {existingODC.map((exOdc: any, index: number) => (
                <Grid item xs={2} key={index}>
                  <Typography>{exOdc.location}</Typography>
                </Grid>
              ))}
            </Grid>
            <Grid container mb={1.5}>
              <Grid item xs={6}>
                <Typography fontWeight={"bold"}>
                  {t(summaryForm.noOfResources)}:
                </Typography>
              </Grid>
              {existingODC.map((exOdc: any, index: number) => (
                <Grid item xs={2} key={index}>
                  <Typography>{renderResourceOrLeaves(exOdc.value)}</Typography>
                </Grid>
              ))}
            </Grid>
            <Grid container mb={1.5}>
              <Grid item xs={6}>
                <Typography fontWeight={"bold"}>
                  {t(summaryForm.leaves)}:
                </Typography>
              </Grid>
              {existingODC.map((exOdc: any, index: number) => (
                <Grid item xs={2} key={index}>
                  <Typography>
                    {renderResourceOrLeaves(exOdc.value, "annualLeaves")}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography fontWeight={"bold"}>
                  {t(summaryTableColumns.totalManDays)}:
                </Typography>
              </Grid>
              {existingODC.map((exOdc: any, index: number) => (
                <Grid item xs={2} key={index}>
                  <Typography>
                    {roundOffValue(renderTotalManHoursByODC(exOdc), "days")}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Details;
