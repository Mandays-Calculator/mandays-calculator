import type { ReactElement } from "react";
import { RouteObject } from "react-router-dom";

export interface RouteType extends Omit<RouteObject, "children"> {
  label?: string;
  icon?: ReactElement;
  children?: ReactElement;
  hideOnSidebar?: boolean; //in case we need to add route invisible in sidebar
}
