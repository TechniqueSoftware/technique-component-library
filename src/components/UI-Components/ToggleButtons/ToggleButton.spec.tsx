import { shallow } from 'enzyme';
import * as React from 'react';
import ToggleButton, { ToggleButtonProps } from './ToggleButton';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';

describe('ToggleButton', () => {
  test('should render with base props', () => {
    const baseProps: ToggleButtonProps = {
      className: 'my-toggle-button',
      value: 'left',
      children: (
        <FormatAlignLeftIcon/>
      ),
    };
    const shallowWrapper = shallow(<ToggleButton {...baseProps} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
