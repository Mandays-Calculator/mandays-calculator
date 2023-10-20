import type { ReactElement } from "react";
import type { AutocompleteProps, AutocompleteValue } from "@mui/material/Autocomplete";
import type { BaseInputProps } from "../types";

import MuiAutocomplete from "@mui/material/Autocomplete";
import { Popper, TextField } from "@mui/material";

type MuiAutocompleteProps<
  Type,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = AutocompleteProps<Type, Multiple, DisableClearable, FreeSolo>;

type Props<
  Type,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = BaseInputProps<
  Omit<MuiAutocompleteProps<Type, Multiple, DisableClearable, FreeSolo>, "onChange" | "renderInput">
> & {
  optionLabelKey?: keyof Type | "label";
  onChange?: (data: AutocompleteValue<Type, Multiple, DisableClearable, FreeSolo>) => void;
};

export const SearchSelect = <
  Type extends object,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: Props<Type, Multiple, DisableClearable, FreeSolo>
): ReactElement => {
  const { name, options, placeholder = "Please Input" } = props;
  return (
    <MuiAutocomplete
      disablePortal
      multiple
      id={name}
      options={options}
      fullWidth
      PopperComponent={(props) => (
        <Popper
          {...props}
          placement="bottom-start"
        />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default SearchSelect;
