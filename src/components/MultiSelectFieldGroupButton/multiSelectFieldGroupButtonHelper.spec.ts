import { MultiSelectOptionData } from '../..';
import { getButtonLabel, GetButtonLabelParams } from './multiSelectFieldGroupButtonHelper';

describe('multiSelectFieldGroupButtonHelper', () => {

  describe('getButtonLabel', () => {

    const createMultiSelectOptionData = (affix: string): MultiSelectOptionData => ({
      name: 'mockOptionData',
      disabled: false,
      labelComponent: undefined,
      value: `mockValue-${affix}`,
      labelString: `mockLabel-${affix}`
    });

    test('should return the "allLabel" value when no items are selected', () => {
      const groupId = 'mockGroup1';
      const value = 'mockValue1';
      const labelString = 'mockLabelString1';
      const groupLabel = 'Region';

      const multiSelectOptionData: MultiSelectOptionData = {
        value,
        labelString,
        name: 'mockOptionData',
        disabled: false,
        labelComponent: undefined
      };

      const allLabel = 'mockAllLabel';
      const params: GetButtonLabelParams = {
        allLabel,
        multiSelectGroupValueWrapperList: [{ groupId, values: new Set([]) }],
        multiSelectOptionGroupDataList: [{
          groupId,
          groupLabel,
          multiSelectOptionDataList: [multiSelectOptionData]
        }]
      };

      const label = getButtonLabel(params);

      expect(label).toBe(allLabel);
    });

    test('should return the "allLabel" when there are values but we dont have the optionGroupData yet', () => {
      const groupId = 'mockGroup1';

      const allLabel = 'mockAllLabel';
      const params: GetButtonLabelParams = {
        allLabel,
        multiSelectGroupValueWrapperList: [{ groupId, values: new Set(['1']) }],
        multiSelectOptionGroupDataList: []
      };

      const label = getButtonLabel(params);

      expect(label).toBe(allLabel);
    });

    test('should return the label of the location when only one location is selected', () => {

      const groupId = 'mockGroup1';
      const value = 'mockValue1';
      const labelString = 'mockLabelString1';
      const groupLabel = 'Region';

      const multiSelectOptionData: MultiSelectOptionData = {
        value,
        labelString,
        name: 'mockOptionData',
        disabled: false,
        labelComponent: undefined
      };

      const params: GetButtonLabelParams = {
        allLabel: '',
        multiSelectGroupValueWrapperList: [{ groupId, values: new Set([value]) }],
        multiSelectOptionGroupDataList: [{
          groupId,
          groupLabel,
          multiSelectOptionDataList: [multiSelectOptionData]
        }]
      };

      const label = getButtonLabel(params);

      expect(label).toBe(labelString);
    });

    test('should return the count of a group with label when only one group is selected and there are multiple values selected', () => {
      const groupId = 'mockGroup1';
      const value = 'mockValue1';
      const value2 = 'mockValue2';
      const labelString = 'mockLabelString1';
      const groupLabel = 'Region';

      const multiSelectOptionData: MultiSelectOptionData = {
        value,
        labelString,
        name: 'mockOptionData',
        disabled: false,
        labelComponent: undefined
      };

      const multiSelectOptionData2: MultiSelectOptionData = {
        ...multiSelectOptionData,
        value: value2,
        labelString: 'mockLabelString2'
      };

      const params: GetButtonLabelParams = {
        allLabel: '',
        multiSelectGroupValueWrapperList: [{ groupId, values: new Set([value, value2]) }],
        multiSelectOptionGroupDataList: [{
          groupId,
          groupLabel,
          multiSelectOptionDataList: [multiSelectOptionData, multiSelectOptionData2]
        }]
      };

      const label = getButtonLabel(params);

      expect(label).toBe(`2 ${groupLabel}s`);
    });

    test('should return count of the first two groups when there are 2 groups selected', () => {

      const multiSelectOptionData1 = createMultiSelectOptionData('1');
      const multiSelectOptionData2 = createMultiSelectOptionData('2');
      const multiSelectOptionData3 = createMultiSelectOptionData('3');
      const multiSelectOptionData4 = createMultiSelectOptionData('4');

      const multiSelectOptionGroupData1 = {
        groupLabel: 'Region',
        groupId: 'mockGroup1',
        multiSelectOptionDataList: [multiSelectOptionData1, multiSelectOptionData2]
      };

      const multiSelectOptionGroupData2 = {
        groupLabel: 'Location',
        groupId: 'mockGroupId2',
        multiSelectOptionDataList: [multiSelectOptionData3, multiSelectOptionData4]
      };

      const params: GetButtonLabelParams = {
        allLabel: '',
        multiSelectGroupValueWrapperList: [
          {
            groupId: multiSelectOptionGroupData1.groupId,
            values: new Set([multiSelectOptionData1.value, multiSelectOptionData2.value])
          },
          {
            groupId: multiSelectOptionGroupData2.groupId,
            values: new Set([multiSelectOptionData3.value, multiSelectOptionData4.value])
          }
        ],
        multiSelectOptionGroupDataList: [multiSelectOptionGroupData1, multiSelectOptionGroupData2]
      };

      const label = getButtonLabel(params);

      expect(label).toBe(`2 Regions, 2 Locations`);
    });

    test('should return count of the first two groups when there are 2 groups selected and an ellipsis if there is a third group', () => {

      const multiSelectOptionData1 = createMultiSelectOptionData('1');
      const multiSelectOptionData2 = createMultiSelectOptionData('2');
      const multiSelectOptionData3 = createMultiSelectOptionData('3');
      const multiSelectOptionData4 = createMultiSelectOptionData('4');
      const multiSelectOptionData5 = createMultiSelectOptionData('5');
      const multiSelectOptionData6 = createMultiSelectOptionData('6');

      const multiSelectOptionGroupData1 = {
        groupLabel: 'Region',
        groupId: 'mockGroup1',
        multiSelectOptionDataList: [multiSelectOptionData1, multiSelectOptionData2]
      };

      const multiSelectOptionGroupData2 = {
        groupLabel: 'Location',
        groupId: 'mockGroupId2',
        multiSelectOptionDataList: [multiSelectOptionData3, multiSelectOptionData4]
      };

      const multiSelectOptionGroupData3 = {
        groupLabel: 'City',
        groupId: 'mockGroupId2',
        multiSelectOptionDataList: [multiSelectOptionData5, multiSelectOptionData6]
      };

      const params: GetButtonLabelParams = {
        allLabel: '',
        multiSelectGroupValueWrapperList: [
          {
            groupId: multiSelectOptionGroupData1.groupId,
            values: new Set([multiSelectOptionData1.value, multiSelectOptionData2.value])
          },
          {
            groupId: multiSelectOptionGroupData2.groupId,
            values: new Set([multiSelectOptionData3.value, multiSelectOptionData4.value])
          },
          {
            groupId: multiSelectOptionGroupData3.groupId,
            values: new Set([multiSelectOptionData5.value, multiSelectOptionData6.value])
          }
        ],
        multiSelectOptionGroupDataList: [multiSelectOptionGroupData1, multiSelectOptionGroupData2, multiSelectOptionGroupData3]
      };

      const label = getButtonLabel(params);

      expect(label).toBe(`2 Regions, 2 Locations, ...`);
    });
  });
});
