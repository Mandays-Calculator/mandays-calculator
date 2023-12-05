import type { ReactNode, Ref, ReactElement, SyntheticEvent } from "react";
import type { TransitionProps } from "@mui/material/transitions";
import type { DialogProps } from "@mui/material/Dialog";
import type { SxProps } from "@mui/material";

import { forwardRef } from "react";
import { useDisableBodyScroll } from "~/hooks/modal";

import styled from "@mui/system/styled";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

interface ModalProps extends DialogProps {
  open: boolean;
  title: string;
  maxWidth: "xs" | "sm" | "md" | "lg";
  dividers?: boolean;
  actions?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  onEnter?: () => void;
  onExited?: () => void;
  sx?: SxProps;
}

const Transition = forwardRef(
  (
    transitionProps: TransitionProps & { children: ReactElement },
    ref: Ref<unknown>
  ) => {
    const { in: slideIn, children } = transitionProps;
    return (
      <Slide
        direction="up"
        in={slideIn}
        ref={ref}
        children={children}
        tabIndex={-1}
      />
    );
  }
);

const DialogActions = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2, 2),
}));

const DialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 0, 2, 2),
  color: theme.palette.primary.main,
}));

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Offset = styled(Box)(({ theme }) => ({
  width: theme.spacing(2.5),
}));

type ReasonType = "backdropClick" | "escapeKeyDown";

export const Modal = (props: ModalProps): ReactElement => {
  const {
    open,
    title,
    dividers,
    actions,
    children,
    maxWidth = "sm",
    onClose,
    onEnter,
    onExited,
    sx,
  } = props;

  useDisableBodyScroll(open);

  const handleBackDrop = (_event: SyntheticEvent, reason: ReasonType): void => {
    if (reason !== "backdropClick") {
      onClose();
    }
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      TransitionProps={{ onEnter, onExited }}
      sx={{ maxWidth: "100%", ...sx }}
      disableScrollLock={true}
      keepMounted={false}
      maxWidth={maxWidth}
      open={open}
      onClose={handleBackDrop}
    >
      <Stack direction="row" display="flex" minHeight={35}>
        <Box flexGrow={1}>
          {title ? <DialogTitle>{title}</DialogTitle> : null}
        </Box>
        <Offset />
      </Stack>
      <DialogContent dividers={dividers}>{children}</DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </Dialog>
  );
};

export default Modal;
