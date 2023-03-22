import * as React from 'react';
// tslint:disable-next-line:no-duplicate-imports
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../constants';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { boolean, text, number } from '@storybook/addon-knobs';
import clubOsTheme from '../../themes/clubOS';
import {
  EnhancedTable,
  EnhancedTableProps,
  TableRowProps,
  HeaderCellProps,
  OrderDirection
} from '../../components/Tables/EnhancedTable';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

const { useState } = React;

function createHeaders(sortableHeaders: boolean): HeaderCellProps[] {
  const headerNames = ['HeaderA', 'HeaderB', 'HeaderC', ''];
  return headerNames.map(name => ({
    sortable: !!(name && sortableHeaders),
    align: 'left' as 'right',
    element: <Box fontWeight={'fontWeightBold'}>{name}</Box>,
    id: name
  }));
}

function createTableRows(count: number, pageNumber: number): TableRowProps[] {
  return Array(count).fill('').map((countIndex, index) => {
    const id = `${pageNumber}-${index}`;
    return ({
      id,
      cells: [
        { element: <span>Row{index}-Col0-Page{pageNumber}</span>, align: 'left' as 'left' },
        { element: <span>Row{index}-Col1-Page{pageNumber}</span>, align: 'left' as 'left' },
        { element: <span>Row{index}-Col2-Page{pageNumber}</span>, align: 'left' as 'left' },
        {
          element: <span>
            <IconButton onClick={() => window.alert(`editing rowId ${id}`)}>
            <EditIcon />
          </IconButton>
            <IconButton onClick={() => window.alert(`editing rowId ${id}`)}>
            <EditIcon />
          </IconButton>
            <IconButton onClick={() => window.alert(`editing rowId ${id}`)}>
            <EditIcon />
          </IconButton>
          </span>,
          align: 'right' as 'right'
        },
      ]
    });
  });
}

interface TableStoryProps {
  loading: boolean;
  totalRows: number;
  enableSelectableRows: boolean;
  enableSortableHeaders: boolean;
  tableTitle: string;
}

function EnhancedTableStory(tableStoryProps: TableStoryProps) {

  const {
    enableSelectableRows,
    tableTitle,
    totalRows,
    loading,
    enableSortableHeaders
  } = tableStoryProps;

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('asc');
  const headers: HeaderCellProps[] = createHeaders(enableSortableHeaders);
  const [orderBy, setOrderBy] = useState<string>(headers[0].id);

  const enhancedTableProps: EnhancedTableProps = {
    orderDirection,
    orderBy,
    selected,
    loading,
    totalRows,
    enableSelectableRows,
    rowsPerPage,
    page,
    tableTitle,
    tableProps: {
      headers,
      rows: createTableRows(totalRows < rowsPerPage ? totalRows : rowsPerPage, page)
    },
    onRowsPerPageChange: (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    onChangePage: (event, page) => setPage(page),
    onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: string, orderDirection: OrderDirection) => {
      setOrderDirection(orderDirection);
      setOrderBy(newOrderBy);
    },
    onSelectedChange: (newSelected: Set<string>) => setSelected(newSelected),
    rowCount: 10,
  };

  return (
    <div>
      <ThemeProvider theme={clubOsTheme}>
        <EnhancedTable {...enhancedTableProps} />
      </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.TABLES, module)
  .addCUICStory({
    render: () => {
      const tableStoryProps: TableStoryProps = {
        enableSortableHeaders: boolean(`Enable sortable headers (demo will not actually sort,
        the parent component should handle this)`, true),
        enableSelectableRows: boolean('Enable selectable rows', false),
        loading: boolean('Loading', false),
        tableTitle: text('Table title', 'Lorem ipsum'),
        totalRows: number('Total rows', 50)
      };
      return (<EnhancedTableStory {...tableStoryProps} />);
    },
    name: 'EnhancedTable',
    notes: require('./notes.md').default
  });
