import type { ReactElement, ReactNode } from "react";
import type { ApiCommonOptions, MandaysForm } from "..";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormikErrors, useFormikContext } from "formik";
import { Grid, Stack, Typography } from "@mui/material";

import { Accordion, Table, ErrorMessage } from "~/components";
import { getFieldError } from "~/components/form/utils";
import { FormErrors } from "~/components/form/types";
import LocalizationKey from "~/i18n/key";

import { ResourcesListColumns } from "../../utils/columns";
import AddOdcButton from "../components/add-odc-button/AddOdcButton";
import { calculateTotalResources } from "../legend/utils/computeResourceCount";
import { StyledTableContainer } from "./styles";

interface ResourcesProps {
  mode: EstimationDetailsMode;
  isGeneratingPDF: boolean;
  apiCommonOptions: ApiCommonOptions;
}

const Resources = (props: ResourcesProps): ReactElement => {
  const { mode, isGeneratingPDF, apiCommonOptions } = props;
  const { t } = useTranslation();
  const {
    mandaysCalculator: { resourceListTableColumns },
  } = LocalizationKey;
  const form = useFormikContext<MandaysForm>();
  const inputView = ["add", "edit"];
  const isInput: boolean = inputView.includes(mode);

  const careerLevels = apiCommonOptions.careerSteps || [];
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize career step and resources if empty based on getCareerstep API
  useEffect(() => {
    if (
      careerLevels.length > 0 &&
      !isInitialized &&
      Object.keys(form.values.resources).length === 0
    ) {
      const titles = careerLevels.map((cl) => cl.value);

      const initialResources = titles.reduce((acc: any, careerLevel) => {
        acc[careerLevel] = [];
        return acc;
      }, {});
      form.setFieldValue("resource", initialResources);
      setIsInitialized(true);
    }
  }, []);

  const handleDeleteResources = (index: number, title: string): void => {
    const formValues = { ...form.values };
    const getResourceByCareerStep = formValues.resources[title];
    const updatedResources = Array.isArray(getResourceByCareerStep)
      ? getResourceByCareerStep.filter((_, idx) => index !== idx)
      : [];

    formValues.resources[title] = updatedResources;
    form.setFieldValue("resource", formValues.resources);
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
      }),
    [form.values, careerLevels],
  );

  const handleAddResource = (title: string): void => {
    const updatedResources: any = { ...form.values.resources };
    const newResource = {
      odcId: "",
      numberOfResources: "",
      annualLeaves: "",
    };
    updatedResources[title] = [...updatedResources[title], newResource];
    form.setFieldValue("resource", updatedResources);
  };

  const renderErrorResource = (error: string | undefined): ReactNode => {
    if (typeof error !== "object" && typeof error === "string") {
      return <ErrorMessage type="field" error={error} />;
    }
  };

  const renderTable = (title: string): ReactNode => {
    const selectedCareer = form.values.resources[title];
    const odcValues = selectedCareer
      .filter((item) => item.odcId !== "")
      .map((item) => item.odcId);
    return (
      <Accordion key={title} title={title} defaultExpanded={isGeneratingPDF}>
        <StyledTableContainer>
          {form.values.resources[title]?.length > 0 ? (
            <>
              <Table
                columns={memoizedColumn({
                  title: title,
                  selectedODC: odcValues,
                })}
                data={form.values.resources[title] || []}
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
          <AddOdcButton onClick={() => handleAddResource(title)} />
        </StyledTableContainer>
      </Accordion>
    );
  };

  const totalResource = useMemo(
    () => calculateTotalResources(form.values),
    [form.values],
  );

  return (
    <Stack spacing={2}>
      <Grid container>
        <Grid textAlign={"left"}>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            Total Resources: {<strong>{totalResource}</strong>}
          </Typography>
        </Grid>
      </Grid>
      {Object.keys(form.values.resources).map((title: string) =>
        renderTable(title),
      )}
    </Stack>
  );
};

export default Resources;
