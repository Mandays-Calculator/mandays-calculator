import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  List,
} from "@mui/material";
import { CSSObject, Theme, styled } from "@mui/material/styles";

const drawerWidth = 350;

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
  [theme.breakpoints.down("xl")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  maxWidth: 390,
  width: drawerWidth,
  paddingBottom: theme.spacing(6.8),
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
  "*::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "*::-webkit-scrollbar-track": {
    borderRadius: "10px",
    background: "rgba(0,0,0,0.1)",
  },
  "*::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    background: "rgba(0,0,0,0.2)",
  },
  "*::-webkit-scrollbar-thumb:hover": {
    background: "rgba(0,0,0,0.4)",
  },
  "*::-webkit-scrollbar-thumb:active": {
    background: theme.palette.primary.main,
  },
}));

const StyledListItemIcon = styled(ListItemIcon)<{
  open: boolean;
}>`
  min-width: ${({ open }) => (open ? "56px" : "unset")};
`;

const StyledListItem = styled(ListItem)<{
  open: boolean;
}>(
  ({ open, theme }) =>
    `
justify-content: center;
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
}`
);

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean; permissionsLength: number }>(
  ({ open, theme, permissionsLength }) => ({
    padding: open ? "0 0.7rem" : 0,

    [theme.breakpoints.down("xl")]: {
      ...(permissionsLength > 9 && {
        overflowY: "scroll",
        overflowX: "hidden",
        maxHeight: "80%",
        scrollbarWidth: "thin",
      }),
    },
  })
);

const StyledItemText = styled(ListItemText)(({ theme }) => ({
  "& span": {
    color: theme.palette.primary.dark,
    fontSize: "1.15rem",
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

const StyledCollapsibleItem = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open, theme }) => ({
  zIndex: 2000,
  display: "flex",
  position: "absolute",
  left: open ? "16px" : "0",
  justifyContent: "center",
  minHeight: "48px",
  bottom: 10,
  cursor: "pointer",
  alignItems: "center",
  "& p": {
    fontSize: "1.15rem",
    marginLeft: `${theme.spacing(2.1)} !important`,
  },
  "& button": {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down("xl")]: {
    ...(!open && {
      left: "7px",
    }),
    "& p": {
      fontSize: "1rem",
    },
  },
}));

export {
  StyledItemText,
  StyledListItem,
  DrawerHeader,
  StyledListItemIcon,
  StyledDrawer,
  StyledList,
  StyledCollapsibleItem,
};
