//@ts-nocheck
import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '../../Checkbox/Checkbox';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import { EnhancedTableHead } from './EnhancedTableHead';
import { CircularProgress } from '../../Progress/CircularProgress';
import clsx from 'clsx';

export interface EnhancedTableProps {
  onRequestSort?: (event: React.MouseEvent<unknown>, orderBy: string, orderDirection: string) => void;
  orderDirection?: OrderDirection;
  onChangePage?: (event: unknown, page: number) => void;
  onRowsPerPageChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onSelectedChange?: (selected: Set<string>) => void;
  rowsPerPageOptions?: number[];
  tableTitle?: string;
  loading?: boolean;
  tableProps: TableProps;
  enableSelectableRows?: boolean;
  selected?: Set<string>;
  // The column id to sort by
  orderBy?: string;
  rowCount: number;
  rowsPerPage: number;
  page: number;
  totalRows: number;
  classes?: ReturnType<typeof useStyles>;
}

export type OrderDirection = 'asc' | 'desc';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: .1,
      backgroundColor: theme.palette.common.black,
      height: '100%',
      width: '100%'
    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
    },
    root: {
      position: 'relative',
      width: '100%',
      marginTop: theme.spacing(3),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  }),
);

interface TableProps {
  headers: HeaderCellProps[];
  rows: TableRowProps[];
}

export interface HeaderCellProps {
  id: string;
  align: 'right' | 'left';
  element: JSX.Element;
  sortable?: boolean;
}

export interface TableRowProps {
  id: string;
  cells: TableCellProps[];
}

interface TableCellProps {
  element: JSX.Element;
  colSpan?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

export function EnhancedTable(props: EnhancedTableProps) {
  const {
    tableTitle,
    enableSelectableRows,
    tableProps,
    onSelectedChange,
    onRowsPerPageChange,
    onChangePage,
    rowsPerPage,
    page,
    totalRows,
    loading,
    selected,
    onRequestSort,
    orderDirection,
    orderBy,
    rowsPerPageOptions = [5, 10, 25]
  } = props;
  const { rows } = tableProps;

  const rowsLength = rows.length;
  const classes = useStyles();

  function handleRequestSort(event: React.MouseEvent<unknown>, property: string) {
    const newOrderDirection: OrderDirection = orderBy === property && orderDirection === 'desc' ? 'asc' : 'desc';
    onRequestSort(event, property, newOrderDirection);
  }

  /**
   * TODO: With the current implementation we don't actually have all of the rows so we can't determine
   * what every row is. We may need to just to make note that the user is selecting all and pass a boolean to the backend
   * to affect all rows.
   */
  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
    let newSelected: Set<string>;
    if (event.target.checked) {
      newSelected = new Set(tableProps.rows.map(row => row.id));
    } else {
      newSelected = new Set();
    }
    onSelectedChange(newSelected);
  }

  function handleClick(event: React.MouseEvent<unknown>, rowId: string) {
    const newSelected = new Set(selected);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    onSelectedChange(newSelected);
  }

  const isSelected = (rowId: string) => selected && selected.has(rowId);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalRows - page * rowsPerPage);

  function renderTableRow(row: TableRowProps) {
    const { id } = row;
    const isItemSelected = isSelected(id);
    const tableRowProps = {
      onClick: enableSelectableRows ? (event: React.MouseEvent<unknown>) => handleClick(event, id) : null,
      hover: true,
      role: 'checkbox',
      'aria-checked': isItemSelected,
      tabIndex: -1,
      'data-test': `checkbox-row-id-${id}`
    };
    return (
      <TableRow{...tableRowProps} key={id}>
        {enableSelectableRows && <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': id }}
          />
        </TableCell>
        }
        {row.cells.map((cell, index) => {
          return (
            <TableCell
              colSpan={cell.colSpan}
              align={cell.align}
              size={'medium'}
              key={index}>
              {cell.element}
            </TableCell>);
        })}
      </TableRow>
    );
  }

  return (
    <div className={clsx(classes.root)}>
      {loading && <CircularProgress className={classes.loader} variant={'indeterminate'} color={'primary'} />}
      {loading && <div className={classes.loadingOverlay} />}
      <Paper className={classes.paper}>
        {(tableTitle || selected && selected.size > 0) ?
          <EnhancedTableToolbar numSelected={selected.size} tableTitle={tableTitle} /> : null}
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              data-test={'enhanced-table-head'}
              headerCellProps={tableProps.headers}
              enableSelectableRows={enableSelectableRows}
              numSelected={selected ? selected.size : 0}
              order={orderDirection}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsLength}
            />
            <TableBody>
              {props.tableProps.rows.map(renderTableRow)}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={tableProps.headers.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          data-test={'table-pagination'}
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onPageChange={onChangePage as any}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Paper>
    </div>
  );
}
