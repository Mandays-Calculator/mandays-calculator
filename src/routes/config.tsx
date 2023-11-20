import type { RouteType } from ".";
import { Outlet, Navigate } from "react-router-dom";
import { ODCManagement } from "~/pages/odc-management";
import { UserManagement } from "~/pages/user-management";
import { ProjectManagement } from "~/pages/project-management";
import { Tasks } from "~/pages/tasks";
import ErrorPage from "~/pages/common/error-page";
import { ChangePassword } from "~/pages/auth";
import { mandaysCalculatorRoutes } from "~/pages/mandays-calculator/routes";

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
    path: "tasks",
    element: <Tasks />,
  },
  {
    path: "complexity",
    element: <Outlet />,
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
    path: "change-password",
    element: <ChangePassword />,
  },
  {
    element: <Outlet />,
  },
  {
    path: "*",
    element: <ErrorPage type="not-found" />,
  },
  ...mandaysCalculatorRoutes,
];
