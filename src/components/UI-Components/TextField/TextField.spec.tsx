import * as React from 'react';
import { TextField } from './TextField';
import { shallow } from 'enzyme';

describe('TextField', () => {
  test('should set variant default to outline', () => {
    const shallowWrapper = shallow(<TextField />);
    expect(shallowWrapper.debug()).toMatchSnapshot();

    const innerComponent = shallowWrapper.find('WithStyles(ForwardRef(TextField))');
    expect(innerComponent.props()).toMatchSnapshot();
  });
});
