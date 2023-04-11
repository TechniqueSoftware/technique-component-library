import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import clubOsTheme from '../storyThemes';
import MultiSelectFieldGroupButton, {
  cloneAndClearGroupValueWrapperList,
  cloneGroupValueWrapperList,
  MultiSelectFieldGroupButtonProps
} from './MultiSelectFieldGroupButton';
import { MultiSelectFieldGroupProps, MultiSelectGroupValueWrapper } from '../MultiSelectFieldGroup/MultiSelectSearchList/MultiSelectSearchList';
import { MultiSelectSearchListProps } from '../MultiSelectFieldGroup/MultiSelectSearchList/MultiSelectSearchList';

describe('MultiSelectFieldGroupButton', () => {

  const groupId = 'mockGroupId1';
  let baseProps: MultiSelectFieldGroupButtonProps;
  beforeEach(() => {

    const value = 'mockValue1';
    baseProps = {
      label: 'mockLabel',
      id: 'mockId',
      MultiSelectFieldGroupProps: {
        groupValueWrapperList: [{ groupId, values: new Set([value]) }],
        listContainerHeight: 666,
        multiSelectOptionGroupDataList: [{
          groupId,
          groupLabel: 'mockGroupLabel1', multiSelectOptionDataList: [{
            value,
            disabled: false,
            labelComponent: <span>mockComponent</span>,
            labelString: 'mockLabelString',
            name: 'mockName'
          },
          {
            disabled: false,
            labelComponent: <span>mockComponent</span>,
            labelString: 'mockLabelString',
            name: 'mockName',
            value: 'mockValue2'
          }
          ]
        }],
        onCheckboxGroupChange: jest.fn(),
        onRadioGroupChange: jest.fn(),
        radioGroupProps: { label: 'mockLabel', name: 'mockName', value: 'mockvalue' },
        readOnly: false,
      },
      allLabel: 'Group',
      disabled: false,
      selectMaxWidth: 200,
      applyButton: true,
      clearButton: true
    };
  });

  test('should render with minimal props', () => {
    const props = { ...baseProps };
    const shallowWrapper = shallow(<MultiSelectFieldGroupButton {...props} />);

    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should remove the apply button applyButton false', () => {
    const props = { ...baseProps , applyButton: false };
    const shallowWrapper = shallow(<MultiSelectFieldGroupButton {...props} />);
    expect(shallowWrapper.find(`#${props.id}-apply-button`).exists()).toBeFalsy();
  });

  test('should remove the clear button when clearButton false', () => {
    const props = { ...baseProps , clearButton: false };
    const shallowWrapper = shallow(<MultiSelectFieldGroupButton {...props} />);
    expect(shallowWrapper.find(`#${props.id}-clear-button`).exists()).toBeFalsy();
  });

  test('should set showMultiSelectSearchList to true', () => {
    const props = { ...baseProps };
    const shallowWrapper = shallow(<MultiSelectFieldGroupButton {...props} />);

    const multiSelectFieldGroupWrapper = shallowWrapper.find('WithStyles(MultiSelectFieldGroup)');

    const multiSelectFieldGroupProps = multiSelectFieldGroupWrapper.props() as MultiSelectFieldGroupProps;

    expect(multiSelectFieldGroupProps.showMultiSelectSearchList).toBe(true);
  });

  test('should run effect to update buttonLabel', () => {
    const props = { ...baseProps };
    const reactWrapper = mount(<MultiSelectFieldGroupButton {...props} />);

    const openButton = reactWrapper.find(`#${baseProps.id}-select`).first();

    expect(openButton.props().value).toBe('mockLabelString');
  });

  test('should clear the groupValueWrapperList when clear button is clicked', () => {
    const props = { ...baseProps };
    const shallowWrapper = shallow(<MultiSelectFieldGroupButton {...props} />);

    const clearButton = shallowWrapper.find('#mockId-clear-button');

    const wrapperBeforeEvent = shallowWrapper.find('WithStyles(MultiSelectFieldGroup)');
    const propsBeforeEvent = wrapperBeforeEvent.props() as MultiSelectFieldGroupProps;

    expect(propsBeforeEvent.groupValueWrapperList[0].values.size).toBe(1);

    clearButton.simulate('click');

    const wrapperAfterEvent = shallowWrapper.find('WithStyles(MultiSelectFieldGroup)');
    const propsAfterEvent = wrapperAfterEvent.props() as MultiSelectFieldGroupProps;

    expect(propsAfterEvent.groupValueWrapperList[0].values.size).toBe(0);
  });

  test('should call onCheckboxGroupChange when pressing apply, passing the changed values', (done) => {
    const props: MultiSelectFieldGroupButtonProps = {
      ...baseProps,
      MultiSelectFieldGroupProps: {
        ...baseProps.MultiSelectFieldGroupProps,
        onCheckboxGroupChange: jest.fn()
      }
    };
    const reactWrapper = mount(
      <MuiThemeProvider theme={clubOsTheme}>
        <MultiSelectFieldGroupButton {...props} />
      </MuiThemeProvider>
    );

    expect(reactWrapper.debug()).toMatchSnapshot();
    const buttonSelect = reactWrapper.find(`#${baseProps.id}-select-select`).first();
    buttonSelect.simulate('click');

    reactWrapper.update();

    const newGroupValues = [{
      groupId: 'mockGroupId1',
      values: new Set(['mockValue1', 'mockValue2'])
    }];

    act(() => {
      // Simulate a change in the search list
      const multiSelectSearchList = reactWrapper.find('WithStyles(MultiSelectSearchList)');
      (multiSelectSearchList.props() as MultiSelectSearchListProps).onCheckboxGroupChange(newGroupValues);
    });

    // Pressing apply which should trigger it to call the onCheckboxGroupChange handler to report the changes to the parent component
    act(() => {
      const applyButtonWrapper = reactWrapper.find('#mockId-apply-button').first();
      applyButtonWrapper.simulate('click');
    });

    const onCheckboxGroupChange = props.MultiSelectFieldGroupProps.onCheckboxGroupChange as any;
    expect(onCheckboxGroupChange.mock.calls.length).toBe(1);
    expect(onCheckboxGroupChange.mock.calls[0][0]).toEqual(newGroupValues);
    done();
  });

  test('should handle the cancel click, closing the window and resetting the internal values to their original state', async (done) => {
    const props: MultiSelectFieldGroupButtonProps = {
      ...baseProps,
      MultiSelectFieldGroupProps: {
        ...baseProps.MultiSelectFieldGroupProps,
        onCheckboxGroupChange: jest.fn()
      }
    };
    const reactWrapper = mount(
      <MuiThemeProvider theme={clubOsTheme}>
        <MultiSelectFieldGroupButton {...props} />
      </MuiThemeProvider>
    );

    expect(reactWrapper.debug()).toMatchSnapshot('foo');

    const buttonSelect = reactWrapper.find(`#${baseProps.id}-select-select`).first();

    act(() => {
      // Click the buttonSelect to open the search list
      buttonSelect.simulate('click');
    });

    reactWrapper.update();

    const newGroupValues = [{
      groupId: baseProps.MultiSelectFieldGroupProps.multiSelectOptionGroupDataList[0].groupId,
      values: new Set(['mockValue2'])
    }];

    act(() => {
      // Simulate a change in the search list
      const multiSelectSearchList = reactWrapper.find('WithStyles(MultiSelectSearchList)');
      (multiSelectSearchList.props() as MultiSelectSearchListProps).onCheckboxGroupChange(newGroupValues);
    });

    reactWrapper.update();

    const getMultiSelectFieldGroupWrapperListValues = () => {
      const multiSelectFieldGroupWrapper = reactWrapper.find('MultiSelectFieldGroup');
      const multiSelectFieldGroupProps = multiSelectFieldGroupWrapper.props() as MultiSelectSearchListProps;
      return multiSelectFieldGroupProps.groupValueWrapperList;
    };

    const newMultiSelectFieldGroupWrapperListValues = await getMultiSelectFieldGroupWrapperListValues();
    expect(newMultiSelectFieldGroupWrapperListValues).toEqual(newGroupValues);

    act(() => {
      const popOver = reactWrapper.find(`#${baseProps.id}-select-popover`).first();
      const popOverProps = popOver.props() as any;
      popOverProps.onClose();
    });

    reactWrapper.update();

    const originalMultiSelectFieldGroupWrapperListValues = getMultiSelectFieldGroupWrapperListValues();
    expect(originalMultiSelectFieldGroupWrapperListValues).toEqual(baseProps.MultiSelectFieldGroupProps.groupValueWrapperList);
    done();
  });

  test('clone methods should return new references', () => {
    const groupValueWrapperList: MultiSelectGroupValueWrapper[] = [{ groupId: 'foo', values: new Set() }];
    const result1 = cloneGroupValueWrapperList(groupValueWrapperList);
    expect(groupValueWrapperList === result1).toBe(false);

    const groupValueWrapperList2: MultiSelectGroupValueWrapper[] = [{ groupId: 'foo', values: new Set() }];
    const result2 = cloneAndClearGroupValueWrapperList(groupValueWrapperList2);
    expect(groupValueWrapperList2 === result2).toBe(false);
  });
});
