import type { ReactElement } from "react";
import { Grid, TableContainer, TextField, styled } from "@mui/material";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { SvgIcon } from "~/components";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#D0DEEA",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FAFCFD",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F5F7FA",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
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

        <TableContainer component={Paper} sx={{ marginTop: "14px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ODC Name</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Abbreviation</StyledTableCell>
                <StyledTableCell>No. Holidays</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{row.odcName}</StyledTableCell>
                  <StyledTableCell>{row.location}</StyledTableCell>
                  <StyledTableCell>{row.abbreviation}</StyledTableCell>
                  <StyledTableCell>{row.noHolidays}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton color="primary">
                      <SvgIcon name="edit" color="primary" $size={2} />
                    </IconButton>
                    <IconButton>
                      <SvgIcon name="delete" color="error" $size={2} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  );
};

export default ViewODC;
