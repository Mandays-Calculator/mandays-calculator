import type { ReactElement, Dispatch, SetStateAction } from "react";
import type { HolidayType, ODCListResponse } from "~/api/odc/types";
import type { IntValues } from "../utils/interface";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Grid, Box, styled, Typography } from "@mui/material";
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
  FakeHoliday,
  NewHolidayData,
} from "../utils";
import { AddEditFormat } from ".";

const StyledLabel = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
}));

type AddProps = {
  setIsAdd: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  idx: number;
  data: ODCListResponse[];
};

const AddODC = (props: AddProps): ReactElement => {
  const { t } = useTranslation();
  const { idx, isEdit, setIsAdd, data } = props;

  const { values, setValues } = useFormikContext<IntValues>();
  const holidays: HolidayType[] = values?.odcList[idx]?.holidays || [];

  const handleFieldValue = (value: string): string => isEdit ? value : "";

  const [fieldValues, setFieldValues] = useState({
    name: handleFieldValue(values?.odcList[idx]?.name),
    abbreviation: handleFieldValue(values?.odcList[idx]?.abbreviation),
    location: handleFieldValue(values?.odcList[idx]?.location),
    holidays: values?.odcList[idx]?.holidays,
  });
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [isAbbrError, setIsAbbrError] = useState<boolean>(false);
  const [isLocError, setIsLocError] = useState<boolean>(false);
  const [odcNameRequiredError, setOdcNameRequiredError] = useState<string | undefined>("");
  const [odcNameUniqueError, setOdcNameUniqueError] = useState<string | undefined>("");
  const [abbreviationRequiredError, setAbbreviationRequiredError] = useState<string | undefined>("");
  const [abbreviationUniqueError, setAbbreviationUniqueError] = useState<string | undefined>("");
  const [locationRequiredError, setLocationRequiredError] = useState<string | undefined>("");
  const [locationUniqueError, setLocationUniqueError] = useState<string | undefined>("");
  const [editIdx, setEditIdx] = useState<number[]>([]);

  useEffect(() => {
    setIsNameError(handleError(odcNameRequiredError) || handleError(odcNameUniqueError));
    setIsLocError(handleError(locationRequiredError) || handleError(locationUniqueError))
    setIsAbbrError(handleError(abbreviationRequiredError) || handleError(abbreviationUniqueError));
  }, [
    odcNameRequiredError, odcNameUniqueError,
    locationRequiredError, locationUniqueError,
    abbreviationRequiredError, abbreviationUniqueError
  ]);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValues({ ...fieldValues, [fieldName]: value });
  };

  const handleError = (error: string | undefined): boolean => {
    let retError = true;
    if (error === undefined || error === null || error === "") retError = false;
    return retError;
  };

  const handleAddODC = (): void => {
    setOdcNameRequiredError("");
    setOdcNameUniqueError("");
    setAbbreviationRequiredError("");
    setAbbreviationUniqueError("");
    setLocationRequiredError("");
    setLocationUniqueError("");

    const list = AddEditFormat(values, fieldValues, idx);

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
      // UpdateAPI (Remove ID on JSON)
      // SubmitFormat(values?.odcList[idx]);
      // SubmitAPI (Complete)
      // values
      setIsAdd(false);
    } catch (error: ValidationError | unknown) {
      if (error instanceof yup.ValidationError) {
        const errorMappings: Record<
          string,
          Dispatch<SetStateAction<string | undefined>>
        > = {
          [`odcList[${idx}].name`]: setOdcNameRequiredError,
          [`odcList[${idx}].abbreviation`]: setAbbreviationRequiredError,
          [`odcList[${idx}].location`]: setLocationRequiredError,
          [`odcList[0].name`]: setOdcNameUniqueError,
          [`odcList[0].abbreviation`]: setAbbreviationUniqueError,
          [`odcList[0].location`]: setLocationUniqueError,
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

  const handleAddHoliday = () => {
    const updatedValues = { ...values };
    const holiday = values.odcList[idx].holidays || [];
    updatedValues.odcList[idx].holidays = [...holiday, NewHolidayData];
    const upHoliday = updatedValues.odcList[idx].holidays?.length || 0;
    setEditIdx([...editIdx, upHoliday - 1]);
    setValues(updatedValues);
  };

  const handleClose = () => {
    const updatedValues = { ...values };
    updatedValues.odcList[idx] = data[idx];
    setValues(updatedValues);
    setIsAdd(false);
  };

  console.log('!values!', values);

  return (
    <>
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2}>
          <Grid item xs={4.5}>
            <ControlledTextField
              name={`odcList.${idx}.name`}
              label={t("odc.label.name")}
              id="name"
              error={isNameError}
              value={fieldValues.name}
              onChange={(event: any) =>
                handleFieldChange("name", event.target.value)
              }
              helperText={odcNameRequiredError || odcNameUniqueError}
            />
          </Grid>
          <Grid item xs={4.5}>
            <ControlledTextField
              name={`odcList.${idx}.location`}
              label={t("odc.label.location")}
              id="location"
              error={isLocError}
              value={fieldValues.location}
              onChange={(event) =>
                handleFieldChange("location", event.target.value)
              }
              helperText={locationRequiredError || locationUniqueError}
            />
          </Grid>
          <Grid item xs={3}>
            <ControlledTextField
              name={`odcList.${idx}.abbreviation`}
              label={t("odc.label.abbreviation")}
              id="abbreviation"
              error={isAbbrError}
              value={fieldValues.abbreviation}
              onChange={(event) =>
                handleFieldChange("abbreviation", event.target.value)
              }
              helperText={abbreviationRequiredError || abbreviationUniqueError}
            />
          </Grid>
        </Grid>

        <Box margin="30px 0px 14px">
          <Grid container spacing={2} mb={2}>
            <Grid item xs={9}>
              <StyledLabel>
                {t("odc.label.holidays")}
              </StyledLabel>
            </Grid>
            <Grid item xs={3}>
              <Grid container justifyContent="flex-end">
                <CustomButton type="button" onClick={handleAddHoliday}>
                  {t("odc.btnlabel.addHoliday")}
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
          <Table
            name="HolidayTable"
            columns={HolidayColumn(t, editIdx, setEditIdx, idx)}
            data={isEdit ? holidays : FakeHoliday}
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
                    {t("odc.btnlabel.save")}
                  </CustomButton>
                  <CustomButton type="button" onClick={handleClose}>
                    {t("odc.btnlabel.cancel")}
                  </CustomButton>
                </>
              ) : (
                <CustomButton type="button" onClick={handleAddODC}>
                  {t("odc.btnlabel.addOdc")}
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
