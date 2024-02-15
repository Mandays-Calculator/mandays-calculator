import type { EstimationParentFormKeys } from "..";

export const inputView: EstimationDetailsMode[] = ["add", "edit"];

interface ParentFormKeys {
  [key: string]: EstimationParentFormKeys;
}

export const parentFormKeys: ParentFormKeys = {
  summary: "summary",
  legends: "legends",
  tasks: "tasks",
  phases: "phases",
};
