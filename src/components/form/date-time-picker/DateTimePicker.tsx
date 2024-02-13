import { ReactElement, SyntheticEvent, useState } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { SxProps, styled } from "@mui/material/styles";

const StyledCalendarMonthIcon = styled(CalendarMonthIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

interface DateTimePickerProps
  extends Omit<ReactDatePickerProps, "selected" | "onChange"> {
  name: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  dateFormat?: string;
  timeFormat?: string;
  onChange?: (
    date: Date | null,
    event: SyntheticEvent<any> | undefined,
  ) => void;
  sx?: SxProps;
}

const ResponsiveTextField = styled(TextField)(({ theme }) => ({
  minWidth: 150,
  [theme.breakpoints.up("sm")]: {
    minWidth: 200,
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 300,
  },
  [theme.breakpoints.up("lg")]: {
    minWidth: 400,
  },
  [theme.breakpoints.up("xl")]: {
    minWidth: 400,
  },
}));

const DateTimePicker = ({
  name,
  label,
  error,
  helperText,
  dateFormat = "MM/dd/yyyy",
  timeFormat = "HH:mm",
  onChange,
  sx,
  ...rest
}: DateTimePickerProps): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChange = (
    date: Date | null,
    event: SyntheticEvent<any> | undefined,
  ) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date, event);
    }
  };

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={handleChange}
      showTimeSelect
      timeIntervals={15}
      dateFormat={`${dateFormat} ${timeFormat}`}
      {...rest}
      name={name}
      customInput={
        <ResponsiveTextField
          id={name}
          label={label}
          autoComplete="off"
          error={error}
          helperText={helperText}
          sx={sx}
          InputProps={{ endAdornment: <StyledCalendarMonthIcon /> }}
        />
      }
    />
  );
};

export default DateTimePicker;
