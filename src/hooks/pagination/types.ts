// Type definition for the hook's parameters
export type PaginationProps = {
  items: any[]; // Array of items to be paginated. Can be of any data type.
  itemsPerPage: number; // Number of items to display per page.
};

// Type definition for the hook's return value
export type PaginationItems = {
  currentPage: number; // Current active page number.
  totalPages: number; // Total number of pages.
  paginatedItems: () => any[]; // Function to get items of the current page.
  handlePageChange: (value: number) => void; // Function to change the current page.
};
