import type { ReactElement, SyntheticEvent } from "react";
import type { ReactDatePickerProps } from "react-datepicker";
import type { SxProps } from "@mui/material";
import type { BaseInputProps } from "../types";
import type {
  ReactDatePickerFormat,
  ReactDatePickerFunctionParams,
} from "~/components/global-types/app";

import { useState } from "react";

import ReactDatePicker from "react-datepicker";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Header from "./components/Header";

const StyledCalendarMonthIcon = styled(CalendarMonthIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

interface DatePickerProps
  extends BaseInputProps<
    Omit<ReactDatePickerProps, "selectChange" | "onChange">
  > {
  type?: "default" | "range";
  dateFormat?: ReactDatePickerFormat;
  onChange?: (
    date: ReactDatePickerFunctionParams,
    event: SyntheticEvent<any> | undefined,
  ) => void;
  sx?: SxProps;
}
export const DatePicker = (props: DatePickerProps): ReactElement => {
  const {
    name,
    label,
    error,
    helperText,
    type = "default",
    showPopperArrow = false,
    dateFormat = "MM/dd/yyyy",
    placeholderText = "Please Input",
    onChange,
    sx,
    ...rest
  } = props;

  const [value, setValue] = useState<Date | null | undefined>(new Date());

  const handleDefaultOnChange = (): void => {
    return;
  };

  const handleChange = (
    date: Date | null,
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (date) {
      date.setHours((-1 * date.getTimezoneOffset()) / 60);
    }
    setValue(date);
    if (onChange) {
      onChange(date, event);
      return;
    }
    handleDefaultOnChange();
  };

  return (
    <ReactDatePicker
      selected={value}
      name={name}
      autoComplete="off"
      dateFormat={dateFormat}
      selectsRange={type === "range"}
      placeholderText={placeholderText}
      showPopperArrow={showPopperArrow}
      renderCustomHeader={(customeHeaderProps) => (
        <Header {...customeHeaderProps} />
      )}
      data-testid="date-picker-component"
      customInput={
        <TextField
          id={name}
          label={label}
          autoComplete="off"
          error={error}
          helperText={helperText}
          sx={sx}
          InputProps={{ endAdornment: <StyledCalendarMonthIcon /> }}
        />
      }
      popperModifiers={[
        {
          name: "preventOverflow",
          options: {
            rootBoundary: "viewport",
            tether: false,
            altAxis: true,
          },
        },
      ]}
      onChange={
        type === "default" ? handleChange : onChange ?? handleDefaultOnChange
      }
      {...rest}
    />
  );
};

export default DatePicker;
