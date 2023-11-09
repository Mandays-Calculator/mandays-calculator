import { Column, HeaderGroup } from "react-table";

export interface TableProps<Type extends object> {
  name: string;
  title?: string;
  columns: Column<Type>[];
  data?: Type[];
  noDataLabel?: string;
}

export interface CustomHeaderGroup<Type extends object>
  extends HeaderGroup<Type> {
  getSortByToggleProps():
    | import("react-table").HeaderPropGetter<Type>
    | undefined;
  isSorted?: boolean;
  isSortedDesc?: boolean;
}
