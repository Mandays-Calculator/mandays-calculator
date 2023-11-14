import { SvgIconsType } from "~/components/svc-icons/types";

export type SideBarItemType = {
  path: string;
  label: string;
  icon?: SvgIconsType;
};

type RoleType = "system_admin" | "system_user" | "sprint_manager";

export const getSidebarConfig = (role: RoleType): SideBarItemType[] => {
  switch (role) {
    case "system_admin":
      return SYS_ADMIN_CONFIG;
    case "sprint_manager":
      return SPRINT_MANAGER_CONFIG;
    default:
      return SYS_USER;
  }
};

const SYS_ADMIN_CONFIG: SideBarItemType[] = [
  {
    path: "project-management",
    label: "project.management.label",
    icon: "project_management",
  },
  {
    path: "odc-management",
    label: "odc.management.label",
    icon: "odc_management",
  },
  {
    path: "user-management",
    label: "user.management.label",
    icon: "user_management",
  },
  {
    path: "settings",
    label: "common.settings",
    icon: "settings",
  },
];

const SPRINT_MANAGER_CONFIG: SideBarItemType[] = [
  {
    path: "dashboard",
    label: "common.dashboard",
    icon: "dashboard",
  },
  {
    path: "complexity",
    label: "common.complexity",
    icon: "complexity",
  },
  {
    path: "task",
    label: "common.task",
    icon: "history",
  },
  {
    path: "mandays-calculator",
    label: "mandaysCalculator.title",
    icon: "settings",
  },
  {
    path: "history",
    label: "common.history",
    icon: "history",
  },
  {
    path: "settings",
    label: "common.settings",
    icon: "settings",
  },
];

const SYS_USER: SideBarItemType[] = [
  {
    path: "account-info",
    label: "account.info.label",
    icon: "person",
  },
  {
    path: "settings",
    label: "common.settings",
    icon: "settings",
  },
];
