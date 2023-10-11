import type { RouteType } from ".";
import { Outlet } from "react-router-dom";
import { ODCManagement } from "~/pages/odc-management";
import { UserManagement } from "~/pages/user-management";
import { ProjectManagement } from "~/pages/project-management";

export const routes: RouteType[] = [
  {
    path: "project-management",
    label: "project.management.label",
    element: <ProjectManagement />,
  },
  {
    path: "odc-management",
    label: "odc.management.label",
    element: <ODCManagement />,
  },
  {
    path: "user-management",
    label: "user.management.label",
    element: <UserManagement />,
  },
  {
    path: "settings",
    label: "settings.label",
    element: <Outlet />,
  },
  {
    path: "account-info",
    label: "account.info.label",
    element: <Outlet />,
  },
];
