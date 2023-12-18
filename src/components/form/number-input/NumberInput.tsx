import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";

import { BaseInputProps } from "../types";

import { StyledButton, StyledInputElement, StyledInputRoot } from ".";
import IconUp from "~/assets/svg/number_input_arrow_up.svg";
import IconDown from "~/assets/svg/number_input_arrow_down.svg";
import { styled } from "@mui/material";

interface CustomNumberInputProps extends BaseInputProps<NumberInputProps> {
  name?: string;
  width?: number;
}

const StyledNumberInput = styled(BaseNumberInput, {
  shouldForwardProp: (props) => props !== "width",
})<{ width?: number }>(({ width }) => ({
  width: width ? `${width}rem` : undefined,
  justifyContent: "space-between",
  [`& .MuiNumberInput-input`]: {
    width: width ? `${(width as number) / 1.7}rem` : undefined,
  },
}));

const CustomNumberInput = React.forwardRef<HTMLDivElement, CustomNumberInputProps>((props, ref) => {
  const { name, onChange, width } = props;
  return (
    <StyledNumberInput
      name={name}
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
          children: (
            <img
              src={IconUp}
              alt={"arrow-up"}
            />
          ),
        },
        decrementButton: {
          children: (
            <img
              src={IconDown}
              alt={"arrow-down"}
            />
          ),
        },
      }}
      width={width}
      {...props}
      ref={ref}
    />
  );
});

export default function NumberInputIntroduction(props: CustomNumberInputProps) {
  const { name, placeholder, onChange, width } = props;
  return (
    <CustomNumberInput
      aria-label={name}
      onChange={onChange}
      name={name}
      width={width}
      placeholder={placeholder}
    />
  );
}
