import * as React from 'react';
import Box from '@material-ui/core/Box';

import { number, text, boolean } from '@storybook/addon-knobs';
import { createCUICStoriesOf } from '../../utils/utils';
import { ThemeProvider } from '@material-ui/styles';
import { MODULE_NAME } from '../../constants';
import clubOsTheme from '../../storyThemes';
import MultiSelectStandardFieldButton, { MultiSelectStandardFieldButtonProps } from '../../MultiSelectStandardFieldButton/MultiSelectStandardFieldButton';
import { MultiSelectStandardOptions } from '../../MultiSelectStandardField/MultiSelectStandardSearchList/MultiSelectStandardSearchList';

type MultiSelectStandardStoryComponentProps = {
  listContainerHeight: number,
  disabled: boolean,
  label: string,
  selectMaxWidth: number,
  listContainerApplyButton: boolean,
  listContainerClearButton: boolean,
};

export const multiSelectStandardFieldProps: MultiSelectStandardOptions[] = [
  { labelString: 'First-Time Leads', value: 'FirstTimeLeads', name: 'FirstTimeLeads', checked: true },
  { labelString: 'Re-Interested Leads', value: 'ReInterestedLeads', name: 'ReInterestedLeads', checked: false },
  { labelString: 'Re-Interested Ex-Members', value: 'ReInterestedExMembers', name: 'ReInterestedExMembers', checked: false }
];
function MultiSelectStoryComponent(props: MultiSelectStandardStoryComponentProps) {
  const {
    disabled,
    label,
    selectMaxWidth,
    listContainerHeight,
    listContainerApplyButton,
    listContainerClearButton
  } = props;

  const onCheckboxGroupChange = () => {
  };

  const standardButtonProps: MultiSelectStandardFieldButtonProps = {
    label,
    disabled,
    selectMaxWidth,
    listContainerHeight,
    onCheckboxGroupChange,
    multiSelectStandardFieldProps,
    applyButton: listContainerApplyButton,
    clearButton: listContainerClearButton,
    id: 'lead'
  };

  return (
    <ThemeProvider theme={clubOsTheme}>
      <Box p={4}>
        <MultiSelectStandardFieldButton {...standardButtonProps} />
      </Box>
    </ThemeProvider>
  );
}

function renderMultiSelectStandardFieldButtonStory() {
  const listContainerHeight = number('List container height', 450);
  const selectMaxWidth = number('Select max width', 300);
  const label = text('label', 'Lead Types');
  const disabled = boolean('Disabled', false);
  const listContainerApplyButton = boolean('Apply Button', true);
  const listContainerClearButton = boolean('Clear Button', true);

  const multiSelectStoryComponentProps: MultiSelectStandardStoryComponentProps = {
    listContainerHeight,
    disabled,
    label,
    selectMaxWidth,
    listContainerApplyButton,
    listContainerClearButton
  };
  return <MultiSelectStoryComponent {...multiSelectStoryComponentProps} />;
}

createCUICStoriesOf(MODULE_NAME.MULTISELECT, module)
  .addCUICStory({
    render: renderMultiSelectStandardFieldButtonStory,
    name: 'MultiSelectStandardFieldButton',
    notes: require('./notes.md').default
  });
