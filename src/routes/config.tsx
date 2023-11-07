import type { RouteType } from ".";
import { Outlet } from "react-router-dom";
import { ODCManagement } from "~/pages/odc-management";
import { UserManagement } from "~/pages/user-management";
import { ProjectManagement } from "~/pages/project-management";
import ErrorPage from "~/pages/error-page";

export const routes: RouteType[] = [
  {
    path: "project-management",
    label: "project.management.label",
    element: <ProjectManagement />,
    icon: "project_management",
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
    path: "*",
    element: <ErrorPage type="not-found" />,
  },
];
