import type { ReactElement } from "react";
import { Column } from "react-table";
import { Grid, TextField, IconButton, styled, Box } from "@mui/material";
import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { SvgIcon, Table } from "~/components";

type DataType = {
  odcName: string;
  location: string;
  abbreviation: string;
  noHolidays: number;
};

type ColumnType = Column<DataType> & { id?: string };

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

const ViewODC = (): ReactElement => {
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

  const columns: ColumnType[] = [
    {
      Header: "ODC Name",
      accessor: "odcName",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Abbreviation",
      accessor: "abbreviation",
    },
    {
      Header: "No. Holidays",
      accessor: "noHolidays",
    },
    {
      Header: "",
      id: "actions",
      Cell: () => (
        <>
          <IconButton color="primary">
            <SvgIcon name="edit" color="primary" $size={2} />
          </IconButton>
          <IconButton>
            <SvgIcon name="delete" color="error" $size={2} />
          </IconButton>
        </>
      ),
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
            <CustomButton type="button">Add ODC</CustomButton>
          </Grid>
        </Grid>

        <Box marginTop="14px">
          <Table name="ODCTable" columns={columns} data={rows} />
        </Box>
      </PageContainer>
    </>
  );
};

export default ViewODC;
