import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Checkbox } from '../../Checkbox/Checkbox';
import { HeaderCellProps, OrderDirection } from './EnhancedTable';

const useStyles = makeStyles(() =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

export interface EnhancedTableHeadProps {
  headerCellProps: HeaderCellProps[];
  enableSelectableRows: boolean;
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: OrderDirection;
  orderBy: string;
  rowCount: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  rowDescriptor?: string;
}

export function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    enableSelectableRows,
    numSelected,
    rowCount,
    orderBy,
    order,
    onRequestSort,
    headerCellProps,
    onSelectAllClick,
    rowDescriptor
  } = props;

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {enableSelectableRows && <TableCell padding="checkbox">
          <Checkbox
            data-test={'select-all-checkbox'}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': `select all ${rowDescriptor}` }}
          />
        </TableCell>}
        {headerCellProps.map(header => (
          <TableCell
            size={'small'}
            key={header.id}
            align={header.align}
            sortDirection={orderBy === header.id ? order : false}
          >
            {header.sortable ?
              <TableSortLabel
                hideSortIcon={!header.sortable}
                active={orderBy === header.id}
                direction={order}
                onClick={createSortHandler(header.id)}
                data-test={`table-sort-label-${header.id}`}
              >
                {header.element}
                {orderBy === header.id ? (
                  <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                ) : null}
              </TableSortLabel>
              : header.element}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
