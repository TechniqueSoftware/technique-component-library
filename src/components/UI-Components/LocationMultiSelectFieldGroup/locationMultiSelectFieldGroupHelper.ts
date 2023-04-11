import { MultiSelectOptionData } from '../MultiSelectFieldGroup/MultiSelectSearchList/MultiSelectSearchList';
import pluralize from 'pluralize';

export interface RenderButtonLabelParams {
  regionList: MultiSelectOptionData[];
  clubLocationList: MultiSelectOptionData[];
  regionValues: Set<string>;
  clubLocationValues: Set<string>;
}

const MAX_BUTTON_LABEL_LENGTH = 25;
const ALL_LOCATIONS_LABEL = 'All Locations';

function truncateLabel(label: string) {
  return label.length > MAX_BUTTON_LABEL_LENGTH ? `${label.substring(0, MAX_BUTTON_LABEL_LENGTH)}...` : label;
}

function getLabelStringForMatchingOptionData(value: string, optionData: MultiSelectOptionData[]) {
  const option = optionData.find((region: MultiSelectOptionData) => region.value === value);
  return truncateLabel(option.labelString);
}

function regionPlural(count: number) {
  return pluralize('Region', count);
}

function locationPlural(count: number) {
  return pluralize('Location', count);
}

function regionsCountLabel(count: number) {
  return `${count} ${regionPlural(count)}`;
}

function locationsCountLabel(count: number) {
  return `${count} ${locationPlural(count)}`;
}

/**
 * Gets the appropriate label for our button based on what values are selected.
 *
 * There is now a more generic version of this for general use. See the `getButtonLabel` method in multiSelectFieldGroupButtonHelper.ts
 * @param params
 */
export function getRegionsOrLocationsSelectedLabel(params: RenderButtonLabelParams) {
  const {
    regionValues,
    clubLocationValues,
    regionList,
    clubLocationList,
  } = params;

  let label = ALL_LOCATIONS_LABEL;

  const locationCount = clubLocationValues.size;
  const regionCount = regionValues.size;

  if (regionCount === 1 && locationCount === 0) {
    const value = regionValues.values().next().value;
    label = getLabelStringForMatchingOptionData(value, regionList);
  } else if (locationCount === 1 && regionCount === 0) {
    const value = clubLocationValues.values().next().value;
    label = getLabelStringForMatchingOptionData(value, clubLocationList);
  } else if (locationCount > 1 && regionCount === 0) {
    label = locationsCountLabel(locationCount);
  } else if (regionCount > 1 && locationCount === 0) {
    label = regionsCountLabel(regionCount);
  } else if (regionCount > 0 && locationCount > 0) {
    label = `${regionsCountLabel(regionCount)}, ${locationsCountLabel(locationCount)}`;
  }
  return label;
}
