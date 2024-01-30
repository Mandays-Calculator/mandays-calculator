import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { SearchSelect } from "../form";
import { Typography } from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  minHeight: 70,
  background: theme.palette.background.paper,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}));

const StyledToolBarContainer = styled("div")`
  padding: ${({ theme }) => theme.spacing(0, 4, 0, 2)};
`;

const StyledSearchSelect = styled(SearchSelect)`
  && .MuiAutocomplete-root {
    min-width: 280px;
  }

  && .MuiOutlinedInput-root {
    min-width: 280px;
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;

    fieldset {
      border: none;
      outline: none;
    }
  }

  && .MuiAutocomplete-endAdornment {
    position: relative;
  }
`;

const StyledProjectTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1.6rem;
  font-weight: 500;
`;

export const popperStyle = {
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  ".MuiAutocomplete-option": {
    textAlign: "right",
    borderBottom: "1px solid #E1E0E0",
    fontSize: "1rem",
    fontWeight: "500",
  },
};

export {
  StyledAppBar,
  StyledToolBarContainer,
  StyledSearchSelect,
  StyledProjectTitle,
};
