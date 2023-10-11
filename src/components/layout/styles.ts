import { styled } from "@mui/material/styles";

const StyledLayoutContainer = styled("div")({
  display: "flex",
  height: "100vh",
});

const StyledLayoutContent = styled("div")`
  flex-grow: 1;
  padding: 32px;
  background-color: ${({ theme }) => theme.palette.secondary.light};
`;

export { StyledLayoutContainer, StyledLayoutContent };
