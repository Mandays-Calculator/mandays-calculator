import type { User, Permission } from "~/api/user";
import type { GenericErrorResponse } from "~/api/types";
import type { UserProject } from "~/api/auth";

export interface UserPermissionState {
  isAuthenticated: boolean;
  loading: boolean;
  error: GenericErrorResponse | null;
  user: User | null;
  permissions: Permission[];
  tokenExpiry: number | null;
  isLogoutError?: boolean;
  projects: UserProject[];
  selectedProject: SelectObject | null;
}
