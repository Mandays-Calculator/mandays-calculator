import type { ReactElement } from "react";
import { RouteObject } from "react-router-dom";
import { SvgIconsType } from "~/components/svc-icons/types";

export interface RouteType extends Omit<RouteObject, "children"> {
  label?: string;
  icon?: SvgIconsType;
  children?: ReactElement;
  hideOnSidebar?: boolean; //in case we need to add route invisible in sidebar
}
