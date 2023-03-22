import { LocationMultiSelectFieldGroup, LocationMultiSelectFieldGroupProps } from './LocationMultiSelectFieldGroup';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('LocationMultiSelectFieldGroup', () => {

  const baseProps: LocationMultiSelectFieldGroupProps = {
    selectLabelComponent: undefined,
    showRadioGroup: false,
    regionList: [],
    clubLocationList: [],
    clubLocationValues: new Set(),
    regionValues: new Set(),
    selectAll: 'true',
    onChange: jest.fn(),
    onCheckboxGroupChange: jest.fn(),
    onAllOrSelectRadioGroupChange: jest.fn(),
  };

  test('should render with minimal props', () => {
    const props = { ...baseProps };
    const shallowWrapper = shallow(<LocationMultiSelectFieldGroup {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should pass on props matching snapshot', () => {
    const props = { ...baseProps };
    const shallowWrapper = shallow(<LocationMultiSelectFieldGroup {...props} />);
    const multiSelectFieldGroupWrapper = shallowWrapper.find('WithStyles(MultiSelectFieldGroup)');
    expect(multiSelectFieldGroupWrapper.props()).toMatchSnapshot();
  });

  describe('helperText', () => {
    test('should be blank when no locations or regions selected', () => {
      const props = { ...baseProps };
      const shallowWrapper = shallow(<LocationMultiSelectFieldGroup {...props} />);
      const multiSelectFieldGroupWrapper = shallowWrapper.find('WithStyles(MultiSelectFieldGroup)');
      const helperText = multiSelectFieldGroupWrapper.prop('helperText');
      expect(helperText).toEqual('');
    });

    test('should include "region" when a single region is provided', () => {
      const props: LocationMultiSelectFieldGroupProps = {
        ...baseProps,
        regionValues: new Set(['1'])
      };
      const shallowWrapper = shallow(<LocationMultiSelectFieldGroup {...props} />);
      const multiSelectFieldGroupWrapper = shallowWrapper.find('WithStyles(MultiSelectFieldGroup)');
      const helperText = multiSelectFieldGroupWrapper.prop('helperText');
      expect(helperText).toEqual('1 region selected');
    });

    test('should include "regions" when a multiple regions are provided', () => {
      const props: LocationMultiSelectFieldGroupProps = {
        ...baseProps,
        regionValues: new Set(['1', '2', '3'])
      };
      const shallowWrapper = shallow(<LocationMultiSelectFieldGroup {...props} />);
      const multiSelectFieldGroupWrapper = shallowWrapper.find('WithStyles(MultiSelectFieldGroup)');
      const helperText = multiSelectFieldGroupWrapper.prop('helperText');
      expect(helperText).toEqual('3 regions selected');
    });

    test('should include "locations" and "regions" when a multiple regions are provided', () => {
      const props: LocationMultiSelectFieldGroupProps = {
        ...baseProps,
        regionValues: new Set(['1', '2', '3']),
        clubLocationValues: new Set(['1', '2', '3'])
      };
      const shallowWrapper = shallow(<LocationMultiSelectFieldGroup {...props} />);
      const multiSelectFieldGroupWrapper = shallowWrapper.find('WithStyles(MultiSelectFieldGroup)');
      const helperText = multiSelectFieldGroupWrapper.prop('helperText');
      expect(helperText).toEqual('3 regions and 3 locations selected');
    });
  });

  test('should show the helper text when no "locations" or "regions" are selected', () => {
    const props: LocationMultiSelectFieldGroupProps = {
      ...baseProps,
      helperText: 'Required',
    };
    const shallowWrapper = shallow(<LocationMultiSelectFieldGroup {...props} />);
    const multiSelectFieldGroupWrapper = shallowWrapper.find('WithStyles(MultiSelectFieldGroup)');
    const helperText = multiSelectFieldGroupWrapper.prop('helperText');
    expect(helperText).toEqual('Required');
  });

  test('should show the helper text when "locations" and "regions" are selected', () => {
    const props: LocationMultiSelectFieldGroupProps = {
      ...baseProps,
      helperText: 'Check your selections',
      regionValues: new Set(['1', '2', '3']),
      clubLocationValues: new Set(['1', '2', '3']),
    };
    const shallowWrapper = shallow(<LocationMultiSelectFieldGroup {...props} />);
    const multiSelectFieldGroupWrapper = shallowWrapper.find('WithStyles(MultiSelectFieldGroup)');
    const helperText = multiSelectFieldGroupWrapper.prop('helperText');
    expect(helperText).toEqual('Check your selections');
  });

});
