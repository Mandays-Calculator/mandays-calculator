import type { ReactElement } from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Card } from "~/components";

interface SampleDataType {
  startDate: string;
  endDate: string;
  utilization: number;
}
const sampleData1 = {
  startDate: "09/11/2023",
  endDate: "09/11/2023",
  utilization: 90,
};
const Details = (): ReactElement => {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        xs={6}
        item
      >
        <Card>
          <Stack
            direction="column"
            gap={2}
          >
            {Object.keys(sampleData1).map((item) => (
              <Grid container>
                <Grid
                  item
                  xs={3}
                >
                  <Typography fontWeight={"bold"}>{item.toUpperCase()}:</Typography>
                </Grid>
                <Grid
                  xs={6}
                  item
                >
                  <Typography>{sampleData1[item as keyof SampleDataType]}</Typography>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Card>
      </Grid>
      <Grid
        xs={6}
        item
      >
        <Card>
          <Stack
            direction="column"
            gap={0.4}
          >
            <Grid container>
              <Grid
                item
                xs={6}
              ></Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>PH</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>HK</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>MY</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={6}
              >
                <Typography fontWeight={"bold"}>No. of Resources:</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>0</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>0</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>0</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={6}
              >
                <Typography fontWeight={"bold"}>Leaves:</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>0</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>0</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>0</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={6}
              >
                <Typography fontWeight={"bold"}>Total man-days:</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>0</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>0</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography>0</Typography>
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Details;
