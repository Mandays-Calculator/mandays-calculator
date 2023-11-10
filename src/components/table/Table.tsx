import type { ReactElement, ReactNode } from "react";
import type {
  CustomHeaderGroup,
  TableProps,
  RenderStripedRowProps,
  TableData,
  CellParamType,
  DataRowType,
} from ".";

import { useState } from "react";
import { useTable, useSortBy } from "react-table";
import { useTranslation } from "react-i18next";

import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Stack,
  Box,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LocalizationKey from "~/i18n/key";

import {
  StyledCell,
  StyledHeader,
  StyledStripeRow,
  StyledIconButton,
  StyledHeaderStripeRow,
} from ".";

const renderStripedRow = <T extends object>({
  row,
  onRowClick,
  type,
  toggleCollapse,
  rowId,
  isCollapsed,
}: RenderStripedRowProps<T>): ReactNode => {
  const renderCells = (dataRow: DataRowType) => {
    return Object.keys(dataRow).map((key) => (
      <StyledCell key={`${rowId}-${key}`}>{dataRow[key]}</StyledCell>
    ));
  };

  switch (type) {
    case "collapse":
      return (
        <>
          <StyledHeaderStripeRow key={rowId}>
            <StyledCell
              colSpan={row.cells.length}
              sx={{ position: "relative" }}
            >
              {row.original.label}
              <StyledIconButton
                size="small"
                onClick={() => toggleCollapse(rowId)}
              >
                {isCollapsed ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </StyledIconButton>
            </StyledCell>
          </StyledHeaderStripeRow>
          {!isCollapsed &&
            row.original.data.map((dataRow: any, index: any) => (
              <StyledStripeRow key={`${rowId}-${index}`}>
                {renderCells(dataRow)}
              </StyledStripeRow>
            ))}
        </>
      );
    default:
      return (
        <StyledStripeRow
          {...row.getRowProps({
            onClick: onRowClick ? () => onRowClick(row.original) : undefined,
            style: { cursor: onRowClick ? "pointer" : "default" },
          })}
        >
          {row.cells.map((cell: CellParamType) => (
            <StyledCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </StyledCell>
          ))}
        </StyledStripeRow>
      );
  }
};

export const Table = <T extends object>(props: TableProps<T>): ReactElement => {
  const {
    title,
    columns,
    data = [],
    noDataLabel,
    onRowClick,
    type = "default",
  } = props;
  const { t } = useTranslation();
  const [collapsedRows, setCollapsedRows] = useState<Record<string, boolean>>(
    {}
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<TableData<any>>({ columns, data }, useSortBy);

  // will toggle parent row if type === collapse
  const toggleCollapse = (rowId: string) => {
    setCollapsedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };
  const renderSortIcon = (column: any) =>
    column.isSorted ? (
      column.isSortedDesc ? (
        <ArrowDropDownIcon sx={{ ml: 1 }} fontSize="small" />
      ) : (
        <ArrowDropUpIcon sx={{ ml: 1 }} fontSize="small" />
      )
    ) : null;

  const { common } = LocalizationKey;
  return (
    <Stack gap={2}>
      <TableContainer component={Paper}>
        {title && (
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        )}
        <MuiTable {...getTableProps()} size="small" aria-label={props.name}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <StyledHeader {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <StyledCell
                    {...column.getHeaderProps(
                      (column as CustomHeaderGroup<T>).getSortByToggleProps()
                    )}
                  >
                    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                      <Typography variant="body1" component="span">
                        {column.render("Header")}
                      </Typography>
                      {renderSortIcon(column)}
                    </Box>
                  </StyledCell>
                ))}
              </StyledHeader>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              const rowId = `row-${index}`; // or some other unique identifier from your row data
              const isCollapsed = collapsedRows[rowId];
              return renderStripedRow({
                row,
                isCollapsed,
                rowId,
                onRowClick,
                toggleCollapse,
                type,
              });
            })}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {noDataLabel || t(common.noDataLabel)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Stack>
  );
};

export default Table;
