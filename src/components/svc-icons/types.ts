import type { SxProps } from "@mui/material";

export type SvgIconsType =
  | "delete"
  | "warning"
  | "edit"
  | "check"
  | "add"
  | "cross"
  | "upload"
  | "eyball_1"
  | "odc_management"
  | "people"
  | "person"
  | "project_management"
  | "settings"
  | "user_management"
  | "arrow_up"
  | "arrow_up_v2"
  | "arrow_down_v2"
  | "add_v2"
  | "history"
  | "collapse_left"
  | "collapse_right"
  | "complexity"
  | "dashboard"
  | "arrow_down"
  | "mandays_estimation_tool";

export interface SvgIconsProps {
  name: SvgIconsType;
  $size?: number;
  color?: "primary" | "error" | "inherit";
  sx?: SxProps;
  onClick?: () => void;
}
