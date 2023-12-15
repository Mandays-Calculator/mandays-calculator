import type { ReactElement } from "react";
import type { HolidayParam, OdcParam } from "~/api/odc";
import type { EditTableProps, SucErrType } from "../utils";

import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography, styled } from "@mui/material";
import { useFormikContext } from "formik";

import { useHolidayList } from "~/queries/odc/ODC";
import { useDeleteHoliday, useUpdateHoliday } from "~/mutations/odc";
import { useRequestHandler } from "~/hooks/request-handler";
import { Table, Alert } from "~/components";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

import { HolidayColumn, FakeHoliday, SucErrData, NewHolidayData } from "../utils";

const StyledLabel = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
}));

const EditTable = (props: EditTableProps): ReactElement => {
  const { odcId } = props;

  const { t } = useTranslation();
  const {
    odc: { label, btnlabel, validationInfo },
    common: { errorMessage: { genericError } }
  } = LocalizationKey;

  const { values, setFieldValue } = useFormikContext<OdcParam>();

  const { data, isError } = useHolidayList(odcId);
  const updateMutation = useUpdateHoliday();
  const deleteMutation = useDeleteHoliday();
  const [updateStatus, updateCallApi] = useRequestHandler(updateMutation.mutate);
  const [deleteStatus, deleteCallApi] = useRequestHandler(deleteMutation.mutate);

  const [holIdx, setHolIdx] = useState<number[]>([]);
  const [successError, setSuccessError] = useState<SucErrType>(SucErrData);

  useEffect(() => {
    if (isError)
      setSuccessError({ ...SucErrData, isError: true });

    if (updateStatus.success)
      setSuccessError({ ...SucErrData, isUpdateSuccess: true });

    if (!updateStatus.success && updateStatus.error.message !== "")
      setSuccessError({ ...SucErrData, isUpdateError: true });

    if (deleteStatus.success)
      setSuccessError({ ...SucErrData, isDeleteSuccess: true });

    if (!deleteStatus.success && deleteStatus.error.message !== "") 
      setSuccessError({ ...SucErrData, isDeleteError: true });

  }, [isError, updateStatus.success, deleteStatus.success]);


  const handleAddHoliday = (): void => {
    const holidays = values.holidays || [];
    holidays.push(NewHolidayData);
    const upHoliday = holidays.length;
    setHolIdx([...holIdx, upHoliday - 1]);
    setFieldValue("holidays", holidays);
  };

  const handleUpdateHoliday = (data: HolidayParam): void => {
    console.log("UpdateAPI");
    updateCallApi({ data: data });
  };

  const handleDeleteHoliday = (holidayId: string): void => {
    console.log("DeleteAPI");
    deleteCallApi({ odcId: odcId, id: holidayId });
  };

  const holidayListColumn = useMemo(() =>
    HolidayColumn(
      t,
      holIdx,
      setHolIdx,
      handleDeleteHoliday,
      handleUpdateHoliday
    )
  , [holIdx]);

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
        <Table
          name="HolidayTable"
          columns={holidayListColumn}
          data={data?.data ?? FakeHoliday}
        />
      </Box>
      {successError.isError && (
        <Alert
          open={successError.isError}
          message={t(genericError)}
          type={"error"}
        />
      )}
      {successError.isUpdateSuccess && (
        <Alert
          open={successError.isUpdateSuccess}
          message={t(validationInfo.submitSuccess)}
          type={"success"}
        />
      )}
      {successError.isUpdateSuccess && (
        <Alert
          open={successError.isUpdateSuccess}
          message={t(validationInfo.submitError)}
          type={"error"}
        />
      )}
      {successError.isDeleteSuccess && (
        <Alert
          open={successError.isDeleteSuccess}
          message={t(validationInfo.deleteSuccess)}
          type={"success"}
        />
      )}
      {successError.isDeleteError && (
        <Alert
          open={successError.isDeleteError}
          message={t(validationInfo.deleteError)}
          type={"error"}
        />
      )}
    </>
  );
};

export default EditTable;