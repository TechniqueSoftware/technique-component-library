import * as React from 'react';
import { IconButton } from './IconButton';
import { shallow } from 'enzyme';

describe('IconButton', () => {
  test('should render with minimal props', () => {
    const shallowWrapper = shallow(<IconButton />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
