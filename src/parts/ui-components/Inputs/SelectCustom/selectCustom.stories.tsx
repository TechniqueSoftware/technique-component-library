import * as React from 'react';
import { createCUICStoriesOf } from '../../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../../components/UI-Components/constants';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { boolean } from '@storybook/addon-knobs';
import clubOsTheme from '../../../../components/UI-Components/storyThemes';
import { SelectCustom, SelectCustomProps } from '../../../../components/UI-Components/Select/SelectCustom';
import { Typography } from '@material-ui/core';

function render() {
  const open = boolean('open', false);
  const disabled = boolean('disabled', false);

  const selectCustomProps: SelectCustomProps = {
    open,
    disabled,
    value: 'Philadelphia',
    label: 'Location',
    onMenuClose: () => console.log('closing'),
    onMenuOpen: () => console.log('opening'),
    id: 'story-id'
  };

  return (
    <div>
      <MuiThemeProvider theme={clubOsTheme}>
        <Box p={2}>
          <SelectCustom {...selectCustomProps} >
            <Box m={1}>
              <Typography>Any component can be rendered in this popover area. See the <a
                href="/?path=/story/multiselect--multiselectfieldgroupbutton">MultiSelectFieldGroupButton</a> component for an
                example</Typography>
            </Box>
          </SelectCustom>
        </Box>
      </MuiThemeProvider>
    </div>);
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render,
    name: 'SelectCustom',
    notes: require('./notes.md').default
  });
