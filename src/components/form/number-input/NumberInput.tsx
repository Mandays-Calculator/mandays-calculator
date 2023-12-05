import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";

import { BaseInputProps } from "../types";

import { StyledButton, StyledInputElement, StyledInputRoot } from ".";
import IconUp from "~/assets/svg/number_input_arrow_up.svg";
import IconDown from "~/assets/svg/number_input_arrow_down.svg";

interface CustomNumberInputProps extends BaseInputProps<NumberInputProps> {
  name?: string;
}

const CustomNumberInput = React.forwardRef<
  HTMLDivElement,
  CustomNumberInputProps
>((props, ref) => {
  const { name, onChange } = props;
  return (
    <BaseNumberInput
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
          children: <img src={IconUp} alt={"arrow-up"} />,
        },
        decrementButton: {
          children: <img src={IconDown} alt={"arrow-down"} />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function NumberInputIntroduction(props: CustomNumberInputProps) {
  const { name, placeholder, onChange } = props;
  return (
    <CustomNumberInput
      aria-label={name}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
    />
  );
}
