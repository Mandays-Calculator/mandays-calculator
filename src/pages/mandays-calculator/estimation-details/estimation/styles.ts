import { styled } from "@mui/material";
import { CustomButton } from "~/components/form/button";
import { Accordion } from "~/components";

export const StyledTabContainer = styled("div")`
  max-width: 98%;
  position: relative;
  width: 100%;
  & .MuiTabs-root {
    padding-right: 200px;
  }

  & .MuiTabs-flexContainer {
    justify-content: left !important;
  }
  .MuiTabs-indicator {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }

  .MuiFormHelperText-root {
    text-transform: capitalize;
  }
`;

export const StyledAccordion = styled(Accordion)(() => ({
  [`& .MuiAccordionSummary-root`]: {
    borderBottom: "1px solid #E1E0E0",
    background: "#D7EFFF",
  },
}));

export const StyledFooter = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "column",
}));

export const StyledButton = styled(CustomButton)`
  position: absolute;
  right: 0;
  z-index: 2000;
`;
