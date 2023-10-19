import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  maxHeight: 70,
  background: theme.palette.background.paper,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}));

const StyledToolBarContainer = styled("div")`
  padding: ${({ theme }) => theme.spacing(0, 4)};
`;

export { StyledAppBar, StyledToolBarContainer };
