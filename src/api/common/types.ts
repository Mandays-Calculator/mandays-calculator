type Role = "ROLE_SPRINT_MANAGER" | "ROLE_SYS_ADMIN" | "ROLE_USER";
type BroadBand = "BB1" | "BB2";
type CareerSteps = "I01" | "I02" | "I03" | "I04" | "I05" | "I06" | "I07";
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
