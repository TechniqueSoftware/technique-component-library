import { shallow } from 'enzyme';
import * as React from 'react';
import { MenuItem } from './MenuItem';

describe('MenuItem', () => {
  test('should render with minimal props', () => {
    const shallowWrapper = shallow(<MenuItem>Foo</MenuItem>);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
