import { pluralize } from './pluralizeService';

export interface GroupCount {
  numSelected: number;
  groupLabel: string;
  selectedLabel: string;
}

export function getLabelFromGroupCounts(defaultLabel: string, groupCounts: GroupCount[]) {
  let label = defaultLabel;

  const groupsWithSelectedValues = groupCounts.filter((group) => {
    return group.numSelected > 0;
  });

  // We'll only every use the first two groups that we find, so we'll grab them now.
  const firstGroup = groupsWithSelectedValues[0];
  const secondGroup = groupsWithSelectedValues[1];

  const countOfGroupsWithValues = groupsWithSelectedValues.length;
  if (countOfGroupsWithValues === 1) {
    if (firstGroup.numSelected === 1) {
      label = firstGroup.selectedLabel;
    } else {
      label = getLabelWithCountForGroup(firstGroup);
    }
  } else if (countOfGroupsWithValues === 2) {
    label = getLabelForTwo(firstGroup, secondGroup);
  } else if (countOfGroupsWithValues >= 3) {
    label = `${getLabelForTwo(firstGroup, secondGroup)}, ...`;
  }
  return label;
}

function getLabelForTwo(firstGroup: GroupCount, secondGroup: GroupCount) {
  return `${getLabelWithCountForGroup(firstGroup)}, ${getLabelWithCountForGroup(secondGroup)}`;
}

function getLabelWithCountForGroup(groupCount: GroupCount) {
  return `${groupCount.numSelected} ${pluralize(groupCount.groupLabel, groupCount.numSelected)}`;
}
