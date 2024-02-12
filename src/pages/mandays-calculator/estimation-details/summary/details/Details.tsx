import type { ReactElement } from "react";
import type { CommonOption } from "~/queries/common/options";
import type { MandaysForm } from "../..";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Card, Select } from "~/components";
import { dateFormat } from "~/utils/date";

import {
  calculateTotalManHoursPerPhase,
  calculateTotalResourcesOrLeaves,
} from "../../utils/calculate";

interface Details {
  teamOptions: CommonOption;
  existingODC: string[];
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
  return (
    <Grid container spacing={2} justifyContent="">
      <Grid xs={6} item>
        <Card>
          <Stack direction="column" gap={2}>
            <Grid container>
              <Grid item xs={3}>
                <Typography fontWeight={"bold"}>Start date:</Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography>
                  {dateFormat(summaryData.startDate, "yyyy/MM/DD")}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography fontWeight={"bold"}>End date:</Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography>
                  {dateFormat(summaryData.endDate, "yyyy/MM/DD")}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography fontWeight={"bold"}>Utilization:</Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography>{summaryData.utilization} %</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography fontWeight={"bold"}>Team:</Typography>
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
                <Typography fontWeight={"bold"}>No. of Resources:</Typography>
              </Grid>
              {existingODC.map((exOdc: any, index: number) => (
                <Grid item xs={2} key={index}>
                  <Typography>
                    {calculateTotalResourcesOrLeaves(formState, exOdc.value)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Grid container mb={1.5}>
              <Grid item xs={6}>
                <Typography fontWeight={"bold"}>Leaves:</Typography>
              </Grid>
              {existingODC.map((exOdc: any, index: number) => (
                <Grid item xs={2} key={index}>
                  <Typography>
                    {calculateTotalResourcesOrLeaves(
                      formState,
                      exOdc.value,
                      "annualLeaves",
                    )}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography fontWeight={"bold"}>Total man-days:</Typography>
              </Grid>
              {existingODC.map((_: any, index: number) => (
                <Grid item xs={2} key={index}>
                  <Typography>
                    {calculateTotalManHoursPerPhase(formState) / 8}
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
