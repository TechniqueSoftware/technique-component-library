import { shallow } from 'enzyme';
import * as React from 'react';

import ToggleButton from './ToggleButton';
import ToggleButtonGroup, { ToggleButtonGroupProps } from './ToggleButtonGroup';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';

describe('ToggleButtonGroup', () => {
  test('should render with base props', () => {
    const baseProps: ToggleButtonGroupProps = {
      value: 'left',
      exclusive: true,
      children: (
        <ToggleButton value="left" aria-label="left aligned">
          <FormatAlignLeftIcon/>
        </ToggleButton>
      ),
    };
    const shallowWrapper = shallow(
      <ToggleButtonGroup {...baseProps}/>
    );
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
