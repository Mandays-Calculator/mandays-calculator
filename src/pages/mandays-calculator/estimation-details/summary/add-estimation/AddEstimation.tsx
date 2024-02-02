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
import { useCommonOption } from "~/queries/common/options";

interface WrapperProps {
  title: ReactElement;
  field: ReactElement;
  fieldSize?: number;
}

const Wrapper = (props: WrapperProps): ReactElement => {
  const { title, field, fieldSize } = props;
  return (
    <Grid container direction={"row"} sx={{ pl: 12 }}>
      <Grid item xs={2}>
        {title}
      </Grid>
      <Grid item xs={fieldSize || 5}>
        {field}
      </Grid>
    </Grid>
  );
};

const AddEstimation = (): ReactElement => {
  const teams = useCommonOption("team", {
    projectId: "587edb34-bbf2-11ee-a0aa-00090faa0001",
  });

  const { t } = useTranslation();
  const {
    mandaysCalculator: { summaryForm },
  } = LocalizationKey;
  return (
    <Stack direction="column" spacing={2} sx={{ pt: 5 }}>
      <Wrapper
        title={
          <Typography fontWeight={"bold"} variant="subtitle1">
            {t(summaryForm.name)}
          </Typography>
        }
        fieldSize={4}
        field={<ControlledTextField name="summary.estimationName" />}
      />

      <Wrapper
        title={
          <Typography fontWeight={"bold"} variant="subtitle1">
            {t(summaryForm.team)}
          </Typography>
        }
        field={<ControlledSelect options={teams} name="summary.teamId" />}
      />
      <Wrapper
        title={
          <Typography fontWeight={"bold"} variant="subtitle1">
            {t(summaryForm.utilization)}
          </Typography>
        }
        field={
          <>
            <Grid container alignItems="top">
              <Grid item sx={{ mr: 1 }}>
                <ControlledNumberInput
                  placeholder="50"
                  name="summary.utilizationRate"
                />
              </Grid>
              <Grid item>
                <Typography variant="body1" fontWeight="bold">
                  &#37;
                </Typography>
              </Grid>
            </Grid>
          </>
        }
        fieldSize={3}
      />

      <Wrapper
        title={
          <Typography fontWeight={"bold"} variant="subtitle1">
            {t(summaryForm.startDate)}
          </Typography>
        }
        fieldSize={3}
        field={<ControlledDatePicker name="summary.startDate" />}
      />

      <Wrapper
        title={
          <Typography fontWeight={"bold"} variant="subtitle1">
            {t(summaryForm.endDate)}
          </Typography>
        }
        fieldSize={3}
        field={<ControlledDatePicker name="summary.endDate" />}
      />
    </Stack>
  );
};

export default AddEstimation;
