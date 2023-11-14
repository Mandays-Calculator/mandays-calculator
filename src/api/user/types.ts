type ODC = {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  holidays: null | any[];
  active: boolean;
};

export type Role = "ROLE_SPRINT_MANAGER" | "ROLE_SPRINT_MANAGER" | "ROLE_USER";
export type Gender = "FEMALE" | "MALE" | "PREFER NOT TO SAY" | "NON-BINARY";

export type Permission = {
  displayName: string;
  icon: string;
  path: string;
  roles: Role[];
  subMenuItems: null | SubMenuItem[];
};

type SubMenuItem = {
  displayName: string;
  icon: string;
  path: string;
  roles: null | Role[];
  subMenuItems: null | any[];
};

export type User = {
  id: string;
  odc: ODC;
  firstName: string;
  lastName: string;
  middleName: null | string;
  suffix: null | string;
  gender: Gender;
  email: string;
  employeeId: string;
  careerStep: string;
  joiningDate: string;
  roles: Role[];
  active: boolean;
};

export interface UserPermissionResponse {
  data: {
    user: User;
    permissions: Permission[];
  };
}
