import * as React from 'react';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import { shallow } from 'enzyme';

describe('RadioGroup', () => {
  test('should render with minimal props', () => {
    const props: RadioGroupProps = {
      radioPropsList: [
        { value: '1', label: 'foo' },
        { value: '2', label: 'bar' },
        { value: '3', label: 'zap', disabled: true }
      ],
      label: 'mockLabel',
      name: 'mockName',
      onChange: jest.fn(),
      value: 'mockValue'
    };
    const shallowWrapper = shallow(<RadioGroup {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
