import * as React from 'react';
import { LocationMultiSelectFieldGroupProps } from '../LocationMultiSelectFieldGroup/LocationMultiSelectFieldGroup';
import MultiSelectFieldGroupButton, { MultiSelectFieldGroupButtonProps } from '../MultiSelectFieldGroupButton/MultiSelectFieldGroupButton';

const LOCATIONS_GROUP_ID = 'locations';
const REGIONS_GROUP_ID = 'regions';

export interface LocationMultiSelectFieldGroupButtonProps {
  id: string;
  LocationMultiSelectFieldGroupProps: LocationMultiSelectFieldGroupProps;
}

type LocationAndRegionSet = { regions: Set<string>, locations: Set<string> };
export default function LocationMultiSelectFieldGroupButton(props: LocationMultiSelectFieldGroupButtonProps) {
  const {
    id,
    LocationMultiSelectFieldGroupProps: {
      onCheckboxGroupChange,
      regionList,
      clubLocationList,
      clubLocationValues,
      regionValues,
      applyButton,
      clearButton,
    }
  } = props;

  const multiSelectFieldGroupButtonProps: MultiSelectFieldGroupButtonProps = {
    id,
    applyButton,
    clearButton,
    label: 'Location',
    MultiSelectFieldGroupProps: {
      groupValueWrapperList: [
        { values: clubLocationValues, groupId: LOCATIONS_GROUP_ID },
        { values: regionValues, groupId: REGIONS_GROUP_ID }
      ],
      multiSelectOptionGroupDataList: [
        { groupId: REGIONS_GROUP_ID, groupLabel: 'Regions', multiSelectOptionDataList: regionList },
        { groupId: LOCATIONS_GROUP_ID, groupLabel: 'Locations', multiSelectOptionDataList: clubLocationList }
      ],
      onCheckboxGroupChange: (groupValues) => {
        const locationAndRegionSet = groupValues.reduce<LocationAndRegionSet>((accumulator, group) => {
          if (group.groupId === REGIONS_GROUP_ID) {
            accumulator.regions = group.values;
          } else if (group.groupId === LOCATIONS_GROUP_ID) {
            accumulator.locations = group.values;
          }
          return accumulator;
        }, { regions: new Set(), locations: new Set() });
        onCheckboxGroupChange(locationAndRegionSet);
      },
      showRadioGroup: false
    },
    allLabel: 'All',
    disabled: false,
  };
  return <MultiSelectFieldGroupButton {...multiSelectFieldGroupButtonProps} />;
}
