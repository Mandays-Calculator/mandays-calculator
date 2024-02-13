import type { ChangeEvent, ReactElement } from "react";
import type { PaginationProps } from "@mui/material/Pagination";

import MuiPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { StyledPreviousIcon, StyledNextIcon, StyledPaginationItem } from ".";

interface PaginationPropType extends PaginationProps {
  totalItems?: number;
  itemsPerPage?: number;
  page?: number;
  handleChange?: (page: number) => void;
}

export const Pagination = (props: PaginationPropType): ReactElement => {
  const {
    totalItems = 0,
    itemsPerPage = 5,
    handleChange,
    page,
    ...rest
  } = props;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChangeEvent = (_e: ChangeEvent<unknown>, value: number) => {
    if (handleChange) handleChange(value);
  };

  if (totalPages) {
    return (
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <MuiPagination
          count={totalPages}
          page={page}
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
    );
  }
  return <></>;
};

export default Pagination;
