import type { ChangeEvent, ReactElement } from "react"
import type { PaginationProps } from "@mui/material/Pagination";

import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { StyledPreviousIcon, StyledNextIcon, StyledPaginationItem } from ".";

interface PaginationPropType extends PaginationProps {
  totalPages?: number;
  handleChange?: (page: number) => void;
};

export const Pagination = (props: PaginationPropType ): ReactElement => {
  const { 
    totalPages = 1, 
    handleChange,
     ...rest 
  } = props;

  const handleChangeEvent = (_e: ChangeEvent<unknown>, value: number) => {
    if (handleChange) handleChange(value)
  } 

  return (
    <Stack spacing={2}>
    <MuiPagination
      count={totalPages}
      onChange={handleChangeEvent}
      renderItem={(item) => (
        <StyledPaginationItem
          slots={{ previous: StyledPreviousIcon, next: StyledNextIcon }}
          {...item}
        />
      )}
      {...rest}
    />
  </Stack>
  )
} 

export default Pagination;