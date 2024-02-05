import type { FieldAttributes } from "formik";
import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/material";

import { BaseInputProps } from "../types";

import { StyledButton, StyledInputElement, StyledInputRoot } from ".";
import IconUp from "~/assets/svg/number_input_arrow_up.svg";
import IconDown from "~/assets/svg/number_input_arrow_down.svg";

interface CustomNumberInputProps extends BaseInputProps<NumberInputProps> {
  name?: string;
  width?: number;
  field?: FieldAttributes<any>;
}

const StyledNumberInput = styled(BaseNumberInput, {
  shouldForwardProp: (props) => props !== "width",
})<{ width?: number; error: boolean }>(({ width, error, theme }) => ({
  width: width ? `${width}rem` : undefined,
  justifyContent: "space-between",
  borderColor: error ? theme?.palette.error.main : theme?.palette.grey[500],
  border: `2px solid inherit`,
  "&:hover": {
    border: error ? `2px solid inherit` : `1px solid rgba(0, 0, 0, 0.87)`,
  },
  "&:focus, &:focus-visible": {
    border: error
      ? `2px solid inherit`
      : `2px solid ${theme?.palette.primary.main}`,
    outline: error ? theme?.palette.error.main : theme?.palette.primary.main,
  },
  [`& .MuiNumberInput-input`]: {
    width: width ? `${(width as number) / 1.7}rem` : undefined,
  },
}));

const CustomNumberInput = React.forwardRef<
  HTMLDivElement,
  CustomNumberInputProps
>((props, ref) => {
  const { name, onChange, width, error } = props;
  return (
    <StyledNumberInput
      name={name}
      error={error || false}
      min={0}
      onChange={onChange}
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          type: "button",
          children: <img src={IconUp} alt={"arrow-up"} />,
        },
        decrementButton: {
          type: "button",
          children: <img src={IconDown} alt={"arrow-down"} />,
        },
      }}
      width={width}
      {...props}
      ref={ref}
    />
  );
});

export default function NumberInputIntroduction(props: CustomNumberInputProps) {
  const { name, placeholder, onChange, width, error, field } = props;
  return (
    <CustomNumberInput
      {...field}
      aria-label={name}
      onChange={onChange}
      name={name}
      width={width}
      error={error}
      placeholder={placeholder}
      data-testid="number-input-component"
    />
  );
}
