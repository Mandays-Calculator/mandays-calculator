import type { ReactElement, Dispatch, SetStateAction } from "react";
import type { HolidayType } from "~/api/odc/types";
import type { IntValues } from "../utils/interface";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Grid, Box } from "@mui/material";
import { useFormikContext } from "formik";
import * as yup from "yup";
import { ValidationError, array, object } from "yup";

import { Table, PageContainer } from "~/components";
import { CustomButton } from "~/components/form/button";
import { ControlledTextField } from "~/components/form/controlled";

import {
  HolidayColumn,
  DataTypeSchema,
  IntValuesSchema,
  //SubmitFormat
} from "../utils";
import { AddEditFormat } from ".";

type AddProps = {
  setIsAdd: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  idx: number;
};

const AddODC = (props: AddProps): ReactElement => {
  const { t } = useTranslation();
  const { idx, isEdit, setIsAdd } = props;

  const { values, resetForm, setValues } = useFormikContext<IntValues>();
  const holidays: HolidayType[] = values?.odcList[idx]?.holidays || [];

  const handleClose = () => {
    resetForm();
    setIsAdd(false);
  };

  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [isAbbrError, setIsAbbrError] = useState<boolean>(false);
  const [isLocError, setIsLocError] = useState<boolean>(false);

  const [fieldValues, setFieldValues] = useState({
    name: isEdit ? values.odcList[idx].name : "",
    abbreviation: isEdit ? values.odcList[idx].abbreviation : "",
    location: isEdit ? values.odcList[idx].location : "",
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValues({ ...fieldValues, [fieldName]: value });
  };

  const [odcNameError, setOdcNameError] = useState<string | undefined>("");
  const [abbreviationError, setAbbreviationError] = useState<
    string | undefined
  >("");
  const [locationError, setLocationError] = useState<string | undefined>("");

  const handleError = (error: string | undefined): boolean => {
    let retError = true;
    if (error === undefined || error === null || error === "") retError = false;
    return retError;
  };

  useEffect(() => {
    setIsNameError(handleError(odcNameError));
    setIsLocError(handleError(locationError))
    setIsAbbrError(handleError(abbreviationError));
  }, [odcNameError, locationError, abbreviationError])

  const handleAddODC = (): void => {
    setOdcNameError("");
    setAbbreviationError("");
    setLocationError("");

    const list = AddEditFormat(values, fieldValues, idx, isEdit)

    const validationSchema = IntValuesSchema.concat(
      object({
        odcList: array().of(DataTypeSchema),
      })
    );

    try {
      validationSchema.validateSync(
        { odcList: list },
        { abortEarly: false }
      );
      setValues({ odcList: list });
      // const data = SubmitFormat(values?.odcList[idx]);
      // console.log("Submit JSON API", data);
      setIsAdd(false);
    } catch (error: ValidationError | unknown) {
      if (error instanceof yup.ValidationError) {
        const errorMappings: Record<
          string,
          Dispatch<SetStateAction<string | undefined>>
        > = {
          "odcList[0].name": setOdcNameError,
          "odcList[0].abbreviation": setAbbreviationError,
          "odcList[0].location": setLocationError,
        };

        error.inner.forEach((e) => {
          if (e.path) {
            const setError = errorMappings[e.path];
            if (setError) {
              setError(e.message);
            }
          }
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ControlledTextField
              name={`odcList.${idx}.name`}
              label={t("odc.form.odcName")}
              id="name"
              error={isNameError}
              value={fieldValues.name}
              onChange={(event: any) =>
                handleFieldChange("name", event.target.value)
              }
              helperText={odcNameError}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextField
              name={`odcList.${idx}.abbreviation`}
              label={t("odc.form.abbr")}
              id="abbreviation"
              error={isAbbrError}
              value={fieldValues.abbreviation}
              onChange={(event) =>
                handleFieldChange("abbreviation", event.target.value)
              }
              helperText={abbreviationError}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextField
              name={`odcList.${idx}.location`}
              label={t("odc.form.loc")}
              id="location"
              error={isLocError}
              value={fieldValues.location}
              onChange={(event) =>
                handleFieldChange("location", event.target.value)
              }
              helperText={locationError}
            />
          </Grid>
        </Grid>

        <Box margin="14px 0px">
          <Table
            name="HolidayTable"
            columns={HolidayColumn}
            data={isEdit ? holidays : []}
          />
          <Grid container spacing={2} alignItems="center" mt={1}>
            <Grid item xs={12} container justifyContent="flex-end">
              {isEdit ? (
                <>
                  <CustomButton
                    type="button"
                    sx={{ mr: 2 }}
                    onClick={handleAddODC}
                  >
                    {t("odc.button.save")}
                  </CustomButton>
                  <CustomButton type="button" onClick={handleClose}>
                    {t("odc.button.cancel")}
                  </CustomButton>
                </>
              ) : (
                <CustomButton type="button" onClick={handleAddODC}>
                  {t("odc.button.add")}
                </CustomButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
};

export default AddODC;
