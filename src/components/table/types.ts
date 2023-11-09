import { Column, HeaderGroup } from "react-table";

declare module "react-table" {
  export interface Row<D extends object = {}> {
    getRowProps: (props?: Partial<RowProps>) => RowProps;
  }
}

interface RowProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}

export interface TableProps<Type extends object> {
  name: string;
  title?: string;
  columns: Column<Type>[];
  data?: Type[];
  noDataLabel?: string;
  onRowClick?: (data: Type) => void;
}

export interface CustomHeaderGroup<Type extends object>
  extends HeaderGroup<Type> {
  getSortByToggleProps: (
    props?: any
  ) => import("react-table").HeaderPropGetter<Type>;
  isSorted?: boolean;
  isSortedDesc?: boolean;
}
