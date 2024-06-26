import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";

export const StyledContainer = styled("div")`
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.light};
`;

export const StyledImageContainer = styled("div")`
  width: 80%;
  height: auto;
  margin: 0 auto;

  img {
    width: 100%;
    height: auto;
  }
`;

export const StyledHeader = styled(Stack)({
  background: "#2C8ED1",
  borderRadius: "10px",
  height: "60px",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
});

export const StyledText = styled(Typography)({
  color: "#FEFEFE",
  fontSize: "1.5rem",
  fontWeight: "600",
});

export const ShareMandaysContainer = styled("div")(({ theme }) => ({
  background: theme.palette.secondary.light,
  height: "100vh",
  overflowX: "scroll",
  paddingBottom: "28px",
}));
