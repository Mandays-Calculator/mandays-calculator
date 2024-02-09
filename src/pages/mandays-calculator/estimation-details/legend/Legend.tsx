import type { ReactElement } from "react";
import type { ApiCommonOptions, MandaysForm } from "../types";

import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import LocalizationKey from "~/i18n/key";
import { Table } from "~/components";
import { LegendListColumns } from "~/pages/mandays-calculator/utils/columns";

interface LegendProps {
  mode: EstimationDetailsMode;
  apiCommonOptions: ApiCommonOptions;
}

const Legend = (props: LegendProps): ReactElement => {
  const { mode, apiCommonOptions } = props;
  const { t } = useTranslation();
  const { mandaysCalculator } = LocalizationKey;
  const { complexities, careerSteps } = apiCommonOptions;

  const form = useFormikContext<MandaysForm>();
  const { values, setFieldValue } = form;

  // Initialize career step and resources if empty based on getCareerstep API
  useEffect(() => {
    if (
      complexities &&
      careerSteps &&
      (!values.legends || Object.keys(values.legends).length === 0)
    ) {
      const initialResources: Record<
        string,
        Array<{ careerStep: string; manHours: number }>
      > = {};
      if (complexities && careerSteps) {
        complexities.forEach((complexity) => {
          initialResources[complexity.value] = careerSteps.map(
            (careerStep) => ({
              careerStep: careerStep.label,
              manHours: 0,
            }),
          );
        });
      }
      setFieldValue("legends", initialResources);
    }
  }, [complexities, careerSteps]);

  const inputView = ["add", "edit"];
  const isInput: boolean = inputView.includes(mode);
  const columnsMemo = useMemo(
    () =>
      LegendListColumns({
        t,
        isInput,
        complexities: complexities || [],
        careerSteps: careerSteps || [],
        form: form,
      }),
    [complexities, careerSteps], // Include the dependencies
  );

  console.log(values, "values");

  return (
    <Stack gap={3}>
      <Typography variant="subtitle1" fontWeight="bold" color="primary">
        {t(mandaysCalculator.legend.tableTitle)}
      </Typography>
      <Table
        name="legend-table"
        columns={columnsMemo}
        data={Object.entries(values.legends).map(
          ([complexity, careerSteps]) => ({
            complexity,
            ...(careerSteps || []).reduce((acc: any, step) => {
              acc[step.careerStep] = step.manHours;
              return acc;
            }, {}),
          }),
        )}
      />
    </Stack>
  );
};

export default Legend;
