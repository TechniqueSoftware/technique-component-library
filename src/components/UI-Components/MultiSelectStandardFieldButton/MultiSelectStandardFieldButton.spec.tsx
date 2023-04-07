import * as React from 'react';
import { mount, shallow } from 'enzyme';
import MultiSelectStandardFieldButton, {
  MultiSelectStandardFieldButtonProps
} from './MultiSelectStandardFieldButton';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { act } from 'react-dom/test-utils';
import {
  MultiSelectSearchListProps
} from '../MultiSelectStandardField/MultiSelectStandardSearchList/MultiSelectStandardSearchList';
import clubOsTheme from '../storyThemes';

describe('MultiSelectStandardFieldButton', () => {
  const baseProps: MultiSelectStandardFieldButtonProps = {
    id: 'mockid',
    label: 'Lead Type',
    disabled: false,
    selectMaxWidth: 300,
    listContainerHeight: 250,
    applyButton: true,
    clearButton: true,
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
        checked: false
      },
      {
        labelString: 'Re-Interested Ex-Members',
        value: 'ReInterestedExMembers',
        name: 'ReInterestedExMembers',
        checked: false
      }
    ],
    onCheckboxGroupChange: jest.fn()
  };

  test('should render with minimal props', () => {
    const props = { ...baseProps };

    const shallowWrapper = shallow(<MultiSelectStandardFieldButton {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should remove the apply button applyButton false', () => {
    const props = { ...baseProps, applyButton: false };
    const shallowWrapper = shallow(<MultiSelectStandardFieldButton {...props} />);
    expect(shallowWrapper.find(`#${props.id}-apply-button`).exists()).toBeFalsy();
  });

  test('should remove the clear button when clearButton false', () => {
    const props = { ...baseProps, clearButton: false };
    const shallowWrapper = shallow(<MultiSelectStandardFieldButton {...props} />);
    expect(shallowWrapper.find(`#${props.id}-clear-button`).exists()).toBeFalsy();
  });

  test('should clear dropdown values', () => {
    const props = { ...baseProps };

    const shallowWrapper = shallow(<MultiSelectStandardFieldButton {...props} />);
    const wrapperBeforeEvent = shallowWrapper.find('WithStyles(MultiSelectStandardField)');
    const clearButton = shallowWrapper.find(`#${props.id}-clear-button`);
    const propsBeforeEvent = wrapperBeforeEvent.props() as MultiSelectStandardFieldButtonProps;
    const selectItemBeforeClear = propsBeforeEvent.multiSelectStandardFieldProps.filter(item => {
      return item.checked;
    });

    /* Because we'have one by default selected item. */
    expect(selectItemBeforeClear.length).toBe(1);

    clearButton.simulate('click');

    const wrapperAfterEvent = shallowWrapper.find('WithStyles(MultiSelectStandardField)');
    const propsAfterEvent = wrapperAfterEvent.props() as MultiSelectStandardFieldButtonProps;
    const selectItemAfterClear = propsAfterEvent.multiSelectStandardFieldProps.filter(item => {
      return item.checked;
    });
    expect(selectItemAfterClear.length).toBe(0);
  });

  test('should run effect to update buttonLabel', () => {
    const props = { ...baseProps };
    const reactWrapper = mount(<MultiSelectStandardFieldButton {...props} />);

    const openButton = reactWrapper.find(`#${props.id}-select`).first();

    expect(openButton.props().value).toBe('First-Time Leads');
  });

  test('should open the menu and select options and apply them', async (done) => {
    const props: MultiSelectStandardFieldButtonProps = {
      ...baseProps,
      onCheckboxGroupChange: jest.fn()
    };
    const reactWrapper = mount(
        <MuiThemeProvider theme={clubOsTheme}>
          <MultiSelectStandardFieldButton {...props} />
        </MuiThemeProvider>
    );

    expect(reactWrapper.debug()).toMatchSnapshot();
    const buttonSelect = reactWrapper.find(`#${props.id}-select-select`).first();

    // initial value of open is false (used to open menu)
    const menuOpenBeforeClick = reactWrapper.find('SelectWithNoMenu').props();
    expect(menuOpenBeforeClick.open).toBe(false);

    act(() => {
      // Click the buttonSelect to open the search list
      buttonSelect.simulate('click');
    });

    reactWrapper.update();

    // expecting it to be true after clicked
    const menuOpenAfterClick = reactWrapper.find('SelectWithNoMenu').props();
    expect(menuOpenAfterClick.open).toBe(true);

    const newGroupValues = [
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
    ];

    act(() => {
      // Simulate a change in the check box
      const multiSelectSearchList = reactWrapper.find('WithStyles(MultiSelectStandardField)');
      (multiSelectSearchList.props() as MultiSelectSearchListProps).onCheckboxGroupChange(newGroupValues);
    });

    reactWrapper.update();

    // Pressing apply which should trigger it to call the onCheckboxGroupChange handler to report the changes to the parent component
    act(() => {
      const applyButtonWrapper = reactWrapper.find(`#${props.id}-apply-button`).first();
      applyButtonWrapper.simulate('click');
    });
    reactWrapper.update();

    // when clear is clicked open property value should be false
    const menuOpenAfterApply = reactWrapper.find('SelectWithNoMenu').props();
    expect(menuOpenAfterApply.open).toBe(false);

    const onCheckboxGroupChange = props.onCheckboxGroupChange as any;

    expect(onCheckboxGroupChange.mock.calls.length).toBe(1);
    expect(onCheckboxGroupChange.mock.calls[0][0]).toEqual(newGroupValues);
    done();
  });

  test('should open the menu and clear all selected options', async (done) => {
    const props: MultiSelectStandardFieldButtonProps = {
      ...baseProps,
      onCheckboxGroupChange: jest.fn()
    };
    const reactWrapper = mount(
        <MuiThemeProvider theme={clubOsTheme}>
          <MultiSelectStandardFieldButton {...props} />
        </MuiThemeProvider>
    );

    expect(reactWrapper.debug()).toMatchSnapshot();
    const buttonSelect = reactWrapper.find(`#${props.id}-select-select`).first();

    // initial value of open is false (used to open menu)
    const menuOpenBeforeClick = reactWrapper.find('SelectWithNoMenu').props();
    expect(menuOpenBeforeClick.open).toBe(false);

    act(() => {
      buttonSelect.simulate('click');
    });

    reactWrapper.update();

    const clearedGroupValues = [
      {
        labelString: 'First-Time Leads',
        value: 'FirstTimeLeads',
        name: 'FirstTimeLeads',
        checked: false
      },
      {
        labelString: 'Re-Interested Leads',
        value: 'ReInterestedLeads',
        name: 'ReInterestedLeads',
        checked: false
      },
      {
        labelString: 'Re-Interested Ex-Members',
        value: 'ReInterestedExMembers',
        name: 'ReInterestedExMembers',
        checked: false
      }
    ];

    act(() => {
      // Simulate a change in the check box
      const multiSelectSearchList = reactWrapper.find('WithStyles(MultiSelectStandardField)');
      (multiSelectSearchList.props() as MultiSelectSearchListProps).onCheckboxGroupChange(clearedGroupValues);
    });

    reactWrapper.update();

    // Pressing clear which should trigger it to call the onCheckboxGroupChange handler to report the changes to the parent component
    act(() => {
      const applyButtonWrapper = reactWrapper.find(`#${props.id}-clear-button`).first();
      applyButtonWrapper.simulate('click');
    });
    reactWrapper.update();

    const afterClearProps = reactWrapper.find('WithStyles(MultiSelectStandardField)').props() as MultiSelectSearchListProps;
    expect(afterClearProps.multiSelectStandardFieldProps).toEqual(clearedGroupValues);
    done();
  });
});
