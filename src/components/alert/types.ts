import type { SvgIconsProps } from "../svc-icons/types";
import type { ReactNode } from "react";

export type AlertTypes = "error" | "warning" | "success" | "primary";
export interface AlertProps {
  open: boolean;
  type?: AlertTypes;
  message?: string;
  title?: string;
  icon?: SvgIconsProps | ReactNode;
  duration?: number;
}
