import type { ReactElement } from "react";
import type { TextFieldProps as MuiTextFieldProps } from "@mui/material";
import type { BaseInputPropsWithAdornment } from "../types";

import MuiTextField from "@mui/material/TextField";

type TextFieldProps = BaseInputPropsWithAdornment<MuiTextFieldProps>;

export const TextField = (props: TextFieldProps): ReactElement => {
  const { name, label, endAdornment, readOnly, ...rest } = props;
  return (
    <MuiTextField
      id={name}
      InputProps={{ endAdornment: endAdornment, readOnly: readOnly }}
      {...rest}
      label={label}
    />
  );
};

export default TextField;
