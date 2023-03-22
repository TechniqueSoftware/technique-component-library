import * as React from 'react';
import { mount, shallow } from 'enzyme';
import {
  MultiSelectCheckboxListItem,
  MultiSelectCheckboxListItemProps
} from './MultiSelectCheckboxListItem';

describe('MultiSelectCheckboxListItem', () => {

  const baseProps: MultiSelectCheckboxListItemProps = {
    classes: {
      checkbox: 'mockCheckboxClassName'
    },
    name: 'mockName',
    labelString: 'mockLabelString',
    value: 'mockValue',
    onClick: jest.fn(),
    checked: false,
    disabled: false,
    multiSelectStandardFieldProps: [
      {
        labelString: 'First-Time Leads',
        value: 'FirstTimeLeads',
        name: 'FirstTimeLeads',
        checked: true
      },
      {
        labelString: 'Re-Interested Leads',
        value: 'ReInterestedLeads',
        name: 'ReInterestedLeads',
        checked: true
      },
      {
        labelString: 'Re-Interested Ex-Members',
        value: 'ReInterestedExMembers',
        name: 'ReInterestedExMembers',
        checked: false
      }
    ]
  };

  test('should render with minimal props', () => {
    const props = { ...baseProps };
    const shallowWrapper = shallow(<MultiSelectCheckboxListItem {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should return eventData including checked and value (checked == true)', () => {

    const props: MultiSelectCheckboxListItemProps = {
      ...baseProps,
      onClick: jest.fn()
    };
    const shallowWrapper = mount(<MultiSelectCheckboxListItem {...props} />);
    const checkbox = shallowWrapper.find('ForwardRef(Checkbox)');
    const isChecked = true;
    checkbox.simulate('click', { target: { checked: isChecked } });

    const onChange: any = props.onClick;
    expect(onChange.mock.calls[0][0]).toEqual(props.multiSelectStandardFieldProps);
  });

  test('should return eventData including checked and value (checked == false)', () => {

    const props: MultiSelectCheckboxListItemProps = {
      ...baseProps,
      onClick: jest.fn()
    };
    const shallowWrapper = mount(<MultiSelectCheckboxListItem {...props} />);
    const checkbox = shallowWrapper.find('ForwardRef(Checkbox)');

    const isChecked = false;

    checkbox.simulate('click', { target: { checked: isChecked } });

    const onChange: any = props.onClick;
    expect(onChange.mock.calls[0][0]).toEqual(props.multiSelectStandardFieldProps);
  });
});
