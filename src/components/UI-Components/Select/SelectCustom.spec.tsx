import { SelectCustom, SelectCustomProps } from './SelectCustom';
import * as React from 'react';
import { shallow } from 'enzyme';

describe('SelectCustom', () => {

  const baseProps: SelectCustomProps = {
    children: <span>mockChildren</span>,
    maxWidth: 200,
    disabled: false,
    id: 'mockId',
    label: 'mockLabel',
    onMenuClose: jest.fn(),
    onMenuOpen: jest.fn(),
    open: true,
    value: 'mockValue'

  };
  test('should render with minimal props', () => {
    const props = { ...baseProps };

    const shallowWrapper = shallow(<SelectCustom {...props} />);

    const openMenu = shallowWrapper.find('#mockId-select');

    expect(shallowWrapper.debug()).toMatchSnapshot();
    const popover = shallowWrapper.find('#mockId-popover');
    expect(openMenu.props()).toMatchSnapshot('selectProps');
    expect(popover.props()).toMatchSnapshot('popoverProps');
  });

  test('should open menu on click', () => {
    const props = { ...baseProps };

    const shallowWrapper = shallow(<SelectCustom {...props} />);

    const openMenu = shallowWrapper.find('#mockId-select');

    openMenu.simulate('click', { currentTarget: { getBoundingClientRect: jest.fn(() => ({ height: 'mockHeight' })) } });

    shallowWrapper.update();

    const popover = shallowWrapper.find('#mockId-popover');
    expect(openMenu.props()).toMatchSnapshot('selectProps');
    expect(popover.props()).toMatchSnapshot('popoverProps');
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
