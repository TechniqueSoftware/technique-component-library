import Dialog, { DialogProps } from './Dialog';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Dialog', () => {

  test('should render with base props', () => {
    const baseProps: DialogProps = {
      children: <span>mockChildren</span>,
      primaryButtonProps: { onClick: jest.fn() },
      secondaryButtonProps: { onClick: jest.fn() },
      dialogTitle: 'Mock Dialog Title',
      id:'mockId',
      open: false,
      fullScreen: false,
      fullWidth: false,
      maxWidth: 'xs',
      onClose: jest.fn()
    };
    const shallowWrapper = shallow(<Dialog {...baseProps} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
