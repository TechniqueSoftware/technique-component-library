//@ts-nocheck
import * as React from 'react';
import { createCUICStoriesOf } from '../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../components/UI-Components/constants';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import clubOsTheme from '../../../components/UI-Components/storyThemes/index'
import Dialog , { DialogProps } from '../../../components/UI-Components/Dialog/Dialog';
import Box from '@material-ui/core/Box';
import { select, boolean, text } from '@storybook/addon-knobs';
import {
    EnhancedTable,
    TableRowProps,
    HeaderCellProps,
    OrderDirection,
    EnhancedTableProps
} from '../../../components/UI-Components/Tables/EnhancedTable/EnhancedTable';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ButtonWithIcon from '../../../components/UI-Components/Buttons/ButtonWithIcon/ButtonWithIcon';
import Typography from '@material-ui/core/Typography/Typography';

const { useState } = React;

interface DialogsStoryProps {
  dialogTitle: string;
  content: string;
  fullScreen: boolean;
  includeTable: boolean;
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}
function createHeaders(sortableHeaders: boolean): HeaderCellProps[] {
  const headerNames = ['HeaderA', 'HeaderB', ''];
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
        {
          element: <span>
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
function DialogsStory(dialogsStoryProps: DialogsStoryProps) {

  const enableSelectableRows = false;
  const enableSortableHeaders = false;
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('asc');
  const headers: HeaderCellProps[] = createHeaders(enableSortableHeaders);
  const [orderBy, setOrderBy] = useState<string>(headers[0].id);
  const loading = false;
  const totalRows = 20;
  const tableTitle = 'Table Title';

  const dialogTableProps: EnhancedTableProps = {
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

  const { includeTable, content } = dialogsStoryProps;

  const onClose = () => {
    setOpen(false);
  };

  const dialogProps: DialogProps = {
    ...dialogsStoryProps,
    open,
    onClose,
    id : 'customized',
    primaryButtonProps: { children: 'Primary Button', onClick: () => setOpen(false) },
    secondaryButtonProps: { children: 'Secondary Button', onClick: () => setOpen(false) }
  };

  return (
        <div>
          <ThemeProvider theme={clubOsTheme}>
            <Box p={2}>
              <ButtonWithIcon onClick={() => setOpen(true)}>
                Open dialog
              </ButtonWithIcon>
              <Dialog {...dialogProps}>
                <Typography>
                  {content}
                </Typography>
                {includeTable && <EnhancedTable {...dialogTableProps} />}
              </Dialog>
            </Box>
          </ThemeProvider>
        </div>);
}
createCUICStoriesOf(MODULE_NAME.DIALOGS, module)
  .addCUICStory({
    render: () => {
      const dialogProps: DialogsStoryProps = {
        dialogTitle: text('Dialog title', 'Lorem ipsum'),
        content: text('Content', `Any content/components can rendered inside of the dialog content section. Check the Include table example knob to see an example of a table being used. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages`),
        includeTable: boolean('Include table example', false),
        maxWidth: select('Max Width', ['xs' , 'sm' , 'md' , 'lg' , 'xl'], 'md'),
        fullScreen: boolean('fullScreen', false),
      };
      return (<DialogsStory {...dialogProps} />);
    },
    name: 'Dialog',
    notes: require('./notes.md').default
  });
