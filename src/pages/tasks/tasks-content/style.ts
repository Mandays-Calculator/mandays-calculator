import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, Paper, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { styled } from "@mui/material/styles";

import theme from "~/theme";

import { Status } from "./utils";

// COMMON TASK STYLES
export const GridRelativeContainer = styled(Grid)({
  position: "relative",
});

// TASK DETAILS CARD STYLES
type StyledPaperProps = React.ComponentProps<typeof Paper> & {
  status: string;
};
type TaskDetailsCardDetailsProps = React.ComponentProps<typeof Typography> & {
  type: string;
};
type EditOutlinedIconProps = React.ComponentProps<typeof EditOutlinedIcon> & {
  status: string;
};
type DeleteOutlinedIconProps = React.ComponentProps<
  typeof DeleteOutlinedIcon
> & {
  status: string;
};
type TaskTagsProps = React.ComponentProps<typeof Box> & {
  status: string;
};

export const StyledPaper = styled(Paper)<StyledPaperProps>(({ status }) => {
  if (status !== Status.OnHold && status !== Status.Backlog) {
    return { marginTop: "1rem", padding: "1rem", cursor: "default" };
  }

  return { marginTop: "1rem", padding: "1rem", cursor: "grab" };
});

export const TaskDetailsCardDetails = styled(
  Typography,
)<TaskDetailsCardDetailsProps>(({ type }) => {
  switch (type) {
    case "title":
      return { fontSize: "1.2em", fontWeight: "bold", cursor: "pointer" };
    case "description":
      return {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        WebkitLineClamp: 3,
      };
    case "createDate":
      return {
        display: "flex",
        alignItems: "center",
      };
    default:
      return null;
  }
});

export const StyledEventIcon = styled(EventIcon)({
  marginRight: "5px",
});

export const CommentContainer = styled(Box)({
  borderRadius: "5px",
  backgroundColor: "#dedede",
  padding: "2px 3px",
});

export const StyledTextsmsOutlinedIcon = styled(TextsmsOutlinedIcon)({
  marginRight: "3px",
});

export const TaskActionContainer = styled(Box)({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  bottom: "0px",
  right: "0px",
});

export const TaskTags = styled(Box)<TaskTagsProps>(({ status }) => {
  const tag = {
    common: {
      borderRadius: "5px",
      padding: "3px",
      color: "#FFFFFF",
    },
    bug: {
      backgroundColor: theme.palette.error.main,
    },
    reviewed: {
      backgroundColor: theme.palette.success.main,
    },
    others: {
      backgroundColor: theme.palette.warning.main,
    },
  };

  if (status === "Bug") {
    return {
      ...tag.common,
      ...tag.bug,
    };
  } else if (status === "Reviewed") {
    return {
      ...tag.common,
      ...tag.reviewed,
    };
  }

  return {
    ...tag.common,
    ...tag.others,
  };
});

export const StyledEditOutlinedIcon = styled(
  EditOutlinedIcon,
)<EditOutlinedIconProps>(({ status }) => getButtonDisplayStyle(status));

export const StyledDeleteOutlinedIcon = styled(
  DeleteOutlinedIcon,
)<DeleteOutlinedIconProps>(({ status }) => getButtonDisplayStyle(status));

const getButtonDisplayStyle = (status: string) => {
  if (status !== Status.OnHold && status !== Status.Backlog) {
    return { display: "none", cursor: "pointer" };
  }

  return { cursor: "pointer" };
};

export const taskStyles = {
  scrollbar: {
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
      background: "black",
    },
  },
  modal: {
    close: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      top: "8px",
      right: "3px",
    },
  },
};

export const taskContentStyles = {
  divider: { margin: "1rem 0 2rem 0" },
  taskGridContainer: { maxHeight: "100%", minWidth: "100%", overflow: "auto" },
  createButton: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    top: "0px",
    right: "0px",
  },
  link: { cursor: "pointer" },
  noData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
  },
};

export const createOrUpdatetaskStyles = {
  label: { marginBottom: "10px" },
  complexity: { cursor: "pointer", marginBottom: "10px" },
};

export const viewTaskDetailsStyles = {
  modal: {
    container: {
      padding: "0px 10px 10px 10px",
      minWidth: { xs: "320px", sm: "520px" },
    },
  },
  label: { fontWeight: 600 },
  taskViewDetails: { marginTop: "10px" },
  comment: {
    accordion: {
      width: "100%",
      marginTop: "10px",
      boxShadow: "none", // Remove box shadow
      "&:hover": {
        boxShadow: "none", // Remove box shadow on hover as well if needed
      },
    },
    container: { marginBottom: "10px" },
    textbox: { backgroundColor: "#EAF3F4", marginLeft: "5px" },
    comment: {
      borderRadius: "5px",
      backgroundColor: "#dedede",
      padding: "5px",
      marginLeft: "5px",
    },
  },
};
