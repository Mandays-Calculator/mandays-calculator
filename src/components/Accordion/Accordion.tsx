import type { ReactElement, ReactNode } from "react";
import type { AccordionProps as MuiAccordionProps } from "@mui/material/Accordion";

import { useState } from "react";
import { styled } from "@mui/material/styles";
import AccordionSummary, { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: (prop) => prop !== "hasCustomExpandIcon",
})<{ hasCustomExpandIcon?: boolean }>(({ hasCustomExpandIcon }) => ({
  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    transform: hasCustomExpandIcon ? "none !important" : undefined,
  },
}));

type BaseAccordionProps = Omit<MuiAccordionProps, "title" | "expanded" | "onChange">;

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
      return isExpanded ? expandMoreIcon ?? expandLessIcon : expandLessIcon ?? expandMoreIcon;
    }
    return <ExpandMoreIcon />;
  };

  const renderTitle = (): ReactNode => {
    if (typeof title === "string") {
      return (
        <Typography
          variant="h6"
          fontWeight="bold"
          color="primary"
        >
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
    <MuiAccordion
      defaultExpanded={defaultExpanded}
      expanded={isExpanded}
      onChange={handleToggleAccordion}
      {...rest}
    >
      <StyledAccordionSummary expandIcon={renderExpandIcon()}>
        {renderTitle()}
      </StyledAccordionSummary>
      <AccordionDetails sx={{ padding: disabledContentPadding ? "0" : "0.5rem 1rem 1rem" }}>
        {children}
      </AccordionDetails>
      {footer ? <AccordionDetails>{footer}</AccordionDetails> : null}
    </MuiAccordion>
  );
};

export default Accordion;
