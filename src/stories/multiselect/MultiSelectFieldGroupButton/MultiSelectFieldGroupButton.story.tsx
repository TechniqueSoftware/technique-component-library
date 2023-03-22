import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { number, text, boolean } from '@storybook/addon-knobs';
import { createCUICStoriesOf } from '../../utils/utils';
import { createRandomCompanyNameWordsArray, createRandomLoremIpsumWordsArray, createRandomNameWordsArray } from '../../utils/fakeData';
import { MODULE_NAME } from '../../constants';
import {
  MultiSelectGroupValueWrapper,
  MultiSelectFieldGroupProps,
  SelectLocationsWithSmsTooltip,
  clubOsTheme,
} from '@clubos-ui-components/core';
import MultiSelectFieldGroupButton, { MultiSelectFieldGroupButtonProps }
  from '@clubos-ui-components/core/dist/components/MultiSelectFieldGroupButton/MultiSelectFieldGroupButton';
import {
  MultiSelectOptionGroupData,
  MultiSelectOptionData
} from '@clubos-ui-components/core/dist/components/MultiSelectFieldGroup/MultiSelectSearchList/MultiSelectSearchList';

const LIST_COUNT = 20;
const companyNameList: string[] = createRandomCompanyNameWordsArray(LIST_COUNT);
const nameList: string[] = createRandomNameWordsArray(LIST_COUNT);
const loremIpsumList: string[] = createRandomLoremIpsumWordsArray(LIST_COUNT);

const companyOptionDataList = createMultiSelectOptionGroupData(companyNameList);
const nameOptionDataList = createMultiSelectOptionGroupData(nameList);
const loremIpsumOptionDataList = createMultiSelectOptionGroupData(loremIpsumList);

function createMultiSelectOptionGroupData(stringList: string[]): MultiSelectOptionData[] {
  return stringList.map((string: string) => {
    return {
      disabled: false,
      labelString: string,
      name: 'mockName',
      value: string
    };
  });
}

type MultiSelectStoryComponentProps = {
  listContainerHeight: number,
  allLabel: string,
  disabled: boolean,
  label: string,
  searchContainerMaxWidth: number,
  selectMaxWidth: number,
  listContainerApplyButton : boolean,
  listContainerClearButton : boolean
};

function MultiSelectStoryComponent(props: MultiSelectStoryComponentProps) {

  const {
    disabled,
    allLabel,
    label,
    selectMaxWidth,
    searchContainerMaxWidth,
    listContainerHeight,
    listContainerApplyButton,
    listContainerClearButton
  } = props;

  const COMPANY_GROUP_ID = 'company';
  const NAME_GROUP_ID = 'vehicle';
  const LOREM_GROUP_ID = 'lorem';

  const [groupValueWrapper, setGroupValueWrapper] = React.useState<MultiSelectGroupValueWrapper[]>([
    {
      groupId: COMPANY_GROUP_ID,
      values: new Set()
    }, {
      groupId: NAME_GROUP_ID,
      values: new Set()
    }, {
      groupId: LOREM_GROUP_ID,
      values: new Set()
    }]);

  const multiSelectOptionGroupDataList: MultiSelectOptionGroupData[] = [{
    groupId: COMPANY_GROUP_ID,
    groupLabel: 'Company',
    multiSelectOptionDataList: companyOptionDataList
  }, {
    groupId: NAME_GROUP_ID,
    groupLabel: 'Names',
    multiSelectOptionDataList: nameOptionDataList
  }, {
    groupId: LOREM_GROUP_ID,
    groupLabel: 'Lorem',
    multiSelectOptionDataList: loremIpsumOptionDataList
  }];

  const MultiSelectFieldGroupProps: MultiSelectFieldGroupProps = {
    listContainerHeight,
    multiSelectOptionGroupDataList,
    fieldSetLabelText: undefined,
    showHelperText: false,
    showFieldSetLabelText: false,
    readOnly: false,
    showRadioGroup: false,
    helperText: <SelectLocationsWithSmsTooltip tooltipText={'mockTooltipText'} />,
    onCheckboxGroupChange: (value) => setGroupValueWrapper(value),
    groupValueWrapperList: groupValueWrapper
  };

  const multiSelectFieldGroupButtonProps: MultiSelectFieldGroupButtonProps = {
    label,
    selectMaxWidth,
    searchContainerMaxWidth,
    allLabel,
    MultiSelectFieldGroupProps,
    disabled,
    applyButton : listContainerApplyButton,
    clearButton : listContainerClearButton,
    id: 'mockId'
  };

  return (
    <ThemeProvider theme={clubOsTheme}>
      <Box p={4}>
        <MultiSelectFieldGroupButton {...multiSelectFieldGroupButtonProps} />
      </Box>
    </ThemeProvider>);
}

function renderMultiSelectFieldGroupButtonStory() {
  const listContainerHeight = number('List container height', 450);
  const selectMaxWidth = number('Select max width', 300);
  const searchContainerMaxWidth = number('Search container max width', 400);
  const allLabel = text('All', 'All');
  const label = text('label', 'Nouns');
  const disabled = boolean('Disabled', false);
  const listContainerApplyButton = boolean('Apply Button', true);
  const listContainerClearButton = boolean('Clear Button', true);

  const multiSelectStoryComponentProps: MultiSelectStoryComponentProps = {
    listContainerHeight,
    allLabel,
    disabled,
    label,
    searchContainerMaxWidth,
    selectMaxWidth,
    listContainerApplyButton,
    listContainerClearButton,
  };
  return <MultiSelectStoryComponent {...multiSelectStoryComponentProps} />;
}

createCUICStoriesOf(MODULE_NAME.MULTISELECT, module)
  .addCUICStory({
    render: renderMultiSelectFieldGroupButtonStory,
    name: 'MultiSelectFieldGroupButton',
    notes: require('./notes.md').default
  });
