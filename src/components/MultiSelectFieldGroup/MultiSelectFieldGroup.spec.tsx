import * as React from 'react';
import { shallow } from 'enzyme';
import { MultiSelectFieldGroup, MultiSelectFieldGroupProps } from './MultiSelectFieldGroup';

describe('MultiSelectFieldGroup', () => {
  const baseProps: MultiSelectFieldGroupProps = {
    showHelperText: true,
    showFieldSetLabelText: false,
    fieldSetLabelText: 'mockFieldsetLabelText',
    classes: {
      searchContainer: 'mockSearchContainerClass'
    },
    selectAllRadioInputProps: {
      label: 'mockSelectSomeLabel',
      name: 'mockName',
      value: 'true'
    },
    selectSomeRadioInputProps: {
      label: 'mockSelectSomeLabel',
      name: 'mockName',
      value: 'false'
    },
    radioGroupProps: { name: 'mockRadioGroupName', label: 'mockRadioGroupLabel', value: 'false' },
    onCheckboxGroupChange: jest.fn(),
    onRadioGroupChange: jest.fn(),
    showRadioGroup: false,
    helperText: 'mockHelperText',
    error: false,
    groupValueWrapperList: [{ values: new Set(['1', '2', '3']), groupId: 'group1' }],
    multiSelectOptionGroupDataList: [{
      groupId: 'group1',
      groupLabel: 'Group 1',
      multiSelectOptionDataList: [{
        labelComponent: undefined,
        name: 'mockLabelName',
        value: '1',
        labelString: 'group1-mockLabelText1'
      }, {
        labelComponent: undefined,
        name: 'mockLabelName2',
        value: '2',
        labelString: 'group1-mockLabelText2'
      }
      ]
    },
      {
        groupId: 'group2',
        groupLabel: 'Group 2',
        multiSelectOptionDataList: [{
          labelComponent: undefined,
          name: 'mockLabelName',
          value: '3',
          labelString: 'group2-mockLabelText1'
        }, {
          labelComponent: undefined,
          name: 'mockLabelName2',
          value: '4',
          labelString: 'group2-mockLabelText2'
        }
        ]
      }]
  };

  test('should render with minimal baseProps', () => {
    const shallowWrapper = shallow(<MultiSelectFieldGroup {...baseProps} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should show fieldSetLabelText when showFieldSetLabelText is true', () => {
    const props: MultiSelectFieldGroupProps = {
      ...baseProps,
      fieldSetLabelText: 'mockFieldSetLabelText',
      showFieldSetLabelText: true
    };
    const shallowWrapper = shallow(<MultiSelectFieldGroup {...props} />);
    expect(shallowWrapper.text()).toContain(props.fieldSetLabelText);
  });

  test('should use srOnly class for fieldSetLabelText when showFieldSetLabelText is false', () => {
    const props: MultiSelectFieldGroupProps = {
      ...baseProps,
      fieldSetLabelText: 'mockFieldSetLabelText',
      showFieldSetLabelText: false
    };
    const shallowWrapper = shallow(<MultiSelectFieldGroup {...props} />);
    const srOnlyElement = shallowWrapper.findWhere((node) => node.props().variant === 'srOnly' &&
      node.text() === props.fieldSetLabelText);
    expect(srOnlyElement.length).toBe(1);
  });

  test('should render radioGroup when showRadioGroup is true', () => {
    const props: MultiSelectFieldGroupProps = {
      ...baseProps,
      showRadioGroup: true
    };
    const shallowWrapper = shallow(<MultiSelectFieldGroup {...props} />);
    const radioGroup = shallowWrapper.find('ForwardRef(RadioGroup)').parents('WithStyles(ForwardRef(Grid))');
    expect(radioGroup.length).toBe(1);
    expect(radioGroup.shallow().debug()).toMatchSnapshot();
  });

  test('should not render radioGroup when showRadioGroup is false', () => {
    const props: MultiSelectFieldGroupProps = {
      ...baseProps,
      showRadioGroup: false
    };
    const shallowWrapper = shallow(<MultiSelectFieldGroup {...props} />);
    const radioGroup = shallowWrapper.find('RadioGroup');
    expect(radioGroup.length).toBe(0);
  });

  test('should show list when the selectSome value is selected', () => {
    const props: MultiSelectFieldGroupProps = {
      ...baseProps,
      showRadioGroup: true,
      radioGroupProps: {
        ...baseProps.radioGroupProps,
        value: baseProps.selectSomeRadioInputProps.value
      }
    };
    const shallowWrapper = shallow(<MultiSelectFieldGroup {...props} />);

    const searchContainerShallowWrapper = shallowWrapper.find(`.${baseProps.classes.searchContainer}`);
    const list = searchContainerShallowWrapper.find('WithStyles(MultiSelectSearchList)');
    expect(searchContainerShallowWrapper.debug()).toMatchSnapshot();
    expect(list.length).toBe(1);
  });

  test('should not show list when the selectAll value is selected', () => {
    const props: MultiSelectFieldGroupProps = {
      ...baseProps,
      showRadioGroup: true,
      radioGroupProps: {
        ...baseProps.radioGroupProps,
        value: baseProps.selectAllRadioInputProps.value
      }
    };
    const shallowWrapper = shallow(<MultiSelectFieldGroup {...props} />);

    const searchContainerShallowWrapper = shallowWrapper.find(`.${baseProps.classes.searchContainer}`);
    const list = searchContainerShallowWrapper.find('WithStyles(List)');
    expect(list.length).toBe(0);
    expect(searchContainerShallowWrapper.debug()).toMatchSnapshot();
  });
});
