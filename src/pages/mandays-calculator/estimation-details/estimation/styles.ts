import { styled } from "@mui/material";

export const StyledTabContainer = styled("div")`
  width: 100%;
  .MuiTabs-indicator {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }

  .MuiFormHelperText-root {
    text-transform: capitalize;
  }
`;
