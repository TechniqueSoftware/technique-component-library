import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { MultiSelectCheckboxListItem, MultiSelectCheckboxListItemProps } from './MultiSelectCheckboxListItem';

describe('MultiSelectCheckboxListItem', () => {

  const baseProps: MultiSelectCheckboxListItemProps = {
    classes: { checkbox: 'mockCheckboxClassName' },
    indeterminate: false,
    checked: false,
    disabled: false,
    groupId: 'mockGroupId',
    labelComponent: undefined,
    labelString: 'mockLabelString',
    name: 'mockName',
    onClick: jest.fn(),
    value: 'mockValue'
  };

  test('should render with minimal props', () => {
    const props = { ...baseProps };
    const shallowWrapper = shallow(<MultiSelectCheckboxListItem {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render labelComponent if provided with one', () => {

    const props: MultiSelectCheckboxListItemProps = {
      ...baseProps,
      labelComponent: <span>mockLabelComponent</span>,
    };

    const shallowWrapper = shallow(<MultiSelectCheckboxListItem {...props} />);
    const formControlLabel = shallowWrapper.find('WithStyles(ForwardRef(FormControlLabel))');
    const labelProp = formControlLabel.prop('label');
    expect(labelProp).toBe(props.labelComponent);
  });

  test('should return eventData including checked, groupId, and value (checked == true)', () => {

    const props: MultiSelectCheckboxListItemProps = {
      ...baseProps,
      onClick: jest.fn()
    };
    const shallowWrapper = mount(<MultiSelectCheckboxListItem {...props} />);
    const checkbox = shallowWrapper.find('ForwardRef(Checkbox)');
    const isChecked = true;
    checkbox.simulate('click', { target: { checked: isChecked } });

    const onChange: any = props.onClick;
    expect(onChange.mock.calls[0][0]).toEqual({ checked: isChecked, groupId: props.groupId, value: props.value });
  });

  test('should return eventData including checked, groupId, and value (checked == false)', () => {

    const props: MultiSelectCheckboxListItemProps = {
      ...baseProps,
      onClick: jest.fn()
    };
    const shallowWrapper = mount(<MultiSelectCheckboxListItem {...props} />);
    const checkbox = shallowWrapper.find('ForwardRef(Checkbox)');
    const isChecked = false;
    checkbox.simulate('click', { target: { checked: isChecked } });

    const onChange: any = props.onClick;
    expect(onChange.mock.calls[0][0]).toEqual({ checked: isChecked, groupId: props.groupId, value: props.value });
  });

});
