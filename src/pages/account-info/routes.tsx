import type { RouteType } from "~/routes";
import { AccountInfo } from ".";

export const accountInfoRoutes: RouteType[] = [
  {
    path: "account-info",
    element: <AccountInfo />,
  },
];
