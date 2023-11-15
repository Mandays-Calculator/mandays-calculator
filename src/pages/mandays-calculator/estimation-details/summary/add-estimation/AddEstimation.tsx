import type { ReactElement } from "react";
import { useFormik } from "formik";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { Form } from "~/components";
import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";

interface SummaryForm {
  name: string;
  team: string;
  utilRate: string;
  startDate: string;
  endDate: string;
}

const initValue: SummaryForm = {
  name: "",
  team: "",
  utilRate: "",
  startDate: "",
  endDate: "",
};

const AddEstimation = (): ReactElement => {
  const summary = useFormik<SummaryForm>({
    initialValues: initValue,
    onSubmit: (val) => console.log(val),
    enableReinitialize: true,
  });
  const { t } = useTranslation();
  const {
    mandaysCalculator: { summaryForm },
  } = LocalizationKey;
  return (
    <Form instance={summary}>
      <Stack
        direction="column"
        spacing={2}
      >
        <Grid
          container
          direction={"row"}
          alignItems={"center"}
        >
          <Grid
            xs={2}
            item
          ></Grid>
          <Grid
            item
            xs={2}
          >
            <Typography
              fontWeight={"bold"}
              variant="subtitle1"
            >
              {t(summaryForm.name)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <ControlledTextField name="name" />
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          alignItems={"center"}
        >
          <Grid
            xs={2}
            item
          ></Grid>
          <Grid
            item
            xs={2}
          >
            <Typography
              fontWeight={"bold"}
              variant="subtitle1"
            >
              {t(summaryForm.team)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <ControlledSelect
              options={[
                {
                  label: "Project Team",
                  value: "team",
                },
              ]}
              name="team"
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          alignItems={"center"}
        >
          <Grid
            xs={2}
            item
          ></Grid>
          <Grid
            item
            xs={2}
          >
            <Typography
              fontWeight={"bold"}
              variant="subtitle1"
            >
              {t(summaryForm.utilization)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
          >
            <ControlledTextField
              placeholder="50"
              name="utilRate"
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          alignItems={"center"}
        >
          <Grid
            xs={2}
            item
          ></Grid>
          <Grid
            item
            xs={2}
          >
            <Typography
              fontWeight={"bold"}
              variant="subtitle1"
            >
              {t(summaryForm.startDate)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <ControlledDatePicker name="startDate" />
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          alignItems={"center"}
        >
          <Grid
            xs={2}
            item
          ></Grid>
          <Grid
            item
            xs={2}
          >
            <Typography
              fontWeight={"bold"}
              variant="subtitle1"
            >
              {t(summaryForm.endDate)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <ControlledDatePicker name="endDate" />
          </Grid>
        </Grid>
      </Stack>
    </Form>
  );
};

export default AddEstimation;
