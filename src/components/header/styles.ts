import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  height: 70,
  background: theme.palette.background.paper,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}));

const StyledToolBarContainer = styled("div")`
  padding: 0 32px;
`;

export { StyledAppBar, StyledToolBarContainer };
