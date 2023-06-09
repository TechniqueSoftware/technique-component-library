//@ts-nocheck
import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MODULE_NAME } from '../../../../components/UI-Components/constants';
import clubOsTheme from '../../../../components/UI-Components/storyThemes/index'
import { createCUICStoriesOf } from '../../../../components/UI-Components/utils/utils';
import Box from '@material-ui/core/Box';

import ToggleButtonGroup from '../../../../components/UI-Components/ToggleButtons/ToggleButtonGroup';
import ToggleButton from '../../../../components/UI-Components/ToggleButtons/ToggleButton';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';

const ToggleButtonStory = () => {
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
        <FormatAlignLeftIcon/>
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <FormatAlignCenterIcon/>
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <FormatAlignRightIcon/>
      </ToggleButton>
      <ToggleButton value="justify" aria-label="justified" disabled>
        <FormatAlignJustifyIcon/>
      </ToggleButton>
      <ToggleButton value="amount" aria-label="amount">
        $
      </ToggleButton>
      <ToggleButton value="rate" aria-label="rate">
        %
      </ToggleButton>
      <ToggleButton value="super" aria-label="super button">
        Super button
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

function render() {
  return (
    <div>
      <MuiThemeProvider theme={clubOsTheme}>
        <Box p={2}>
          <ToggleButtonStory/>
        </Box>
      </MuiThemeProvider>
    </div>);
}

createCUICStoriesOf(MODULE_NAME.BUTTONS, module)
  .addCUICStory({
    render,
    name: 'ToggleButtonGroup',
    notes: require('./notes.md').default
  });
