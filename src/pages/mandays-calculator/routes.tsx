import type { RouteType } from "~/routes";
import { MandaysCalculator } from "~/pages/mandays-calculator";
import EstimationDetails from "~/pages/mandays-calculator/estimation-details";

export const mandaysCalculatorRoutes: RouteType[] = [
  {
    path: "mandays-calculator/:estimationId",
    element: <EstimationDetails />,
  },
  {
    path: "mandays-calculator",
    element: <MandaysCalculator />,
  },
];
