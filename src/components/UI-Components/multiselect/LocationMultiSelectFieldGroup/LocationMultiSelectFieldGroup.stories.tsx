import * as React from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import {
  MultiSelectGroupValueWrapper,
  MultiSelectOptionData
} from '../../MultiSelectFieldGroup/MultiSelectSearchList/MultiSelectSearchList';
import clubOsTheme from '../../storyThemes';
import { IconTooltip, IconTooltipProps } from '../../Tooltip/IconTooltip/IconTooltip';
import { LocationMultiSelectFieldGroupProps } from
    '../../LocationMultiSelectFieldGroup/LocationMultiSelectFieldGroup';
import { LocationMultiSelectFieldGroup } from '../../LocationMultiSelectFieldGroup/LocationMultiSelectFieldGroup';
import { boolean, number, text } from '@storybook/addon-knobs';
import { createRandomCompanyNameWordsArray } from '../../utils/fakeData';
import { ThemeProvider } from '@material-ui/styles';
import HelpRounded from '@material-ui/icons/HelpRounded';

const clubLocationNames = createRandomCompanyNameWordsArray(2000);
const regionLocationNames = createRandomCompanyNameWordsArray(2000);

interface LocationMultiSelectStoryComponentState {
  selectAll: string | 'true' | 'false';
  selectedRegions: Set<string>;
  selectedLocations: Set<string>;
  groupValueWrapper: MultiSelectGroupValueWrapper[];
}

interface LocationMultiSelectStoryComponentProps {
  showSelectedLocationHelperText: boolean;
  showFieldSetLabelText: boolean;
  helperText: string;
  fieldSetLabelText: string;
  readOnly: boolean;
  locationItemCount: number;
  regionItemCount: number;
  showRadioGroup: boolean;
  error: boolean;
  maxWidth: number;
}

class LocationMultiSelectStoryComponent extends React.Component<LocationMultiSelectStoryComponentProps,
  LocationMultiSelectStoryComponentState> {

  static defaultProps = {
    readOnly: false
  };

  constructor(props: any) {
    super(props);
    this.state = {
      selectAll: 'false',
      selectedRegions: new Set(),
      selectedLocations: new Set(),
      groupValueWrapper: [],
    };

    this.onSelectAllRadioGroupChange = this.onSelectAllRadioGroupChange.bind(this);
    this.handleCheckboxGroupChange = this.handleCheckboxGroupChange.bind(this);
  }

  onSelectAllRadioGroupChange(event: any, value: string) {
    this.setState({ selectAll: value });
  }

  handleCheckboxGroupChange(values: { regions: Set<string>, locations: Set<string> }) {
    this.setState({ selectedRegions: values.regions, selectedLocations: values.locations });
  }

  static createListItem(label: string, index: number): MultiSelectOptionData {
    let smsComponent;
    let labelString = label;
    const textCampaignsDisabled = '(text campaigns disabled)';
    if ((index % 3) === 0) {
      labelString = `${label} {textCampaignsDisabled}`;
      smsComponent = (<span>{label} <i>{textCampaignsDisabled}</i></span>);
    }
    return {
      labelString,
      value: label,
      labelComponent: smsComponent,
      name: 'mockName1',
      disabled: !!smsComponent
    };
  }

  createListItems(names: string[], count: number): MultiSelectOptionData[] {
    return Array(count).fill('').map((value, index) => {
      return LocationMultiSelectStoryComponent.createListItem(names[index], index);
    });
  }

  render() {
    const {
      locationItemCount,
      regionItemCount,
      showRadioGroup,
      helperText,
      error,
      maxWidth,
      readOnly,
      showFieldSetLabelText,
      fieldSetLabelText,
      showSelectedLocationHelperText
    } = this.props;
    const {
      selectAll,
      selectedLocations,
      selectedRegions
    } = this.state;

    const iconTooltipProps: IconTooltipProps = {
      iconProps: {
        component: HelpRounded
      },
      tooltipText: 'Locations that do not have bulk texting enabled cannot be selected. Contact support@club-os.com for help.'
    };

    const props: LocationMultiSelectFieldGroupProps = {
      showSelectedLocationHelperText,
      showFieldSetLabelText,
      helperText,
      error,
      readOnly,
      selectAll,
      showRadioGroup,
      fieldSetLabelText,
      clubLocationList: this.createListItems(clubLocationNames, locationItemCount),
      selectLabelComponent: <span>Select Locations <IconTooltip {...iconTooltipProps} /></span>,
      onCheckboxGroupChange: this.handleCheckboxGroupChange,
      regionValues: selectedRegions,
      clubLocationValues: selectedLocations,
      onAllOrSelectRadioGroupChange: this.onSelectAllRadioGroupChange,
      onChange: changes => console.log('LocationMultiSelectFieldGroup onChange', changes),
    };

    if (regionItemCount > 0) {
      props.regionList = this.createListItems(regionLocationNames, regionItemCount);
    }

    return (
      <ThemeProvider theme={clubOsTheme}>
        <div style={{ maxWidth }}>
          <LocationMultiSelectFieldGroup {...props} />
        </div>
      </ThemeProvider>);
  }
}

function renderSelectLocationsComponent() {

  const props: LocationMultiSelectStoryComponentProps = {
    showSelectedLocationHelperText: boolean('Show selected location helper text', true),
    helperText: text('Helper Text', ''),
    fieldSetLabelText: text('Fieldset label text', 'Make template accessible to'),
    showFieldSetLabelText: boolean('Show fieldset label text', true),
    showRadioGroup: boolean('Show radio group', true),
    readOnly: boolean('Read only', false),
    error: boolean('Error', false),
    regionItemCount: number('Region count (click a checkbox to force an update)', 10),
    locationItemCount: number('Location count (click a checkbox to force an update)', 200),
    maxWidth: number('Container max width', 500)
  };
  return <LocationMultiSelectStoryComponent {...props} />;
}

createCUICStoriesOf(MODULE_NAME.MULTISELECT, module)
  .addCUICStory({
    render: renderSelectLocationsComponent,
    name: 'LocationMultiSelectFieldGroup',
    notes: require('./notes.md').default
  });
