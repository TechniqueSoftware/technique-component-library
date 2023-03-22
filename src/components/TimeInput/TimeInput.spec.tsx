import * as React from 'react';
import { TimeInput } from './TimeInput';
import { shallow } from 'enzyme';

describe('Time Input', () => {
  test('should render with minimal props', () => {
    const shallowWrapper = shallow(<TimeInput />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
