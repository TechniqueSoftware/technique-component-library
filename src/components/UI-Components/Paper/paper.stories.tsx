import * as React from 'react';
import { createCUICStoriesOf } from '../utils/utils';
import { MODULE_NAME } from '../constants';
import { Paper, PaperProps } from './Paper';
import Box from '@material-ui/core/Box';
import { number, boolean } from '@storybook/addon-knobs';
import { MuiThemeProvider } from '@material-ui/core';
import clubOsTheme from '../storyThemes';

const SnackbarStory = () => {

  const paperProps: PaperProps = {
    elevation: number('Elevation', 1),
    square: boolean('Square', false)
  };

  return (
    <MuiThemeProvider theme={clubOsTheme}>
      <Box height={400} width={400}>
        <Paper {...paperProps}>
          <Box height={400} width={400}>
          </Box>
        </Paper>
      </Box>
    </MuiThemeProvider>
  );
};

function render() {
  return <SnackbarStory />;
}

createCUICStoriesOf(MODULE_NAME.SURFACES, module)
  .addCUICStory({
    render,
    name: 'Paper',
    notes: require('./notes.md').default
  });
