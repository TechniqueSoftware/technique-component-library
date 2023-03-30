//@ts-nocheck
import * as React from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import clubOsTheme from '../../storyThemes';
import { MultiSelectGroupValueWrapper, MultiSelectOptionData } from '../../MultiSelectFieldGroup/MultiSelectSearchList/MultiSelectSearchList';
import { LocationMultiSelectFieldGroupProps } from '../../LocationMultiSelectFieldGroup/LocationMultiSelectFieldGroup';
import { SelectLocationsWithSmsTooltip, LocationMultiSelectFieldGroupButton } from '../../../..';

import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { number , boolean  } from '@storybook/addon-knobs';
import { createRandomCompanyNameWordsArray } from '../../utils/fakeData';

const LIST_COUNT = 20;

const clubLocationNames: string[] = createRandomCompanyNameWordsArray(LIST_COUNT);
const regionLocationNames: string[] = createRandomCompanyNameWordsArray(LIST_COUNT);

interface LocationMultiSelectStoryComponentState {
  selectAll: string | 'true' | 'false';
  selectedRegions: Set<string>;
  selectedLocations: Set<string>;
  groupValueWrapper: MultiSelectGroupValueWrapper[];
}

interface LocationMultiSelectStoryComponentProps {
  listContainerHeight: number;
  listContainerApplyButton : boolean;
  listContainerClearButton : boolean;
}

class LocationMultiSelectStoryComponent extends React.Component<LocationMultiSelectStoryComponentProps,
  LocationMultiSelectStoryComponentState> {

  static defaultProps = {
    readOnly: false
  };

  constructor(props: LocationMultiSelectStoryComponentProps) {
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

  onSelectAllRadioGroupChange(event: React.SyntheticEvent, value: string) {
    this.setState({ selectAll: value });
  }

  handleCheckboxGroupChange(values: { regions: Set<string>, locations: Set<string> }) {
    this.setState({ selectedRegions: values.regions, selectedLocations: values.locations });
  }

  static createListItem(label: string): MultiSelectOptionData {
    return {
      labelString: label,
      value: label,
      name: 'mockName1'
    };
  }

  createListItems(names: string[], count: number): MultiSelectOptionData[] {
    return Array(count).fill('').map((value, index) => {
      return LocationMultiSelectStoryComponent.createListItem(names[index]);
    });
  }

  render() {
    const {
      selectedLocations,
      selectedRegions
    } = this.state;

    const { listContainerHeight , listContainerApplyButton , listContainerClearButton } = this.props;

    const clubLocationList = this.createListItems(clubLocationNames, LIST_COUNT);
    const regionList = this.createListItems(regionLocationNames, LIST_COUNT);

    const props: LocationMultiSelectFieldGroupProps = {
      regionList,
      clubLocationList,
      listContainerHeight,
      applyButton : listContainerApplyButton,
      clearButton : listContainerClearButton,
      selectAll: 'false',
      showSelectedLocationHelperText: false,
      showFieldSetLabelText: false,
      readOnly: false,
      showRadioGroup: false,
      selectLabelComponent: <SelectLocationsWithSmsTooltip tooltipText={'mockTooltipText'}/>,
      onCheckboxGroupChange: this.handleCheckboxGroupChange,
      regionValues: selectedRegions,
      clubLocationValues: selectedLocations,
      onAllOrSelectRadioGroupChange: this.onSelectAllRadioGroupChange
    };

    props.regionList = this.createListItems(regionLocationNames, 5);

    return (
      <ThemeProvider theme={clubOsTheme}>
        <Box p={4}>
          <LocationMultiSelectFieldGroupButton {...{ LocationMultiSelectFieldGroupProps: props, id: 'mockId' }} />
        </Box>
      </ThemeProvider>);
  }
}

function renderSelectLocationsComponent() {
  const listContainerHeight = number('List container height', 450);
  const listContainerApplyButton = boolean('Apply Button', true);
  const listContainerClearButton = boolean('Clear Button', true);
  return <LocationMultiSelectStoryComponent
  listContainerHeight={listContainerHeight}
  listContainerApplyButton={listContainerApplyButton}
  listContainerClearButton={listContainerClearButton} />;
}

createCUICStoriesOf(MODULE_NAME.MULTISELECT, module)
  .addCUICStory({
    render: renderSelectLocationsComponent,
    name: 'LocationMultiSelectFieldGroupButton',
    notes: require('./notes.md').default
  });
