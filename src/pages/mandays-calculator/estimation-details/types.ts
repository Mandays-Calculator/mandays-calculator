export type EstimationDetailsMode = "edit" | "add" | "view";

export interface EstimationDetailsProps {
  isShared?: boolean;
}
export type ExportFormValues = {
  exportBy: string;
};

export type ShareFormValues = {
  shareBy: string;
  expiredIn: string;
};
