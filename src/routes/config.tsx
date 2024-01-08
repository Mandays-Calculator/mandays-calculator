import type { RouteType } from ".";

import { Outlet } from "react-router-dom";

import { ODCManagement } from "~/pages/odc-management";
import { UserManagement } from "~/pages/user-management";
import { ProjectManagement } from "~/pages/project-management";
import { Tasks } from "~/pages/tasks";
import { Complexity } from "~/pages/complexity";
import { History } from "~/pages/history";

import { mandaysCalculatorRoutes } from "~/pages/mandays-calculator/routes";
import { accountInfoRoutes } from "~/pages/account-info/routes";

import ErrorPage from "~/pages/common/error-page";

export const errorRoutes: RouteType[] = [
  {
    path: "/permission-error",
    element: <ErrorPage type="permission-error" />,
  },
  {
    path: "/permission-denied",
    element: <ErrorPage type="permission-denied" />,
  },
  {
    path: "/*",
    element: <ErrorPage type="not-found" />,
  },
  {
    path: "/",
    element: <Outlet />,
  },
];

export const routes: RouteType[] = [
  {
    path: "project-management",
    element: <ProjectManagement />,
  },
  {
    path: "dashboard",
    element: <ErrorPage type="development-mode" />,
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
    path: "team-management",
    element: <ErrorPage type="development-mode" />,
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
    element: <ErrorPage type="development-mode" />,
  },
  {
    path: "account-info",
    element: <ErrorPage type="development-mode" />,
  },
  {
    path: "history",
    element: <History />,
    pageTitle: "History",
  },
  ...mandaysCalculatorRoutes,
  ...accountInfoRoutes,
];
