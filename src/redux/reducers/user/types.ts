import type { User, Permission } from "~/api/user";

export interface UserPermissionState {
  initialized: boolean;
  user: User | null;
  loading: boolean;
  permissions: Permission[];
}

export interface FetchUserPermissionArgs {
  onSuccess?: () => void;
  onFailure?: () => void;
}
