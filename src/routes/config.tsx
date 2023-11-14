import type { RouteType } from ".";
import { Outlet, Navigate } from "react-router-dom";
import { ODCManagement } from "~/pages/odc-management";
import { UserManagement } from "~/pages/user-management";
import { ProjectManagement } from "~/pages/project-management";
import ErrorPage from "~/pages/common/error-page";
import { Complexity } from "~/pages/complexity";
import { mandaysCalculatorRoutes } from "~/pages/mandays-calculator/routes";
import { authRoutes } from "~/pages/auth/routes";

export const routes: RouteType[] = [
  {
    path: "/",
    element: (
      <Navigate
        to="/project-management"
        replace
      />
    ),
  },
  {
    path: "project-management",
    element: <ProjectManagement />,
  },
  {
    path: "dashboard",
    element: <Outlet />,
  },
  {
    path: "odc-management",
    element: <ODCManagement />,
  },
  {
    path: "user-management",
    element: <UserManagement />,
  },
  {
    path: "complexity",
    element: <Complexity />,
  },
  {
    path: "settings",
    element: <Outlet />,
  },
  {
    path: "account-info",
    element: <Outlet />,
  },
  {
    element: <Outlet />,
  },
  {
    path: "*",
    element: <ErrorPage type="not-found" />,
  },
  ...mandaysCalculatorRoutes,
  ...authRoutes,
];
