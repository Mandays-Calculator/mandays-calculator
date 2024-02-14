import type { ReactElement, ReactNode } from "react";
import type { ApiCommonOptions, MandaysForm } from "..";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormikErrors, useFormikContext } from "formik";
import { Grid, Stack, Typography } from "@mui/material";

import { Accordion, Table } from "~/components";
import { getFieldError } from "~/components/form/utils";
import { FormErrors } from "~/components/form/types";
import LocalizationKey from "~/i18n/key";

import { ResourcesListColumns } from "../../utils/columns";
import { initializeResources } from "../utils/initialValue";
import {
  useResourceErrorAlert,
  renderErrorResource,
} from "../utils/useHandleErrorAlert";

import AddOdcButton from "../components/add-odc-button/AddOdcButton";
import { calculateTotalResourcesOrLeaves } from "../utils/calculate";

import { StyledTableContainer } from "./styles";

interface ResourcesProps {
  mode: EstimationDetailsMode;
  isGeneratingPDF: boolean;
  apiCommonOptions: ApiCommonOptions;
}

const Resources = (props: ResourcesProps): ReactElement => {
  const { mode, isGeneratingPDF, apiCommonOptions } = props;
  const inputView = ["add", "edit"];
  const parentFieldName = "resources";
  const isInput: boolean = inputView.includes(mode);
  const {
    mandaysCalculator: { resourceListTableColumns },
  } = LocalizationKey;
  const careerLevels = apiCommonOptions.careerSteps || [];

  const form = useFormikContext<MandaysForm>();
  const { t } = useTranslation();
  const { values, setFieldValue } = form;
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize career step and resources if empty based on getCareerstep API
  useEffect(() => {
    if (
      careerLevels.length > 0 &&
      !isInitialized &&
      Object.keys(values.resources).length === 0
    ) {
      const initialResources = initializeResources(careerLevels);
      setFieldValue(parentFieldName, initialResources);
      setIsInitialized(true);
    }
  }, []);

  const handleDeleteResources = (index: number, title: string): void => {
    const getResourceByCareerStep = values.resources[title];
    const updatedResources = Array.isArray(getResourceByCareerStep)
      ? getResourceByCareerStep.filter((_, idx) => index !== idx)
      : [];

    values.resources[title] = updatedResources;
    form.setFieldValue(parentFieldName, values.resources);
  };

  const memoizedColumn = useCallback(
    ({ title, selectedODC }: { title: string; selectedODC: string[] }) =>
      ResourcesListColumns({
        t,
        isInput,
        title,
        handleDeleteResources: (index) => handleDeleteResources(index, title),
        odc: apiCommonOptions.odc,
        selectedODC: selectedODC,
        form: form,
        mode: mode,
      }),
    [values, careerLevels],
  );

  const handleAddResource = (title: string): void => {
    const updatedResources: any = { ...values.resources };
    const newResource = {
      odcId: "",
      numberOfResources: "",
      annualLeaves: "",
    };
    updatedResources[title] = [...updatedResources[title], newResource];
    form.setFieldValue(parentFieldName, updatedResources);
  };

  const renderTable = (title: string): ReactNode => {
    const selectedCareer = values.resources[title];
    const odcValues = selectedCareer
      .filter((item) => item.odcId !== "")
      .map((item) => item.odcId);
    return (
      <Accordion key={title} title={title} defaultExpanded={isGeneratingPDF}>
        <StyledTableContainer>
          {values.resources[title]?.length > 0 ? (
            <>
              <Table
                columns={memoizedColumn({
                  title: title,
                  selectedODC: odcValues,
                })}
                data={values.resources[title] || []}
                name="mandays-calculator"
                noDataLabel={t(resourceListTableColumns.noResourceLabel)}
              />
              {renderErrorResource(
                getFieldError(
                  form.errors.resources as unknown as FormikErrors<FormErrors>,
                  title,
                ),
              )}
            </>
          ) : (
            <Typography sx={{ padding: "3rem", textAlign: "center" }}>
              {t(resourceListTableColumns.addResourceLabel)}
            </Typography>
          )}
          {mode !== "view" && (
            <AddOdcButton onClick={() => handleAddResource(title)} />
          )}
        </StyledTableContainer>
      </Accordion>
    );
  };

  const totalResource = useMemo(
    () => calculateTotalResourcesOrLeaves(values),
    [values.resources, handleDeleteResources, handleAddResource],
  );

  return (
    <>
      <Stack spacing={2}>
        <Grid container>
          <Grid textAlign={"left"}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              Total Resources: {<strong>{totalResource}</strong>}
            </Typography>
          </Grid>
        </Grid>
        {Object.keys(values.resources).map((title: string) =>
          renderTable(title),
        )}
      </Stack>
      {useResourceErrorAlert("resources")}
    </>
  );
};

export default Resources;
