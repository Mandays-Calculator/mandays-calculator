import type { RouteType } from ".";

import { Outlet } from "react-router-dom";

import { ODCManagement } from "~/pages/odc-management";
import { UserManagement } from "~/pages/user-management";
import { ProjectManagement } from "~/pages/project-management";
import { Tasks } from "~/pages/tasks";
import { Complexity } from "~/pages/complexity";
import { Dashboard } from "~/pages/dashboard";

import { mandaysCalculatorRoutes } from "~/pages/mandays-calculator/routes";
import { accountInfoRoutes } from "~/pages/account-info/routes";

import ErrorPage from "~/pages/common/error-page";

export const routes: RouteType[] = [
  {
    path: "project-management",
    element: <ProjectManagement />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
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
    path: "tasks",
    element: <Tasks />,
  },
  {
    element: <Outlet />,
  },
  {
    path: "/permission-error",
    element: <ErrorPage type="permission-error" />,
  },
  ...mandaysCalculatorRoutes,
  ...accountInfoRoutes,
  {
    path: "/*",
    element: <ErrorPage type="not-found" />,
  },
  {
    path: "/",
    element: <Outlet />,
  },
];
