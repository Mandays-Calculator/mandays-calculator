import { FormControl, Grid, Tab, styled } from "@mui/material";
import { TabPanel } from "./BulkUserModal";

export const RequirementContainer = styled(Grid)(() => ({
  margin: "16px 0",

  ">div": {
    "&:first-child ul": {
      marginBottom: "16px",
    },

    "& ul": {
      margin: "0",

      "& li:not(:last-child)": {
        marginBottom: "10px",
      },
    },

    "&:not(:first-child) ul": {
      listStyle: "none",
      "& :first-child": {
        fontWeight: "600",
      },
    },
  },
}));

export const BulkUploadWrapper = styled("div")(() => ({
  fontSize: "14px",
  "& span": {
    fontSize: "14px",
    "& svg": {
      width: "20px",
      height: "20px",
    },
  },
}));

export const CustomUploadFile = styled(FormControl)(() => ({
  "& >div": {
    padding: 0,
    "& input": {
      opacity: 0,
      height: "auto",
      padding: "8px",
    },
    "& span": {
      position: "absolute",
      left: "20px",
    },
    "& svg": {
      position: "absolute",
      right: "20px",
    },
    "& fieldset": {
      top: "0",
    },
  },
}));

export const CustomTab = styled(Tab)(({ theme }) => ({
  fontSize: "14px",
  borderBottom: "3px solid #D3D3D3",
  textTransform: "inherit",
  opacity: 1,
  fontWeight: 500,

  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
}));

export const CustomTabPanel = styled(TabPanel)(() => ({
  "& >div": {
    padding: 0,
    "& ul": {
      paddingLeft: "20px",
      margin: "10px 0",
      "& li": {
        margin: "10px 0 0",
      },
    },
    "& p": {
      fontSize: "14px",
      margin: "16px 0",
      "& span": {
        margin: "10px 0",
        display: "block ",
      },
    },
  },
}));
