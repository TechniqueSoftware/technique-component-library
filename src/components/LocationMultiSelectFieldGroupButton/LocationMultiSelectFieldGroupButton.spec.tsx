import LocationMultiSelectFieldGroupButton, { LocationMultiSelectFieldGroupButtonProps } from './LocationMultiSelectFieldGroupButton';
import { shallow } from 'enzyme';
import { LocationMultiSelectFieldGroupProps } from '../..';
import * as React from 'react';

describe('LocationMultiSelectFieldGroupButton', () => {

  function render(testProps?: Partial<LocationMultiSelectFieldGroupProps>) {
    const props: LocationMultiSelectFieldGroupButtonProps = {
      id: 'mockId',
      LocationMultiSelectFieldGroupProps: {
        selectLabelComponent: undefined,
        showRadioGroup: false,
        regionList: [],
        clubLocationList: [],
        onCheckboxGroupChange: jest.fn(),
        clubLocationValues: new Set(),
        onAllOrSelectRadioGroupChange: jest.fn(),
        regionValues: new Set(),
        selectAll: 'true',
        applyButton: false,
        clearButton: false,
        ...testProps,
      }
    };
    return shallow(<LocationMultiSelectFieldGroupButton {...props} />);
  }

  test('should render with minimal props', () => {
    const shallowWrapper = render();
    expect(shallowWrapper.debug()).toMatchSnapshot();
    expect(shallowWrapper.props()).toMatchSnapshot();
  });
});
