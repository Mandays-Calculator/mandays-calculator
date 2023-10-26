import type { CheckboxProps } from "@mui/material/Checkbox";
import type { ReactElement } from "react";
import { BaseInputProps } from "../types";
import { getOption } from "../utils";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

type CheckBoxPropsOmit = Omit<CheckboxProps, "onChange">;

interface CheckBoxGroupProps<Type> extends BaseInputProps<CheckBoxPropsOmit> {
  row?: boolean;
  options: Type[];
  optionLabelKey?: keyof Type | "label";
  optionValueKey?: keyof Type | "value";
  onChange?: (nameValue: string, value: boolean) => void | undefined;
  multiple?: boolean;
}
export const CheckboxGroup = <Type extends object>(
  props: CheckBoxGroupProps<Type>
): ReactElement => {
  const {
    name,
    label,
    error,
    row,
    helperText,
    options,
    optionValueKey = "value",
    optionLabelKey = "label",
    multiple = true,
    ...rest
  } = props;

  const getOptionValue = getOption<Type>(optionValueKey);
  const getOptionLabel = getOption<Type>(optionLabelKey);

  return (
    <FormControl
      component="fieldset"
      error={error}
      data-testid="checkbox-group-component"
    >
      {label ? <InputLabel>{label}</InputLabel> : null}
      {options?.map((option) => {
        const currVal = props.value as string[];
        const valSingle = (): string[] => {
          return currVal.length > 1 ? [...currVal.slice(1)] : currVal;
        };
        const isChecked = multiple
          ? currVal?.includes(getOptionValue(option))
          : valSingle().includes(getOptionValue(option));

        return (
          <FormControlLabel
            key={getOptionValue(option)}
            label={getOptionLabel(option)}
            value={getOptionValue(option)}
            control={
              <Checkbox
                {...rest}
                name={name}
                checked={isChecked ?? false}
                onChange={(_, value) => props.onChange?.(getOptionValue(option), value)}
              />
            }
          />
        );
      })}
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};

export default CheckboxGroup;
