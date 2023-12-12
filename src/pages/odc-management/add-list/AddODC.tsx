import type { ReactElement } from "react";
import type { HolidayType, ODCListResponse } from "~/api/odc/types";
import type { FormContext } from "../utils";

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Grid, Box, styled, Typography } from "@mui/material";
import { useFormik } from "formik";

import { Table, Form } from "~/components";
import { CustomButton } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";
import { ControlledTextField } from "~/components/form/controlled";
import LocalizationKey from "~/i18n/key";

import {
  HolidayColumn,
  IntValuesSchema,
  //SubmitFormat
  NewHolidayData,
  FakeHoliday,
} from "../utils";
// import { AddEditFormat } from ".";
import { IsDuplicate } from ".";

const StyledLabel = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
}));

type AddProps = {
  apiData: ODCListResponse[];
  data: ODCListResponse;
  formContext: FormContext;
  setFormContext: (context: FormContext) => void;
};

const AddODC = (props: AddProps): ReactElement => {
  const { apiData, data, formContext, setFormContext } = props;

  const { t } = useTranslation();
  const { odc: { label, btnlabel, validationInfo } } = LocalizationKey;

  const ODCForm = useFormik<ODCListResponse>({
    initialValues: data,
    validationSchema: IntValuesSchema(t),
    enableReinitialize: true,
    onSubmit: (): void => {},
  });

  const { values, setFieldValue, errors } = ODCForm;

  useEffect(() => {
    if (formContext === "Edit")
      setFieldValue("holidays", FakeHoliday);
  }, [data]);

  const [nameUnqError, setNameUnqError] = useState<boolean>(false);
  const [nameUnqErrorMsg, setNameUnqErrorMsg] = useState<string>("");
  const [abbrUnqError, setAbbrUnqError] = useState<boolean>(false);
  const [abbrUnqErrorMsg, setAbbrUnqErrorMsg] = useState<string>("");
  const [holIdx, setHolIdx] = useState<number[]>([]);

  const handleAddODC = (): void => {
    const isNameError = IsDuplicate(apiData, values.name, "name");
    setNameUnqError(isNameError);
    if (isNameError) setNameUnqErrorMsg(t(validationInfo.nameUnq));
    else setNameUnqErrorMsg("");
    
    const isAbbrError = IsDuplicate(apiData, values.abbreviation, "abbreviation");
    setAbbrUnqError(isAbbrError);
    if (isAbbrError) setAbbrUnqErrorMsg(t(validationInfo.abbrUnq));
    else setAbbrUnqErrorMsg("");
  };

  const handleAddHoliday = () => {
    const holidays = values.holidays || [];
    holidays.push(NewHolidayData);
    const upHoliday = holidays.length;
    setHolIdx([...holIdx, upHoliday - 1]);
    setFieldValue("holidays", holidays);
  };

  const handleDeleteHoliday = (index: number): void => {
    const holidays = values.holidays || [];
    holidays[index].active = false;
    setFieldValue("holidays", holidays);
  };

  const handleClose = (): void => setFormContext("");

  const handleError = (error: string | undefined): boolean => {
		return error !== undefined;
	};

  const filterData = values.holidays?.filter((v: HolidayType) => v.active === true);
  const holidayListColumn = useMemo(() => 
    HolidayColumn(t, holIdx, setHolIdx, handleDeleteHoliday)
  , [holIdx]);

  console.log('value', values)

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

      <Box margin="30px 0px 14px">
        <Grid container spacing={2} mb={2}>
          <Grid item xs={9}>
            <StyledLabel>
              {t(label.holidays)}
            </StyledLabel>
          </Grid>
          <Grid item xs={3}>
            <Grid container justifyContent="flex-end">
              <CustomButton
                type="button"
                onClick={handleAddHoliday}
              >
                {t(btnlabel.addHoliday)}
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
        <Table
          name="HolidayTable"
          columns={holidayListColumn}
          data={filterData || []}
        />
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
      </Box>
    </Form>
  );
};

export default AddODC;
