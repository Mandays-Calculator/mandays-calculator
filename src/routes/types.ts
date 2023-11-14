import type { ReactElement, ReactNode } from "react";
import { RouteObject } from "react-router-dom";

export interface RouteType extends Omit<RouteObject, "children"> {
  children?: ReactElement;
  pageTitle?: string | ReactNode;
}
