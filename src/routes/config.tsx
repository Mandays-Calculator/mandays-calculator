import type { RouteType } from ".";
import { Outlet, Navigate } from "react-router-dom";
import { ODCManagement } from "~/pages/odc-management";
import { UserManagement } from "~/pages/user-management";
import { ProjectManagement } from "~/pages/project-management";
import { MandaysCalculator } from "~/pages/mandays-calculator";
import ErrorPage from "~/pages/common/error-page";

export const routes: RouteType[] = [
  {
    path: "/",
    element: <Navigate to="/project-management" replace />,
  },
  {
    path: "project-management",
    label: "project.management.label",
    element: <ProjectManagement />,
    icon: "project_management",
  },
  {
    path: "dashboard",
    label: "common.dashboard",
    element: <Outlet />,
    icon: "dashboard",
  },
  {
    path: "odc-management",
    label: "odc.management.label",
    element: <ODCManagement />,
    icon: "odc_management",
  },
  {
    path: "user-management",
    label: "user.management.label",
    element: <UserManagement />,
    icon: "user_management",
  },
  {
    path: "complexity",
    label: "common.complexity",
    element: <Outlet />,
    icon: "complexity",
  },
  {
    path: "settings",
    label: "common.settings",
    element: <Outlet />,
    icon: "settings",
  },
  {
    path: "account-info",
    label: "account.info.label",
    element: <Outlet />,
    icon: "person",
  },
  {
    path: "mandays-calculator",
    label: "mandaysCalculator.title",
    element: <MandaysCalculator />,
    icon: "settings",
  },
  {
    path: "history",
    label: "common.history",
    element: <Outlet />,
    icon: "history",
  },
  {
    path: "*",
    element: <ErrorPage type="not-found" />,
  },
];
