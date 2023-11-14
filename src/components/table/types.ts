import { JSX } from "react/jsx-runtime";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import { Column, HeaderGroup } from "react-table";
import { MUIStyledCommonProps } from "@mui/system";
import { TableCellProps, Theme } from "@mui/material";

declare module "react-table" {
  export interface Row<D extends object = {}> {
    getRowProps: (props?: Partial<RowProps>) => RowProps;
  }
}

export type CollapseData<Type extends object> = {
  label: string;
  data: Type[];
};

export type TableData<Type extends object> = Type | CollapseData<Type>;
export interface TableProps<Type extends object> {
  name: string;
  title?: string;
  columns: Column<Type>[];
  data?: TableData<Type>[];
  noDataLabel?: string;
  onRowClick?: (data: Type) => void;
  expandedData?: boolean;
  type?: "collapse" | "default";
}

export interface CustomHeaderGroup<Type extends object>
  extends HeaderGroup<Type> {
  getSortByToggleProps: (
    props?: any
  ) => import("react-table").HeaderPropGetter<Type>;
  isSorted?: boolean;
  isSortedDesc?: boolean;
}

export type RenderStripedRowProps<Type extends object> = {
  row: any;
  onRowClick?: (data: Type) => void;
  type?: "default" | "collapse";
  rowId: string;
  isCollapsed: boolean;
  toggleCollapse: (rowId: string) => void;
};

export type RowProps = {
  onClick?: () => void;
  style?: React.CSSProperties;
};

export type CellParamType = {
  getCellProps: () => JSX.IntrinsicAttributes &
    TableCellProps &
    MUIStyledCommonProps<Theme>;
  render: (
    arg0: string
  ) =>
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
};

export type DataRowType = {
  [x: string]:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
};
