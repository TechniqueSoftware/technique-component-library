import { shallow } from 'enzyme';
import * as React from 'react';
import { MultiSelectSearchList, MultiSelectSearchListProps } from './MultiSelectSearchList';
import { MultiSelectCheckboxListItemClickEventData } from '../MultiSelectCheckboxListItem/MultiSelectCheckboxListItem';

describe('MultiSelectSearchList', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const baseProps: MultiSelectSearchListProps = {
    classes: {
      searchContainer: 'mockSearchContainerClass'
    },
    onCheckboxGroupChange: jest.fn(),
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

  test('should not show items when search does not match and should show "No Match Found" message', () => {
    const props: MultiSelectSearchListProps = {
      ...baseProps,
    };
    const shallowWrapper = shallow(<MultiSelectSearchList {...props} />);
    const searchInputWrapper = shallowWrapper.find('WithStyles(TextInput)');
    searchInputWrapper.simulate('change', { target: { value: 'xxx' } });
    jest.runAllTimers();
    shallowWrapper.instance().forceUpdate();
    expect(shallowWrapper.debug()).toMatchSnapshot();
    const listWrapper = shallowWrapper.find('WithStyles(List)');
    const debugView = listWrapper.debug();
    expect(debugView.includes('No match found'));
    expect(debugView).toMatchSnapshot();
  });

  test('should only show items that match searchText when search text is entered', () => {
    const props: MultiSelectSearchListProps = {
      ...baseProps,
    };
    const shallowWrapper = shallow(<MultiSelectSearchList {...props} />);

    const multiSelectOptionGroupDatum = baseProps.multiSelectOptionGroupDataList[0];
    const firstItemLabelText = multiSelectOptionGroupDatum.multiSelectOptionDataList[0].labelString;
    const searchInputWrapper = shallowWrapper.find('WithStyles(TextInput)');
    expect(searchInputWrapper.length).toBe(1);
    searchInputWrapper.simulate('change', { target: { value: firstItemLabelText } });
    // Search is debounced so we need to run timers
    jest.runAllTimers();
    shallowWrapper.instance().forceUpdate();
    const listWrapper = shallowWrapper.find('WithStyles(ForwardRef(List))');
    const checkboxListItem = listWrapper.find('WithStyles(MultiSelectCheckboxListItem)');

    expect(listWrapper.debug()).toMatchSnapshot();
    expect(listWrapper.debug().includes(firstItemLabelText));
    expect(listWrapper.debug().includes(multiSelectOptionGroupDatum.groupLabel));
    // 2 due to group checkbox
    expect(checkboxListItem.length).toBe(2);
  });

  test('checking a checkbox group header should return a list of all items in the group when checked is true', () => {
    const props: MultiSelectSearchListProps = {
      ...baseProps,
      onCheckboxGroupChange: jest.fn(),
    };
    const shallowWrapper = shallow(<MultiSelectSearchList {...props} />);

    const firstGroup = props.multiSelectOptionGroupDataList[0];
    const firstGroupCheckbox = shallowWrapper.findWhere((wrapper) => wrapper.prop('labelString') === firstGroup.groupLabel);

    const eventData: MultiSelectCheckboxListItemClickEventData = {
      groupId: firstGroup.groupId,
      checked: true,
      value: ''
    };

    firstGroupCheckbox.simulate('click', eventData);

    const onCheckboxGroupChange: any = props.onCheckboxGroupChange;
    expect(onCheckboxGroupChange.mock.calls[0][0][0]).toEqual({
      groupId: firstGroup.groupId,
      values: new Set(firstGroup.multiSelectOptionDataList.map((value) => value.value))
    });
  });

  test('checking a checkbox group header should return an empty set when checked is false', () => {
    const props: MultiSelectSearchListProps = {
      ...baseProps,
      onCheckboxGroupChange: jest.fn(),
    };
    const shallowWrapper = shallow(<MultiSelectSearchList {...props} />);

    const firstGroup = props.multiSelectOptionGroupDataList[0];
    const firstGroupCheckbox = shallowWrapper.findWhere((wrapper) => wrapper.prop('labelString') === firstGroup.groupLabel);

    const eventData: MultiSelectCheckboxListItemClickEventData = {
      groupId: firstGroup.groupId,
      checked: false,
      value: ''
    };

    firstGroupCheckbox.simulate('click', eventData);

    const onCheckboxGroupChange: any = props.onCheckboxGroupChange;
    expect(onCheckboxGroupChange.mock.calls[0][0][0]).toEqual({
      groupId: firstGroup.groupId,
      values: new Set()
    });
  });
});
