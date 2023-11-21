import { Grid, styled } from "@mui/material";
import { Card } from "~/components";

export const StyledCardContainer = styled(Card)(() => ({
  cursor: "grabbing",
  marginBottom: 20,
  background: "#EBF5FB",
  border: "1px solid #7AC0EF",
  borderRadius: 10,
}));

export const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2.2, 3.8, 0),
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
