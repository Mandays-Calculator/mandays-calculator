import type { ReactElement } from "react";
import type { CustomHeaderGroup, TableProps } from ".";

import { useState } from "react";
import { useTable, useSortBy, ColumnInstance } from "react-table";
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
import LocalizationKey from "~/i18n/key";

import { StyledHeader, StyledHeaderCell } from ".";
import StripedRowRenderer from "./striped-row/StripedRow";

export const Table = <T extends object>(props: TableProps<T>): ReactElement => {
  const {
    title,
    columns,
    noColor = false,
    data = [],
    noDataLabel,
    onRowClick,
    type = "default",
    loading = false,
    width,
  } = props;

  const { common } = LocalizationKey;
  const { t } = useTranslation();
  console.log(data, "data");
  const [collapsedRows, setCollapsedRows] = useState<Record<string, boolean>>(
    {},
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>(
      {
        columns: columns as ColumnInstance<T>[],
        data: data as T[],
      },
      useSortBy,
    );

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
              <StyledHeader
                $noColor={noColor}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <StyledHeaderCell
                    $minWidth={width}
                    {...column.getHeaderProps(
                      (column as CustomHeaderGroup<T>).getSortByToggleProps(),
                    )}
                  >
                    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                      <Typography variant="body1" component="span">
                        {column.render("Header")}
                      </Typography>
                      {renderSortIcon(column)}
                    </Box>
                  </StyledHeaderCell>
                ))}
              </StyledHeader>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ padding: 5 }}
                >
                  {t(common.loadingLabel)}
                </TableCell>
              </TableRow>
            ) : (
              <>
                {rows.map((row, index) => {
                  prepareRow(row);
                  const rowId = `row-${index}`;
                  const isCollapsed = collapsedRows[rowId];
                  return (
                    <StripedRowRenderer
                      key={rowId}
                      row={row}
                      onRowClick={onRowClick}
                      type={type}
                      toggleCollapse={toggleCollapse}
                      rowId={rowId}
                      isCollapsed={isCollapsed}
                    />
                  );
                })}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      {noDataLabel || t(common.noDataLabel)}
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Stack>
  );
};

export default Table;
