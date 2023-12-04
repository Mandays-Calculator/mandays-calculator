import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";

interface CustomNumberInputProps extends NumberInputProps {
  name?: string;
}

const IncrementButton: React.FC = () => <div>▴</div>;
const DecrementButton: React.FC = () => <div>▾</div>;

const CustomNumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
  (props, ref) => (
    <BaseNumberInput
      slots={{
        incrementButton: IncrementButton,
        decrementButton: DecrementButton,
      }}
      {...props}
      ref={ref}
    />
  )
);

const NumberInput: React.FC = (props: CustomNumberInputProps) => {
  return (
    <CustomNumberInput
      aria-label={props.name}
      placeholder={props.placeholder}
      {...props}
    />
  );
};

export default NumberInput;
