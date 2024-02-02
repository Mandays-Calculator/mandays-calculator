export type Role = "ROLE_SPRINT_MANAGER" | "ROLE_SYS_ADMIN" | "ROLE_USER";
export type BroadBand = "BB1" | "BB2";
export type CareerSteps = "I01" | "I02" | "I03" | "I04" | "I05" | "I06" | "I07";
export type Status = "ON_GOING" | "NOT_YET_STARTED" | "COMPLETED";

export interface RoleTypeResponse {
  id: number;
  role: Role;
}

export interface CareerStepResponse {
  broadband: BroadBand;
  careerStep: CareerSteps;
}

export interface CountryResponse {
  name: string;
  cca2: string;
  idd: string;
}

export interface GenderResponse {
  name: string;
  id: number;
}

export interface TeamLead {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  employeeId: string;
  active: boolean;
  fullName: string;
}

export interface Team {
  projectId: string;
  name: string;
  id: string;
  teamLead: TeamLead;
  active: boolean;
  lastUpdatedDate: string;
}
