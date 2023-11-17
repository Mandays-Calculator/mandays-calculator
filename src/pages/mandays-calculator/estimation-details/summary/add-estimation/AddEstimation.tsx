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

interface WrapperProps {
  title: ReactElement;
  field: ReactElement;
}

const initValue: SummaryForm = {
  name: "",
  team: "",
  utilRate: "",
  startDate: "",
  endDate: "",
};

const Wrapper = (props: WrapperProps): ReactElement => {
  const { title, field } = props;
  return (
    <Grid
      container
      direction={"row"}
      alignItems={"center"}
    >
      <Grid
        xs={4}
        item
      ></Grid>
      <Grid
        item
        xs={2}
      >
        {title}
      </Grid>
      <Grid
        item
        xs={4}
      >
        {field}
      </Grid>
    </Grid>
  );
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
        <Wrapper
          title={
            <Typography
              fontWeight={"bold"}
              variant="subtitle1"
            >
              {t(summaryForm.name)}
            </Typography>
          }
          field={<ControlledTextField name="name" />}
        />

        <Wrapper
          title={
            <Typography
              fontWeight={"bold"}
              variant="subtitle1"
            >
              {t(summaryForm.team)}
            </Typography>
          }
          field={
            <ControlledSelect
              options={[
                {
                  label: "Project Team",
                  value: "team",
                },
              ]}
              name="team"
            />
          }
        />
        <Wrapper
          title={
            <Typography
              fontWeight={"bold"}
              variant="subtitle1"
            >
              {t(summaryForm.utilization)}
            </Typography>
          }
          field={
            <ControlledTextField
              placeholder="50"
              name="utilRate"
            />
          }
        />

        <Wrapper
          title={
            <Typography
              fontWeight={"bold"}
              variant="subtitle1"
            >
              {t(summaryForm.startDate)}
            </Typography>
          }
          field={<ControlledDatePicker name="startDate" />}
        />

        <Wrapper
          title={
            <Typography
              fontWeight={"bold"}
              variant="subtitle1"
            >
              {t(summaryForm.endDate)}
            </Typography>
          }
          field={<ControlledDatePicker name="endDate" />}
        />
      </Stack>
    </Form>
  );
};

export default AddEstimation;
