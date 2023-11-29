import type { StepperProps } from "@mui/material";
import type { ReactNode } from "react";

export interface CustomSteps {
  label: string | ReactNode;
  icon?: ReactNode | string;
}

export interface CustomStepperProps extends StepperProps {
  steps: CustomSteps[];
  activeStep: number;
}
