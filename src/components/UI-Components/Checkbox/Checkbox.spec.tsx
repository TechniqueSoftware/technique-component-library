import * as React from 'react';
import { Checkbox } from './Checkbox';
import { shallow } from 'enzyme';

describe('Checkbox', () => {
  test('should render with minimal props', () => {
    const shallowWrapper = shallow(<Checkbox />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
