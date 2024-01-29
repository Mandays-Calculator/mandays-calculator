import type { ReactElement } from "react";
import type {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps,
  AutocompleteValue,
} from "@mui/material/Autocomplete";
import type { BaseInputProps } from "../types";

import MuiAutocomplete from "@mui/material/Autocomplete";
import { Popper, SxProps, TextField, Theme } from "@mui/material";

type MuiAutocompleteProps<
  Type,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> = AutocompleteProps<Type, Multiple, DisableClearable, FreeSolo>;

type Props<
  Type,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> = BaseInputProps<
  Omit<
    MuiAutocompleteProps<Type, Multiple, DisableClearable, FreeSolo>,
    "onChange" | "renderInput"
  >
> & {
  optionLabelKey?: keyof Type | "label";
  popperSX?: SxProps<Theme> | undefined;
  onChange?: (
    event: React.SyntheticEvent,
    value: AutocompleteValue<
      SelectObject,
      Multiple,
      DisableClearable,
      FreeSolo
    >,
    reason?: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<SelectObject>,
  ) => void;
};

export const SearchSelect = <
  Type extends object,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  props: Props<Type, Multiple, DisableClearable, FreeSolo>,
): ReactElement => {
  const {
    name,
    options,
    placeholder = "Please Input",
    value,
    onChange,
    popperSX,
    ...rest
  } = props;
  return (
    <MuiAutocomplete
      disablePortal
      id={name}
      value={value}
      options={options}
      fullWidth
      {...rest}
      onChange={onChange as any}
      data-testid="search-select-component"
      PopperComponent={(props) => (
        <Popper {...props} placement="bottom-start" sx={popperSX} />
      )}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} />
      )}
    />
  );
};

export default SearchSelect;
