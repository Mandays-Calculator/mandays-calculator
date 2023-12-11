import { ReactNode } from "react";

export type ModalType =
  | "error"
  | "warning"
  | "success"
  | "unauthorized"
  | "idleTimeOut";

export interface NotificationModalProps {
  onConfirm?: () => void;
  open: boolean;
  onClose?: () => void;
  message?: string | ReactNode;
  onCloseLabel?: string;
  onConfirmLabel?: string;
  type?: ModalType;
  title?: string;
  modalTitle?: string | ReactNode;
}
