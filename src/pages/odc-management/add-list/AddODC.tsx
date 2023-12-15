import type { ReactElement } from "react";
import type { OdcParam } from "~/api/odc/types";
import type { AddProps } from "../utils";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Grid } from "@mui/material";
import { useFormik } from "formik";

import { Form } from "~/components";
import { CustomButton } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";
import { ControlledTextField } from "~/components/form/controlled";
import LocalizationKey from "~/i18n/key";

import {
  IntValuesSchema,
  FakeHoliday,
} from "../utils";
import EditTable from "./EditTable";
import { IsDuplicate } from ".";

const AddODC = (props: AddProps): ReactElement => {
  const { apiData, data, formContext, setFormContext } = props;

  const { t } = useTranslation();
  const { odc: { label, btnlabel, validationInfo } } = LocalizationKey;

  const ODCForm = useFormik<OdcParam>({
    initialValues: data,
    validationSchema: IntValuesSchema(t),
    enableReinitialize: true,
    onSubmit: (): void => {},
  });

  const { values, setFieldValue, errors } = ODCForm;

  useEffect(() => {
    if (formContext === "Edit")
      setFieldValue("holidays", FakeHoliday);
  }, [formContext]);

  const [nameUnqError, setNameUnqError] = useState<boolean>(false);
  const [nameUnqErrorMsg, setNameUnqErrorMsg] = useState<string>("");
  const [abbrUnqError, setAbbrUnqError] = useState<boolean>(false);
  const [abbrUnqErrorMsg, setAbbrUnqErrorMsg] = useState<string>("");

  const handleAddODC = (): void => {
    const isNameError = IsDuplicate(apiData, values.name, "name");
    setNameUnqError(isNameError);
    if (isNameError) setNameUnqErrorMsg(t(validationInfo.nameUnq));
    else setNameUnqErrorMsg("");

    const isAbbrError = IsDuplicate(apiData, values.abbreviation, "abbreviation");
    setAbbrUnqError(isAbbrError);
    if (isAbbrError) setAbbrUnqErrorMsg(t(validationInfo.abbrUnq));
    else setAbbrUnqErrorMsg("");

    console.log('values', values);
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
      {formContext === "Edit" && (
        <EditTable odcId={data.id} />
      )}
      <Grid container spacing={2} alignItems="center" mt={1}>
        <Grid item xs={12} container justifyContent="flex-end">
          {formContext === "Edit" && (
            <>
              <CustomButton
                type="submit"
                sx={{ mr: 2 }}
                onClick={handleAddODC}
              >
                {t(btnlabel.save)}
              </CustomButton>
              <CustomButton
                type="button"
                onClick={handleClose}
              >
                {t(btnlabel.cancel)}
              </CustomButton>
            </>
          )}
          {formContext === "Add" && (
            <CustomButton
              type="submit"
              onClick={handleAddODC}
            >
              {t(btnlabel.addOdc)}
            </CustomButton>
          )}
        </Grid>
      </Grid>
    </Form>
  );
};

export default AddODC;
