import type { ReactElement } from "react";
import type { OdcParam } from "~/api/odc";
import type { AddTableProps } from "../utils";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box, Grid } from "@mui/material";
import { useFormikContext } from "formik";

import { Table } from "~/components";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

import { AddHolidayColumn, NewHolidayData, SucErrData } from "../utils";
import { StyledLabel } from './styles';

const AddTable = (props: AddTableProps): ReactElement => {
  const { setSuccessError } = props;
  const { t } = useTranslation();
  const { odc: { label, btnlabel } } = LocalizationKey;

  const { values, setFieldValue } = useFormikContext<OdcParam>();

  const handleAddHoliday = (): void => {
    setSuccessError(SucErrData);
    const holidays = [];
    const valueHolidays = values.holidays || [];

    holidays.push(...valueHolidays);
    holidays.push(NewHolidayData);

    setFieldValue("holidays", holidays);
  };

  const holidayListColumn = useMemo(() => AddHolidayColumn(t), []);

  return (
    <>
      <Box margin="30px 0px 14px">
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <StyledLabel>{t(label.holidays)}</StyledLabel>
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
      </Box>
      <Table
        name="HolidayTable"
        columns={holidayListColumn}
        data={values?.holidays ?? []}
      />
    </>
  );
};

export default AddTable;
