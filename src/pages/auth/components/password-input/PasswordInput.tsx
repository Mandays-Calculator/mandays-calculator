import type { ReactElement } from "react";

import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { ControlledTextField } from "~/components/form/controlled";

type PasswordInputProps = {
  name: string;
  placeholder?: string;
  helperText?: string;
};

const PasswordInput = ({
  name,
  placeholder,
  helperText,
}: PasswordInputProps): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <ControlledTextField
      name={name}
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      fullWidth
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} data-testid={`icon-button`}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
