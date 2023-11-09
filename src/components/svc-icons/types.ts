import type { SxProps } from "@mui/material";

export type SvgIconsType =
  | "delete"
  | "edit"
  | "check"
  | "add"
  | "cross"
  | "eyball_1"
  | "odc_management"
  | "people"
  | "person"
  | "project_management"
  | "settings"
  | "user_management"
  | "arrow_up"
  | "add_v2"
  | "history"
  | "collapse_left"
  | "collapse_right"
  | "complexity"
  | "dashboard"
  | "arrow_down";

export interface SvgIconsProps {
  name: SvgIconsType;
  $size?: number;
  color?: "primary" | "error" | "inherit";
  sx?: SxProps;
  onClick?: () => void;
}
