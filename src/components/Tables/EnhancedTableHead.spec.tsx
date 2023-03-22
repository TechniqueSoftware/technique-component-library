import { EnhancedTableHead, EnhancedTableHeadProps } from './EnhancedTableHead';
import * as React from 'react';
import { shallow } from 'enzyme';

describe('EnhancedTableHead', () => {

  const baseProps: EnhancedTableHeadProps = {
    rowDescriptor: 'mockRowDescriptor',
    onRequestSort: jest.fn(),
    onSelectAllClick: jest.fn(),
    rowCount: 10,
    numSelected: 0,
    enableSelectableRows: false,
    order: 'desc',
    orderBy: 'column1',
    headerCellProps: [
      { id: 'column1', sortable: true, align: 'right', element: <span>column1Element</span> },
      { id: 'column2', sortable: false, align: 'left', element: <span>column2Element</span> }
    ]
  };

  test('should render with minimal props', () => {
    const shallowWrapper = shallow(<EnhancedTableHead {...baseProps} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should call sort handler on click and return the id', () => {
    const shallowWrapper = shallow(<EnhancedTableHead {...baseProps} />);
    const id = baseProps.headerCellProps[0].id;
    const tableSortLabel = shallowWrapper.find(`[data-test="table-sort-label-${id}"]`);
    tableSortLabel.simulate('click');
    expect((baseProps.onRequestSort as any).mock.calls).toEqual([[undefined, id]]);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should show select all box and handle clicking it when enableSelectableRows is true', () => {
    const props: EnhancedTableHeadProps = {
      ...baseProps,
      enableSelectableRows: true,
      onSelectAllClick: jest.fn()
    };
    const shallowWrapper = shallow(<EnhancedTableHead {...props} />);
    const selectAllCheckbox = shallowWrapper.find(`[data-test="select-all-checkbox"]`);
    selectAllCheckbox.simulate('change');
    expect((props.onSelectAllClick as any).mock.calls.length).toBe(1);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
