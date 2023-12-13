import type { ReactElement, ReactNode } from "react";

export type BaseInputProps<Type = object> = Type & {
  name?: string;
  label?: string | ReactNode;
  error?: boolean;
  helperText?: string | ReactNode;
  isFastField?: boolean;
  readOnly?: boolean;
};

export type WithInputControllerType =
  | "text"
  | "date-picker"
  | "dropzone"
  | "pin-code"
  | "autocomplete"
  | "checkbox-group"
  | "date-time-picker"
  | "number-input";

export type BaseInputPropsWithAdornment<Type = object> = Type & {
  name: string;
  label?: string;
  endAdornment?: ReactElement;
  readOnly?: boolean;
  placeholder?: string;
};

export interface WithInputControllerValueProp {
  value?: string;
  selected?: string;
  startDate?: string;
  endDate?: string;
}

type FormValues = {
  [key: string]: any;
};

export type FormErrors = {
  [key in keyof FormValues]?: string;
};
