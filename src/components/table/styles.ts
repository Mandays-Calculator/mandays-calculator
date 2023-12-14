import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledHeaderCell = styled(TableCell, {
  shouldForwardProp: (props: string) => !props.startsWith("$"),
})<{ $minWidth?: string }>(({ $minWidth = "150px" }) => ({
  minWidth: $minWidth, // Set a minimum width for each header cell
  boxSizing: "border-box",
  padding: "16px 12px",
}));

export const StyledHeader = styled(TableRow, {
  shouldForwardProp: (props: string) => !props.startsWith("$"),
})<{ $noColor?: boolean }>(({ theme, $noColor = false }) => ({
  backgroundColor: theme.palette.primary.light,
  "& th": {
    cursor: "pointer",
    background: $noColor ? "#fff" : "#D0DEEA",
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
