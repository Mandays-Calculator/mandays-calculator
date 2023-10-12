import { styled } from "@mui/material/styles";

const StyledLayoutContainer = styled("div")({
  display: "flex",
  height: "100vh",
});

const StyledLayoutContent = styled("div")`
  flex-grow: 2;
  background-color: ${({ theme }) => theme.palette.secondary.light};
`;

const ContentContainer = styled("div")`
  padding: 32px;
`;
export { StyledLayoutContainer, StyledLayoutContent, ContentContainer };
