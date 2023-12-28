type Role = "ROLE_SPRINT_MANAGER" | "ROLE_SYS_ADMIN" | "ROLE_USER";

export interface RoleTypeResponse {
  id: number;
  role: Role;
}
