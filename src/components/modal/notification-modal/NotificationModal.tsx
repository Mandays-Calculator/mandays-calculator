import type { ReactElement } from "react";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import { Modal } from "~/components";
import LocalizationKey from "~/i18n/key";
import { CustomButton } from "~/components/form/button";

import { NotificationModalProps } from "./types";
import { TimerSection, renderIcon } from "./utils";

const NotificationModal: React.FC<NotificationModalProps> = ({
  type = "error",
  onConfirm,
  open,
  onClose,
  onCloseLabel,
  onConfirmLabel,
  title,
}): ReactElement => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [idleTimer, setIdleTimer] = useState(5);
  const [idleTimerSeconds, setIdleTimerSeconds] = useState(0);

  useEffect(() => {
    setIsOpen(open);
    if (open) {
      setIdleTimer(5);
      setIdleTimerSeconds(0);
    }
  }, [open]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    const startTimer = () => {
      timerInterval = setInterval(() => {
        if (idleTimer > 0 || idleTimerSeconds > 0) {
          setIdleTimerSeconds((prevSeconds) =>
            prevSeconds === 0 ? 59 : prevSeconds - 1
          );

          if (idleTimerSeconds === 0) {
            setIdleTimer((prevIdleTimer) => prevIdleTimer - 1);
          }
        } else {
          handleClose();
        }
      }, 1000);
    };

    if (isOpen) {
      startTimer();
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isOpen, idleTimer, idleTimerSeconds]);

  const handleClose = () => {
    if (onClose) onClose();
    setIsOpen(false);
  };

  const handleStayLoggedOn = () => {
    setIdleTimer(5);
    setIdleTimerSeconds(0);
    setIsOpen(false);
    if (onConfirm) onConfirm();
  };

  switch (type) {
    case "unauthorized":
    default:
  }

  return (
    <Modal
      open={isOpen}
      maxWidth="xs"
      title={title as string}
      onClose={handleClose}
    >
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4.5rem",
          background: "#1e90ff",
        }}
      />
      <IconButton
        color="inherit"
        onClick={handleClose}
        style={{
          position: "absolute",
          top: 5,
          right: 8,
          color: "white",
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <Box
        style={{
          position: "absolute",
          top: 8,
          left: 8,
        }}
      >
        <Typography
          variant="h5"
          align="left"
          style={{ color: "white", fontWeight: "bold", marginTop: ".5rem" }}
        >
          Session Timeout
        </Typography>
      </Box>

      <Stack
        marginTop="1.5rem"
        width="100%"
        direction="row"
        justifyContent="center"
        alignContent="center"
      >
        {renderIcon(type)}
        <Typography variant="h5" style={{ margin: "1rem" }}>
          Your online session will expire in
        </Typography>
      </Stack>

      <TimerSection idleTimer={idleTimer} idleTimerSeconds={idleTimerSeconds} />

      <Box marginY="1rem" ml="5.5rem">
        {onCloseLabel && (
          <CustomButton
            variant="outlined"
            colorVariant="neutral"
            onClick={handleClose}
            style={{
              marginRight: "1.3rem",
              fontWeight: "bold",
              color: "#1e90ff",
              padding: "1rem 2rem",
              fontSize: "medium",
            }}
          >
            {onCloseLabel || t(LocalizationKey.common.cancelBtn)}
          </CustomButton>
        )}

        <CustomButton
          variant="contained"
          onClick={handleStayLoggedOn}
          style={{
            fontWeight: "bold",
            fontSize: "medium",
            padding: "1rem 2rem",
          }}
        >
          {onConfirmLabel || t(LocalizationKey.common.okayBtn)}
        </CustomButton>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
