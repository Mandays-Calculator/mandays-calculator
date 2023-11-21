import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { formatTime } from "~/utils/date";

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

  return <Typography variant="body1">{formatTime(timeLeft)}</Typography>;
};

export default Timer;
