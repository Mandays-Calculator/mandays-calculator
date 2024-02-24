export type CommonType =
  | "user"
  | "role"
  | "odc"
  | "complexity"
  | "function"
  | "project"
  | "team"
  | "team_userid"
  | "career_step"
  | "country"
  | "holidays"
  | "gender"
  | undefined;

export type CommonResponseDataObj = {
  id: string;
  [key: string]: string;
};

export type CommonDataResponse = {
  data: CommonResponseDataObj[];
};

export type CommonOption = SelectObject[];
