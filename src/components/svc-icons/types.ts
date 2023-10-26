import type { SxProps } from "@mui/material";

export type SvgIconsType =
  | "delete"
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
  | "user_management";

export interface SvgIconsProps {
  name: SvgIconsType;
  $size?: number;
  color?: "primary" | "error" | "inherit";
  sx?: SxProps;
  onClick?: () => void;
}
