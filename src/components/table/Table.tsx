import type { ReactElement } from "react";
import type { TableProps, CustomHeaderGroup } from ".";

import { useTable, useSortBy, RowPropGetter, Row } from "react-table";
import { useTranslation } from "react-i18next";

import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { SvgIcon } from "~/components";
import LocalizationKey from "~/i18n/key";

import { StyledCell, StyledHeader, StyledStripeRow } from ".";

/* *
  Sample usage of the Table component:
  Import the necessary dependencies at the beginning of your file:

  import { Table, Column } from "./Table";

  Define your data columns using the Column interface:
  
  const columns: Column<YourDataType>[] = [
    {
      Header: "Name",        // The column header label
      accessor: "name",      // The key in your data that corresponds to this column
    },
    {
      Header: "Team",
      accessor: "team",
      disableSortBy: true,   // To disable sorting for this specific column
    },
  ];

  Define your data in an array of objects with the corresponding keys:
  const data: YourDataType[] = [
    {
      name: "Joe",
      team: "Enrollment",
      startedDate: "30/01/2023",
      status: "On going",
    },
  ];

  Finally, render the Table component with the defined columns and data:

  <Table
    columns={columns}
    data={data}
  />

  Customize the Table component by passing additional props as needed, such as a title or a label for when there's no data.
  Example with a title and a custom "No Data" label:
  <Table
    columns={columns}
    data={data}
    title="Employee List"
    noDataLabel="No employees found"
  />
  *
*/

export type ExtendedRowPropGetter<Type extends object> = (
  props?: Partial<Row<Type>>
) => RowPropGetter<Type> & Record<string, any>;

export const Table = <Type extends object>(
  props: TableProps<Type>
): ReactElement => {
  const { common } = LocalizationKey;
  const { name, title, columns, data = [], noDataLabel, onRowClick } = props;
  const { t } = useTranslation();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Type>(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <Stack gap={2}>
      <TableContainer component={Paper}>
        {title && (
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
        )}
        <MuiTable {...getTableProps()} size="small" aria-label={name}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <StyledHeader {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <StyledCell
                    {...column.getHeaderProps(
                      (column as CustomHeaderGroup<Type>).getSortByToggleProps()
                    )}
                  >
                    <Typography fontWeight="bold">
                      {column.render("Header")}
                      <span>
                        {(column as CustomHeaderGroup<Type>).isSorted ? (
                          (column as CustomHeaderGroup<Type>).isSortedDesc ? (
                            <SvgIcon
                              name="arrow_down"
                              $size={1}
                              sx={{ ml: 1 }}
                            />
                          ) : (
                            <SvgIcon name="arrow_up" $size={1} sx={{ ml: 1 }} />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </Typography>
                  </StyledCell>
                ))}
              </StyledHeader>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <StyledStripeRow
                  {...row.getRowProps({
                    onClick: () =>
                      onRowClick ? onRowClick(row.original) : null,
                    style: {
                      cursor: onRowClick ? "pointer" : "default",
                    },
                  })}
                >
                  {row.cells.map((cell) => (
                    <StyledCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </StyledCell>
                  ))}
                </StyledStripeRow>
              );
            })}
            {rows.length === 0 && (
              <StyledStripeRow>
                <StyledCell colSpan={columns.length}>
                  <Typography textAlign="center">
                    {noDataLabel || t(common.noDataLabel)}
                  </Typography>
                </StyledCell>
              </StyledStripeRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Stack>
  );
};

export default Table;
