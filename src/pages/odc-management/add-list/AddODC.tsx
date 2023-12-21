import type { ReactElement } from "react";
import type { OdcParam } from "~/api/odc/types";
import type { AddProps } from "../utils";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Grid } from "@mui/material";
import { useFormik } from "formik";

import { useAddODC, useUpdateODC, useAddHoliday } from "~/mutations/odc";
import { Form } from "~/components";
import { CustomButton } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";
import { ControlledTextField } from "~/components/form/controlled";
import LocalizationKey from "~/i18n/key";

import { IntValuesSchema, NewODCData, MutationOptions } from "../utils";
import AddTable from "./AddTable";
import EditTable from "./EditTable";
import { IsDuplicate, AddFormat, EditFormat, AddHolidayFormat } from ".";

const AddODC = (props: AddProps): ReactElement => {
  const { apiData, data, formContext, setFormContext, setSuccessError } = props;

  const { t } = useTranslation();
  const { odc: { label, btnlabel, validationInfo } } = LocalizationKey;

  const ODCForm = useFormik<OdcParam>({
    initialValues: NewODCData,
    validationSchema: IntValuesSchema(t),
    onSubmit: (): void => {},
  });

  const { values, setValues, errors } = ODCForm;

  useEffect(() => {
    setValues(data);
  }, [data]);

  const {
    mutate: addMutation,
    isSuccess: isAddOdcSuccess,
    isError: isAddOdcError,
    isLoading: isAddOdcLoading
  } = useAddODC();
  const {
    mutate: updateMutation,
    isSuccess: isUpdateOdcSuccess,
    isError: isUpdateOdcError,
    isLoading: isUpdateOdcLoading
  } = useUpdateODC();
  const {
    mutate: addHolidayMutation,
    isSuccess: isAddHolidaySuccess,
    isError: isAddHolidayError,
    isLoading: isAddHolidayLoading
  } = useAddHoliday();

  const [nameUnqError, setNameUnqError] = useState<boolean>(false);
  const [nameUnqErrorMsg, setNameUnqErrorMsg] = useState<string>("");
  const [abbrUnqError, setAbbrUnqError] = useState<boolean>(false);
  const [abbrUnqErrorMsg, setAbbrUnqErrorMsg] = useState<string>("");

  useEffect(() => {
    MutationOptions(isAddOdcSuccess, "isAddOdcSuccess", setSuccessError);
    MutationOptions(isAddOdcError, "isAddOdcError", setSuccessError);
    MutationOptions(isUpdateOdcSuccess, "isUpdateOdcSuccess", setSuccessError);
    MutationOptions(isUpdateOdcError, "isUpdateOdcError", setSuccessError);
    MutationOptions(isAddHolidaySuccess, "isAddHolidaySuccess", setSuccessError);
    MutationOptions(isAddHolidayError, "isAddHolidayError", setSuccessError);
  }, [isAddOdcLoading, isUpdateOdcLoading, isAddHolidayLoading]);

  const handleAddODC = (): void => {
    const isNameError = IsDuplicate(apiData, values.name, "name", values.id);
    setNameUnqError(isNameError);
    if (isNameError) setNameUnqErrorMsg(t(validationInfo.nameUnq));
    else setNameUnqErrorMsg("");

    const isAbbrError = IsDuplicate(apiData, values.abbreviation, "abbreviation", values.id);
    setAbbrUnqError(isAbbrError);
    if (isAbbrError) setAbbrUnqErrorMsg(t(validationInfo.abbrUnq));
    else setAbbrUnqErrorMsg("");

    if (formContext === "Add") {
      addMutation(AddFormat(values));
    }
    
    if (formContext === "Edit") {
      updateMutation(EditFormat(values));
      addHolidayMutation(AddHolidayFormat(values));
    }
  };

  const handleClose = (): void => setFormContext("");

  const handleError = (error: string | undefined): boolean => {
		return error !== undefined;
	};

  return (
    <Form instance={ODCForm}>
      <Grid container spacing={2}>
        <Grid item xs={4.5}>
          <ControlledTextField
            name={"name"}
            label={t(label.name)}
            id="name"
            error={handleError(errors.name) || nameUnqError}
            helperText={getFieldError(errors, "name") || nameUnqErrorMsg}
          />
        </Grid>
        <Grid item xs={4.5}>
          <ControlledTextField
            name={"location"}
            label={t(label.location)}
            id="location"
            error={handleError(errors.location)}
            helperText={getFieldError(errors, "location")}
          />
        </Grid>
        <Grid item xs={3}>
          <ControlledTextField
            name={"abbreviation"}
            label={t(label.abbreviation)}
            id="abbreviation"
            error={handleError(errors.abbreviation) || abbrUnqError}
            helperText={getFieldError(errors, "abbreviation") || abbrUnqErrorMsg}
          />
        </Grid>
      </Grid>
      {formContext === "Add" && (<AddTable />)}
      {formContext === "Edit" && (
        <EditTable odcId={data.id} setSuccessError={setSuccessError} />
      )}
      <Grid container spacing={2} alignItems="center" mt={1}>
        <Grid item xs={12} container justifyContent="flex-end">
          <CustomButton
            type="submit"
            sx={{ mr: 2 }}
            onClick={handleAddODC}
          >
            {formContext === "Add"
              ? t(btnlabel.addOdc)
              : t(btnlabel.save)
            }
          </CustomButton>
          <CustomButton
            type="button"
            onClick={handleClose}
          >
            {t(btnlabel.cancel)}
          </CustomButton>
        </Grid>
      </Grid>
    </Form>
  );
};

export default AddODC;
