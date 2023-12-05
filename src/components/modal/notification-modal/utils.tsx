import { ReactElement } from "react";
import { ModalType } from "./types";

import Grid from "@mui/material/Grid";
import WarningIcon from "@mui/icons-material/Warning";
import Typography, { TypographyProps } from "@mui/material/Typography";

import { SvgIcon } from "~/components";

interface IdleTimerSectionProps {
  idleTimer: number;
  idleTimerSeconds: number;
}

const StyledTypography: React.FC<TypographyProps> = (
  props: TypographyProps
): ReactElement => (
  <Typography
    variant="inherit"
    fontSize="3.5rem"
    fontFamily="sans-serif"
    {...props}
  />
);

export const IdleTimerSection: React.FC<IdleTimerSectionProps> = ({
  idleTimer,
  idleTimerSeconds,
}: IdleTimerSectionProps): ReactElement => (
  <Grid container spacing={1}>
    <Grid item xs={1} marginX="7rem">
      <StyledTypography>{idleTimer}min</StyledTypography>
    </Grid>
    <Grid item>
      <StyledTypography>{idleTimerSeconds}secs</StyledTypography>
    </Grid>
  </Grid>
);

export const renderIcon = (type: ModalType): ReactElement => {
  switch (type) {
    case "error":
    case "warning":
    case "unauthorized":
      return <SvgIcon name="warning" $size={8} />;
    case "idleTimeOut":
      return <WarningIcon color="error" sx={{ fontSize: 40 }} />;
    case "success":
    default:
      return <WarningIcon color="success" />;
  }
};

export const TimerSection = ({
  idleTimer,
  idleTimerSeconds,
}: {
  idleTimer: number;
  idleTimerSeconds: number;
}): ReactElement => (
  <>
    <IdleTimerSection
      idleTimer={idleTimer}
      idleTimerSeconds={idleTimerSeconds}
    />
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" style={{ margin: "1rem" }}>
          Please click "Stay Logged On" to keep working; or click "Logout" to
          end your session now.
        </Typography>
      </Grid>
    </Grid>
  </>
);
