import { shallow } from 'enzyme';
import * as React from 'react';
import Switch, { SwitchProps } from './Switch';

describe('Switch', () => {
  test('should render with base props', () => {
    const baseProps: SwitchProps = {
      name: 'mockName',
      checked: true
    };
    const shallowWrapper = shallow(<Switch {...baseProps} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
