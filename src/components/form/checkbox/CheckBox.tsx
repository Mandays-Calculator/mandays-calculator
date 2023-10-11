import type { ReactElement } from "react";
import type { CheckboxProps as MuiCheckBoxProps } from "@mui/material";
import type { BaseInputProps } from "../types";

import MuiCheckBox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

type CheckBoxProps = BaseInputProps & MuiCheckBoxProps;

export const CheckBox = (props: CheckBoxProps): ReactElement => {
  const { name, label, error, helperText, value, ...rest } = props;
  return (
    <FormControl
      component="fieldset"
      error={error}
    >
      <FormControlLabel
        label={label}
        checked={Boolean(value)}
        name={name}
        control={
          <MuiCheckBox
            inputProps={{
              "aria-label": name,
            }}
            {...rest}
          />
        }
      />
      {helperText ? <FormHelperText> {helperText} </FormHelperText> : null}
    </FormControl>
  );
};

export default CheckBox;
