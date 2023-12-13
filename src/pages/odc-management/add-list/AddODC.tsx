import type { ReactElement } from "react";
import type { ODCListResponse } from "~/api/odc/types";
import type { AddProps } from "../utils";

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Grid, Box, styled, Typography } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { parseISO } from 'date-fns';

import { Table, Form } from "~/components";
import { CustomButton } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";
import { ControlledTextField, ControlledDatePicker } from "~/components/form/controlled";
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

  const handleDeleteHoliday = (id: number): void => {
    //POST DeleteAPI
    console.log("DeleteAPI", id);
  };

  const handleClose = (): void => setFormContext("");

  const handleError = (error: string | undefined): boolean => {
		return error !== undefined;
	};

  const holidayListColumn = useMemo(() =>
    HolidayColumn(t, holIdx, setHolIdx, handleDeleteHoliday)
  , [holIdx]);

  console.log('api values', values);
  // const holidays = values.holidays || [];
  // let valueDate = "";
  // if (holidays?.length > 0)
  //   valueDate = moment(holidays[0]?.date, "yyyy-MM-dd").format("yyyy/MM/DD");

  let date = "";
  if (values.createDate !== null)
    date = moment(values.createDate).format("MM/DD/yyyy");

  console.log('HA', parseISO("2016-01-01").toString(), date);
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

      <ControlledDatePicker
        name={"createDate"}
        label=""
        value={parseISO("2016-01-01").toString()}
        // value={valueDate}
        // onChange={(value: any) => {
        //   valueDate = moment(value).format("yyyy/MM/DD")
        //   console.log('onChange', value, valueDate)
        // }}
        dateFormat="MM/dd/yyyy"
      />

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
          data={values.holidays || []}
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
