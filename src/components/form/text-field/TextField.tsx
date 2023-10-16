import type { ReactElement } from "react";
import type { TextFieldProps as MuiTextFieldProps } from "@mui/material";
import type { BaseInputPropsWithAdornment } from "../types";

import MuiTextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
type TextFieldProps = BaseInputPropsWithAdornment<MuiTextFieldProps>;

export const TextField = (props: TextFieldProps): ReactElement => {
  const { name, label, endAdornment, readOnly, placeholder = "Please Input", ...rest } = props;
  return (
    <Stack
      direction="column"
      gap={1}
    >
      {label ? <Typography>{label}</Typography> : null}
      <MuiTextField
        id={name}
        placeholder={placeholder}
        InputProps={{ endAdornment: endAdornment, readOnly: readOnly }}
        {...rest}
      />
    </Stack>
  );
};

export default TextField;
