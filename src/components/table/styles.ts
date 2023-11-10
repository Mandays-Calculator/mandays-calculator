import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledHeader = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  "& th": {
    cursor: "pointer",
    background: "#D0DEEA",
  },
}));

export const StyledCell = styled(TableCell)({
  boxSizing: "border-box",
  padding: "16px 12px",
});

export const StyledStripeRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.background.default,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.secondary.light,
  },
}));

export const StyledHeaderStripeRow = styled(TableRow)({
  background: "#D7EFFF",
});

export const StyledIconButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  right: 0,
  transform: "translate(-50%, -50%)",
});
