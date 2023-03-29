import * as React from 'react';
import { DateInput } from './DateInput';
import { shallow } from 'enzyme';

describe('Date Input', () => {
  test('should render with minimal props', () => {
    const shallowWrapper = shallow(<DateInput />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
