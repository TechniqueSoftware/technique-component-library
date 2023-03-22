import * as React from 'react';
import { pluralize } from '../../services/pluralizeService';
import { LOCATIONS_GROUP_ID, REGIONS_GROUP_ID } from './locationMultiSelectFieldGroupConstants';
// noinspection TypeScriptPreferShortImport
import {
  MultiSelectGroupValueWrapper,
  MultiSelectOptionData
} from '../MultiSelectFieldGroup/MultiSelectSearchList/MultiSelectSearchList';
import MultiSelectFieldGroup, { MultiSelectFieldGroupProps } from '../MultiSelectFieldGroup/MultiSelectFieldGroup';

export interface LocationMultiSelectFieldGroupProps {
  fieldSetLabelText?: string | React.ReactNode;
  selectLabelComponent?: React.ReactElement<any> | undefined;
  readOnly?: boolean;
  helperText?: string;
  error?: boolean;
  showRadioGroup?: boolean;
  showFieldSetLabelText?: boolean;
  showSelectedLocationHelperText?: boolean;
  selectAll?: string | 'true' | 'false';
  listContainerHeight?: number;
  regionList?: MultiSelectOptionData[];
  regionValues?: Set<string>;
  clubLocationList?: MultiSelectOptionData[];
  clubLocationValues?: Set<string>;
  applyButton?: boolean;
  clearButton?: boolean;
  onChange?: (changes: { regions: Set<any>, locations: Set<any>, selectAll: boolean}) => void;
  onCheckboxGroupChange?: (values: { regions: Set<any>, locations: Set<any> }) => void;
  onAllOrSelectRadioGroupChange?: (event: React.ChangeEvent<{}>, value: string) => void;
}

export class LocationMultiSelectFieldGroup extends React.PureComponent<LocationMultiSelectFieldGroupProps> {

  static defaultProps: Partial<LocationMultiSelectFieldGroupProps> = {
    selectAll: 'false',
    fieldSetLabelText: '',
    helperText: '',
    readOnly: false,
    regionList: [],
    clubLocationList: [],
    regionValues: new Set(),
    clubLocationValues: new Set(),
    listContainerHeight: 450,
    showRadioGroup: false,
    showFieldSetLabelText: false,
    showSelectedLocationHelperText: true
  };

  renderSelectLabelComponent() {
    const { selectLabelComponent } = this.props;
    if (selectLabelComponent) {
      return React.cloneElement(selectLabelComponent);
    }
    return 'Select Locations';
  }

  handleCheckboxGroupChange = (groupValues: MultiSelectGroupValueWrapper[]) => {
    const {
      selectAll,
      onChange,
      onCheckboxGroupChange,
    } = this.props;

    const regions = groupValues.find((item) => item.groupId === REGIONS_GROUP_ID);
    const locations = groupValues.find((item) => item.groupId === LOCATIONS_GROUP_ID);
    const regionValues = regions ? regions.values : new Set();
    const locationValues = locations ? locations.values : new Set();

    if (onChange) onChange({ regions: regionValues, locations: locationValues, selectAll: selectAll === 'true' });
    if (onCheckboxGroupChange) onCheckboxGroupChange({ regions: regionValues, locations: locationValues });
  }

  handleSelectAllChange = (event: React.ChangeEvent<{}>, value: string) => {
    const {
      onChange,
      regionValues,
      clubLocationValues,
      onAllOrSelectRadioGroupChange,
    } = this.props;

    if (onChange) onChange({ regions: regionValues, locations: clubLocationValues, selectAll: value === 'true' });
    if (onAllOrSelectRadioGroupChange) onAllOrSelectRadioGroupChange(event, value);
  }

  renderHelperText() {
    const {
      helperText,
      regionValues,
      clubLocationValues,
      showSelectedLocationHelperText
    } = this.props;

    if (helperText) return helperText;

    if (!showSelectedLocationHelperText) return null;

    const regionsCount = regionValues.size;
    const locationCount = clubLocationValues.size;
    const regionsAndLocationsSelected = regionsCount > 0 && locationCount > 0;
    const regionsOrLocationSelected = regionsCount > 0 || locationCount > 0;

    let message = '';

    if (regionsCount > 0) {
      message = `${regionsCount} ${pluralize('region', regionsCount)}`;

    }
    if (regionsAndLocationsSelected) {
      message += ' and ';
    }

    if (locationCount > 0) {
      message += `${locationCount} ${pluralize('location', locationCount)}`;
    }

    if (regionsOrLocationSelected) {
      message += ' selected';
    }

    return message;
  }

  render() {
    const {
      clubLocationList,
      regionList,
      selectAll,
      regionValues,
      clubLocationValues,
      showRadioGroup,
      fieldSetLabelText,
      readOnly,
      error,
      showFieldSetLabelText,
      showSelectedLocationHelperText,
      listContainerHeight,
    } = this.props;

    const radioInputName = 'selectAllActiveAndFutureRegions';

    const props: MultiSelectFieldGroupProps = {
      listContainerHeight,
      showFieldSetLabelText,
      readOnly,
      error,
      fieldSetLabelText,
      showRadioGroup,
      showHelperText: showSelectedLocationHelperText,
      helperText: this.renderHelperText(),
      onCheckboxGroupChange: this.handleCheckboxGroupChange,
      groupValueWrapperList: [
        {
          groupId: REGIONS_GROUP_ID,
          values: regionValues
        }, {
          groupId: LOCATIONS_GROUP_ID,
          values: clubLocationValues
        }],
      radioGroupProps: {
        label: 'Accessible to locations',
        name: radioInputName,
        value: selectAll
      },
      onRadioGroupChange: this.handleSelectAllChange,
      selectAllRadioInputProps: {
        label: `All Active and Future Locations`,
        value: 'true',
        name: radioInputName,
      },
      selectSomeRadioInputProps: {
        name: radioInputName,
        label: this.renderSelectLabelComponent(),
        value: 'false',
      },
      multiSelectOptionGroupDataList: [
        {
          groupLabel: 'Regions',
          groupId: REGIONS_GROUP_ID,
          multiSelectOptionDataList: regionList
        },
        {
          groupLabel: 'Locations',
          groupId: LOCATIONS_GROUP_ID,
          multiSelectOptionDataList: clubLocationList
        }
      ]
    };
    return (<MultiSelectFieldGroup {...props} />);
  }
}

export default LocationMultiSelectFieldGroup;
