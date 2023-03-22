import * as React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

export interface PaginationProps {
  className?: string;
  pageNo: number;
  pageSize: number;
  count: number;
  pageSizes?: number[]; // Default: [5, 10, 25, 50, 100]
  onPageNoChange: (pageNo: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Pagination = (
  {
    className,
    pageNo,
    pageSize,
    pageSizes = [5, 10, 25, 50, 100],
    count,
    onPageNoChange,
    onPageSizeChange,
  }: PaginationProps,
) => {

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageNoChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<any>) => {
    onPageSizeChange(parseInt(event.target.value, 10));
  };

  return (
    <TablePagination
      className={className}
      component="span"
      count={count}
      page={pageNo - 1}
      rowsPerPage={pageSize}
      rowsPerPageOptions={pageSizes}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
