import type { RouteType } from "~/routes";
import ChangePassword from "./ChangePassword";

export const authRoutes: RouteType[] = [
    {
        path: "change-password",
        element: <ChangePassword />,
    },
];