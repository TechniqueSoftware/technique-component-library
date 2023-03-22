import Select, { SelectProps } from './Select';
import { shallow } from 'enzyme';
import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

describe('Select', () => {
  test('should render with minimal props', () => {
    const props: SelectProps = {};
    const shallowWrapper = shallow(
      <Select {...props}>
        <MenuItem>MockMenuItem1</MenuItem>
      </Select>);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
