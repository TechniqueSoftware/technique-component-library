import * as React from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { boolean } from '@storybook/addon-knobs';
import clubOsTheme from '@clubos-ui-components/core/dist/themes/clubOS';
import { SelectCustom, SelectCustomProps } from '@clubos-ui-components/core/dist/components/Select/SelectCustom';
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
