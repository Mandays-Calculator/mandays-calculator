import type { ReactElement } from "react";
import type { EstimationColumn } from "../../utils/types";
import type { ApiCommonOptions, Estimations, MandaysForm } from "..";

import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import { Table, CustomTab } from "~/components";
import { ControlledTextField } from "~/components/form/controlled";
import { getFieldError } from "~/components/form/utils";
import { FormErrors } from "~/components/form/types";

import LocalizationKey from "~/i18n/key";

import { EstimationListColumns } from "../../utils/columns";
import { initializeformPhaseValue } from "../utils/initialValue";
import {
  calculateTotalManHoursPerPhase,
  roundOffValue,
} from "../utils/calculate";
import {
  StyledTabContainer,
  StyledAccordion,
  StyledFooter,
  StyledButton,
} from "./styles";

interface EstimationProps {
  mode: EstimationDetailsMode;
  apiCommonOptions: ApiCommonOptions;
}

const Estimation = (props: EstimationProps): ReactElement => {
  const { mode } = props;
  const form = useFormikContext<MandaysForm>();
  const { t } = useTranslation();

  const {
    mandaysCalculator: {
      taskGrandTotalManDays,
      taskGrandTotalManHours,
      noSelectedTaskLabel,
      estimation: { addPhaseLabel },
    },
  } = LocalizationKey;
  const mappedCareerSteps = Object.entries(form.values.resources)
    .map(
      (resource) =>
        resource[1].length > 0 && { label: resource[0], value: resource[0] },
    )
    .filter(Boolean);

  const estimationListColumn = useCallback(
    (estimations: Estimations[], phaseIndex: number, funcIndex: number) =>
      EstimationListColumns({
        t,
        careerSteps: mappedCareerSteps || [],
        estimations,
        phaseIndex,
        funcIndex,
        form: form,
      }),
    [form.values, form.errors, form.values.legends, form.values.resources],
  );

  const totalManHours = useMemo(
    () => calculateTotalManHoursPerPhase(form.values),
    [form.values],
  );

  useEffect(() => {
    if (mode === "add") {
      const formValuePhase = initializeformPhaseValue(
        form.values,
        (mappedCareerSteps as SelectObject[]) || [],
      );
      form.setFieldValue("phases", formValuePhase);
    }
  }, [mode, form.values.tasks]);

  const estimationTabs = form.values.phases.map(
    (phase, phaseIndex: number) => ({
      label:
        mode === "edit" || "add" ? (
          <>
            <ControlledTextField
              sx={{ maxWidth: 200 }}
              name={`phases[${phaseIndex}].name`}
              error={
                !!getFieldError(
                  form.errors as FormErrors,
                  `phases[${phaseIndex}].name`,
                )
              }
              helperText={getFieldError(
                form.errors as FormErrors,
                `phases[${phaseIndex}].name`,
              )}
            />
          </>
        ) : (
          phase.name
        ),
      content: (
        <>
          {phase.functionalities.map((func, funcIndex: number) => (
            <React.Fragment key={func.id}>
              <StyledAccordion title={func.name} sx={{ mb: 2 }}>
                <Table<EstimationColumn>
                  name="parent-table-estimation"
                  data={(func.estimations as EstimationColumn[]) || []}
                  columns={estimationListColumn(
                    func.estimations,
                    phaseIndex,
                    funcIndex,
                  )}
                />
              </StyledAccordion>
            </React.Fragment>
          ))}
          <Stack direction={"row"} display={"flex"} justifyContent={"flex-end"}>
            <StyledFooter>
              <Typography fontWeight={"bold"}>
                {t(taskGrandTotalManHours, { key: totalManHours })}
              </Typography>
              <Typography fontWeight={"bold"}>
                {t(taskGrandTotalManDays, {
                  key: roundOffValue(totalManHours / 8, "days"),
                })}
              </Typography>
            </StyledFooter>
          </Stack>
        </>
      ),
    }),
  );

  const hasSelectedTask = form.values.tasks.find(
    (item) => item.dndStatus === "selected",
  );

  const handleAddPhase = (): void => {
    const initialPhase = form.values.phases[0];
    if (initialPhase) {
      form.setFieldValue("phases", [
        ...form.values.phases,
        {
          ...initialPhase,
          name: "",
        },
      ]);
    }
  };

  console.log(form.values, "forn values");

  return (
    <Stack gap={2}>
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
      >
        {mode === "add" && hasSelectedTask ? (
          <StyledTabContainer>
            <StyledButton onClick={handleAddPhase}>
              {t(addPhaseLabel)}
            </StyledButton>
            <CustomTab tabs={estimationTabs} />
          </StyledTabContainer>
        ) : (
          <Typography
            sx={{ textAlign: "center", padding: "5rem", margin: "0 auto" }}
          >
            {t(noSelectedTaskLabel)}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default Estimation;
