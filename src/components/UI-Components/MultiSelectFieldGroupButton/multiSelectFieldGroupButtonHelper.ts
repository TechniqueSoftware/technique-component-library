import { MultiSelectGroupValueWrapper } from '../MultiSelectFieldGroup/MultiSelectSearchList/MultiSelectSearchList';
import { MultiSelectOptionGroupData } from '../MultiSelectFieldGroup/MultiSelectSearchList/MultiSelectSearchList';
import { getLabelFromGroupCounts, GroupCount } from '../../../services/groupLabelService';

export interface GetButtonLabelParams {
  multiSelectGroupValueWrapperList: MultiSelectGroupValueWrapper[];
  multiSelectOptionGroupDataList: MultiSelectOptionGroupData[];
  allLabel: string;
}

interface GetGroupCountsParameters {
  multiSelectGroupValueWrapperList: MultiSelectGroupValueWrapper[];
  multiSelectOptionGroupDataList: MultiSelectOptionGroupData[];
}

export function getGroupCountsFromMultiSelectData({
                                                    multiSelectGroupValueWrapperList,
                                                    multiSelectOptionGroupDataList
                                                  }: GetGroupCountsParameters): GroupCount[] {
  return multiSelectGroupValueWrapperList.reduce<GroupCount[]>((groupCountList, multiSelectGroupValueWrapper) => {
    if (multiSelectGroupValueWrapper.values.size > 0 && multiSelectOptionGroupDataList) {
      const optionGroupData = multiSelectOptionGroupDataList
        .find((multiSelectOptionGroupData) => multiSelectOptionGroupData.groupId === multiSelectGroupValueWrapper.groupId);

      if (optionGroupData) {
        let firstSelectedLabel;
        if (multiSelectGroupValueWrapper.values.size === 1) {
          const firstValue = multiSelectGroupValueWrapper.values.values().next().value;
          const firstOption = optionGroupData.multiSelectOptionDataList.find((multiSelectOptionData) => {
            return multiSelectOptionData.value === firstValue;
          });
          firstSelectedLabel = firstOption ? firstOption.labelString : '';
        }

        groupCountList.push({
          selectedLabel: firstSelectedLabel,
          groupLabel: optionGroupData.groupLabel,
          numSelected: multiSelectGroupValueWrapper.values.size,
        });
      }

    }
    return groupCountList;
  }, []);
}

export function getButtonLabel({
    multiSelectGroupValueWrapperList,
    multiSelectOptionGroupDataList,
    allLabel
  }: GetButtonLabelParams): string {

  const groupCounts: GroupCount[] = getGroupCountsFromMultiSelectData({
    multiSelectGroupValueWrapperList,
    multiSelectOptionGroupDataList
  });
  return getLabelFromGroupCounts(allLabel, groupCounts);
}
