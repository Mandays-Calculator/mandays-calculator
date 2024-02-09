import type { ReactElement, ReactNode } from "react";
import type { AccordionProps as MuiAccordionProps } from "@mui/material/Accordion";

import { useState } from "react";
import { styled } from "@mui/material/styles";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: (prop) => prop !== "hasCustomExpandIcon",
})<{ hasCustomExpandIcon?: boolean }>(({ hasCustomExpandIcon }) => ({
  background: "#D7EFFF",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",

  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    transform: hasCustomExpandIcon ? "none !important" : undefined,
  },
}));

const StyledAccordion = styled(MuiAccordion)`
  border-radius: 10px;
  box-shadow: none;
`;

type BaseAccordionProps = Omit<
  MuiAccordionProps,
  "title" | "expanded" | "onChange"
>;

interface AccordionProps extends BaseAccordionProps {
  title: ReactNode;
  expandMoreIcon?: ReactNode;
  expandLessIcon?: ReactNode;
  footer?: ReactNode;
  disabledContentPadding?: boolean;
}

export const Accordion = (props: AccordionProps): ReactElement => {
  const {
    title,
    footer,
    expandMoreIcon,
    expandLessIcon,
    children,
    defaultExpanded = true,
    disabledContentPadding = false,
    ...rest
  } = props;
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const renderExpandIcon = (): ReactNode => {
    if (expandMoreIcon || expandLessIcon) {
      return isExpanded
        ? expandMoreIcon ?? expandLessIcon
        : expandLessIcon ?? expandMoreIcon;
    }
    return <ExpandMoreIcon />;
  };

  const renderTitle = (): ReactNode => {
    if (typeof title === "string") {
      return (
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#414145" }}>
          {title}
        </Typography>
      );
    }
    return title;
  };

  const handleToggleAccordion = (): void => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  return (
    <StyledAccordion
      defaultExpanded={defaultExpanded}
      expanded={isExpanded}
      onChange={handleToggleAccordion}
      {...rest}
    >
      <StyledAccordionSummary expandIcon={renderExpandIcon()}>
        {renderTitle()}
      </StyledAccordionSummary>
      <AccordionDetails
        sx={{
          padding: disabledContentPadding ? "0" : "0.5rem 1rem 1rem",
          border: "2px solid #e1e0e0",
        }}
      >
        {children}
      </AccordionDetails>
      {footer ? <AccordionDetails>{footer}</AccordionDetails> : null}
    </StyledAccordion>
  );
};

export default Accordion;
