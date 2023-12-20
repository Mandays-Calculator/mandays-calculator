import type { ReactElement } from "react";
import type { HolidayParam, OdcParam } from "~/api/odc";
import type { EditTableProps } from "../utils";

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography, styled } from "@mui/material";
import { useFormikContext } from "formik";

import { useHolidayList } from "~/queries/odc/ODC";
import { useDeleteHoliday, useUpdateHoliday } from "~/mutations/odc";
import { useRequestHandler } from "~/hooks/request-handler";
import { Table } from "~/components";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

import { EditHolidayColumn, SucErrData, NewHolidayData } from "../utils";

const StyledLabel = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
}));

const EditTable = (props: EditTableProps): ReactElement => {
  const { odcId, setSuccessError } = props;

  const { t } = useTranslation();
  const { odc: { label, btnlabel } } = LocalizationKey;

  const { values, setFieldValue } = useFormikContext<OdcParam>();

  const { data, isError } = useHolidayList(odcId);
  const updateMutation = useUpdateHoliday();
  const deleteMutation = useDeleteHoliday();
  const [updateStatus, updateCallApi] = useRequestHandler(updateMutation.mutate);
  const [deleteStatus, deleteCallApi] = useRequestHandler(deleteMutation.mutate);

  const [holIdx, setHolIdx] = useState<string[]>([]);

  useEffect(() => {
    if (isError)
      setSuccessError({ ...SucErrData, isHolidayError: true });

    if (updateStatus.success)
      setSuccessError({ ...SucErrData, isUpdateHolidaySuccess: true });

    if (!updateStatus.success && updateStatus.error.message !== "")
      setSuccessError({ ...SucErrData, isUpdateHolidayError: true });

    if (deleteStatus.success)
      setSuccessError({ ...SucErrData, isDeleteHolidaySuccess: true });

    if (!deleteStatus.success && deleteStatus.error.message !== "") 
      setSuccessError({ ...SucErrData, isDeleteHolidayError: true });

  }, [isError, updateStatus.success, deleteStatus.success]);

  const handleAddHoliday = (): void => {
    const holidays = [];
    const apiData = data?.data || [];
    const valueHolidays = values.holidays || [];

    holidays.push(...apiData);
    holidays.push(...valueHolidays);
    holidays.push(NewHolidayData);
  
    setFieldValue("holidays", holidays);
  };

  const handleUpdateHoliday = (data: HolidayParam): void => {
    updateCallApi({ data: data });
  };

  const handleDeleteHoliday = (holidayId: string): void => {
    deleteCallApi({ odcId: odcId, id: holidayId });
  };

  const holidayListColumn = useMemo(() => 
    EditHolidayColumn(t, holIdx, setHolIdx, handleDeleteHoliday, handleUpdateHoliday), []);

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
                onClick={() => handleAddHoliday()}
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

export default EditTable;
