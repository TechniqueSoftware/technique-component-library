import { EnhancedTable, EnhancedTableProps } from './EnhancedTable';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import * as React from 'react';
import { shallow } from 'enzyme';

describe('EnhancedTable', () => {

  const baseProps: EnhancedTableProps = {
    enableSelectableRows: false,
    loading: false,
    orderDirection: undefined,
    orderBy: 'foo',
    rowCount: 0,
    rowsPerPageOptions: [],
    selected: new Set(),
    tableProps: {
      headers: [
        { id: 'header-1', element: <span>header1</span>, align: 'right', sortable: true },
        { id: 'header-2', element: <span>header2</span>, align: 'left', sortable: false }
      ],
      rows: [
        { cells: [{ element: <span>cell1</span>, align: 'right', colSpan: 1 }], id: 'row-1', },
        { cells: [{ element: <span>cell2</span>, align: 'left', colSpan: 1 }], id: 'row-2', }
      ]
    },
    tableTitle: '',
    totalRows: 0,
    onRowsPerPageChange: jest.fn(),
    page: 1,
    rowsPerPage: 5,
    onChangePage: jest.fn(),
    onSelectedChange: jest.fn(),
    onRequestSort: jest.fn()
  };

  test('should render with minimal props', () => {

    const shallowWrapper = shallow(<EnhancedTable {...baseProps} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
  test('should show EnhancedToolbar when tableTitle exists', () => {
    const props: EnhancedTableProps = {
      ...baseProps,
      tableTitle: 'TestTableTitle',
    };
    const shallowWrapper = shallow(<EnhancedTable {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
    const toolBarWrapper = shallowWrapper.find('EnhancedTableToolbar');
    expect(toolBarWrapper.length).toBe(1);
  });

  test('should show EnhancedToolbar when there are selected items', () => {
    const props: EnhancedTableProps = {
      ...baseProps,
      selected: new Set('row-1'),
    };
    const shallowWrapper = shallow(<EnhancedTable {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
    const toolBarWrapper = shallowWrapper.find('EnhancedTableToolbar');
    expect(toolBarWrapper.length).toBe(1);
  });

  test('should show inputs headers when enableSelectableRows is true and onClick should call handler', () => {
    const props: EnhancedTableProps = {
      ...baseProps,
      enableSelectableRows: true
    };
    const shallowWrapper = shallow(<EnhancedTable {...props} />);
    const firstRowId = props.tableProps.rows[0].id;
    const selector = `[data-test="checkbox-row-id-${firstRowId}"]`;
    const firstRowCheckbox = shallowWrapper.find(selector);
    expect(shallowWrapper.debug()).toMatchSnapshot();
    firstRowCheckbox.simulate('click');
    expect((props.onSelectedChange as any).mock.calls[0][0]).toEqual(new Set([firstRowId]));
  });

  test('should handle sorting when called by enhancedTableHead, returning the id and order direction', () => {
    const mockPropertyId = 'mockPropertyId';
    const props: EnhancedTableProps = {
      ...baseProps,
      orderBy: mockPropertyId,
      orderDirection: 'asc',
    };
    const shallowWrapper = shallow(<EnhancedTable {...props} />);
    const enhancedTableHead = shallowWrapper.find(`[data-test="enhanced-table-head"]`);
    enhancedTableHead.simulate('requestSort', { mockEvent: true }, mockPropertyId);
    expect((props.onRequestSort as any).mock.calls).toMatchSnapshot();
  });

  test('should handle select all when called by enhancedTableHead and checked is true, returning all of the rows', () => {
    const props: EnhancedTableProps = {
      ...baseProps,
      onSelectedChange: jest.fn(),
    };
    const shallowWrapper = shallow(<EnhancedTable {...props} />);
    const enhancedTableHead = shallowWrapper.find(`[data-test="enhanced-table-head"]`);
    enhancedTableHead.simulate('selectAllClick', { target: { checked: true } });
    expect((props.onSelectedChange as any).mock.calls).toMatchSnapshot();
  });

  test('should handle select all when called by enhancedTableHead and checked is false, returning no rows', () => {
    const props: EnhancedTableProps = {
      ...baseProps,
      onSelectedChange: jest.fn(),
    };
    const shallowWrapper = shallow(<EnhancedTable {...props} />);
    const enhancedTableHead = shallowWrapper.find(`[data-test="enhanced-table-head"]`);
    enhancedTableHead.simulate('selectAllClick', { target: { checked: false } });
    expect((props.onSelectedChange as any).mock.calls).toMatchSnapshot();
  });

  test('should handle table pagination event handlers', () => {
    const props: EnhancedTableProps = {
      ...baseProps,
    };
    const shallowWrapper = shallow(<EnhancedTable {...props} />);
    const enhancedTableHead = shallowWrapper.find(`[data-test="table-pagination"]`);
    enhancedTableHead.simulate('changePage', { mockChangePageEvent: true });
    enhancedTableHead.simulate('rowsPerPageChange', { mockChangeRowsPerPageEvent: true });

    expect((props.onChangePage as any).mock.calls).toMatchSnapshot();
    expect((props.onRowsPerPageChange as any).mock.calls).toMatchSnapshot();
  });
});
