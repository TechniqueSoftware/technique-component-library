import { SnackbarContent, SnackbarContentProps } from './SnackbarContent';
import { mount } from 'enzyme';
import * as React from 'react';

describe('SnackbarContent', () => {
  test('should render with minimal', () => {
    const props: SnackbarContentProps = {
      id: 'mockId',
      message: 'Mock message',
      variant: 'info',
      'aria-describe-id': 'id-9247924',
      onUndo: () => undefined,
    };
    const shallowWrapper = mount(
      <SnackbarContent {...props}/>
    );
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render with all props', () => {
    const props: SnackbarContentProps = {
      id: 'mockId',
      'aria-describe-id': 'id-9247924',
      variant: 'info',
      maxWidth: 500,
      message: 'Mock Archived',
      onUndo: () => undefined,
      onClose: () => undefined,
    };

    const shallowWrapper = mount(
      <SnackbarContent {...props}/>
    );
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
