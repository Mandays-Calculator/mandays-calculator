import type { User, Permission } from "~/api/user";

export interface UserPermissionState {
  user: User | null;
  loading: boolean;
  error: string | null;
  permissions: Permission[];
}
