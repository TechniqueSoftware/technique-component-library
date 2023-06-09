import * as React from 'react';
import { createCUICStoriesOf } from '../../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../../components/UI-Components/constants';
import clubOsTheme from '../../../../components/UI-Components/storyThemes';
import  Select, { SelectProps } from '../../../../components/UI-Components/Select/Select';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Grid from '@material-ui/core/Grid';
import { MenuItem } from '../../../../components/UI-Components/MenuItem/MenuItem';
import { ListSubheader } from '../../../../components/UI-Components/ListSubheader/ListSubheader';
import { boolean, select, text } from '@storybook/addon-knobs';

require('moment-timezone');

function SelectStory() {

  const [value, setValue] = React.useState('');

  const margin = select('Margin', ['dense', 'none', 'undefined'], 'undefined');
  const label = text('Label', 'Select an item');

  const props: SelectProps = {
    value,
    label,
    margin: margin === 'undefined' ? undefined : margin,
    name: 'foo',
    onChange: event => setValue(event.target.value as string),
    error: boolean('Has error', false)
  };

  return (
    <div>
      <ThemeProvider theme={clubOsTheme}>
        <Grid container spacing={1}>
            <Select {...props} >
              <ListSubheader>Category 1</ListSubheader>
              <MenuItem value="A">
                Item A
              </MenuItem>
              <MenuItem value="B">
                Item B
              </MenuItem>
              <ListSubheader>Category 2</ListSubheader>
              <MenuItem value="C">
                Item C
              </MenuItem>
            </Select>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      return (<SelectStory />);
    },
    name: 'Select',
    notes: require('./notes.md').default
  });
