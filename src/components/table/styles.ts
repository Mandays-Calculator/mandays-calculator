import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledHeader = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  "& th": {
    cursor: "pointer",
  },
}));

export const StyledCell = styled(TableCell)({
  padding: "16px 12px",
});

export const StyledStripeRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FEFEFE",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#EAF3F4",
  },
});
