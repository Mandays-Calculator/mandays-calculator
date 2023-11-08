import { useTable, useSortBy, Column } from "react-table";

import { styled } from "@mui/material/styles";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

interface TableProps<Type extends object> {
  name: string;
  title?: string;
  columns: Column<Type>[];
  data?: Type[];
}

interface HeaderColumn {
  getSortByToggleProps: void;
}

const StyledHeader = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  "& th": {
    cursor: "pointer",
  },
}));

const StyledCell = styled(TableCell)({
  padding: "16px 12px",
});

const StyledStripeRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FEFEFE",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#EAF3F4",
  },
});

export const Table = <Type extends object>(
  props: TableProps<Type>
): ReactElement => {
  const { name, title, columns, data = [] } = props;

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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <Typography fontWeight="bold">
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
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
                <StyledStripeRow {...row.getRowProps()}>
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
                  <Typography textAlign="center">No Data</Typography>
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
