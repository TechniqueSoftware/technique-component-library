import * as React from 'react';
import { shallow } from 'enzyme';
import { SelectWithNoMenu, SelectWithNoMenuProps } from './SelectWithNoMenu';

describe('SelectWithNoMenu', () => {

  const baseProps: SelectWithNoMenuProps = {
    id: 'mockId',
    open: false,
    value: 'mockValue',
    label: 'mockLabel',
    onClick: jest.fn()
  };

  test('should render with minimal props', () => {
    const props = { ...baseProps };
    const shallowWrapper = shallow(<SelectWithNoMenu {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should onClick method when keydown is enter key (13)', () => {
    const props = { ...baseProps };
    const shallowWrapper = shallow(<SelectWithNoMenu {...props} />);
    const ENTER_KEY_CODE = 13;
    shallowWrapper.find('#mockId').simulate('keydown', { keyCode: ENTER_KEY_CODE, which: ENTER_KEY_CODE });

    expect((props.onClick as any).mock.calls.length).toBe(1);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
