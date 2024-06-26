export type ReactDatePickerParam = Date | null;
export type ReactDatePickerRangeParam = [Date | null, Date | null] | null;
export type ReactDatePickerFunctionParams =
  | ReactDatePickerParam
  | ReactDatePickerRangeParam;
export type ReactDatePickerFormat =
  | "MM/dd/yyyy"
  | "yyyy/MM/dd"
  | "dd/MM/yyyy"
  | "dd/MM/yyyy HH:mm"
  | "ddMMyyyy"
  | "d/MM/yyyy"
  | "yyyy"
  | "MM/yyyy"
  | "dd-MM-yyyy";

declare global {
  interface SelectObject {
    label: string;
    value: string;
  }

  type EstimationDetailsMode = "edit" | "add" | "view";
  type ApiBasePathParam = "accountsService" | "mandaysEstimateService";
  interface ApiBasePath {
    accountsService: string;
    mandaysEstimateService: string;
  }

  export interface CustomSteps {
    label: string | ReactNode;
    icon?: ReactNode | string;
    content?: ReactNode;
  }

  type BaseResponse<T> = Promise<AxiosResponse<T, any>>;
}

export type Role = "ROLE_SYS_ADMIN" | "ROLE_SPRINT_MANAGER" | "ROLE_USER";
