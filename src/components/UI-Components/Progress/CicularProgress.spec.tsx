import { shallow } from 'enzyme';
import * as React from 'react';
import { CircularProgress } from './CircularProgress';

describe('CircularProgress', () => {
  test('should render with minimal props', () => {
    const shallowWrapper = shallow(<CircularProgress />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
