import type { ReactElement } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import {
  ControlledDatePicker,
  ControlledNumberInput,
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";

interface WrapperProps {
  title: ReactElement;
  field: ReactElement;
}

const Wrapper = (props: WrapperProps): ReactElement => {
  const { title, field } = props;
  return (
    <Grid
      container
      direction={"row"}
      sx={{ pl: 12 }}
    >
      <Grid
        item
        xs={2}
      >
        {title}
      </Grid>
      <Grid
        item
        xs={6}
      >
        {field}
      </Grid>
    </Grid>
  );
};

const AddEstimation = (): ReactElement => {
  const { t } = useTranslation();
  const {
    mandaysCalculator: { summaryForm },
  } = LocalizationKey;
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ pt: 5 }}
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
        field={<ControlledTextField name="summary.name" />}
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
            name="summary.team"
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
          <>
            <Grid
              container
              alignItems="top"
            >
              <Grid
                item
                sx={{ mr: 1 }}
              >
                <ControlledNumberInput
                  placeholder="50"
                  name="summary.utilRate"
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                >
                  &#37;
                </Typography>
              </Grid>
            </Grid>
          </>
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
        field={<ControlledDatePicker name="summary.startDate" />}
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
        field={<ControlledDatePicker name="summary.endDate" />}
      />
    </Stack>
  );
};

export default AddEstimation;
