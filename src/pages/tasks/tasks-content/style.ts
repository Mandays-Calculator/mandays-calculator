import theme from "~/theme";

export const taskStyles = {
  gridRelativeContainer: { position: "relative" },
  tag: {
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
  },
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

export const taskDetailsCardStyles = {
  title: { fontSize: "1.2em", fontWeight: "bold", cursor: "pointer" },
  description: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 3,
  },
  completionDate: { display: "flex", alignItems: "center" },
  completionDateIcon: { marginRight: "5px" },
  comments: {
    borderRadius: "5px",
    backgroundColor: "#dedede",
    padding: "2px 3px",
  },
  commentIcon: { marginRight: "3px" },
  buttons: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: "0px",
    right: "0px",
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

export const getTagStyle = (value: string): object => {
  if (value === "Bug") {
    return {
      ...taskStyles.tag.common,
      ...taskStyles.tag.bug,
    };
  } else if (value === "Reviewed") {
    return {
      ...taskStyles.tag.common,
      ...taskStyles.tag.reviewed,
    };
  }

  return {
    ...taskStyles.tag.common,
    ...taskStyles.tag.others,
  };
};
