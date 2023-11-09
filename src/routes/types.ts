import type { ReactElement } from "react";
import { RouteObject } from "react-router-dom";

export interface RouteType extends Omit<RouteObject, "children"> {
  children?: ReactElement;
}
