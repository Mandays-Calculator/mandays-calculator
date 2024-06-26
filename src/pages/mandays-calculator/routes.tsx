import type { RouteType } from "~/routes";
import { MandaysCalculator } from "~/pages/mandays-calculator";
import { EstimationDetails } from "~/pages/mandays-calculator/estimation-details";
import { ShareEstimationDetails } from "./share-estimation-details";
import { ReviewSummary } from "~/pages/mandays-calculator/estimation-details/review-summary";

export const mandaysCalculatorRoutes: RouteType[] = [
  {
    path: "mandays-estimation-tool/:estimationId",
    element: <EstimationDetails />,
  },
  {
    path: "shared-mandays-estimation-tool/:estimationId",
    element: <EstimationDetails />,
    disabledPermissionChecking: true,
  },
  {
    path: "mandays-estimation-tool/add-sprint",
    element: <EstimationDetails />,
  },
  {
    path: "mandays-estimation-detail/:estimationId/:estimationCode/:createdDate/:expirationInSec",
    element: <ShareEstimationDetails />,
    protected: false,
  },
  {
    path: "mandays-estimation-tool",
    pageTitle: "mandaysCalculator.label",
    element: <MandaysCalculator />,
  },
  {
    path: "mandays-estimation-tool/summary",
    pageTitle: "mandaysCalculator.label",
    element: <ReviewSummary />,
  },
];
