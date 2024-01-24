import React, { useState, ChangeEvent, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import { debounce } from "lodash";

import { TextField } from "~/components";
import { useCommonOption } from "~/queries/common/options";

import { UsersSelectProps } from "./types";
import DialogSearchUser from "../../edit-team-form/DialogSearchUser";

const UsersSelect: React.FC<UsersSelectProps> = ({
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
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
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
      <Button onClick={handleOpenModal} variant="outlined">
        +
      </Button>

      <DialogSearchUser
        showMemberDialog={isModalOpen}
        selectedTeamLead={null}
        toggleDialog={handleCloseModal}
      />
    </>
  );
};

export default UsersSelect;
