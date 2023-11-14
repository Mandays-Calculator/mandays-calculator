import { styled } from "@mui/material/styles";

const StyledLayoutContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
  overflow: "scroll",
  backgroundColor: theme.palette.secondary.light,
}));

const StyledLayoutContent = styled("div")`
  flex-grow: 2;
`;

const ContentContainer = styled("div")`
  padding: ${({ theme }) => theme.spacing(4)};
`;
export { StyledLayoutContainer, StyledLayoutContent, ContentContainer };
