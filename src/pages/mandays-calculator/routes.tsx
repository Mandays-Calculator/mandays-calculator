import type { RouteType } from "~/routes";
import { MandaysCalculator } from "~/pages/mandays-calculator";
import { EstimationDetails } from "~/pages/mandays-calculator/estimation-details";

export const mandaysCalculatorRoutes: RouteType[] = [
  {
    path: "mandays-estimation-tool/:estimationId",
    element: <EstimationDetails />,
  },
  {
    path: "mandays-estimation-tool",
    pageTitle: "mandaysCalculator.label",
    element: <MandaysCalculator />,
  },
];
