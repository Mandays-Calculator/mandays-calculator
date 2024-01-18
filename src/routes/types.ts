import type { ReactElement, ReactNode } from "react";
import { RouteObject } from "react-router-dom";

export interface RouteType extends Omit<RouteObject, "children"> {
  children?: ReactElement;
  pageTitle?: string | ReactNode;
  disablePermissionChecking?: boolean;
  protected?: boolean; // Set to false if route should be defined as public
}
