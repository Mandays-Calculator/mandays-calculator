import type { RouteType } from "~/routes";

import { Navigate } from "react-router-dom";

import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";

export const authRoutes: RouteType[] = [
  {
    path: "change-password",
    element: <ChangePassword />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/*",
    element: <Navigate to="/login" replace />,
  },
];
