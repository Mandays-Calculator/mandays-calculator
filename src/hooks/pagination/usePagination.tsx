import type { PaginationItems, PaginationProps } from "./types";
import { useState, useCallback, ReactElement } from "react";

import { Pagination as CustomPagination } from "~/components";
/**
 * Custom hook for handling pagination logic.
 *
 * @param {PaginationProps} - Object containing items and the number of items per page.
 * @returns {PaginationItems} - An object containing pagination state and control functions.
 */
export const usePagination = ({
  items,
  itemsPerPage = 5,
}: PaginationProps): PaginationItems => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, items]);

  const handlePageChange = (value: number): void => {
    setCurrentPage(value);
  };

  const Pagination = (): ReactElement => {
    return (
      <CustomPagination
        handleChange={handlePageChange}
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
      />
    );
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    Pagination,
  };
};
