import type { ReactElement } from "react";

export interface SummaryProps {
  mode: EstimationDetailsMode;
}

export interface Holiday {
  date: string;
}

export interface ExistingODC {
  holidays: Holiday[];
  date: string;
  value: string;
  label: string;
}

export interface WrapperProps {
  title: ReactElement;
  field: ReactElement;
  fieldSize?: number;
}

export interface ResourceData {
  [careerStep: string]: {
    odcId: string;
    numberOfResources: number;
    annualLeaves?: string;
  }[];
}
