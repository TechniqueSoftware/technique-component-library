import Snackbar, { SnackbarProps } from './Snackbar';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Snackbar', () => {
  test('should render with minimal', () => {
    const props: SnackbarProps = {
      id: 'mockId',
      show: true,
      variant: 'info',
      message: 'Archived',
    };

    const shallowWrapper = shallow(
      <Snackbar {...props}/>
    );
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render with all props', () => {
    const props: SnackbarProps = {
      id: 'mockId',
      className: 'super-classname',
      'aria-describe-id': 'id-9247924',
      show: true,
      variant: 'info',
      autoHideDuration: 5000,
      maxWidth: 500,
      message: 'Archived',
      onUndo: () => undefined,
      onClose: () => undefined,
    };

    const shallowWrapper = shallow(
      <Snackbar {...props}/>
    );
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
