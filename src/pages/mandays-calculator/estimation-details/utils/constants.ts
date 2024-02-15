import type { EstimationParentFormKeys } from "..";

export const inputView: EstimationDetailsMode[] = ["add", "edit"];
export const checkFormKeys: EstimationParentFormKeys[] = [
  "summary",
  "resources",
  "legends",
  "phases",
];
interface ParentFormKeys {
  [key: string]: EstimationParentFormKeys;
}

export const parentFormKeys: ParentFormKeys = {
  summary: "summary",
  legends: "legends",
  tasks: "tasks",
  phases: "phases",
};
