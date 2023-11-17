import {
  type ReactElement,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import type { IntValues } from "../utils/interface";

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

type AddProps = {
  setIsAdd: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  idx: number;
};

const AddODC = (props: AddProps): ReactElement => {
  const { t } = useTranslation();
  const { idx, isEdit, setIsAdd } = props;

  const { values, resetForm } = useFormikContext<IntValues>();
  const formikContext = useFormikContext<IntValues>();
  const holidays: HolidayType[] = values?.odcList[idx]?.holidays || [];

  const handleClose = () => {
    if (isEdit) {
      const obj: IntValues = values;
      obj.odcList[idx] = formikContext.initialValues.odcList[idx];
      resetForm({ values: obj });
    } else {
      resetForm();
    }
    setIsAdd(false);
  };

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

  const handleAddODC = () => {
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
      formikContext.setValues(updatedValues);
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
        formikContext.setValues(updatedValues);
        setIsAdd(false);
      } catch (error: ValidationError | unknown) {
        if (error instanceof yup.ValidationError) {
          const errorMappings: Record<
            string,
            React.Dispatch<React.SetStateAction<string | undefined>>
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
    }
  };
  return (
    <>
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ControlledTextField
              name={`odcList.${idx}.name`}
              label={t("odc.form.name")}
              id="name"
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
