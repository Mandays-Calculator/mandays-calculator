import { styled } from "@mui/material/styles";

const StyledLayoutContainer = styled("div")({
  display: "flex",
  height: "100vh",
  overflow: "scroll",
});

const StyledLayoutContent = styled("div")`
  flex-grow: 2;
  background-color: ${({ theme }) => theme.palette.secondary.light};
`;

const ContentContainer = styled("div")`
  padding: ${({ theme }) => theme.spacing(4)};
`;
export { StyledLayoutContainer, StyledLayoutContent, ContentContainer };
