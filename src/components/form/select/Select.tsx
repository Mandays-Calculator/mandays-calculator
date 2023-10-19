import type { ReactElement, ReactNode } from "react";
import type { SelectProps as MuiSelectProps } from "@mui/material/Select";
import type { BaseInputProps } from "../types";

import { useCallback } from "react";

import { keyBy } from "lodash";

import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";

import { getOption } from "../utils";
import { SvgIcon } from "~/components";

interface SelectProps extends BaseInputProps<MuiSelectProps> {
  options?: SelectObject[];
  optionValueKey?: keyof SelectObject | "value";
  optionLabelKey?: keyof SelectObject | "label";
  name: string;
  sx?: SxProps;
}

export const Select = (props: SelectProps): ReactElement => {
  const {
    name,
    options = [],
    multiple = false,
    placeholder = "Please Select",
    error,
    optionLabelKey = "label",
    optionValueKey = "value",
    ...rest
  } = props;

  const getOptionLabel = getOption(optionLabelKey);
  const getOptionValue = getOption(optionValueKey);

  const defaultValue = multiple ? [] : "";
  const renderSelectedValue = (selected: unknown): ReactNode => {
    if (!selected || !(selected as string[]).length) {
      return (
        <MenuItem
          disabled
          sx={{ minHeight: "1em", lineHeight: "0.3em" }}
        >
          <em>{placeholder}</em>
        </MenuItem>
      );
    }

    if (multiple) {
      const selectedItems = (selected as string[]) ?? [];
      return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selectedItems?.map((value) => (
            <Chip
              variant="filled"
              label={getOptionLabel(keyBy(options, getOptionValue)[value])}
              key={value}
              deleteIcon={
                <SvgIcon
                  name="cross"
                  $size={1}
                />
              }
              onMouseDown={(e) => e.stopPropagation()}
            />
          ))}
        </Box>
      );
    }

    return getOptionLabel(keyBy(options, getOptionValue)[selected as string]);
  };

  const renderOptions = (valueOption: string, labelOption: string): ReactNode => {
    const filteredProps = {
      key: valueOption,
      value: valueOption,
    };

    return <MenuItem {...filteredProps}>{labelOption}</MenuItem>;
  };

  const renderSearchOptions = useCallback((): ReactNode => {
    return options.map((opt) => {
      return renderOptions(getOptionValue(opt), getOptionLabel(opt));
    });
  }, [options]);

  const renderNoneOptions = (): ReactNode => {
    if (multiple) return null;

    return (
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
    );
  };

  return (
    <FormControl
      component="fieldset"
      error={error}
      fullWidth
    >
      <MuiSelect
        id={name}
        labelId={name}
        multiple={multiple}
        renderValue={renderSelectedValue}
        displayEmpty
        defaultValue={defaultValue}
        MenuProps={{
          autoFocus: false,
        }}
        {...rest}
      >
        {renderSearchOptions()}
        {renderNoneOptions()}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
