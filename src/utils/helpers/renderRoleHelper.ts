type Role = "ROLE_SPRINT_MANAGER" | "ROLE_SYS_ADMIN" | "ROLE_USER" | string;

function renderRole(role: Role): string {
  switch (role) {
    case "ROLE_SPRINT_MANAGER":
      return "Sprint Manager";
    case "ROLE_SYS_ADMIN":
      return "System Administrator";
    default:
      return "User";
  }
}

export default renderRole;
