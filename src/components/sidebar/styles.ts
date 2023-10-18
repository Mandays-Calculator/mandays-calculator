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

const StyledListItem = styled(ListItem)<{ open: boolean; activepath: boolean }>(
  ({ open, theme, activepath }) =>
    `
margin: ${theme.spacing(1.3, 0)};
min-height: 48px;
cursor: pointer;

div {
  svg {
    color: ${theme.palette.primary.dark};
  }
}

:hover {
  & span,
  div {
    color: ${theme.palette.background.default};

    svg {
      color: ${theme.palette.background.default};
    }
  }

  border-radius: ${open ? "10px" : "0"};
  background-color: ${theme.palette.primary.main};
}

${
  activepath
    ? `& span,
    div {
      color: ${theme.palette.background.default} !important;
  
      svg {
        color: ${theme.palette.background.default};
      }
    }
  border-radius: ${open ? "10px" : "0"};
  background-color: ${theme.palette.primary.main};`
    : ""
}`
);

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open }) => ({
  padding: open ? "0 0.7rem" : 0,
}));

const StyledItemText = styled(ListItemText)(({ theme }) => ({
  "& span": {
    color: theme.palette.primary.dark,
    fontSize: "1.5rem",
    fontWeight: "normal",
  },

  [theme.breakpoints.down("xl")]: {
    "& span": {
      fontSize: "1rem",
    },
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  maxHeight: 70,
  minHeight: 64,
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
