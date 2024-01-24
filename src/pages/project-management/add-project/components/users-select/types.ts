import { InputProps, TextFieldProps } from "@mui/material";
import type { SyntheticEvent } from "react";

export interface UsersSelectProps {
  value: SelectObject;
  onChange: (
    e: SyntheticEvent<Element, Event>,
    value: SelectObject | null
  ) => void;
  textValue?: string;
  onInputValueChange?: (value: string) => void;
  label?: string;
  helperText?: string;
  teamLeadError?: boolean;
  fullWidth?: boolean;
  name: string;
  error?: boolean;
  textFieldProps?: TextFieldProps;
  inputProps?: InputProps;
  dataTestId?: string;
}
