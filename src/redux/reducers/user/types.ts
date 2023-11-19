import type { User, Permission } from "~/api/user";

export interface UserPermissionState {
  initialized: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  permissions: Permission[];
}
