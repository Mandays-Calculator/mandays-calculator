import type { ReactElement, Dispatch, SetStateAction } from "react";

import { Grid, TextField, styled, Box } from "@mui/material";

import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";

import { ODCColumns } from "../utils/columns";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

type ViewProps = {
  setAddODC: Dispatch<SetStateAction<boolean>>;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ViewODC = (props: ViewProps): ReactElement => {

  const rows = [
    {
      odcName: "Philippines ODC",
      location: "Philippines",
      abbreviation: "PH ODC",
      noHolidays: 26,
    },
    {
      odcName: "Philippines ODC",
      location: "Philippines",
      abbreviation: "PH ODC",
      noHolidays: 26,
    },
  ];

  return (
    <>
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <StyledTextField size="small" placeholder="Enter keyword here..." />
          </Grid>
          <Grid item xs={7} container justifyContent="flex-end">
            <CustomButton type="button" onClick={() => props.setAddODC(true)}>Add ODC</CustomButton>
          </Grid>
        </Grid>

        <Box marginTop="14px">
          <Table name="ODCTable" columns={ODCColumns(props.setDeleteModalOpen)} data={rows} />
        </Box>
      </PageContainer>
    </>
  );
};

export default ViewODC;
