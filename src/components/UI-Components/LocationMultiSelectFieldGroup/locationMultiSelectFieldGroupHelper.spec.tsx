import {
  getRegionsOrLocationsSelectedLabel,
  RenderButtonLabelParams
} from './locationMultiSelectFieldGroupHelper';
import { MultiSelectOptionData } from '../../..';

const regionList: MultiSelectOptionData[] = [{
  labelComponent: undefined,
  name: 'mockLabelName',
  value: '1',
  labelString: 'Group 1  mockLabel Text 1'
}, {
  labelComponent: undefined,
  name: 'mockLabelName',
  value: '2',
  labelString: 'Group 1 mockLabel Text 2'
},
  {
    labelComponent: undefined,
    name: 'mockLabelName',
    value: '3',
    labelString: 'Group 1 mockLabel Text 3'
  }
];

const clubLocationList: MultiSelectOptionData[] = [{
  labelComponent: undefined,
  name: 'mockLabelName',
  value: '3',
  labelString: 'Group 2 mockLabel Text 3'
}, {
  labelComponent: undefined,
  name: 'mockLabelName',
  value: '4',
  labelString: 'Group 2 mockLabel Text 4'
}, {
  labelComponent: undefined,
  name: 'mockLabelName',
  value: '5',
  labelString: 'Group 2 mockLabel Text 5'
}
];

describe('locationMultiSelectFieldGroupHelper', () => {
  describe('getRegionsOrLocationsSelectedLabel', () => {

    test('should return the label of the location when only one location is selected', () => {
      const firstClubLocation = clubLocationList[0];
      const params: RenderButtonLabelParams = {
        regionList,
        clubLocationList,
        regionValues: new Set(),
        clubLocationValues: new Set([firstClubLocation.value]),
      };
      const label = getRegionsOrLocationsSelectedLabel(params);

      expect(label).toBe(firstClubLocation.labelString);
    });

    test('should return the label of the region when only one region is selected', () => {
      const firstRegion = regionList[0];
      const params: RenderButtonLabelParams = {
        regionList,
        clubLocationList,
        regionValues: new Set([firstRegion.value]),
        clubLocationValues: new Set(),
      };
      const label = getRegionsOrLocationsSelectedLabel(params);

      expect(label).toBe(firstRegion.labelString);
    });

    test('should return the count of regions when multiple regions are selected', () => {
      const firstRegion = regionList[0];
      const secondRegion = regionList[1];
      const regionValues = new Set([firstRegion.value, secondRegion.value]);
      const params: RenderButtonLabelParams = {
        regionValues,
        regionList,
        clubLocationList,
        clubLocationValues: new Set(),
      };
      const label = getRegionsOrLocationsSelectedLabel(params);

      expect(label).toBe(`${regionValues.size} Regions`);
    });

    test('should return the count of locations when multiple locations are selected', () => {
      const firstLocation = clubLocationList[0];
      const secondLocation = clubLocationList[1];
      const clubLocationValues = new Set([firstLocation.value, secondLocation.value]);
      const params: RenderButtonLabelParams = {
        clubLocationValues,
        regionList,
        clubLocationList,
        regionValues: new Set(),
      };
      const label = getRegionsOrLocationsSelectedLabel(params);

      expect(label).toBe(`${clubLocationValues.size} Locations`);
    });

    test('should return the label indicating a count of regions and locations selected', () => {
      const firstRegion = regionList[0];
      const firstClubLocation = clubLocationList[0];
      const params: RenderButtonLabelParams = {
        regionList,
        clubLocationList,
        regionValues: new Set([firstRegion.value]),
        clubLocationValues: new Set([firstClubLocation.value]),
      };
      const label = getRegionsOrLocationsSelectedLabel(params);

      expect(label).toBe('1 Region, 1 Location');
    });
  });
});
