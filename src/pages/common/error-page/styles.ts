import { styled } from "@mui/material";

export const StyledContainer = styled("div")<{ $type: string }>(
  ({ theme, $type }) => ({
    display: "flex",
    padding: theme.spacing(4),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    flex: "1 0 0",
    alignSelf: "stretch",
    height: $type === "configuration-error" ? "90vh" : "auto",
  })
);

export const StyledChildContainer = styled("div")(() => ({
  display: "flex",
  width: "27rem",
  paddingLeft: "0px",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.375rem",
  textAlign: "center",
}));
