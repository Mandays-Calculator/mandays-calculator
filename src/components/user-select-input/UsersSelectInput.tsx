import React, { useState, ChangeEvent, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "lodash";
import { TextField } from "~/components";
import { useCommonOption } from "~/queries/common/options";

import { UserSelectInputProps } from "./types";

const UserSelectInput: React.FC<UserSelectInputProps> = ({
  textValue,
  onInputValueChange,
  error = false,
  label,
  helperText,
  name,
  fullWidth,
  textFieldProps,
  inputProps,
  dataTestId,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(textValue || "");

  const users = useCommonOption("user", { keyword: inputValue });

  const debouncedSetTeamLeadFilter = debounce(
    (value: string) => setInputValue(value),
    300
  );

  const handleTeamLeadFilterChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    debouncedSetTeamLeadFilter(e.target.value);
    if (onInputValueChange) {
      onInputValueChange(e.target.value);
    }
  };

  useEffect(() => {
    if (textValue) {
      setInputValue(textValue);
    }
  }, [textValue]);

  return (
    <Autocomplete
      disablePortal
      {...props}
      options={users}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          name={name}
          onFocus={() => setInputValue("")}
          value={inputValue}
          onChange={handleTeamLeadFilterChange}
          error={error}
          helperText={helperText}
          {...textFieldProps}
          label={label}
          {...params}
          fullWidth={fullWidth}
        />
      )}
    />
  );
};

export default UserSelectInput;
