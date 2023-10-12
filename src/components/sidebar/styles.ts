import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  List,
} from "@mui/material";
import { CSSObject, Theme, styled } from "@mui/material/styles";

const drawerWidth = 320;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  maxWidth: 390,
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledListItemIcon = styled(ListItemIcon)``;

const StyledListItem = styled(ListItem)<{ isOpen: boolean; isActive: boolean }>(
  ({ isOpen, theme, isActive }) =>
    `
margin: 10px 0;
min-height: 48px;
cursor: pointer;

:hover {
  & span,
  div {
    color: ${theme.palette.background.default};
  }

  border-radius: ${isOpen ? "10px" : "0"};
  background-color: ${theme.palette.primary.main};
}

${
  isActive &&
  `& span,
  div {
  color: ${theme.palette.background.default};
  }
  border-radius: ${isOpen ? "10px" : "0"};
  background-color: ${theme.palette.primary.main};`
}`
);

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ isOpen: boolean }>(({ isOpen }) => ({
  padding: isOpen ? "0 10px" : 0,
}));

const StyledItemText = styled(ListItemText)`
  & span {
    color: #414145;
    font-size: 18px;
    font-weight: normal;
  }
`;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  height: 70,
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(1, 1),
}));

export {
  StyledItemText,
  StyledListItem,
  DrawerHeader,
  StyledListItemIcon,
  StyledDrawer,
  StyledList,
};
