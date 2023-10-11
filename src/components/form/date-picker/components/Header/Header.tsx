import type { ReactElement } from "react";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";

import { useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { getMonth, getYear, getYears } from "~/utils/date";

const StyledYearsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3,auto)",
  gap: 1,
  width: "auto",
  overflow: "auto",
  maxHeight: theme.spacing(12.5),
  padding: theme.spacing(1),
}));

const StyledYearButton = styled(IconButton)(({ theme }) => ({
  fontWeight: "bold",
  borderRadius: "50%",
  padding: theme.spacing(1),
  fontSize: theme.spacing(2),
}));

type HeaderProps = ReactDatePickerCustomHeaderProps;

const Header = (props: HeaderProps): ReactElement => {
  const {
    date,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    changeYear,
    increaseMonth,
    decreaseMonth,
  } = props;

  const [isYearOptionsVisible, setIsYearOptionsVisible] = useState(false);

  const toggleYearsOptions = (): void => {
    setIsYearOptionsVisible((prevState) => !prevState);
  };

  const selectYear = (year: number) => {
    changeYear(year);
    setIsYearOptionsVisible(false);
  };
  return (
    <Stack gap={1}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        padding={1}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
          >
            {getMonth(date)}
          </Typography>
          <IconButton
            disableRipple
            onClick={toggleYearsOptions}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
            >
              {getYear(date)}
            </Typography>
            {isYearOptionsVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          gap={1}
        >
          <IconButton
            disabled={prevMonthButtonDisabled}
            onClick={decreaseMonth}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            disabled={nextMonthButtonDisabled}
            onClick={increaseMonth}
          >
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      </Stack>

      {isYearOptionsVisible ? (
        <StyledYearsContainer>
          {getYears().map((year) => (
            <StyledYearButton
              key={year}
              color={year === getYear(date) ? "primary" : undefined}
              onClick={() => selectYear(year)}
            >
              {year}
            </StyledYearButton>
          ))}
        </StyledYearsContainer>
      ) : null}
    </Stack>
  );
};

export default Header;
