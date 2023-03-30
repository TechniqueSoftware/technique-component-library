import { EnhancedTableToolbar, EnhancedTableToolbarProps } from './EnhancedTableToolbar';
import * as React from 'react';
import { shallow } from 'enzyme';

describe('EnhancedTableToolbar', () => {

  const baseProps: EnhancedTableToolbarProps = {
    numSelected: 0,
    tableTitle: 'mockTableTitle'
  };

  test('should render with minimal props', () => {
    const shallowWrapper = shallow(<EnhancedTableToolbar {...baseProps} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should should number selected when numSelected is greater than 0', () => {
    const numSelected = 1;
    const props = {
      ...baseProps,
      numSelected
    };
    const shallowWrapper = shallow(<EnhancedTableToolbar {...props} />);

    const numSelectedElement = shallowWrapper.find('[data-test="num-selected"]');
    expect(numSelectedElement.text()).toBe(`${numSelected} selected`);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
