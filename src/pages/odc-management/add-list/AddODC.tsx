import type { ReactElement, Dispatch, SetStateAction } from "react";
import type { IntValues } from "../utils/interface";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as yup from "yup";
import { ValidationError, array, object } from "yup";

import { Grid, Box } from "@mui/material";
import { useFormikContext } from "formik";

import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";
import { ControlledTextField } from "~/components/form/controlled";

import { HolidayColumn } from "../utils/columns";
import { DataTypeSchema, IntValuesSchema } from "../utils/schema";
import { HolidayType } from "~/api/odc/types";
import { SubmitFormat } from "../utils/data";

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
    let retError = false;
    if (error === undefined || error === null || error === "") retError = true;
    return retError;
  };

  const handleAddODC = (): void => {
    if (isEdit) {
      //Edit ODC
      const updatedValues = { ...values };
      const editedODC = {
        id: "0",
        name: fieldValues.name,
        abbreviation: fieldValues.abbreviation,
        location: fieldValues.location,
        holidays: null,
        active: true,
      };

      updatedValues.odcList[idx] = editedODC;
      setValues(updatedValues);
      setIsAdd(false);
    } else {
      //Add ODC
      setOdcNameError("");
      setAbbreviationError("");
      setLocationError("");
      const updatedValues = { ...values };
      const newODC = {
        id: "0",
        name: fieldValues.name,
        abbreviation: fieldValues.abbreviation,
        location: fieldValues.location,
        noHolidays: 0,
        holidays: null,
        active: true,
      };

      const validationSchema = IntValuesSchema.concat(
        object({
          odcList: array().of(DataTypeSchema),
        })
      );

      try {
        validationSchema.validateSync(
          { odcList: [newODC, ...updatedValues.odcList] },
          { abortEarly: false }
        );
        updatedValues.odcList = [newODC, ...updatedValues.odcList];
        setValues(updatedValues);
        const data = SubmitFormat(values?.odcList[idx]);
        console.log("Submit JSON API", data);
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
          setIsNameError(handleError(odcNameError));
          setIsAbbrError(handleError(abbreviationError));
          setIsLocError(handleError(locationError));

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
    }
  };

  // const handleAdd = () => {
  //   // postAddAPI
  //   if (values?.odcList[idx]?.name === "")
  //     setIsNameError(true);
  //   else {
  //     setIsNameError(false);
  //     setIsAdd(false);
  //   }

  //   const data = SubmitFormat(values?.odcList[idx]);
  //   console.log("Submit JSON API", data);
  // };

  // const handleUpdate = () => {
  //   setIsAdd(false);
  //   // postUpdateAPI
  //   console.log("Update JSON API", values?.odcList[idx]);
  // };

  return (
    <>
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ControlledTextField
              name={`odcList.${idx}.name`}
              label={t("odc.form.name")}
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
