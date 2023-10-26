import type { ReactElement } from 'react';
import type { Column } from "react-table";

import { Fragment } from 'react';
import { useTable } from 'react-table'
import { styled } from '@mui/material/styles';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

interface TableProps<Type extends object> {
  name: string;
  title?: string;
  columns: Column<Type>[];
  data?: Type[];
}

const StyledHeader = styled(TableRow)({
  backgroundColor: '#D0DEEA',
  borderRadius: '8px',
})

const StyledCell = styled(TableCell)({
  padding: '16px 12px'
})


const StyledStripeRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FEFEFE'
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#EAF3F4'
  }
})


export const Table = <Type extends object>(props: TableProps<Type>): ReactElement => {
  const {
    name,
    title,
    columns,
    data = [],
  } = props;

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Type>(
    {
      columns,
      data,
    }
  );


  return (
    <Stack gap={2}>
      <TableContainer component={Paper}>
        {title && (
          <Typography variant='h5'>
            {title}
          </Typography>
        )}
        <MuiTable {...getTableProps()} size='small' aria-label={name}>
          <TableHead>
            {headerGroups.map((headerGroup) => {
              const { key: headerGroupKey, role: headerGroupRole, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
              return (
                <StyledHeader {...restHeaderGroupProps} key={headerGroupKey} role={headerGroupRole}>
                  {headerGroup.headers.map((column) => {
                    const { key: headerKey, role: headerRole, ...restHeaderProps } = column.getHeaderProps(); 
                    return (
                      <StyledCell
                        {...restHeaderProps}
                        key={headerKey}
                        role={headerRole}
                      >
                        <Typography fontWeight='bold'>
                          {column.render('Header')}
                        </Typography>
                      </StyledCell>

                    )
                  })}
                </StyledHeader>
              )
            })}
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              prepareRow(row);
              const { key: rowKey, ...restRowProps } = row.getRowProps(); 
              return (
                <Fragment key={rowKey}>
                <StyledStripeRow {...restRowProps} >
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...restCellProps } = cell.getCellProps();
                    return (
                      <StyledCell {...restCellProps} key={cellKey}>
                        {cell.render("Cell")}
                      </StyledCell>
                    )
                  })}
                </StyledStripeRow>
                </Fragment>
                )
            })}
            {rows.length === 0 && (
              <StyledStripeRow>
                <StyledCell colSpan={columns.length}>
                  <Typography textAlign='center'>No Data</Typography>
                </StyledCell>
              </StyledStripeRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Stack>
  );
}

export default Table;
