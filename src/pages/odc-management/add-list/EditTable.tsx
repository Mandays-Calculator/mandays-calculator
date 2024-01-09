import type { ReactElement } from "react";
import type { HolidayParam, OdcParam } from "~/api/odc";
import type { EditTableProps } from "../utils";

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography, styled } from "@mui/material";
import { useFormikContext } from "formik";

import { useHolidayList } from "~/queries/odc/ODC";
import { useDeleteHoliday, useUpdateHoliday } from "~/mutations/odc";
import { Table } from "~/components";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

import { EditHolidayColumn, MutationOptions} from "../utils";
import { AddHoliday, removeItem } from ".";

const StyledLabel = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
}));

const EditTable = (props: EditTableProps): ReactElement => {
  const { odcId, setSuccessError } = props;

  const { t } = useTranslation();
  const { odc: { label, btnlabel } } = LocalizationKey;

  const { values, setFieldValue } = useFormikContext<OdcParam>();

  const { data, isError, isLoading, refetch } = useHolidayList(odcId);
  const {
    mutate: updateMutation,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    isLoading: isUpdateLoading
  } = useUpdateHoliday();
  const {
    mutate: deleteMutation,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    isLoading: isDeleteLoading
  } = useDeleteHoliday();

  const [holIdx, setHolIdx] = useState<number[]>([]);

  useEffect(() => {
    MutationOptions(isError, "isHolidayError", setSuccessError);
    MutationOptions(isUpdateSuccess, "isUpdateHolidaySuccess", setSuccessError);
    MutationOptions(isUpdateError, "isUpdateHolidayError", setSuccessError);
    MutationOptions(isDeleteSuccess, "isDeleteHolidaySuccess", setSuccessError);
    MutationOptions(isDeleteError, "isDeleteHolidayError", setSuccessError);

    if (isDeleteSuccess) refetch();
  }, [isLoading, isUpdateLoading, isDeleteLoading]);

  useEffect(() => {
    const apiData = data?.data || [];
    setFieldValue("holidays", apiData);
  }, [data]);

  const handleAddHoliday = (): void => {
    const holidays = [];
    const apiData = data?.data || [];
    const valueHolidays = values.holidays?.filter((value: HolidayParam) => value.id === 0) || [];

    holidays.push(...apiData);
    holidays.push(...valueHolidays);
    holidays.push(AddHoliday(odcId));
  
    setFieldValue("holidays", holidays);
  };

  const handleUpdateHoliday = (data: HolidayParam): void => {
    const arr = removeItem(holIdx, data.id);
    setHolIdx(arr);
    updateMutation({ data: data });
  };

  const handleDeleteHoliday = (id: string, holidayId: number): void => {
    deleteMutation({ odcId: id, id: holidayId });
  };

  const holidayListColumn = useMemo(() => 
    EditHolidayColumn(t, holIdx, setHolIdx, handleDeleteHoliday, handleUpdateHoliday), [holIdx]);

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
