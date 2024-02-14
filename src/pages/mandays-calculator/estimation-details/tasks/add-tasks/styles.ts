import { Grid, Typography, styled } from "@mui/material";
import { Card } from "~/components";
import type { Status } from "../..";

export const StyledCardContainer = styled(Card)(() => ({
  cursor: "grabbing",
  marginBottom: 20,
  bordeRadius: "0.5rem",
  background: "var(--Neutral---White, #FEFEFE)",
  boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.5)",
}));

export const StyledGridItem = styled(Grid, {
  shouldForwardProp: (props: string) => !props.startsWith("$"),
})<{ $type: Status }>(({ theme, $type }) => ({
  padding: theme.spacing(2.2, 3.8, 0),
  borderRadius: "0.75rem",
  background: $type === "selected" ? "#E4F7F9" : "#F0F0F0",
}));

export const StyledNoDataContainer = styled(Grid)(() => ({
  textAlign: "center",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  height: "20vh",
  borderRadius: 10,
  border: "5px dashed #7AC0EF",
}));

export const StyledDropContainer = styled("div")(() => ({
  minHeight: "100%",
}));

export const StyledTitle = styled(Typography)(() => ({
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  marginBottom: "1rem",
}));
