import * as React from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import { clubOsTheme, SingleSearchSelect, SingleSearchSelectProps } from '@clubos-ui-components/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Box from '@material-ui/core/Box';
import { boolean, text, number } from '@storybook/addon-knobs';

require('moment-timezone');

function SingleSearchSelectStory() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const listContainerHeight = number('List container height', 450);
  const maxWidth = number('Select max width', 300);
  const searchContainerMaxWidth = number('Search container max width', 400);
  const label = text('Label', 'Nouns');
  const hideLabel = boolean('Hide label', false);
  const disabled = boolean('Disabled', false);
  const emptyDataLabel = text('Empty data label', '');
  const error = boolean('Has error', false);
  const placeholder = text('Search placeholder', 'Search');
  const autoFocus = boolean('Autofocus', false);

  const props: SingleSearchSelectProps = {
    open,
    value,
    listContainerHeight,
    maxWidth,
    searchContainerMaxWidth,
    label,
    disabled,
    hideLabel,
    emptyDataLabel,
    error,
    placeholder,
    autoFocus,
    id: 'selector',
    options: emptyDataLabel ? [] : [
      { label: 'All', value: '' },
      { label: 'test 1', value: '1' },
      { label: 'test 2', value: '2' },
      { label: 'test 3', value: '3' }
    ],
    onChange: (value: React.SetStateAction<string>) => setValue(value),
    onMenuOpen: () => setOpen(true),
    onMenuClose: () => setOpen(false)
  };

  return (
    <ThemeProvider theme={clubOsTheme}>
      <Box p={4}>
        <SingleSearchSelect {...props} />
      </Box>
    </ThemeProvider>
  );
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      return (<SingleSearchSelectStory />);
    },
    name: 'SingleSearchSelect',
    notes: require('./notes.md').default
  });
