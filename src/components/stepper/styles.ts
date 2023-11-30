import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledLabel = styled(Typography)`
  font-size: 1.3rem;
  font-family: inherit;
  font-weight: normal;
`;

export const borderColor = "#ADB2B2";
export const iconColorActive = "#fff";

export const StyledContent = styled("div")`
  padding: ${({ theme }) => theme.spacing(3)};
`;
