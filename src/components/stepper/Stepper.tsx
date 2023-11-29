import type { ReactElement, ReactNode } from "react";
import type { StepIconProps } from "@mui/material/StepIcon";
import type { SvgIconsType } from "../svc-icons/types";

import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper, { StepperProps } from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import { SvgIcon } from "~/components";
import { StyledLabel, iconColorActive, borderColor } from ".";

const StepperConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 30,
    left: "calc(-50% + 50px)",
    right: "calc(50% + 50px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 80%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 6,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#ADB2B2",
    borderRadius: 4,
  },
}));

const StepperIcon = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  zIndex: 1,
  color: borderColor,
  width: 60,
  height: 60,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  border: `6px solid ${borderColor}`,
  ...(ownerState.active && {
    background: theme.palette.primary.main,
    border: "none",
    color: iconColorActive,
  }),
  ...(ownerState.completed && {
    background: theme.palette.primary.main,
    border: "none",
    color: iconColorActive,
  }),
}));

const ColorlibStepIcon = (props: StepIconProps): ReactElement => {
  const { active, completed, icon, className } = props;
  const iconContent = icon ? (
    typeof icon === "string" ? (
      <SvgIcon name={icon as SvgIconsType} />
    ) : (
      icon
    )
  ) : (
    props.icon
  );
  return (
    <StepperIcon ownerState={{ completed, active }} className={className}>
      {iconContent}
    </StepperIcon>
  );
};

interface CustomSteps {
  label: string | ReactNode;
  icon?: ReactNode | string;
}

interface CustomStepperProps extends StepperProps {
  steps: CustomSteps[];
  activeStep: number;
}

export default function Steppers(props: CustomStepperProps): ReactElement {
  const { steps } = props;
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper alternativeLabel activeStep={1} connector={<StepperConnector />}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={(stepIconProps) => (
                <ColorlibStepIcon {...stepIconProps} icon={step.icon} />
              )}
            >
              <StyledLabel>{step.label}</StyledLabel>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
