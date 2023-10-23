import type { ReactElement, Dispatch, SetStateAction } from "react";

import { useTranslation } from "react-i18next";

import { Grid, Box } from "@mui/material";

import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";
import { TextField } from "~/components/form";

import { HolidayColumn } from "../utils/columns";

type AddProps = {
  setAddODC: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
};

const AddODC = (props: AddProps): ReactElement => {
  const { t } = useTranslation();

  const rows = [
    {
      holidayDate: "01/01/2023",
      holidayName: "New Year's Day",
    },
    {
      holidayDate: "25/02/2023",
      holidayName: "EDSA People Power Revolution Anniversary",
    },
    {
      holidayDate: "06/04/2023",
      holidayName: "Maundy Thursday",
    },
    {
      holidayDate: "07/04/2023",
      holidayName: "Good Friday",
    },
    {
      holidayDate: "08/04/2023",
      holidayName: "Black Saturday",
    },
    {
      holidayDate: "10/04/2023",
      holidayName: "Araw ng Kagitingan",
    },
    {
      holidayDate: "21/04/2023",
      holidayName: "Eid'l Fitr",
    },
    {
      holidayDate: "01/05/2023",
      holidayName: "Labor Day",
    },
    {
      holidayDate: "12/06/2023",
      holidayName: "Independence Day",
    },
    {
      holidayDate: "28/06/2023",
      holidayName: "Eid'l Adha",
    },
  ];

  return (
    <>
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              name="odcName"
              label={t('odc.form.odcName')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="abbr"
              label={t('odc.form.abbr')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="location"
              label={t('odc.form.loc')}
            />
          </Grid>
        </Grid>

        <Box marginTop="14px">
          <Table name="HolidayTable" columns={HolidayColumn} data={rows} />
        </Box>

        <Grid container spacing={2} alignItems="center"mt={1}>
          <Grid item xs={12} container justifyContent="flex-end">
            {props.isEdit ? (
              <>
                <CustomButton type="button" sx={{ mr: 2 }}>Edit</CustomButton>
                <CustomButton type="button">Cancel</CustomButton>
              </>
            ) : (
              <CustomButton type="button" onClick={() => props.setAddODC(false)}>Add ODC</CustomButton>
            )}
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default AddODC;
