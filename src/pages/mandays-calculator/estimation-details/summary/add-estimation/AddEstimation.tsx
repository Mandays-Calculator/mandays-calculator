import { useEffect, type ReactElement } from "react";
import type { MandaysForm } from "../..";

import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import {
  ControlledDatePicker,
  ControlledNumberInput,
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";

import LocalizationKey from "~/i18n/key";
import { useCommonOption } from "~/queries/common/options";
import { ErrorMessage } from "~/components";
import { getFieldError } from "~/components/form/utils";
import { useUserAuth } from "~/hooks/user";
import { parentFormKeys } from "../../utils/constants";

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
  const {
    mandaysCalculator: { summaryForm },
  } = LocalizationKey;

  const formParentKey = parentFormKeys.summary;

  const { errors, values, setFieldValue } = useFormikContext<MandaysForm>();
  const { t } = useTranslation();
  const user = useUserAuth();

  const teams = useCommonOption("team", {
    projectId: user.state.selectedProject?.value,
  });

  useEffect(() => {
    if (values.summary.teamId) {
      const teamName = teams.find(
        (team) => team.value === values.summary.teamId,
      );
      setFieldValue(`${formParentKey}.teamName`, teamName?.label);
    }
  }, [values.summary.teamId]);

  return (
    <Stack direction="column" spacing={2} sx={{ pt: 5 }}>
      <Wrapper
        title={
          <Typography fontWeight={"bold"} variant="subtitle1">
            {t(summaryForm.name)}
          </Typography>
        }
        fieldSize={4}
        field={<ControlledTextField name={`${formParentKey}.estimationName`} />}
      />

      <Wrapper
        title={
          <Typography fontWeight={"bold"} variant="subtitle1">
            {t(summaryForm.team)}
          </Typography>
        }
        field={
          <>
            <ControlledSelect
              options={teams}
              name={`${formParentKey}.teamId`}
              error={!!getFieldError(errors.summary, "teamId")}
            />
            <ErrorMessage
              type="field"
              error={getFieldError(errors.summary, "teamId")}
            />
          </>
        }
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
                  placeholder=""
                  name={`${formParentKey}.utilizationRate`}
                  error={!!errors.summary?.utilizationRate}
                />
              </Grid>
              <Grid item>
                <Typography variant="body1" fontWeight="bold">
                  &#37;
                </Typography>
              </Grid>
            </Grid>
            <ErrorMessage
              type="field"
              error={getFieldError(errors.summary, "utilizationRate")}
            />
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
        field={
          <ControlledDatePicker
            name={`${formParentKey}.startDate`}
            helperText={getFieldError(errors.summary, "startDate")}
            error={!!getFieldError(errors.summary, "startDate")}
          />
        }
      />
      <Wrapper
        title={
          <Typography fontWeight={"bold"} variant="subtitle1">
            {t(summaryForm.endDate)}
          </Typography>
        }
        fieldSize={3}
        field={
          <ControlledDatePicker
            name={`${formParentKey}.endDate`}
            error={!!getFieldError(errors.summary, "endDate")}
            helperText={getFieldError(errors.summary, "endDate")}
          />
        }
      />
    </Stack>
  );
};

export default AddEstimation;
