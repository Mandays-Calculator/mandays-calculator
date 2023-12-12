import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { formatTime } from "~/utils/date";

const StyledIdleTimer = styled(Typography)({
  margin: "1rem 2.5rem",
  marginLeft: "2.5rem",
  fontSize: "2.5rem",
  textAlign: "center",
});

interface TimerProps {
  milliseconds: number;
  onEndCountdown: () => void;
}

const Timer: React.FC<TimerProps> = ({ milliseconds, onEndCountdown }) => {
  const [timeLeft, setTimeLeft] = useState<number>(milliseconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onEndCountdown();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onEndCountdown]);

  return (
    <StyledIdleTimer variant="body1">{formatTime(timeLeft)}</StyledIdleTimer>
  );
};

export default Timer;
