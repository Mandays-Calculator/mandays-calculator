import { useState, useCallback } from "react";

type PaginationProps = {
  items: any[]; // consists of different data type;
  itemsPerPage: number;
};

type PaginationItems = {
  currentPage: number;
  totalPages: number;
  paginatedItems: () => any[]; // consists of different data type
  handlePageChange: (value: number) => void | undefined;
};

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

  return { currentPage, totalPages, paginatedItems, handlePageChange };
};
