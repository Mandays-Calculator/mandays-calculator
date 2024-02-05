import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import EventIcon from "@mui/icons-material/Event";
import { styled } from "@mui/material/styles";
import theme from "~/theme";
import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Accordion,
  Divider,
  Paper,
  Stack,
  Grid,
  Link,
  Box,
} from "@mui/material";

import { TextField } from "~/components";

import { Status, StatusContainerColor, StatusTitleColor } from "./utils";

// COMMON TASK STYLES
export const GridRelativeContainer = styled(Grid)({
  position: "relative",
});

export const TaskTags = styled(Box)(({ status }: { status: string }) => {
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

export const CloseContainer = styled(Box)({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  top: "8px",
  right: "3px",
});

// TASK DETAILS CARD STYLES
export const StyledPaper = styled(Paper)(({ status }: { status: string }) => {
  if (status !== Status.OnHold && status !== Status.Backlog) {
    return { marginTop: "1rem", padding: "1rem", cursor: "default" };
  }

  return { marginTop: "1rem", padding: "1rem", cursor: "grab" };
});

export const TaskDetailsCardDetails = styled(Typography)(
  ({ type }: { type: string }) => {
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
  },
);

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

export const TaskActionContainer = styled(Box)(
  ({ status }: { status: string }) => {
    if (status !== Status.OnHold && status !== Status.Backlog) {
      return { display: "none" };
    }

    return {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      bottom: "0px",
      right: "0px",
      cursor: "pointer",
    };
  },
);

// CREATEORUPDATE
export const CreateOrUpdateLabel = styled(Typography)({
  marginBottom: "10px",
});

export const ComplexityLabel = styled(Stack)({
  cursor: "pointer",
  marginBottom: "10px",
});

// VIEWTASKDETAILS
export const AccordionComment = styled(Accordion)({
  width: "100%",
  marginTop: "10px",
  boxShadow: "none", // Remove box shadow
  "&:hover": {
    boxShadow: "none", // Remove box shadow on hover as well if needed
  },
});

export const AccordionCommentTitle = styled(AccordionSummary)({
  fontWeight: 600,
  padding: "5px",
});

export const AccordionCommentDetails = styled(AccordionDetails)({
  padding: "0px",
});

export const CommentTexbox = styled(TextField)({
  backgroundColor: "#EAF3F4",
  marginLeft: "5px",
});

export const ViewCommentContainerBox = styled(Box)({
  borderRadius: "5px",
  backgroundColor: "#dedede",
  padding: "5px",
  marginLeft: "5px",
});

export const ViewTaskDetailsContainer = styled(Grid)(
  ({ type }: { type: string }) => {
    switch (type) {
      case "outer":
        return {
          padding: "0px 10px 10px 10px",
          minWidth: "320px",
          [theme.breakpoints.only("sm")]: {
            minWidth: "520px",
          },
        };
      case "inner":
        return { marginTop: "10px" };
      case "comment":
        return { marginBottom: "10px" };
      default:
        return null;
    }
  },
);

export const ViewTaskDetailsLabel = styled(Typography)({
  fontWeight: 600,
});

// TASK CONTENT
export const StatusContainer = styled("div")(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor:
      backgroundColor === Status.Backlog
        ? StatusContainerColor.Backlog
        : backgroundColor === Status.NotYetStarted
        ? StatusContainerColor.NotYetStarted
        : backgroundColor === Status.InProgress
        ? StatusContainerColor.InProgress
        : backgroundColor === Status.OnHold
        ? StatusContainerColor.OnHold
        : StatusContainerColor.Completed,
    borderRadius: 10,
    width: "100%",
    padding: 15,
  }),
);

export const StyledStatusTitle = styled(Grid)(
  ({ color }: { color: string }) => ({
    fontSize: 18,
    margin: color !== Status.Backlog ? "0.3em 0" : 0,
    fontWeight: "bold",
    color:
      color === Status.NotYetStarted
        ? StatusTitleColor.NotYetStarted
        : color === Status.InProgress
        ? StatusTitleColor.InProgress
        : color === Status.OnHold
        ? StatusTitleColor.OnHold
        : color === Status.Completed
        ? StatusTitleColor.Completed
        : StatusTitleColor.Backlog,
  }),
);

export const StyledCreateTaskIconButton = styled(Grid)(
  ({ display }: { display: string }) => ({
    fontSize: 25,
    fontWeight: "bolder",
    float: "right",
    cursor: "pointer",
    display: display !== Status.Backlog ? "none" : "",
  }),
);

export const StyledDivider = styled(Divider)({
  margin: "1rem 0 2rem 0",
});

export const TaskGridContainer = styled(Grid)({
  maxHeight: "100%",
  minWidth: "100%",
  overflow: "auto",
});

export const NoDataContainer = styled(Stack)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "60vh",
});

export const StyledLink = styled(Link)({ cursor: "pointer" });

export const styledScrollbar = {
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
};
